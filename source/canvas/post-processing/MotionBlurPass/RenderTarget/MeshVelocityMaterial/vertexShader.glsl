#include <common>
#include <uv_pars_vertex>
#include <skinning_pars_vertex>

#include "./shaders/previous_skinning_pars_vertex"

uniform mat4 previousProjectionMatrix;
uniform mat4 previousModelViewMatrix;

varying vec4 vPreviousPosition;
varying vec4 vCurrentPosition;

void main() {

	vec3 transformed;

	#include <uv_vertex>
	#include <skinbase_vertex>
	#include <beginnormal_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>

	// Get the current vertex position
	transformed = vec3( position );
	#include <skinning_vertex>
	vCurrentPosition = modelViewMatrix * vec4( transformed, 1. );

	// Get the previous vertex position
	transformed = vec3( position );

	#include "./shaders/previous_skinbase_vertex"
	#include "./shaders/previous_skinning_vertex"

	vPreviousPosition = previousModelViewMatrix * vec4( transformed, 1. );

	vCurrentPosition =  projectionMatrix * vCurrentPosition;
	vPreviousPosition = previousProjectionMatrix * vPreviousPosition;

	gl_Position = vCurrentPosition;

}
