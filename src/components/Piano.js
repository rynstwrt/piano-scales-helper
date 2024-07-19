import "../css/Piano.css";
import Key from "./Key";
import { SCALES } from "../scales";
import {useState} from "react";


const NUM_WHITE_KEYS = 14;
const INVISIBLE_BLACK_KEY_INDEXES = [0, 4, 7, 11, 14];
const WHITE_KEY_NOTES = ["F", "G", "A", "B", "C", "D", "E"];
const BLACK_KEY_NOTES = ["F#", "G#", "A#", "C#", "D#"];


export default function Piano()
{
    const [scale, setScale] = useState("A#");

    const scaleNotes = SCALES[scale];
    const usedScaleNotes = [];
    let foundFirstNote = false;

    const highlightedWhiteKeyIndexes = [];
    const highlightedBlackKeyIndexes = [];

    function findHighlightedWhiteKeys()
    {
        for (let i = 0; i < NUM_WHITE_KEYS; ++i)
        {
            const note = WHITE_KEY_NOTES[i % WHITE_KEY_NOTES.length];

            if (!foundFirstNote && scaleNotes[0] === note)
                foundFirstNote = i;

            const shouldHighlight = scale && foundFirstNote && foundFirstNote <= i && scaleNotes.includes(note) && !usedScaleNotes.includes(note);
            if (shouldHighlight)
            {
                highlightedWhiteKeyIndexes.push(i);
                usedScaleNotes.push(note);
            }
        }
    }

    function findHighlightedBlackKeys()
    {
        let blackKeyNoteCounter = 0;

        for (let i = 0; i < NUM_WHITE_KEYS; ++i)
        {
            const isInvisibleKey = INVISIBLE_BLACK_KEY_INDEXES.includes(i);
            if (isInvisibleKey)
            {
                continue;
            }

            const note = isInvisibleKey ? null : BLACK_KEY_NOTES[blackKeyNoteCounter % BLACK_KEY_NOTES.length]

/*

            const note = BLACK_KEY_NOTES[i % BLACK_KEY_NOTES.length];
*/

            if (!foundFirstNote && scaleNotes[0] === note)
                foundFirstNote = i;

            const shouldHighlight = scale && foundFirstNote && foundFirstNote <= i && scaleNotes.includes(note) && !usedScaleNotes.includes(note);
            if (shouldHighlight)
            {
                highlightedBlackKeyIndexes.push(i);
                usedScaleNotes.push(note);
            }

            ++blackKeyNoteCounter;
        }
    }

    if (scaleNotes[0].includes("#"))
    {
        findHighlightedBlackKeys();
        findHighlightedWhiteKeys();
    }
    else
    {
        findHighlightedWhiteKeys();
        findHighlightedBlackKeys();
    }

    const whiteKeys = [];
    for (let i = 0; i < NUM_WHITE_KEYS; ++i)
    {
        const note = WHITE_KEY_NOTES[i % WHITE_KEY_NOTES.length];

        // if (!foundFirstNote && scaleNotes[0] === note)
        //     foundFirstNote = true;
        //
        // const shouldHighlight = scale && foundFirstNote && scaleNotes.includes(note) && !usedScaleNotes.includes(note);
        // if (shouldHighlight)
        //     usedScaleNotes.push(note);

        whiteKeys.push(<Key
            key={i}
            color={"white"}
            note={note}
            highlighted={highlightedWhiteKeyIndexes.includes(i)}
        />);
    }

    const blackKeys = [];
    let blackKeyNoteCounter = 0;
    for (let i = 0; i < NUM_WHITE_KEYS; ++i)
    {
        const isInvisibleKey = INVISIBLE_BLACK_KEY_INDEXES.includes(i);
        const note = isInvisibleKey ? null : BLACK_KEY_NOTES[blackKeyNoteCounter % BLACK_KEY_NOTES.length]

        // if (!foundFirstNote && scaleNotes[0] === note)
        //     foundFirstNote = true;
        //
        // const shouldHighlight = scale && foundFirstNote && scaleNotes.includes(note) && !usedScaleNotes.includes(note);
        // if (shouldHighlight)
        //     usedScaleNotes.push(note);

        blackKeys.push(<Key
            key={i}
            color={"black"}
            note={note}
            invisible={isInvisibleKey}
            highlighted={highlightedBlackKeyIndexes.includes(i)}
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