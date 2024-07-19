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


    function onSubmitButtonClick()
    {
        const keyNote = document.querySelector("#note-select").value;
        const accidental = document.querySelector("#accidental-select").value;
        const isMinor = document.querySelector("#minor-button").classList.contains("selected");

        const key = `${keyNote}${accidental}${isMinor ? "m" : ""}`;
        setScale(key);
    }


    function onVolumeSliderChange(event)
    {
        setVolume(event.target.value);
    }


    return (
        <div id={"controls"}>
            <div id={"scale-control-row"} className={"control-row"}>
                <div className={"control-row-left-section"}>
                    <label>Key:</label>
                    <select id={"note-select"}>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                        <option>D</option>
                        <option>E</option>
                        <option>F</option>
                        <option>G</option>
                    </select>
                    <select id={"accidental-select"}>
                        <option value={""}>♮</option>
                        <option value={"#"}>#</option>
                        <option value={"#"}>b</option>
                    </select>
                    <button id={"minor-button"} onClick={onMinorButtonClick}>Is Minor</button>
                </div>

                <button className={"action-button"} id={"submit-button"} onClick={onSubmitButtonClick}>Submit</button>
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