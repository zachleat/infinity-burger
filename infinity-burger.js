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

	function getDocWidth() {
		return Math.max( body.offsetWidth, docEl.clientWidth, docEl.offsetWidth );
	}

	function getRand( min, max ) {
		return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
	}

	function moveRandom( bar ) {
		var x = getRand( -1 * docWidth + 16, 16 );
		var y = getRand( -40, 40 );
		var rotate = getRand( -180, 180 );
		var scale = Math.random() * 2;
		var transform = 'translateX(' + x + 'px) translateY(' + y + 'px) rotate(' + rotate + 'deg)';
		bar.style.transform = transform;
	}

	var state = 0;
	var docHeight;
	var docWidth;
	var icon = doc.getElementById( 'infinity-burger' );
	icon.classList.add( 'enabled' );

	function addLayer() {
		if( !docHeight ) {
			docHeight = getDocHeight();
		}
		var node = doc.createElement( 'div' );
		node.className = 'beforeanimate';
		icon.appendChild( node );
		icon.offsetWidth;
		node.className = '';

		if( !!state ) {
			if( state === 2 ) {
				moveRandom( node );
			}
			if( icon.offsetHeight < docHeight - 20 ) {
				requestAnimationFrame( addLayer );
			} // else trigger complete
		}
	}

	icon.addEventListener( 'click', function() {
		// reset to default state (just 3 bars)
		if( state > 2 ) {
			state = 0;

			requestAnimationFrame(function() {
				icon.innerHTML = '<div></div><div></div><div></div>';
			});
		} else if( state === 2 ) {
			// reset to no transform (vertical infinity hamburger)
			state++;
			var bars = icon.childNodes;
			for( var j = 0, k = bars.length; j < k; j++ ) {
				bars[ j ].style.transform = 'none';
			}
		} else if( state === 1 ) {
			// add randomizer animation
			state++;
			var bars = icon.childNodes;

			if( !docWidth ) {
				docWidth = getDocWidth();
			}

			for( var j = 0, k = bars.length; j < k; j++ ) {
				(function() {
					var bar = bars[ j ];
					requestAnimationFrame(function() {
						moveRandom( bar );
					});
				})();
			}
		} else {
			// keep adding hamburger layers
			state = 1;
			icon.innerHTML = '';
			requestAnimationFrame( addLayer );
		}
	}, false );
})( typeof global !== "undefined" ? global : this );
