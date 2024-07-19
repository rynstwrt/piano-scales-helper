import "../css/Controls.css";


export default function Controls()
{
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

    return (
        <div id={"controls"}>
            <div className={"control-row"}>
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
                    <button className={"action-button"} id={"minor-button"} onClick={onMinorButtonClick}>Minor</button>
                </div>
            </div>

            <div className={"control-row"}>
                <div className={"control-row-left-section"}>
                    <label>Audio:</label>
                    <input id={"volume-range"} type={"range"} min={0} max={100} value={50} />
                </div>
                <button className={"action-button"} id={"play-button"}>Play</button>
            </div>
        </div>
    );
}