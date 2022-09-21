float getTriangularWave( float time, float period, float amplitude ) {

	float p = period * .5;
	return ( amplitude / p ) * ( p - abs( mod( time, ( 2. * p ) ) - p ) );

}

float getLuma( const in vec3 color ) {

	return dot( color, vec3( .299, .587, .114 ) );

}

vec3 getViewSpacePosition( in vec2 coordinates, in float depth, in mat4 projectionMatrix ) {

	coordinates = coordinates * 2. - vec2( 1. );

	vec4 screenSpaceCameraFarPlane = vec4( coordinates, -1., 1. );
	mat4 projectionInverseMatrix = inverseMatrix( projectionMatrix );
	vec4 unprojectedPosition = projectionInverseMatrix * screenSpaceCameraFarPlane;
	vec3 viewSpaceCameraFarPlane = unprojectedPosition.xyz / unprojectedPosition.w;

	vec3 cameraToPositionRay = normalize( viewSpaceCameraFarPlane - cameraPosition );
	vec3 viewSpacePosition = cameraToPositionRay * depth + cameraPosition;

	return viewSpacePosition;

}

mat3 lookAt( vec3 origin, vec3 target, vec3 up ) {

	vec3 ww = normalize( target - origin );
	vec3 uu = normalize( cross( ww, up ) );
	vec3 vv = normalize( cross( uu, ww ) );

	return mat3( uu, vv, ww );

}

float readDepth( const in float depth ) {

	float cameraFarPlusNear = cameraFar + cameraNear;
	float cameraFarMinusNear = cameraFar - cameraNear;
	float cameraCoefficient = 2. * cameraNear;

	float z = depth;

	return cameraCoefficient / ( cameraFarPlusNear - z * cameraFarMinusNear );

}
