import "../css/Key.css";


export default function Key({ color, note, highlighted, invisible })
{
    const keyClasses = ["piano-key", `${color}-key`];
    if (invisible)
        keyClasses.push("invisible");

    return (
        <div className={keyClasses.join(" ")}>
            <div className={"key-content"}>
                <p>{ note }</p>
            </div>
        </div>
    );
}