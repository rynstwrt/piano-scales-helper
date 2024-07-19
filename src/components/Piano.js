import "../css/Piano.css";
import Key from "./Key";
import { SCALES } from "../scales";
import {useState} from "react";


const NUM_WHITE_KEYS = 14;
const INVISIBLE_BLACK_KEY_INDEXES = [0, 4, 7, 11, 14];
const WHITE_KEY_NOTES = ["F", "G", "A", "B", "C", "D", "E"];
const BLACK_KEY_NOTES = ["F#", "G#", "A#", "C#", "D#"];


export default function Piano({ scale })
{
    let firstScaleNoteLocation = null;
    
    
    const whiteKeys = [];
    function doWhiteKeys()
    {
        let whiteKeyNotesInScale = [];
        if (scale)
            whiteKeyNotesInScale = SCALES[scale].filter(note => !note.includes("#"));

        const highlightedWhiteKeys = [];
        let firstWhiteKeyFound = false;
        for (let i = 0; i < NUM_WHITE_KEYS; ++i)
        {
            const note = WHITE_KEY_NOTES[i % WHITE_KEY_NOTES.length];

            if (scale && !firstScaleNoteLocation && SCALES[scale][0] === note)
                firstScaleNoteLocation = i;

            if (scale && whiteKeyNotesInScale[0] === note)
                firstWhiteKeyFound = true;

            const shouldBeHighlighted = scale
                && SCALES[scale].includes(note)
                && (!firstScaleNoteLocation || i >= firstScaleNoteLocation)
                && !highlightedWhiteKeys.includes(note)
                && firstWhiteKeyFound
                && SCALES[scale].includes(note);

            if (shouldBeHighlighted)
                highlightedWhiteKeys.push(note);

            whiteKeys.push(<Key
                key={i}
                color={"white"}
                note={note}
                highlighted={shouldBeHighlighted}
            />);
        }
    }


    const blackKeys = [];
    function doBlackKeys()
    {
        let blackKeyNotesInScale = [];
        if (scale)
            blackKeyNotesInScale = SCALES[scale].filter(note => note.includes("#"));

        const highlightedBlackKeys = [];
        let firstBlackKeyFound = false;
        let blackKeyNoteCounter = 0;
        for (let i = 0; i < NUM_WHITE_KEYS; ++i)
        {
            const isInvisibleKey = INVISIBLE_BLACK_KEY_INDEXES.includes(i);
            const note = isInvisibleKey ? null : BLACK_KEY_NOTES[blackKeyNoteCounter % BLACK_KEY_NOTES.length]

            if (scale && !firstScaleNoteLocation && SCALES[scale][0] === note)
                firstScaleNoteLocation = blackKeyNoteCounter;

            if (scale && blackKeyNotesInScale[0] === note)
                firstBlackKeyFound = true;

            const shouldBeHighlighted = scale
                && !isInvisibleKey
                && (!firstScaleNoteLocation || blackKeyNoteCounter >= firstScaleNoteLocation)
                && !highlightedBlackKeys.includes(note)
                && firstBlackKeyFound
                && SCALES[scale].includes(note);

            if (shouldBeHighlighted)
                highlightedBlackKeys.push(note);

            blackKeys.push(<Key
                key={i}
                color={"black"}
                note={note}
                invisible={isInvisibleKey}
                highlighted={shouldBeHighlighted}
            />);

            if (!isInvisibleKey)
                ++blackKeyNoteCounter;
        }
    }


    if (scale && SCALES[scale][0].includes("#"))
    {
        doBlackKeys();
        doWhiteKeys();
    }
    else
    {
        doWhiteKeys();
        doBlackKeys();
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