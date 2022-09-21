uniform sampler2D tDiffuse;
uniform float strength;
uniform float aspect;

varying vec2 vUv;

vec2 getBarrelDistortion( vec2 coordinates ) {

	coordinates.x *= aspect;

	float theta  = atan( coordinates.y, coordinates.x );
	float radius = length( coordinates );

	radius = pow( radius, strength );
	coordinates.x = radius * cos( theta );
	coordinates.y = radius * sin( theta );

	coordinates.x /= aspect;

	return ( coordinates + 1. ) * .5;
}

void main() {

	vec2 coordinates = vUv * 2. - 1.;
	float magnitude = length( coordinates );
	coordinates = getBarrelDistortion( coordinates );

	gl_FragColor = texture2D( tDiffuse, coordinates );

}
