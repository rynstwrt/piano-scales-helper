import "../../css/Key.css";
import AudioPlayer from "../AudioPlayer";


export default function Key({ color, note, highlighted, invisible, octave })
{
    const keyClasses = ["piano-key", `${color}-key`];
    if (invisible) keyClasses.push("invisible");
    if (highlighted) keyClasses.push("highlighted");

    async function onKeyContentClicked(event)
    {
        if (invisible)
            return;

        const keyContent = event.target;
        const note = keyContent.textContent;
        await AudioPlayer.playNote(note + octave);
    }

    return (
        <div className={keyClasses.join(" ")}>
            <div className={"key-content"} onClick={onKeyContentClicked}>
                <div className={"note-container"}>
                    <p>{ note }</p>
                </div>
            </div>
        </div>
    );
}