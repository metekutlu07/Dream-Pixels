uniform sampler2D tDiffuse;
uniform sampler2D tNoise;
uniform vec2 resolution;
uniform vec2 offset;

uniform float scale;
uniform float strength;

varying vec2 vUv;

float rand( vec2 coordinates ){

	return fract( sin( dot( coordinates.xy, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 );

}

void main() {

	vec2 coordinates = vUv;
	coordinates.y /= resolution.x / resolution.y;
	coordinates *= scale;
	coordinates += offset;

	vec4 color = texture2D( tDiffuse, vUv );
	vec4 noise = texture2D( tNoise, coordinates );
	vec3 finalColor = mix( color.rgb, noise.rgb, strength );

	gl_FragColor = vec4( finalColor, 1. );

}
