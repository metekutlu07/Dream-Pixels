#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>

uniform sampler2D simulation;

void main() {

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>

	vec4 coordinates = instanceMatrix * vec4( vec3( .0 ), 1. );
	vec4 data = texture2D( simulation, coordinates.xy );
	transformed += data.xyz;

	vec4 mvPosition = vec4( transformed, 1.0 );
	mvPosition = viewMatrix * mvPosition;
	gl_Position = projectionMatrix * mvPosition;

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
