function $svg(tagName) {
    return $(document.createElementNS("http://www.w3.org/2000/svg", tagName));
}

class SvgGaugeCircle {
    constructor(size, value, maxValue, fontSize, strokeWidth) {
        this.width = size;
        this.height = size;
        this.radius = Math.floor((size - 1) / 2);
        this.value = value;
        this.maxValue = maxValue;
        this.fontSize = fontSize;
        this.strokeWidth = strokeWidth;
        this.duration = 2000;
        this.frameCount = 24 * 5;
    }

    upcount(min, max, time, frames, callback) {
        var p = Array.apply(null, {
            length: frames + 1
        }).map((v, i) => Math.ceil(min + i * (max - min) / frames));
        var f = time / (frames * 1.1);
        var l = (n) => {
            callback(p[n]);
            if (n < frames) {
                n++;
                setTimeout(() => l(n), f);
            }
        };
        l(min);
    }

    draw(id) {
        let svg = $svg("svg");
        svg.attr({
            "xmlns": "http://www.w3.org/2000/svg",
            "viewBox": `0 0 ${this.width} ${this.height}`,
            "width": this.width,
            "height": this.height
        });
        let root = $("#" + id);
        root.append(svg);
        let fillColor = root.css("fill");
        let textColor = root.css("color");

        let cx = this.width / 2;
        let cy = this.height / 2;

        let g = $svg("g");
        let gt = $svg("g");
        let circle_stroke = $svg("circle");
        let circle_out = $svg("circle");
        let circle_in = $svg("circle");

        let radius_stroke = this.radius - this.strokeWidth / 2 - 1;
        let radius_in = this.radius - this.strokeWidth - 1.5;
        let radius_out = this.radius;
        svg.append(g);

        circle_in.attr({
            "r": radius_in,
            "cx": cx,
            "cy": cy,
            "fill": fillColor,
            "stroke": "none"
        });

        circle_stroke.attr({
            "r": radius_stroke,
            "cx": cx,
            "cy": cy,
            "fill": "none"
        });

        circle_stroke.css({
            "stroke-width": this.strokeWidth,
        });

        circle_out.attr({
            "r": radius_out,
            "cx": cx,
            "cy": cy,
            "fill": "none",
            "stroke": fillColor,
            "stroke-width": 1
        });

        g.append(circle_in);
        g.append(circle_stroke);
        g.append(circle_out);
        g.attr({
            "transform": `rotate(90 ${cx} ${cy}) translate(0,0) scale(1,1)`
        });
        gt.attr({
            "transform": `translate(0, ${this.fontSize / 2.9166})`
        })
        let circumference = 2 * Math.PI * radius_stroke;
        let quarter = Math.round(this.value / this.maxValue * circumference);
        let text = $svg("text");
        text.attr({
            "x": cx,
            "y": cy,
            "font-size": this.fontSize,
            "text-anchor": "middle"
        });
        text.attr({
            "stroke": textColor,
            "fill": textColor
        });

        return new Promise(
            function(resolve, reject) {
                gt.append(text);
                svg.append(gt);
                this.upcount(0, this.value, this.duration, this.frameCount, (i) => text.html(i));
                circle_stroke.css("stroke-dasharray", circumference);
                circle_stroke.css("stroke-dashoffset", circumference);
                $.Velocity(circle_stroke, {
                    "stroke-dashoffset": circumference - quarter
                }, this.duration).then(resolve);
            }.bind(this)
        );
    }
}

module.exports = SvgGaugeCircle
