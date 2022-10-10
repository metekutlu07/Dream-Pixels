uniform vec3 diffuse;
uniform float opacity;

#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

uniform vec2 range;
varying vec3 vColor;

float getHue() {

	float r = vColor.r;
	float g = vColor.g;
	float b = vColor.b;

	float min = min( min( r, g ), b );
	float max = max( max( r, g ), b );

	float hue;
	float saturation;
	float lightness = ( max + min ) * .5;

	if ( min == max ) {

		hue = 0.;
		saturation = 0.;

	} else {

		float delta = max - min;

		saturation = lightness <= .5 ?
			delta / ( max + min ) :
			delta / ( 2. - max - min );

		if ( max == r ) hue = ( g - b ) / delta + ( g < b ? 6. : 0. );
		if ( max == g ) hue = ( b - r ) / delta + 2.;
		if ( max == b ) hue = ( r - g ) / delta + 4.;

		hue /= 6.;

	}

	return hue;

}

void main() {

	float hue = getHue();
	if ( hue < range[ 0 ] || hue > range[ 1 ] ) discard;

	vec2 uv = ( vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	if ( length( uv - .5 ) > .5 ) discard;

	#include <clipping_planes_fragment>

	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse * vColor, opacity );

	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>

	outgoingLight = diffuseColor.rgb;

	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>

}
