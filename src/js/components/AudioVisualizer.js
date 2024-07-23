import AudioPlayer from "../AudioPlayer";
import { VISUALIZER_CANVAS_HEIGHT, VISUALIZER_CANVAS_WIDTH, VISUALIZER_COLOR } from "../constants";


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

        ctx.fillStyle = VISUALIZER_COLOR;

        const numBars = data.length;
        const barWidth = VISUALIZER_CANVAS_WIDTH / numBars;

        for (let i = 0; i < numBars; ++i)
        {
            const currentBarHeight = data[i] * 100;
            ctx.fillRect(i * barWidth, VISUALIZER_CANVAS_HEIGHT / 2 - currentBarHeight / 2, barWidth, currentBarHeight);
        }

        window.requestAnimationFrame(drawAudioVisualizer);
    }

    window.requestAnimationFrame(drawAudioVisualizer);


    return (
        <canvas id={"visualizer-canvas"} width={VISUALIZER_CANVAS_WIDTH} height={VISUALIZER_CANVAS_HEIGHT} />
    );
}