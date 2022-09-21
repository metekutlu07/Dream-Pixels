uniform sampler2D tDiffuse;
uniform sampler2D tDisplacement;

uniform float amount;
uniform float angle;

uniform float seed;
uniform float seedX;
uniform float seedY;
uniform float distortionX;
uniform float distortionY;
uniform float size;

varying vec2 vUv;

void main() {

	vec2 uv = vUv;

	float xs = floor( gl_FragCoord.x / .5 );
	float ys = floor( gl_FragCoord.y / .5 );

	vec4 normal = texture2D( tDisplacement, uv * seed * seed );

	if (
		uv.y < distortionX + size &&
		uv.y > distortionX - size * seed
	) {

		if ( seedX > 0. ) uv.y = 1. - ( uv.y + distortionY );
		else uv.y = distortionY;
	}

	if (
		uv.x < distortionY + size &&
		uv.x > distortionY - size * seed
	) {

		if ( seedY > 0. ) uv.x = distortionX ;
		else  uv.x = 1. - ( uv.x + distortionX );
	}

	uv.x += normal.x * seedX * ( seed / 5. );
	uv.y += normal.y * seedY * ( seed / 5. );

	// Base from RGB shift shader
	vec2 offset = amount * vec2( cos( angle ), sin( angle ) );

	vec4 colorA = texture2D( tDiffuse, uv + offset );
	vec4 colorB = texture2D( tDiffuse, uv );
	vec4 colorC = texture2D( tDiffuse, uv - offset );
	vec4 color = texture2D( tDiffuse, vUv );

	gl_FragColor = vec4( colorA.r, colorB.g, colorC.b, color.a );
	gl_FragColor = colorA;

}
