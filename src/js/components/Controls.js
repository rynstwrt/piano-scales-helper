import "../../css/Controls.css";
import AudioPlayer from "../AudioPlayer";
// import NewAudioPlayer from "../NewAudioPlayer";
import { NOTES_WITH_NO_SHARPS } from "../constants";
// import Util from "../Util";


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
        majorMinorSelect.value = Math.random() < 0.5 ? "major" : "minor";

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
        const octave = document.querySelector("#preview-octave-select").value;
        // new NewAudioPlayer().playScale(Util.getScaleFromName(getScaleFromElements()), Number(octave));
        AudioPlayer.playScale(getScaleFromElements(), octave);
    }


    const initialNote = initialScale.split("")[0];
    const initialScaleIsSharp = initialScale.includes("#");
    const initialScaleIsMinor = initialScale.endsWith("m");


    return (
        <div id={"controls"}>
            <div id={"scale-control-row"} className={"control-row"}>
                <label className={"control-label"}>Scale:</label>
                <select id={"note-select"} onChange={onKeyOptionChanged} defaultValue={initialNote}>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                    <option>E</option>
                    <option>F</option>
                    <option>G</option>
                </select>
                <select id={"accidental-select"} onChange={onKeyOptionChanged} defaultValue={initialScaleIsSharp ? "#" : ""}>
                    <option value={""}>♮</option>
                    <option value={"#"}>#</option>
                    {/*<option value={"b"}>b</option>*/}
                </select>
                <select id={"major-minor-select"} onChange={onKeyOptionChanged} defaultValue={initialScaleIsMinor ? "minor" : "major"}>
                    <option value={"major"}>Major</option>
                    <option value={"minor"}>Minor</option>
                </select>

                <button className={"action-button"} id={"random-button"} onClick={onRandomButtonClick}>Randomize</button>
            </div>


            <div id={"volume-control-row"} className={"control-row"}>
                <label className={"control-label"}>Volume:</label>
                <output id={"volume-range-output"}>75%</output>
                <input id={"volume-range"} type={"range"} min={0} max={100} defaultValue={75} step={1} onChange={onVolumeSliderChange} />
            </div>


            <div id={"preview-octave-control-row"} className={"control-row"}>
                <label className={"control-label"}>Preview Octave:</label>
                <select id={"preview-octave-select"} defaultValue={3}>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </div>


            <div id={"play-button-control-row"} className={"control-row"}>
                <button className={"action-button"} id={"play-button"} onClick={onPlayButtonClick}>Play Scale</button>
            </div>
        </div>
    );
}