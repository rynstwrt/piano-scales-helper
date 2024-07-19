import "../css/Controls.css";


export default function Controls()
{
    function selectSharpFlatKey(event)
    {
        const button = event.target;

        const currentlySelectedButton = button.parentElement.querySelector("button.selected");
        if (currentlySelectedButton)
            currentlySelectedButton.classList.remove("selected")

        button.classList.add("selected");
    }


    return (
        <div id={"controls"}>
            <div className={"control-row"}>
                <label>Key:</label>
                <select id={"key-select"}>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                    <option>E</option>
                    <option>F</option>
                    <option>G</option>
                </select>
                <div id={"sharp-flat-buttons"}>
                    <button id={"sharp"} className={"key-control-button"} onClick={selectSharpFlatKey}>#</button>
                    <button id={"flat"} className={"key-control-button"} onClick={selectSharpFlatKey}>b</button>
                </div>
                <button id={"minor"} className={"key-control-button"}>Minor</button>
            </div>
            {/*<div className={"control-row"}>*/}
            {/*    <label>Key:</label>*/}
            {/*    <select id={"key-select"}>*/}
            {/*        <option>A</option>*/}
            {/*        <option>B</option>*/}
            {/*        <option>C</option>*/}
            {/*        <option>D</option>*/}
            {/*        <option>E</option>*/}
            {/*        <option>F</option>*/}
            {/*        <option>G</option>*/}
            {/*    </select>*/}
            {/*    <div id={"sharp-flat-buttons"}>*/}
            {/*        <button id={"sharp"} className={"sharp-flat-button"}>#</button>*/}
            {/*        <button id={"flat"} className={"sharp-flat-button"}>b</button>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className={"control-row"}>*/}
            {/*    <label>Key:</label>*/}
            {/*    <select id={"key-select"}>*/}
            {/*        <option>A</option>*/}
            {/*        <option>B</option>*/}
            {/*        <option>C</option>*/}
            {/*        <option>D</option>*/}
            {/*        <option>E</option>*/}
            {/*        <option>F</option>*/}
            {/*        <option>G</option>*/}
            {/*    </select>*/}
            {/*    <div id={"sharp-flat-buttons"}>*/}
            {/*        <button id={"sharp"} className={"sharp-flat-button"}>#</button>*/}
            {/*        <button id={"flat"} className={"sharp-flat-button"}>b</button>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}