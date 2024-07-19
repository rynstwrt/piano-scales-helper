import * as Tone from "tone";


const MAX_VOLUME_DB = 7;
const MIN_VOLUME_DB = -20;
const VOLUME_SLIDER_DOWN_THRESHOLD = 2;


function mapRange(number, inMin, inMax, outMin, outMax)
{
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}


export default class AudioPlayer
{
    static #synth = null;
    static #volume = 50;


    static setVolume(volume)
    {
        this.#volume = volume;

        if (!this.#synth)
            return;

        const dbVolume = mapRange(volume, 0, 100, MIN_VOLUME_DB, MAX_VOLUME_DB);
        this.#synth.volume.value = (volume > VOLUME_SLIDER_DOWN_THRESHOLD) ? dbVolume : -999;
    }


    static playScale(scale)
    {
        if (!this.#synth)
        {
            this.#synth = new Tone.Synth().toDestination();
            this.setVolume(this.#volume);
        }

        this.#synth.triggerAttackRelease("C4", "8n");
    }
}