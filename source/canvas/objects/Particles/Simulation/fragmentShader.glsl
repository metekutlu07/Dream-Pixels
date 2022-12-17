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
	float speed = texelColorB.y * deltaTime;

	if ( life <= lifespan ) {

		life += deltaTime;
		if ( life > lifespan ) life = lifespan;

	}

	if ( life > .15 && life < lifespan ) {

		float persistence = .1 + life * .1;

		float offset = deltaTime > .0 ?
			cubicOut( 1. - life / lifespan ) * speed :
			cubicOut( 1. - life / lifespan ) * speed;

		vec3 coordinatesA = position * curlSize * 2.;
		position += getCurlNoise( coordinatesA, .0, persistence ) * offset * .15;

		vec3 coordinatesB = position * curlSize * 5.;
		position += getCurlNoise( coordinatesB, .0, persistence ) * offset * .5;

	}

	gl_FragColor = vec4( position, life );

}
