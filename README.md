# infinity-burger

A new kind of hamburger menu.

No library dependencies. Cuts the mustard on [`CSSStyleSheet#replaceSync`](https://caniuse.com/mdn-api_cssstylesheet_replacesync). Demo on [zachleat.com](http://www.zachleat.com/web/) and [GitHub Pages](http://zachleat.github.io/infinity-burger/demo.html).

1. Click once to start the animation. Uses a meandering horizontal position.
1. Click again to resets to the initial state, a three layer hamburger menu.

## Markup:

```
<script type="module" src="infinity-burger.js"></script>
<infinity-burger></infinity-burger>
```

## Release Notes

* `v1.0` and `v2.0`: Click states: (a) single vertical column (b) random position and rotation (c) resets back to vertical column (d) reset to three bars
* `v3.0`: Simplifies the thing to two states (on and off), the menu just meanders a bit on the horizontal axis.
* `v4.0`: Uses a custom element with Shadow DOM, simplifies markup and removes external stylesheet.