	#include <common>

	uniform sampler2D tDiffuse;
	uniform vec2 resolution;

	uniform float size;
	uniform float count;

	varying vec2 vUv;

	void main() {

		vec4 color = texture2D( tDiffuse, vUv );

		float lineAmount = resolution.y * 1.8 * size;
		vec2 coordinates = vec2( sin( vUv.y * lineAmount ), cos( vUv.y * lineAmount ) );

		vec3 finalColor = color.rgb;
		finalColor *= color.rgb * vec3( coordinates.x, coordinates.y, coordinates.x ) * count;
		finalColor = color.rgb + ( finalColor );

		gl_FragColor =  vec4( finalColor, color.a );
	}
