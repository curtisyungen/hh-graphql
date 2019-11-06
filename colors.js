function lightenColor(col, amt) {
    var usePound = false;
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
 
    var num = parseInt(col,16);
    var r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    var b = ((num >> 8) & 0x00FF) + amt;
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    var g = (num & 0x0000FF) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}

let baseHexes = ['#CB4335', '#D35400', '#F1C40F', '#196F3D', '#21618C', '#5B2C6F', '#212F3C', '#979A9A'];
let baseColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'darkgray', 'lightgray'];

let colors = [];
for (var b in baseHexes) {
    for (var i=0; i<70; i+=8) {
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

console.log(colors);

module.exports = colors;
