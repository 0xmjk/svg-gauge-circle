let sgc = new SvgGaugeCircle(80, 60, 40, 80, 35, 10);
let sgc2 = new SvgGaugeCircle(80, 35, 40, 80, 35, 10);
sgc.draw("container1").then(() => {
    sgc2.draw("container2");
});
