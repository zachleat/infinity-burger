;(function( w ) {
	var doc = w.document;
	var docEl = doc.documentElement;
	var body = doc.body;

	if( !( 'requestAnimationFrame' in window ) || !( 'classList' in docEl ) ) {
		return;
	}

	function getDocHeight() {
		return Math.max( body.scrollHeight, body.offsetHeight, docEl.clientHeight, docEl.scrollHeight, docEl.offsetHeight );
	}

	function getRand( min, max ) {
		return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
	}

	var previousX = 0;
	function moveRandomHorizontal( bar ) {
		var x = previousX += getRand(-10, 2 );
		var transform = 'translateX(' + Math.min(x, 0) + 'px)';
		bar.style.transform = transform;
	}

	var state = 0;
	var docHeight;
	var icon = doc.getElementById( 'infinity-burger' );
	if( icon ) {
		icon.classList.add( 'enabled' );

		function addLayer() {
			if( !docHeight ) {
				docHeight = getDocHeight();
			}
			var node = doc.createElement( 'div' );
			moveRandomHorizontal(node);
			node.className = 'beforeanimate';
			icon.appendChild( node );
			icon.offsetWidth;
			node.className = '';

			if( !!state ) {
				if( icon.offsetHeight < docHeight - 20 ) {
					requestAnimationFrame( addLayer );
				} // else trigger complete
			}
		}

		icon.addEventListener( 'click', function() {
			previousX = 0;

			// reset to default state (just 3 bars)
			if( state >= 1 ) {
				state = 0;

				requestAnimationFrame(function() {
					icon.innerHTML = '<div></div><div></div><div></div>';
				});
			} else {
				// keep adding hamburger layers
				state = 1;
				icon.innerHTML = '';
				requestAnimationFrame( addLayer );
			}
		}, false );
	}
})( typeof global !== "undefined" ? global : this );
