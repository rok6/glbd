((window, $) => {

	/** Default Settings */
	const
	home_path = '',
	root = {
		'Index' : '/'
	};

	/** jQuery Objects */
	let
	$window, $document,
	$html, $body,
	$header, $main, $footer, $rollwrap;


	const
	Classes = [],
	local = window.location,
	url = local.origin + home_path,
	path = local.pathname.replace(home_path, '');


	/** DOM Loaded */
	$(() => new Main );


	class Main {
		constructor() {
			this.load_page();
		}

		load_page() {
			const method = Object.keys(root).filter(m => root[m] === path)[0];
			if ( Classes[method] ) {
				return new Classes[method];
			}
			else {
				$.error( `Method ${method} does not exist on Page` );
			}
		}
	};


	/**
	 * [Page]
	 * @type {Class}
	 */

	class Page {

		constructor() {
			$document	= $(document);
			$window		= $(window);
			$html		= $('html');
			$body		= $('body');
			$header		= $('#header');
			$main		= $('#main');
			$footer		= $('#footer');
			$rollwrap = ( _ua.browser === 'ie'
			 			|| _ua.browser === 'firefox'
						) ? $html : $body;
		}

		event() {
			$window.on('hashchange', this.preset_event.hash.bind(this))
				.trigger('hashchange');
			$window.on('scroll', this.preset_event.scroll.bind(this))
				.trigger('scroll');
		}

		get preset_event() {
			return {
				hash : function() {
					const hash = location.hash;
					if( hash !== '' ) {
						console.log('Hash : %s', hash);
					}
				},
				scroll : function() {
					const _st = $rollwrap.scrollTop();
				}
			};
		}

	}


	Classes['Index'] = class Index extends Page {
		constructor() {
			super();
			this.init();
		}

		init() {
			console.log('Index init');
			this.event();
		}

		event() {
			// super.event();
		}
	}

	/*************************************************************************
	 * user agent
	 */

	class getUserAgent {

		constructor() {
			const ua = window.navigator.userAgent.toLowerCase();
			// const ver = window.navigator.appVersion.toLowerCase();

			this.browser = (() => {
				if ( /(msie|trident)/i.test(ua) ) {
					if ( ~ua.indexOf('edge') ) return 'edge';
					else return 'ie';
				}
				else if ( ~ua.indexOf('chrome') )	 return 'chrome';
				else if ( ~ua.indexOf('safari') )	 return 'safari';
				else if ( ~ua.indexOf('opera') )	 return 'opera';
				else if ( ~ua.indexOf('firefox') )	 return 'firefox';
				else return false;
			})();

			this.version = (() => {
				switch (this.browser) {
					case 'edge':
					case 'ie':
						return ~~ua.match(/((msie)\s|rv:)([\d\.]+)/)[3];
					case 'chrome':
						return ua.match(/chrome\/([\d\.]+)/)[1];
					case 'firefox':
						return ua.match(/firefox\/([\d\.]+)/)[1];
					case 'opera':
						return ua.match(/opera[\s\/]+([\d\.]+)/)[1];
					case 'safari':
						return ua.match(/version\/([\d\.]+)/)[1];
				}
			})();

			this.os = (() => {
				if ( /win(dows )?/.test(ua) )
					return 'windows';
				else if ( /iphone|ipad/.test(ua) )	 return 'ios';
				else if ( /mac|ppc/.test(ua) )		 return 'mac';
				else if ( ~ua.indexOf('android') )	 return 'android';
				else return false;
			})();
		}
	}

	const _ua = new getUserAgent();

})(window, window.jQuery);
