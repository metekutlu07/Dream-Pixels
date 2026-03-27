const int ITERATIONS = 3;

varying vec2 vUv;

uniform float strength;
uniform sampler2D tDiffuse;

float lerp( float value ) {

	return clamp( 1. - abs( 2. * value - 1. ), .0, 1. );

}

float map( float value, float a, float b ) {

	return clamp( ( value - a ) / ( b - a ), .0, 1. );

}

vec2 getBarrelDistortion( vec2 position, float amount ) {

	vec2 coordinates = position - .5;
	float distance = dot( coordinates, coordinates );
	return position + coordinates * distance * amount;

}

vec4 getSpectrumOffset( float t ) {

	float low = step( t, .5 );
	float high = 1. - low;

	float w = lerp( map( t, 1. / 6., 5. / 6. ) );
	vec4 spectrumOffset = vec4( low, 1., high, 1. ) * vec4( 1. - w, w, 1. - w, 1. );

	return pow( spectrumOffset, vec4( 1. / 2.2 ) );

}

void main() {

	vec4 totalColor = vec4( .0 );
	vec4 totalWeight = vec4( .0 );

	for ( int i = 0; i < ITERATIONS ; ++ i ) {

		float t = float( i ) / float( ITERATIONS );

		vec4 weight = getSpectrumOffset( t );
		vec2 barrelDistortion = getBarrelDistortion( vUv, .6 * strength * t );

		totalWeight += weight;
		totalColor += weight * texture2D( tDiffuse, barrelDistortion );

	}

	gl_FragColor = totalColor / totalWeight;

}
