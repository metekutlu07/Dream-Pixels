float random( vec2 c ) { return fract( sin( dot( c.xy, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 ); }
float randFloat( vec2 c, float low, float high ) { return low + random( c ) * ( high - low ); }
int randInt( vec2 c, float low, float high ) { return int( low + floor( random( c ) * ( high - low + 1. ) ) ); }

float mapLinear( float value, float min1, float max1, float min2, float max2 ) {

	return min2 + ( value - min1 ) * ( max2 - min2 ) / ( max1 - min1 );

}

vec3 randomVector3( vec2 c, float scale ) {

	float theta = 2. * PI * random( c );
	float phi = acos( 2. * random( c ) - 1. );

	float x = sin( phi ) * cos( theta );
	float y = sin( phi ) * sin( theta );
	float z = cos( phi );

	return vec3( x, y, z ) * scale;

}

float euclideanModulo( float n, float m ) {

	return mod( ( mod( n, m ) + m ), m );

}
