import "../css/Key.css";
import {useState} from "react";


export default function Key({ color, note, invisible })
{
    const [highlighted, setHighlighted] = useState(false);

    const keyClasses = ["piano-key", `${color}-key`];
    if (invisible) keyClasses.push("invisible");
    if (highlighted) keyClasses.push("highlighted");

    return (
        <div className={keyClasses.join(" ")}>
            <div className={"key-content"}>
                <div className={"note-container"}>
                    <p>{ note }</p>
                </div>
            </div>
        </div>
    );
}