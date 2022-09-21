uniform float elapsedTime;

#define hash( p ) ( 2. * fract( sin(( p ) * mat2( 127.1, 311.7, 269.5, 183.3 ) ) * 43758.5453123) - 1. )
#define gradient( x, y ) dot( hash( i + vec2( x ,y ) ), f - vec2( x, y ) )

float getNoise( vec2 coordinates ) {

	vec2 i = floor( coordinates );
	vec2 f = fract( coordinates );
	vec2 u = f * f * ( 3. - 2. * f );

	return mix( mix( gradient( 0, 0 ), gradient( 1, 0 ), u.x ), mix( gradient( 0, 1 ), gradient( 1, 1 ), u.x ), u.y );

}

float getIsolines() {

	vec2 coordinates = vUv * 20.;
	float noise = getNoise( coordinates ) * 8.;
	return  1. - abs( fract( noise ) - .5 ) / fwidth( noise );

}
