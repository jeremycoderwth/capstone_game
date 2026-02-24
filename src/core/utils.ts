import k from "../context";

export function createButton(label: string, x: number, y: number, onClick: () => void) {
    const btn = k.add([
        k.sprite("confirmBtn"),
        k.pos(x, y),
        k.anchor("center"),
        k.area(),
        k.scale(0.65),
        "button"
    ]);

    const txt = k.add([
        k.text(label, { size: 18 }),
        k.pos(x, y),
        k.anchor("center"),
        k.color(255, 255, 255),
    ]);

    btn.onClick(() => {
        btn.scale = k.vec2(0.75);
        onClick();
    });

    btn.onHover(() => {
        btn.scale = k.vec2(0.75);
        txt.textSize = 20;
    });

    btn.onHoverEnd(() => {
        btn.scale = k.vec2(0.65);
        txt.textSize = 18;
    });

    return {
        btn,
        label: txt
    };
}