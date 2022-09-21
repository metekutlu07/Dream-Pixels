uniform vec3 color;
uniform float opacity;

#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>

void main() {

	vec3 diffuse = vec3( 1. ) * mix( .25, 1., getShadowMask() );
	gl_FragColor = vec4( diffuse, opacity );

	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>

}
