import "../css/Key.css";


export default function Key({ color, note, highlighted, invisible })
{
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