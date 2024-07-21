import * as Tone from "tone";
import { MIN_PREVIEW_VOLUME_DB, MAX_PREVIEW_VOLUME_DB, VOLUME_SLIDER_MUTE_THRESHOLD, PREVIEW_NOTE_TYPE } from "./constants";
import Util from "./Util";


function mapRange(number, inMin, inMax, outMin, outMax)
{
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}


export default class AudioPlayer
{
    static #synth = null;
    static #volume = 50;
    static #sequence = null;


    static async #createSynthIfNotExist()
    {
        await Tone.start();
        this.#synth = new Tone.Synth().toDestination();
        this.setVolume(this.#volume);
    }


    static setVolume(volume)
    {
        this.#volume = volume;

        if (!this.#synth)
            return;

        const dbVolume = mapRange(volume, 0, 100, MIN_PREVIEW_VOLUME_DB, MAX_PREVIEW_VOLUME_DB);
        this.#synth.volume.value = (volume > VOLUME_SLIDER_MUTE_THRESHOLD) ? dbVolume : -999;
    }


    static async playScale(scale, startOctave)
    {
        if (!this.#synth)
        {
            await this.#createSynthIfNotExist();
        }
        else
        {
            // cancel, clear, dispose, stop,
            if (this.#sequence)
                this.#sequence.stop();

            Tone.getTransport().stop();
        }

        const scaleNotes = Util.getScaleFromName(scale);
        let octave = startOctave;
        const scaleNotesWithOctave = scaleNotes.map((note, i) =>
        {
            const n = note + octave;

            if (i < 7 && (scaleNotes[i] < "C" && scaleNotes[i + 1] >= "C"))
                ++octave;

            return n;
        });

        this.#sequence = new Tone.Sequence((time, note) =>
        {
            this.#synth.triggerAttackRelease(note, 0.1, time);

            if (scaleNotes[scaleNotes.length - 1] === note)
            {
                Tone.getTransport().stop();
            }
        }, scaleNotesWithOctave, PREVIEW_NOTE_TYPE);

        this.#sequence.loop = false;
        this.#sequence.start();
        Tone.getTransport().start();
    }


    static async playNote(note)
    {
        if (!this.#synth)
        {
            await this.#createSynthIfNotExist();
        }

        this.#synth.triggerAttackRelease(note, PREVIEW_NOTE_TYPE);
    }
}