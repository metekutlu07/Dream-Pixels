varying vec2 vUv;

uniform sampler2D blurTexture1;
uniform sampler2D blurTexture2;
uniform sampler2D blurTexture3;
uniform sampler2D blurTexture4;
uniform sampler2D blurTexture5;
uniform sampler2D dirtTexture;

uniform float bloomStrength;
uniform float bloomRadius;
uniform float bloomFactors[ MIPMAP_COUNT ];
uniform vec3 bloomTintColors[ MIPMAP_COUNT ];

float lerpBloomFactor( const in float factor ) {

	float mirrorFactor = 1.2 - factor;
	return mix( factor, mirrorFactor, bloomRadius );

}

void main() {

	gl_FragColor = bloomStrength * (

		lerpBloomFactor( bloomFactors[ 0 ] ) * vec4( bloomTintColors[ 0 ], 1. ) * texture2D( blurTexture1, vUv ) +
		lerpBloomFactor( bloomFactors[ 1 ] ) * vec4( bloomTintColors[ 1 ], 1. ) * texture2D( blurTexture2, vUv ) +
		lerpBloomFactor( bloomFactors[ 2 ] ) * vec4( bloomTintColors[ 2 ], 1. ) * texture2D( blurTexture3, vUv ) +
		lerpBloomFactor( bloomFactors[ 3 ] ) * vec4( bloomTintColors[ 3 ], 1. ) * texture2D( blurTexture4, vUv ) +
		lerpBloomFactor( bloomFactors[ 4 ] ) * vec4( bloomTintColors[ 4 ], 1. ) * texture2D( blurTexture5, vUv )

	);

}
