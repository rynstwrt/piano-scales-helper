import "../../css/Controls.css";
import AudioPlayer from "../AudioPlayer";


const NOTES_WITH_NO_SHARPS = ["B", "E"];


export default function Controls({ initialScale, setScale })
{
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

        onKeyOptionChanged();
    }


    function getScaleFromElements()
    {
        const keyNote = document.querySelector("#note-select").value;
        const accidental = document.querySelector("#accidental-select").value;
        const isMinor = document.querySelector("#major-minor-select").value === "minor";
        return `${keyNote}${accidental}${isMinor ? "m" : ""}`;
    }


    function onKeyOptionChanged()
    {
        validateAccidental();
        setScale(getScaleFromElements());
    }


    function onVolumeSliderChange(event)
    {
        const newVolume = event.target.value;
        document.querySelector("#volume-range-output").value = `${newVolume}%`;
        AudioPlayer.setVolume(newVolume);
    }


    function onPlayButtonClick()
    {
        AudioPlayer.playScale(getScaleFromElements());
    }


    const initialNote = initialScale.split("")[0];
    const initialScaleIsSharp = initialScale.includes("#");
    const initialScaleIsMinor = initialScale.endsWith("m");


    return (
        <div id={"controls"}>
            <div id={"scale-control-row"} className={"control-row"}>
                <label>Scale:</label>
                <select id={"note-select"} onChange={onKeyOptionChanged} value={initialNote}>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                    <option>E</option>
                    <option>F</option>
                    <option>G</option>
                </select>
                <select id={"accidental-select"} onChange={onKeyOptionChanged} value={initialScaleIsSharp ? "#" : ""}>
                    <option value={""}>♮</option>
                    <option value={"#"}>#</option>
                    {/*<option value={"b"}>b</option>*/}
                </select>
                <select id={"major-minor-select"} onChange={onKeyOptionChanged} value={initialScaleIsMinor ? "minor" : "major"}>
                    <option value={"major"}>Major</option>
                    <option value={"minor"}>Minor</option>
                </select>

                <button className={"action-button"} id={"random-button"} onClick={onRandomButtonClick}>Randomize</button>
            </div>


            <div id={"volume-control-row"} className={"control-row"}>
                <label>Volume:</label>
                <output id={"volume-range-output"}>50%</output>
                <input id={"volume-range"} type={"range"} min={0} max={100} defaultValue={50} step={1} onChange={onVolumeSliderChange} />
            </div>


            <div id={"audio-control-row"} className={"control-row"}>
                <button className={"action-button"} id={"play-button"} onClick={onPlayButtonClick}>Play Scale</button>
            </div>
        </div>
    );
}