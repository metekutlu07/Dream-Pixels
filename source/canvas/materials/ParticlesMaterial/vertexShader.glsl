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

	transformed = texture2D( simulation, position.xy ).xyz;
	vColor = color;

	#include <morphtarget_vertex>
	#include <project_vertex>

	gl_PointSize = size * 10.;

	#ifdef USE_SIZEATTENUATION

		bool isPerspective = isPerspectiveMatrix( projectionMatrix );

		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );

	#endif

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>

}
