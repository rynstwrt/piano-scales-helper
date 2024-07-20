import "../../css/Piano.css";
import Key from "./Key";
import { SCALES } from "../scales";


const NUM_WHITE_KEYS = 14;
const NUM_BLACK_KEYS = 10;
const START_NOTE_OFFSET = 8;
const KEY_START_OCTAVE = 3;


export default function Piano({ scaleName })
{
    let whiteKeys = [];
    let blackKeys = [];

    const pianoNotes = Object.keys(SCALES).filter(scaleName => !scaleName.endsWith("m"));
    const scaleNotes = SCALES[scaleName];

    let foundFirstScaleKey = false;
    let foundLastScaleKey = false;

    let noteOctave = KEY_START_OCTAVE;

    for (let i = START_NOTE_OFFSET; i < NUM_WHITE_KEYS + NUM_BLACK_KEYS + START_NOTE_OFFSET; ++i)
    {
        const note = pianoNotes[i % pianoNotes.length];

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
            if (["C#", "F#"].includes(note))
            {
                blackKeys.push(<Key
                    key={i}
                    color={"black"}
                    // note={note + noteOctave}
                    highlighted={false}
                    // octave={noteOctave}
                    invisible={true}
                />);
            }

            blackKeys.push(<Key
                key={i}
                color={"black"}
                note={note}
                highlighted={shouldBeHighlighted}
                octave={noteOctave}
                invisible={false}
            />);
        }

        if (foundFirstScaleKey && !foundFirstScaleKeyThisIteration && scaleNotes[scaleNotes.length - 1] === note)
            foundLastScaleKey = true;
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