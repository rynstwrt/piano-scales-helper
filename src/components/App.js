import '../css/App.css';
import Piano from "./Piano";
import {useState} from "react";
import Controls from "./Controls";


export default function App()
{
    return (
        <main>
            <Piano />
            <Controls />
        </main>
    );
}
