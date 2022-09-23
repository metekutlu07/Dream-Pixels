uniform sampler2D simulation;
uniform sampler2D initial;

uniform float time;
uniform float speed;
uniform float dieSpeed;
uniform float curlSize;
uniform float attraction;

#include "./getCurlNoise"

varying vec2 vUv;

void main() {

	vec4 data = texture2D( simulation, vUv );
	vec3 position = data.xyz;
	float life = data.a - dieSpeed;

	if ( life < .0 ) {

		data = texture2D( initial, vUv );
		// position = data.xyz * ( 1. + sin( 15. ) * .2 );
		life = 1.;

	} else {

		vec3 delta = vec3( 0. ) - position;
		position += delta * ( .005 + life * .01 ) * attraction * ( 1. - smoothstep( 10., 350., length( delta ) ) ) * speed;
		position += getCurlNoise( vec3( life ) * curlSize, .0, .2 ) * speed * 5.;

	}

	gl_FragColor = vec4( position, life );

}
