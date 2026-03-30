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
uniform float meteFilter;
uniform float meteDensity;
uniform float neutralThreshold;
uniform float paleSaturationThreshold;
uniform float paleLightnessThreshold;
varying vec3 vColor;
varying vec2 vSeed;

float getHash( vec2 value ) {

	return fract( sin( dot( value, vec2( 12.9898, 78.233 ) ) ) * 43758.5453123 );

}

vec3 getHSL() {

	float r = vColor.r;
	float g = vColor.g;
	float b = vColor.b;

	float min = min( min( r, g ), b );
	float max = max( max( r, g ), b );

	float hue = 0.;
	float saturation = 0.;
	float lightness = ( max + min ) * .5;

	if ( min == max ) {

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

	return vec3( hue, saturation, lightness );

}

void main() {

	vec3 hsl = getHSL();
	float hue = hsl.x;
	if ( hue < range[ 0 ] || hue > range[ 1 ] ) discard;

	if ( meteFilter > .5 ) {

		float saturation = hsl.y;
		float lightness = hsl.z;
		bool isNeutral = saturation < neutralThreshold;
		bool isPaleColor = saturation < paleSaturationThreshold && lightness > paleLightnessThreshold;
		bool isTooBright = lightness > paleLightnessThreshold;
		bool isSparse = getHash( vSeed ) > meteDensity;

		if ( isNeutral || isPaleColor || isTooBright || isSparse ) discard;

	}

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
