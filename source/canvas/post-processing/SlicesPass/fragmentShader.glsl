#include <common>

uniform sampler2D tDiffuse;
uniform float elapsedTime;

uniform float count;
uniform float offset;
uniform vec2 speed;

varying vec2 vUv;

float getStep( float v, float steps ) { return floor( v * steps ) / steps; }
float getRandom( float n ) { return fract( sin( n ) * 43758.5453 ); }

float getNoise( float p ) {

	float fl = floor( p );
	float fc = fract( p );
	return mix( getRandom( fl ), getRandom( fl + 1. ), fc );

}

void main() {

	float noise = getNoise( vUv.y * count + elapsedTime * speed.y * 3. );
	float steppedNoise = getStep( fract( noise ), count ) + 2.;

	float noiseStepRandom = getRandom( steppedNoise );
	vec2 coordinates = vUv;
	coordinates.x += noiseStepRandom * sin( elapsedTime * speed.x * PI2 + noiseStepRandom * 20. ) * offset;

	gl_FragColor = texture2D( tDiffuse, coordinates );

}
