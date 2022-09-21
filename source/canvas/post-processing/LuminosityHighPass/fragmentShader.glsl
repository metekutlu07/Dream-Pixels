uniform sampler2D tDiffuse;
uniform vec3 color;
uniform float opacity;
uniform float threshold;
uniform float smoothWidth;

varying vec2 vUv;

void main() {

	vec4 texelColor = texture2D( tDiffuse, vUv );
	float luma = dot( texelColor.xyz, vec3( .299, .587, .114 ) );

	vec4 outputColor = vec4( color.rgb, opacity );
	float alpha = smoothstep( threshold, threshold + smoothWidth, luma );

	gl_FragColor = mix( outputColor, texelColor, alpha );

}
