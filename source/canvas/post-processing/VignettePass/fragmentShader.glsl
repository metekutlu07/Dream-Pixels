#include <common>

#include "~/canvas/shaders/easings"
#include "~/canvas/shaders/math"

varying vec2 vUv;

uniform sampler2D tDiffuse;
uniform vec3 color;
uniform float strength;

void main() {

	gl_FragColor = texture2D( tDiffuse, vUv );

	vec2 coordinates = vUv * 2. - 1.;
	float linearGradient = mapLinear( vUv.y, 0., 1., .25, 1. );
	float radialGradient = sineIn( length( coordinates ) );
	float finalGradient = linearGradient * radialGradient;

	gl_FragColor.rgb = mix( gl_FragColor.rgb, color, finalGradient * strength );

}
