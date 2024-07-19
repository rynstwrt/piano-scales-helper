import "../css/Piano.css";
import Key from "./Key";
import { SCALES } from "../scales";


const NUM_WHITE_KEYS = 14;
const INVISIBLE_BLACK_KEY_INDEXES = [0, 4, 7, 11, 14];
const WHITE_KEY_NOTES = ["F", "G", "A", "B", "C", "D", "E"];
const BLACK_KEY_NOTES = ["F#", "G#", "A#", "C#", "D#"];


export default function Piano({ scale })
{
    const scaleNotes = [...SCALES[scale]];

    const whiteKeys = [];
    for (let i = 0; i < NUM_WHITE_KEYS; ++i)
    {
        const note = WHITE_KEY_NOTES[i % WHITE_KEY_NOTES.length];

        const shouldHighlight = scale && scaleNotes[0] === note;
        if (shouldHighlight)
            scaleNotes.shift();

        whiteKeys.push(<Key
            key={i}
            color={"white"}
            note={note}
            highlighted={shouldHighlight}
        />);
    }

    const blackKeys = [];
    let blackKeyNoteCounter = 0;
    for (let i = 0; i < NUM_WHITE_KEYS; ++i)
    {
        const isInvisibleKey = INVISIBLE_BLACK_KEY_INDEXES.includes(i);
        const note = isInvisibleKey ? null : BLACK_KEY_NOTES[blackKeyNoteCounter % BLACK_KEY_NOTES.length]

        const shouldHighlight = scale && !isInvisibleKey && scaleNotes[0] === note;
        if (shouldHighlight)
            scaleNotes.shift();

        blackKeys.push(<Key
            key={i}
            color={"black"}
            note={note}
            invisible={isInvisibleKey}
            highlighted={shouldHighlight}
            // highlighted={scale && !isInvisibleKey ? SCALES[scale].includes(note) : false}
        />);

        if (!isInvisibleKey)
            ++blackKeyNoteCounter;
    }

    return (
        <div className={"piano"}>
            <div className={"piano-layer"} id={"white-keys"}>
                { whiteKeys }
            </div>
            <div className={"piano-layer"} id={"black-keys"}>
                { blackKeys }
            </div>
        </div>
    );
}