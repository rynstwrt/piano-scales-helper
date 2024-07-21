import "../../css/Piano.css";
import Key from "./Key";
import {
    PIANO_NOTES,
    NUM_WHITE_KEYS,
    NUM_BLACK_KEYS,
    START_NOTE_OFFSET,
    KEY_START_OCTAVE,
    BLACK_NOTES_AFTER_INVISIBLE_KEYS
} from "../constants";
import Util from "../Util";


export default function Piano({ scaleName })
{
    let whiteKeys = [];
    let blackKeys = [];

    const scaleNotes = Util.getScaleFromName(scaleName);

    let foundFirstScaleKey = false;
    let foundLastScaleKey = false;

    let noteOctave = KEY_START_OCTAVE;

    for (let i = START_NOTE_OFFSET; i < NUM_WHITE_KEYS + NUM_BLACK_KEYS + START_NOTE_OFFSET; ++i)
    {
        const note = PIANO_NOTES[i % PIANO_NOTES.length];

        if (note === "C")
            ++noteOctave;

        let foundFirstScaleKeyThisIteration = false;
        if (!foundFirstScaleKey && scaleNotes[0] === note)
        {
            foundFirstScaleKey = true;
            foundFirstScaleKeyThisIteration = true;
        }

        const shouldBeHighlighted = scaleNotes.includes(note)
            && foundFirstScaleKey
            && !foundLastScaleKey;

        const isWhiteKey = !note.endsWith("#");
        if (isWhiteKey)
        {
            whiteKeys.push(<Key
                key={i}
                color={"white"}
                note={note}
                highlighted={shouldBeHighlighted}
                octave={noteOctave}
            />);
        }
        else
        {
            if (BLACK_NOTES_AFTER_INVISIBLE_KEYS.includes(note))
            {
                blackKeys.push(<Key
                    key={"invisible" + i}
                    color={"black"}
                    invisible={true}
                />);
            }

            blackKeys.push(<Key
                key={i}
                color={"black"}
                note={note}
                highlighted={shouldBeHighlighted}
                octave={noteOctave}
            />);
        }

        if (foundFirstScaleKey && !foundFirstScaleKeyThisIteration && scaleNotes[scaleNotes.length - 1] === note)
            foundLastScaleKey = true;
    }


    return (
        <div id={"piano-container"}>
            <div id={"piano-top"}>
                <div className={"speaker"}></div>
                <div id={"screen"}></div>
                <div className={"speaker"}></div>
            </div>

            <div className={"piano"}>
                <div className={"piano-layer"} id={"white-keys"}>
                    { whiteKeys }
                </div>
                <div className={"piano-layer"} id={"black-keys"}>
                    { blackKeys }
                </div>
            </div>
        </div>
    );
}