import "../../css/Key.css";
import AudioPlayer from "../AudioPlayer";


export default function Key({ color, note, highlighted, invisible, octave, scaleNumber })
{
    const keyClasses = ["piano-key", `${color}-key`];
    if (invisible) keyClasses.push("invisible");
    if (highlighted) keyClasses.push("highlighted");

    async function onKeyContentClicked(event)
    {
        if (invisible)
            return;

        const keyContent = event.target;
        const note = keyContent.textContent.replaceAll(/\d+/g, "");
        console.log(note);
        await AudioPlayer.playNote(note + octave);
        // new NewAudioPlayer().playNote(note, octave, 0);
    }

    return (
        <div className={keyClasses.join(" ")}>
            <div className={"key-content"} onClick={onKeyContentClicked}>
                <div className={"key-text-content"}>
                    <div className={"key-text-container scale-number-container"}>
                        <p>{scaleNumber}</p>
                    </div>

                    <div className={"key-text-container note-container"}>
                        <p>{note}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}