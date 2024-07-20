import '../../css/App.css';
import Piano from "./Piano";
import Controls from "./Controls";
import { useState } from "react";


export default function App()
{
    const [scale, setScale] = useState("D#m");

    return (
        <main>
            <Piano scaleName={scale} />
            <Controls initialScale={scale} setScale={setScale} />
        </main>
    );
}
