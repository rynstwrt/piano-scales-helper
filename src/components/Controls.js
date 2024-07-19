import "../css/Controls.css";
import {useState} from "react";


export default function Controls({ setScale })
{
    const [volume, setVolume] = useState(50);


    function onMinorButtonClick(event)
    {
        const button = event.target;
        if (button.classList.contains("selected"))
        {
            button.classList.remove("selected");
        }
        else
        {
            button.classList.add("selected");
        }
    }


    function onVolumeSliderChange(event)
    {
        setScale("A#")
        setVolume(event.target.value);
    }


    return (
        <div id={"controls"}>
            <div id={"scale-control-row"} className={"control-row"}>
                <div className={"control-row-left-section"}>
                    <label>Key:</label>
                    <select id={"note-select"}>
                        <option value={"A"}>A</option>
                        <option value={"B"}>B</option>
                        <option>C</option>
                        <option>D</option>
                        <option>E</option>
                        <option>F</option>
                        <option>G</option>
                    </select>
                    <select id={"accidental-select"}>
                        <option>♮</option>
                        <option>#</option>
                        <option>b</option>
                    </select>
                    <button id={"minor-button"} onClick={onMinorButtonClick}>Minor</button>
                </div>

                <button className={"action-button"} id={"submit-button"}>Submit</button>
            </div>


            <div id={"audio-control-row"} className={"control-row"}>
                <div className={"control-row-left-section"}>
                    <label>Audio:</label>
                    <input id={"volume-range"} type={"range"} min={0} max={100} defaultValue={50} step={1} onChange={onVolumeSliderChange} />
                    <output id={"volume-range-output"}>{volume}</output>
                </div>

                <button className={"action-button"} id={"play-button"}>Play</button>
            </div>
        </div>
    );
}