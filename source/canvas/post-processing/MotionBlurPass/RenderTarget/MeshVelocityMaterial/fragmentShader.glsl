uniform vec3 diffuse;
uniform float opacity;

#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>

varying vec4 vPreviousPosition;
varying vec4 vCurrentPosition;

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );

	#include <map_fragment>

	vec2 velocity = ( vCurrentPosition.xy / vCurrentPosition.w ) - ( vPreviousPosition.xy / vPreviousPosition.w );
	float speed = pow( length( velocity ), .5 ) * diffuseColor.a;
	gl_FragColor = vec4( .5 + .5 * normalize( velocity ), speed, diffuseColor.a );

}
