import '../../css/App.css';
import Piano from "./Piano";
import Controls from "./Controls";
import { useState } from "react";
import { RANDOMLY_SELECT_INIT_SCALE, DEFAULT_INIT_SCALE, PIANO_NOTES } from "../constants";


export default function App()
{
    let initScale = DEFAULT_INIT_SCALE;
    if (RANDOMLY_SELECT_INIT_SCALE)
    {
        const rootNote = PIANO_NOTES[Math.floor(Math.random() * PIANO_NOTES.length)];
        const minorSuffix = Math.random() < 0.5 ? "" : "m";
        initScale = rootNote + minorSuffix;
    }

    const [scale, setScale] = useState(initScale);
    const [showScaleNumbers, setShowScaleNumbers] = useState(false);

    return (
        <main>
            <Piano scaleName={scale} showScaleNumbers={showScaleNumbers} />
            <Controls initialScale={scale} setScale={setScale} setShowScaleNumbers={setShowScaleNumbers} />
        </main>
    );
}
