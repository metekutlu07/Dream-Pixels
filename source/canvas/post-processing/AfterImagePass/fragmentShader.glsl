uniform float strength;

uniform sampler2D tPrevious;
uniform sampler2D tDiffuse;

varying vec2 vUv;

vec4 isGreater( vec4 x, float y ) {

	return max( sign( x - y ), .0 );

}

void main() {

	vec4 texelColor = texture2D( tDiffuse, vUv );
	vec4 previousTexelColor = texture2D( tPrevious, vUv );

	previousTexelColor *= strength * isGreater( previousTexelColor, .05 );

	gl_FragColor = max( texelColor, previousTexelColor );

}
