#include <common>

varying vec2 vUv;

uniform sampler2D tDiffuse;
uniform vec2 textureSize;
uniform vec2 direction;

float gaussian( in float x, in float sigma ) {

	return .39894 * exp( -.5 * x * x / ( sigma * sigma ) ) / sigma;

}

void main() {

	vec2 inverseTextureSize = 1. / textureSize;

	float sigma = float( SIGMA );
	float weightSum = gaussian( .0, sigma );
	vec3 diffuseSum = texture2D( tDiffuse, vUv ).rgb * weightSum;

	for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

		float x = float( i );
		float weight = gaussian( x, sigma );
		vec2 offset = direction * inverseTextureSize * x;

		vec3 sampleA = texture2D( tDiffuse, vUv + offset ).rgb;
		vec3 sampleB = texture2D( tDiffuse, vUv - offset ).rgb;

		diffuseSum += ( sampleA + sampleB ) * weight;
		weightSum += 2. * weight;

	}

	gl_FragColor = vec4( diffuseSum / weightSum, 1. );

}
