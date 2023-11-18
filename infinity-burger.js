class InfinityBurger extends HTMLElement {
	static register(tagName) {
		if("customElements" in window) {
			customElements.define(tagName || "infinity-burger", InfinityBurger);
		}
	}

	static classes = {
		animate: "animating"
	};

	static css = `:host {
	position: absolute;
	top: 1em;
	right: 1em;
	width: 1.5em;
	cursor: pointer;
}
:host div {
	position: relative;
	opacity: 1;
	transition: transform .6s cubic-bezier(0.13, 0.49, 0.29, 0.87),
		opacity .6s cubic-bezier(0.13, 0.49, 0.29, 0.87);
}
:host div.${InfinityBurger.classes.animate} {
	opacity: 0;
}
:host div,
:host div:before,
:host div:after {
	display: block;
	border-top: 3px solid #666;
	padding-bottom: 3px;
	background-color: transparent;
}`;

	static getRandomNumber( min, max ) {
		return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
	}

	get node() {
		if(!this._node) {
			this._node = document.createElement("div");
		}
		return this._node;
	}

	get documentHeight() {
		if(!this._height) {
			let docEl = document.documentElement;
			let body = document.body;

			this._height = Math.max( body.scrollHeight, body.offsetHeight, docEl.clientHeight, docEl.scrollHeight, docEl.offsetHeight );
		}

		return this._height;
	}

	connectedCallback() {
		// https://caniuse.com/mdn-api_cssstylesheet_replacesync
		if(this.shadowRoot || !("replaceSync" in CSSStyleSheet.prototype)) {
			return;
		}

		this.setAttribute("aria-hidden", "true");

		let root = this.attachShadow({ mode: "closed" });
		let sheet = new CSSStyleSheet();
		sheet.replaceSync(InfinityBurger.css);
		root.adoptedStyleSheets = [sheet];

		this._xCoordinate = 0;
		this._state = 0;

		this.reset(root);

		this.addEventListener( 'click', () => {
			this._xCoordinate = 0;

			// reset to default state (just 3 bars)
			if( this._state >= 1 ) {
				this._state = 0;
				requestAnimationFrame(() => this.reset(root));
			} else {
				// keep adding hamburger layers
				this._state = 1;
				requestAnimationFrame( () => this.addLayer(root) );
			}
		}, false );
	}

	reset(root) {
		root.replaceChildren();
		for(let j=0, k=3; j<k; j++) {
			root.appendChild(this.node.cloneNode(false));
		}
	}

	addLayer(root) {
		this._xCoordinate += InfinityBurger.getRandomNumber(-10, 2 );

		let div = this.node.cloneNode(false);
		div.classList.add(InfinityBurger.classes.animate);
		div.style.transform = 'translateX(' + Math.min(this._xCoordinate, 0) + 'px)';
		root.appendChild( div );

		this.offsetWidth; // force a repaint
		div.classList.remove(InfinityBurger.classes.animate);

		if( !!this._state ) {
			if( this.offsetHeight < this.documentHeight - 20 ) {
				requestAnimationFrame( () => this.addLayer(root) );
			} // else, complete
		}
	}
}

InfinityBurger.register();