export default glsl`

	varying vec2 vUv;
	varying vec2 vLeft;
	varying vec2 vRight;
	varying vec2 vTop;
	varying vec2 vBottom;

	uniform vec2 resolution;

	void main () {

		vUv = uv;

		vec2 texelSize = 1. / resolution;

		vLeft = vUv - vec2( texelSize.x, 0. );
		vRight = vUv + vec2( texelSize.x, 0. );
		vTop = vUv + vec2( 0., texelSize.y );
		vBottom = vUv - vec2( 0., texelSize.y );

		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1. );

	}

`;
