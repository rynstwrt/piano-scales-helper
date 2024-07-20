import '../../css/App.css';
import Piano from "./Piano";
import Controls from "./Controls";
import { useState } from "react";


export default function App()
{
    const [scale, setScale] = useState("Dm");

    return (
        <main>
            <Piano scale={scale} />
            <Controls initialScale={scale} setScale={setScale} />
        </main>
    );
}
