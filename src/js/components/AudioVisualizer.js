import "../../css/AudioVisualizer.css";
import AudioPlayer from "../AudioPlayer";
import { VISUALIZER_CANVAS_HEIGHT, VISUALIZER_CANVAS_WIDTH } from "../constants";


export default function AudioVisualizer()
{
    async function drawAudioVisualizer()
    {
        const canvas = document.querySelector("#visualizer-canvas");
        const data = AudioPlayer.getAnalyzerData();

        if (!canvas || !data)
            return window.requestAnimationFrame(drawAudioVisualizer);

        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, VISUALIZER_CANVAS_WIDTH, VISUALIZER_CANVAS_HEIGHT);

        const numBars = data.length;
        const barHeight = VISUALIZER_CANVAS_HEIGHT / numBars;

        for (let i = 0; i < numBars; ++i)
        {
            ctx.fillRect(0, barHeight * i, Math.abs(data[i]) * 10000, barHeight);
        }

        window.requestAnimationFrame(drawAudioVisualizer);
    }


    window.requestAnimationFrame(drawAudioVisualizer);


    return (
        <canvas id={"visualizer-canvas"} width={VISUALIZER_CANVAS_WIDTH} height={VISUALIZER_CANVAS_HEIGHT} />
    );
}