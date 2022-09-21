uniform sampler2D tDiffuse;
uniform sampler2D tVelocityMap;
uniform float strength;

varying vec2 vUv;

void main() {

	vec4 texelColor = texture2D( tDiffuse, vUv );
	vec4 velocityColor = texture2D( tVelocityMap, vUv );

	vec2 velocity = ( velocityColor.xy * 2. - 1. ) * pow( velocityColor.z, 2. );
	velocity *= velocityColor.a;

	for ( int i = 1; i < SAMPLES; i ++ ) {

		vec2 offset = velocity * ( float( i ) / float( SAMPLES - 1 ) - .5 );
		offset *= strength;
		texelColor += texture2D( tDiffuse, vUv + offset );

	}

	texelColor /= float( SAMPLES );

	gl_FragColor = texelColor;

}
