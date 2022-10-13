uniform float size;
uniform float scale;

#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

attribute vec3 color;
uniform sampler2D simulation;
varying vec3 vColor;

void main() {

	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>

	vec4 data = texture2D( simulation, position.xy );
	float life = data.w;
	transformed = data.xyz;
	vColor = color;

	if ( life <= .0 ) transformed.y += 1e5;

	#include <morphtarget_vertex>
	#include <project_vertex>

	gl_PointSize = size;
	gl_PointSize *= clamp( life, .5, 1. );

	#ifdef USE_SIZEATTENUATION

		bool isPerspective = isPerspectiveMatrix( projectionMatrix );

		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );

	#endif

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>

}
