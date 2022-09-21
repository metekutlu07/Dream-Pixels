export default html`

<script>

	function isSupported() {

		const onBrowserUpdatePage = location.pathname.match( 'browser-update' );

		try {

			eval( 'class A {};let b=(...x)=>x;b=new Promise((r=0)=>r());[b]=[\`${ 0 }\`];{let {b}={ b(){}}}' );
			const canvas = document.createElement( 'canvas' );
			const context = canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' );
			if ( ! context ) throw '';

		} catch ( error ) {

			if ( ! onBrowserUpdatePage ) location.replace( '/browser-update' );

		}

		if ( onBrowserUpdatePage ) location.replace( '/' );

		console.log( 'Browser Support: This browser is supported' );

	};

	<!-- isSupported() -->

</script>

`;
