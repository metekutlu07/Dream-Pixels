#include <common>

uniform sampler2D parametersA;
uniform sampler2D parametersB;

uniform float initialized;
uniform float curlSize;
uniform float deltaTime;

varying vec2 vUv;

#include "./getCurlNoise"
#include "./easings"

void main() {

	vec4 texelColorA = texture2D( parametersA, vUv );
	vec4 texelColorB = texture2D( parametersB, vUv );

	vec3 position = texelColorA.xyz;
	float life = texelColorA.w;

	float lifespan = texelColorB.x;
	float speed = texelColorB.y;

	if ( life <= lifespan ) {

		life += deltaTime;
		if ( life > lifespan ) life = lifespan;

	}

	if ( life > 0. && life < lifespan ) {

		vec3 coordinates = position * curlSize;
		float persistence = .1 + life * .1;

		float offset = deltaTime > .0 ?
			cubicIn( 1. - life / lifespan ) * speed :
			cubicOut( 1. - life / lifespan ) * speed;

		position += getCurlNoise( coordinates, .0, persistence ) * offset;

	}

	gl_FragColor = vec4( position, life );

}
