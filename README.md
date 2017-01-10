# svg-gauge-circle

A simple SVG-based animated circular gauge.

## Build

Running `npm run build` will build `./build/svg-gauge-circle.min.js`.

## Development

Running `npm run dev` will start up a dev server, go to `http://localhost:3333/index-dev.html` to see an example.

## Usage

### Dependencies

  * [velocity.js](http://velocityjs.org/)
  * [Zepto.js](http://zeptojs.com/) or [jQuery](https://jquery.com/)

### Example of usage

See [demo](https://0xmjk.github.io/svg-gauge-circle) for an example.

### API

* `sgc = new SvgGaugeCircle(size, value, cutoffValue, maxValue, fontSize, strokeWidth)`:
  * `size`: length of a side of a square bounding box in which the element is drawn
  * `value`: a value to be shown on the gauge
  * `cutoffValue`: threshold/cutoff value shown on the gauge
  * `maxValue`: maximum value that can be shown on the gauge ie. number at which the gauge's external circle would be 100% filled
  * `fontSize`: font size of the digits shown in px
  * `strokeWidth`: width of the external circle
* `sgc.draw(container)` - draw the gauge inside of the `container` element; this will return a `Promise` that is resolved when drawing of the gauge has been finished

### Styling

The gauge will be styled using the following classes:
  * `sgc-inner-circle`: for internal circle properties (use ```stroke``` for circle's edge)
  * `sgc-outer-circle`: for external circle properties (don't use ```fill``` here)
  * `sgc-stroke`: for the animated stroke properties before it reaches the cutoffValue
  * `sgc-stroke-cutoff`: for the animated stroke properties after it reached the cutoffValue
  * `sgc-text`: for text properties

```css
#container1 .sgc-text {
    color: #171d69;
    font-family: Arial;
}

#container1 .sgc-inner-circle {
    stroke: #ca4545;
    fill: #ff9595;
}

#container1 .sgc-outer-circle {
    stroke: #980e0e;
    stroke-width: 2;
}

#container1 .sgc-stroke {
    stroke: #78cd78;
}

#container1 .sgc-stroke-cutoff {
    stroke: #ffe395;
}
```

## Todo

  * update the gauge after drawing it first time

## License

See `LICENSE`.
