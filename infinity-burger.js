class InfinityBurger extends HTMLElement {
	static register(tagName) {
		if("customElements" in window) {
			customElements.define(tagName || "infinity-burger", InfinityBurger);
		}
	}

	static classes = {
		animate: "animating"
	};

	static props = {
		height: 3 // integer
	};

	static attrs = {
		themeFunction: "theme-fn"
	};

	static css = `:host {
	--ib-_color: var(--ib-color, #666);
	position: absolute;
	top: 1em;
	right: 1em;
	width: 1.5em;
	cursor: pointer;
}
:host div {
	opacity: 1;
	transition: transform .6s cubic-bezier(0.13, 0.49, 0.29, 0.87),
		opacity .6s cubic-bezier(0.13, 0.49, 0.29, 0.87);
}
:host div.${InfinityBurger.classes.animate} {
	opacity: 0;
}
:host div {
	display: block;
	padding-bottom: ${InfinityBurger.props.height}px;
	border-top: ${InfinityBurger.props.height}px solid var(--ib-_color);
}`;

	static random( min, max ) {
		return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
	}

	get node() {
		if(!this._node) {
			this._node = document.createElement("div");
		}
		return this._node;
	}

	get documentWidth() {
		if(!this._width) {
			let docEl = document.documentElement;
			this._width = Math.max( docEl.clientWidth, docEl.scrollWidth );
		}

		return this._width;
	}

	get documentHeight() {
		if(!this._height) {
			let docEl = document.documentElement;
			this._height = Math.max( docEl.clientHeight, docEl.scrollHeight );
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
		this._isThemed = this.hasAttribute(InfinityBurger.attrs.themeFunction);

		this.reset(root);

		this.addEventListener( 'click', () => {
			this._xCoordinate = 0;

			// reset to default state (just 3 bars)
			if( this._state >= 1 ) {
				this._state = 0;
				requestAnimationFrame(() => this.reset(root));
			} else {
				// start adding hamburger layers
				this._state = 1;
				requestAnimationFrame( () => this.addLayer(root) );
			}
		}, false );
	}

	reset(root) {
		this._count = 0;

		root.replaceChildren();
		for(let j=0, k=3; j<k; j++) {
			root.appendChild(this.node.cloneNode(false));
		}
	}

	addLayer(root) {
		// Go to the opposite corner
		let offset = -1 * this.documentWidth / (this.documentHeight / (InfinityBurger.props.height*2));
		this._xCoordinate += offset + InfinityBurger.random(-6, 6);

		let div = this.node.cloneNode(false);
		div.classList.add(InfinityBurger.classes.animate);
		div.style.transform = 'translateX(' + Math.min(this._xCoordinate, 0) + 'px)';
		if(this._isThemed && typeof InfinityBurgerColor === "function") {
			div.style.borderColor = InfinityBurgerColor(this._count);
		}
		root.appendChild( div );
		this._count++;

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