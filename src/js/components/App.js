import '../../css/App.css';
import Piano from "./Piano";
import Controls from "./Controls";
import { useState } from "react";
import { RANDOMLY_SELECT_INIT_SCALE, DEFAULT_INIT_SCALE, PIANO_NOTES } from "../constants";
import NewAudioPlayer from "../NewAudioPlayer";
import Util from "../Util";


export default function App()
{

    // const test = new NewAudioPlayer();
    // const a = Util.getScaleFromName("C");
    // test.playScale(a, 4);


    let initScale = DEFAULT_INIT_SCALE;
    if (RANDOMLY_SELECT_INIT_SCALE)
    {
        const rootNote = PIANO_NOTES[Math.floor(Math.random() * PIANO_NOTES.length)];
        const minorSuffix = Math.random() < 0.5 ? "" : "m";
        initScale = rootNote + minorSuffix;
    }

    const [scale, setScale] = useState(initScale);

    return (
        <main>
            <Piano scaleName={scale} />
            <Controls initialScale={scale} setScale={setScale} />
        </main>
    );
}
