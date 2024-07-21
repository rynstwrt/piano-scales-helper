import { PIANO_NOTES, MAJOR_SCALE_FORMULA, MINOR_SCALE_FORMULA } from "./constants";


export default class Util
{
    static getScaleFromName(scaleName)
    {
        const isMinor = scaleName.endsWith("m");
        const rootNote = isMinor ? scaleName.slice(0, -1) : scaleName;

        const formula = isMinor ? MINOR_SCALE_FORMULA : MAJOR_SCALE_FORMULA;

        const scale = [];
        let index = PIANO_NOTES.indexOf(rootNote);
        for (let i = 0; i < 8; ++i)
        {
            scale.push(PIANO_NOTES[index % PIANO_NOTES.length]);

            const wholeHalf = formula[i];
            if (wholeHalf === "W")
                index += 2;
            else
                ++index;
        }

        return scale;
    }
}