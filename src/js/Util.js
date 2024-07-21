import { PIANO_NOTES, MAJOR_SCALE_FORMULA, MINOR_SCALE_FORMULA } from "./constants";


export default class Util
{
    static getScaleFromName(scaleName)
    {
        const isMinor = scaleName.endsWith("m");
        const rootNote = isMinor ? scaleName.slice(0, -1) : scaleName;

        const scaleFormula = isMinor ? MINOR_SCALE_FORMULA : MAJOR_SCALE_FORMULA;

        const scaleNotes = [];
        let index = PIANO_NOTES.indexOf(rootNote);
        for (let i = 0; i < 8; ++i)
        {
            scaleNotes.push(PIANO_NOTES[index % PIANO_NOTES.length]);
            index += (scaleFormula[i] === "W") ? 2 : 1;
        }

        return scaleNotes;
    }
}

