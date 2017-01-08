function $svg(tagName) {
    return $(document.createElementNS("http://www.w3.org/2000/svg", tagName));
}

class SvgGaugeCircle {
    constructor(size, value, cutoffValue, maxValue, fontSize, strokeWidth) {
        this.width = size;
        this.height = size;
        this.radius = Math.floor((size - 1) / 2);
        this.value = value;
        this.cutoffValue = cutoffValue;
        this.maxValue = maxValue;
        this.fontSize = fontSize;
        this.strokeWidth = strokeWidth;
        this.cutoffLineWidth = 2;
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
        let circle_stroke_cutoff = $svg("circle");
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

        circle_stroke_cutoff.attr({
            "r": radius_stroke,
            "cx": cx,
            "cy": cy,
            "fill": "none",
            "class": "stroke-cutoff"
        });

        circle_stroke_cutoff.css({
            "stroke-width": this.strokeWidth
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
        g.append(circle_stroke_cutoff);
        g.append(circle_out);
        g.attr({
            "transform": `rotate(90 ${cx} ${cy}) translate(0,0) scale(1,1)`
        });
        gt.attr({
            "transform": `translate(0, ${this.fontSize / 2.9166})`
        })
        let circumference = 2 * Math.PI * radius_stroke;
        let quarter = 0;
        let quarter_cutoff = 0;
        let quarter_duration = 0;
        let quarter_cutoff_duration = 0;
        if (this.value <= this.cutoffValue) {
            quarter = Math.round(this.value / this.maxValue * circumference);
            quarter_duration = this.duration;
        } else {
            quarter = Math.round(this.cutoffValue / this.maxValue * circumference);
            quarter_cutoff = Math.round((this.value - this.cutoffValue) / this.maxValue * circumference);
            quarter_duration = Math.round(this.cutoffValue / this.value * this.duration);
            quarter_cutoff_duration = Math.round((this.value - this.cutoffValue) / this.value * this.duration);
        }
        let quarter_cutoff_deg = Math.round(this.cutoffValue / this.maxValue * 360);
        let text = $svg("text");
        circle_stroke_cutoff.attr({
            "transform": `rotate(${quarter_cutoff_deg} ${cx} ${cy})`
        })
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
                circle_stroke_cutoff.css("stroke-dasharray", circumference);
                circle_stroke_cutoff.css("stroke-dashoffset", circumference + this.cutoffLineWidth);
                $.Velocity(circle_stroke, {
                    "stroke-dashoffset": circumference - quarter
                }, quarter_duration).then(() => {
                  if (this.value > this.cutoffValue) {
                    /* css() returns rgb(int, int, int) and Velocity requires a hexadecimal representation.
                       thereof, it has to be converted... */
                    var rgb = circle_stroke_cutoff.css('stroke').match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                    function hex(x) {
                        return ("0" + parseInt(x).toString(16)).slice(-2);
                    }
                    var stroke_color = "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
                    $.Velocity(circle_stroke, {stroke: stroke_color}, quarter_cutoff_duration);
                    $.Velocity(circle_stroke_cutoff, {
                        "stroke-dashoffset": circumference + this.cutoffLineWidth - quarter_cutoff
                    }, quarter_cutoff_duration).then(resolve)
                  } else {
                    resolve();
                  }
              });
            }.bind(this)
        );
    }
}

module.exports = SvgGaugeCircle
