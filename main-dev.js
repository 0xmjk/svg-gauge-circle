import SvgGaugeCircle from './src/svg_gauge_circle';
var $ = require('zepto');
$.Velocity = require('velocity-commonjs');

let sgc = new SvgGaugeCircle(80, 60, 80, 35, 10);
let sgc2 = new SvgGaugeCircle(80, 35, 80, 35, 10);
sgc.draw("container1").then(() => {
    sgc2.draw("container2");
});
