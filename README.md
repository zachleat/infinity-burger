# infinity-burger

A new kind of hamburger menu

No library dependencies. Cuts the mustard on `requestAnimationFrame` and `classList`. Demo on [zachleat.com](http://www.zachleat.com/web/).

Clicks:

1. Starts the infinity burger animation. Continues to the bottom of the document.
1. Randomizes the position of the burger layers.
1. Resets the randomizer position to the default state (a vertical column).
1. Resets to the initial state, a three layer hamburger menu.

## Markup:

```
<div class="infinity-burger" id="infinity-burger" aria-hidden="true">
	<div></div>
	<div></div>
	<div></div>
</div>
```