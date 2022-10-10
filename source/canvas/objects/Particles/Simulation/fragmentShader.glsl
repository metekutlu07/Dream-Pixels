uniform sampler2D current;

uniform float time;
uniform float speed;
uniform float dieSpeed;
uniform float curlSize;
uniform float attraction;

#include "./getCurlNoise"

varying vec2 vUv;

vec4 getCurrentData( vec4 data ) {

	vec3 position = data.xyz;
	float life = data.a;

	// life -= dieSpeed;

	// if ( life < .0 ) {

		// data = texture2D( initial, vUv );
		// position = data.xyz * ( 1. + sin( 15. ) * .2 );
		// life = .5 + fract( data.w * 21.4131 + time );

	// } else {

		// vec3 delta = vec3( 0. ) - position;
		// float strength = 1. - smoothstep( 1., 50., length( delta ) );
		// position += delta * ( .005 + life * .01 ) * attraction * strength * speed;
		// position += getCurlNoise( position * curlSize, time, .1 + ( 1. - life ) * .1 ) * speed;

	// }

	// position += getCurlNoise( position * curlSize, time, .1 + ( 1. - life ) * .1 ) * speed;
	// position += getCurlNoise( vec3( life ) * curlSize * 100., .002, .001 ) * speed;

	return vec4( position, life );

}

void main() {

	vec4 data = texture2D( current, vUv );
	gl_FragColor = getCurrentData( data );

}
