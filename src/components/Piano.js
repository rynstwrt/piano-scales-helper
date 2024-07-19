import "../css/Piano.css";
import Key from "./Key";


const NUM_WHITE_KEYS = 14;
const INVISIBLE_BLACK_KEY_INDEXES = [0, 4, 7, 11, 14];
const WHITE_KEY_NOTES = ["F", "G", "A", "B", "C", "D", "E"];
const BLACK_KEY_NOTES = ["F#", "G#", "A#", "C#", "D#"];


export default function Piano()
{
    const whiteKeys = [];
    for (let i = 0; i < NUM_WHITE_KEYS; ++i)
        whiteKeys.push(<Key key={i} color={"white"} note={WHITE_KEY_NOTES[i % WHITE_KEY_NOTES.length]} />);

    const blackKeys = [];
    let blackKeyNoteCounter = 0;
    for (let i = 0; i < NUM_WHITE_KEYS; ++i)
    {
        if (INVISIBLE_BLACK_KEY_INDEXES.includes(i))
        {
            blackKeys.push(<Key key={i} color={"black"} invisible={true} />);
        }
        else
        {
            blackKeys.push(<Key key={i} color={"black"} note={BLACK_KEY_NOTES[blackKeyNoteCounter % BLACK_KEY_NOTES.length]} />);
            ++blackKeyNoteCounter;
        }
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