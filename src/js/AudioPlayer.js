import * as Tone from "tone";
import {SCALES} from "./scales";


const MAX_VOLUME_DB = 7;
const MIN_VOLUME_DB = -20;
const VOLUME_SLIDER_DOWN_THRESHOLD = 2;
const NOTE_TYPE = "8n";



function mapRange(number, inMin, inMax, outMin, outMax)
{
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}


export default class AudioPlayer
{
    static #synth = null;
    static #volume = 50;
    static #sequence = null;


    static setVolume(volume)
    {
        this.#volume = volume;

        if (!this.#synth)
            return;

        const dbVolume = mapRange(volume, 0, 100, MIN_VOLUME_DB, MAX_VOLUME_DB);
        this.#synth.volume.value = (volume > VOLUME_SLIDER_DOWN_THRESHOLD) ? dbVolume : -999;
    }


    static async playScale(scale)
    {
        if (!this.#synth)
        {
            await Tone.start();
            this.#synth = new Tone.Synth().toDestination();
            this.setVolume(this.#volume);
        }
        else
        {
            // cancel, clear, dispose, stop,
            this.#sequence.stop();
            Tone.getTransport().stop();
        }

        const scaleNotes = SCALES[scale];
        let octave = 3;
        const scaleNotesWithOctave = SCALES[scale].map((note, i) =>
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
                Tone.getTransport().stop();
        }, scaleNotesWithOctave, NOTE_TYPE);

        this.#sequence.loop = false;
        this.#sequence.start();
        Tone.getTransport().start();
    }
}