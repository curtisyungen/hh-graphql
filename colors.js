function lightenColor(hexCode, percentage) {

    // Remove # symbol
    hexCode = hexCode.slice(1);

    // Convert to bit integer
    let num = parseInt(hexCode, 16);
    
    // Adjust red
    let r = (num >> 16) + percentage;
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    // Adjust blue
    let b = ((num >> 8) & 0x00FF) + percentage;
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    // Adjust green
    let g = (num & 0x0000FF) + percentage;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    // Return new hex code
    return "#" + (g | (b << 8) | (r << 16)).toString(16);
}

let baseHexes = ['#CB4335', '#D35400', '#F1C40F', '#196F3D', '#21618C', '#5B2C6F', '#654321', '#212F3C', '#979A9A'];
let baseColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'brown', 'gray', 'gray'];

let colors = [];
for (var b in baseHexes) {
    for (var i=1; i<74; i+=8) {
        let nextColor = lightenColor(baseHexes[b], i);
        if (colors.indexOf(nextColor) === -1) {
            colors.push({
            id: colors.length,
            hexCode: nextColor,
            class: baseColors[b],
            });
        }
    }
}

// console.log(colors);

module.exports = colors;
