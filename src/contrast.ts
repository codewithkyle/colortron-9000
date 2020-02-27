import * as converter from 'color-convert';

function luminanace(r, g, b) {
    var colorArray = [r, g, b];
    var colorFactor;
    var i;
    for (i = 0; i < colorArray.length; i++) {
        colorFactor = colorArray[i] / 255;
        if (colorFactor <= 0.03928) {
            colorFactor = colorFactor / 12.92;
        } else {
            colorFactor = Math.pow((colorFactor + 0.055) / 1.055, 2.4);
        }
        colorArray[i] = colorFactor;
    }
    return colorArray[0] * 0.2126 + colorArray[1] * 0.7152 + colorArray[2] * 0.0722 + 0.05;
}

function round(number, decimals) {
    // @ts-ignore
    return +(Math.round(number + 'e+' + decimals) + 'e-' + decimals);
}

/**
 * Calculates the contrast ratio between two RGB objects.
 * @see https://stackoverflow.com/a/9733420
 */
export function contrast(hex1: string, hex2: string): number {
    const color1 = converter.hex.rgb(hex1);
    const color2 = converter.hex.rgb(hex2);
    const foreGround = luminanace(color1[0], color1[1], color1[2]);
    const background = luminanace(color2[0], color2[1], color2[2]);
    let luminanceValue = foreGround / background > background / foreGround ? foreGround / background : background / foreGround;
    luminanceValue = round(luminanceValue, 2);
    return luminanceValue;
}
