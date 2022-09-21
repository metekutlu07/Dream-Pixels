uniform vec3 topColor;
uniform vec3 bottomColor;

#ifdef USE_SPHERE

uniform float offset;
uniform float exponent;
varying vec3 vWorldPosition;

#else

varying vec2 vUv;

#endif

void main() {

	#ifdef USE_SPHERE

	float h = normalize( vWorldPosition + offset ).y;
	gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , .0 ), exponent ), .0 ) ), 1. );

	#else

	float ratio = vUv.y;
	vec3 color = mix( bottomColor, topColor, ratio );
	gl_FragColor = vec4( color, 1. );

	#endif

}
