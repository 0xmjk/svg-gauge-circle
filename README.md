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

See `index.html` file for an example.

### API

* `sgc = new SvgGaugeCircle(size, value, maxValue, fontSize, strokeWidth)`:
  * `size`: length of a side of a square bounding box in which the element is drawn
  * `value`: a value to be shown on the gauge
  * `maxValue`: maximum value that can be shown on the gauge ie. number at which the gauge's external circle would be 100% filled
  * `fontSize`: font size of the digits shown in px
  * `strokeWidth`: width of the external circle
* `sgc.draw(container)` - draw the gauge inside of the `container` element; this will return a `Promise` that is resolved when drawing of the gauge has been finished

### Styling

The gauge will be styled using the enclosing container's properties. Mainly with:
  * `fill`: for internal circle fill color
  * `stroke`: for external circle fill color
  * `color`: for text color
```css
#container1 {
    fill: lightgreen;
    stroke: lightblue;
    color: white;
    font-family: Arial;
}
```

## Todo

  * update the gauge after drawing it first time

## License

See `LICENSE`.
