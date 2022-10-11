#include <common>

uniform sampler2D current;
uniform sampler2D initial;

uniform float deltaTime;
uniform float speed;
uniform float curlSize;
uniform float attraction;
uniform float reset;
uniform float initialized;
uniform float duration;

#include "./getCurlNoise"
#include "./easings"

float getTriangularWave( float time, float period, float amplitude ) {

	float p = period * .5;
	return ( amplitude / p ) * ( p - abs( mod( time, ( 2. * p ) ) - p ) );

}

varying vec2 vUv;

vec4 getCurrentData( vec4 data ) {

	vec3 position = data.xyz;
	float life = data.a;

	vec4 particle = texture2D( initial, vUv );
	float age = particle.x;
	float lifespan = particle.y;

	if ( reset > 0. ) life = -age * duration;
	else if ( initialized == 1. ) life += deltaTime;

	if ( life > 0. && life < lifespan ) {

		vec3 coordinates = position * curlSize;
		float persistence = .1 + life * .1;

		float offset = cubicIn( 1. - life / lifespan ) * speed * particle.z;
		position += getCurlNoise( coordinates, .0, persistence ) * offset;

	}

	return vec4( position, life );

}

void main() {

	vec4 data = texture2D( current, vUv );
	gl_FragColor = getCurrentData( data );

}
