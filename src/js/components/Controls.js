import "../../css/Controls.css";
import {useState} from "react";


const NOTES_WITH_NO_SHARPS = ["B", "E"];


export default function Controls({ setScale })
{
    const [volume, setVolume] = useState(50);


    function validateAccidental()
    {
        const note = document.querySelector("#note-select").value;
        const sharpOption = document.querySelector("option[value='#']");

        if (NOTES_WITH_NO_SHARPS.includes(note))
        {
            sharpOption.disabled = true;
            sharpOption.parentElement.value = "";
        }
        else if (sharpOption.disabled)
        {
            sharpOption.disabled = false;
        }
    }


    function onRandomButtonClick()
    {
        const noteSelect = document.querySelector("#note-select");
        const noteOptions = noteSelect.childNodes;
        noteSelect.value = noteOptions[Math.floor(Math.random() * noteOptions.length)].value;

        const accidentalSelect = document.querySelector("#accidental-select");
        const accidentalOptions = accidentalSelect.childNodes;
        accidentalSelect.value = accidentalOptions[Math.floor(Math.random() * accidentalOptions.length)].value;
        validateAccidental();

        const majorMinorSelect = document.querySelector("#major-minor-select");
        majorMinorSelect.value = Math.random() > 0.5 ? "major" : "minor";

        onSubmitButtonClick();
    }


    function onSubmitButtonClick()
    {
        const keyNote = document.querySelector("#note-select").value;
        const accidental = document.querySelector("#accidental-select").value;
        const isMinor = document.querySelector("#major-minor-select").value === "minor";

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
                    <select id={"note-select"} onChange={validateAccidental}>
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
                        {/*<option value={"b"}>b</option>*/}
                    </select>
                    <select id={"major-minor-select"}>
                        <option value={"major"}>Major</option>
                        <option value={"minor"}>Minor</option>
                    </select>
                </div>

                <button className={"action-button"} id={"random-button"} onClick={onRandomButtonClick}>Random</button>
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