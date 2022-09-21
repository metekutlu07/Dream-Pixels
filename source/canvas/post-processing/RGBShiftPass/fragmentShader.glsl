uniform sampler2D tDiffuse;
uniform float strength;
uniform float angle;

varying vec2 vUv;

void main() {

	vec2 offset = strength * vec2( cos( angle ), sin( angle ) );

	vec4 colorA = texture2D( tDiffuse, vUv + offset );
	vec4 colorB = texture2D( tDiffuse, vUv );
	vec4 colorC = texture2D( tDiffuse, vUv - offset );

	gl_FragColor = vec4( colorA.r, colorB.g, colorC.b, colorB.a );

}
