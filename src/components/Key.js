import "../css/Key.css";


export default function Key({ color, invisible })
{
    const keyClasses = [`piano-key`, `${color}-key`];
    if (invisible)
        keyClasses.push("invisible");

    return (
        <div className={keyClasses.join(" ")}>

        </div>
    );
}