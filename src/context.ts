import kaplay from "kaplay";

const k = kaplay({
    width: 1300,
    height: 600,
    // add background if needed or requested
    background: [0, 0, 0, 0],
    global: false,
    debug: true,
    touchToMouse: true,
    pixelDensity: window.devicePixelRatio,
    letterbox: true ,
    font: "PressStart2P", // change to PressStart2P
    root: document.getElementById("app") || undefined,
});

export default k;