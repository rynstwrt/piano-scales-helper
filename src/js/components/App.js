import '../../css/App.css';
import Piano from "./Piano";
import Controls from "./Controls";
import { useState } from "react";
import { RANDOMLY_SELECT_INIT_SCALE, DEFAULT_INIT_SCALE } from "../constants";


export default function App()
{
    const [scale, setScale] = useState("A");

    return (
        <main>
            <Piano scaleName={scale} />
            <Controls initialScale={scale} setScale={setScale} />
        </main>
    );
}
