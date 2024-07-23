import { PIANO_NOTES, PREVIEW_BPM, PREVIEW_NOTE_TYPE } from "./constants";


export default class NewAudioPlayer
{
    #context;
    #noteDelay;


    constructor()
    {
        this.#noteDelay = 60 / PREVIEW_BPM / PREVIEW_NOTE_TYPE.replace("n", "");
    }


    playNote(note, octave, time)
    {
        if (!this.#context)
        {
            this.#context = new AudioContext();
        }

        const oscillator = this.#context.createOscillator();
        // sine, square, sawtooth, triangle, custom (use setPeriodicWave())
        oscillator.type = "square";

        const gainNode = new GainNode(this.#context);
        oscillator.connect(gainNode).connect(this.#context.destination);

        let midiNote = (PIANO_NOTES.indexOf(note) - 3);
        if (midiNote < 0)
            midiNote = PIANO_NOTES.length - Math.abs(midiNote);

        midiNote += 12 * (octave + 2);

        // gainNode.gain.value = -2;
        oscillator.frequency.value = Math.pow(2, (midiNote - 69) / 12) * 440 / 2;
        oscillator.start(time);

        const stopTime = time + this.#noteDelay;
        oscillator.stop(stopTime);

        gainNode.gain.setTargetAtTime(0, stopTime - this.#noteDelay / 2, this.#noteDelay / 2);
    }


    playScale(scaleNotes, startOctave)
    {
        if (this.#context)
        {
            this.#context.close();
        }

        let octave = startOctave;

        for (let i = 0; i < scaleNotes.length; ++i)
        {
            const note = scaleNotes[i];
            this.playNote(note, octave, i * this.#noteDelay);

            if (i < 7 && (note < "C" && scaleNotes[i + 1] >= "C"))
                ++octave;
        }
    }
}