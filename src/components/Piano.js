import "../css/Piano.css";
import Key from "./Key";


const NUM_WHITE_KEYS = 14;
const INVISIBLE_BLACK_KEY_INDEXES = [0, 4, 7, 11, 14];


export default function Piano()
{
    const whiteKeys = [];
    for (let i = 0; i < NUM_WHITE_KEYS; ++i)
        whiteKeys.push(<Key key={i} color={"white"} />);

    const blackKeys = [];
    for (let i = 0; i < NUM_WHITE_KEYS; ++i)
        if (INVISIBLE_BLACK_KEY_INDEXES.includes(i))
            blackKeys.push(<Key key={i} color={"black"} invisible={true} />);
        else
            blackKeys.push(<Key key={i} color={"black"} />);

    return (
        <div className={"piano"}>
            <div className={"piano-section"} id={"white-keys"}>
                { whiteKeys }
            </div>
            <div className={"piano-section"} id={"black-keys"}>
                {/*{ blackKeys }*/}
            </div>
        </div>
    );
}