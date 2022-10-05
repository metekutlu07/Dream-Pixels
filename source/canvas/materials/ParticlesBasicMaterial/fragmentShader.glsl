uniform vec3 diffuse;
uniform float opacity;

#ifndef FLAT_SHADED

	varying vec3 vNormal;

#endif

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

uniform vec2 hue;

vec3 getHSL( vec3 rgb ) {

	float r = rgb.r;
	float g = rgb.g;
	float b = rgb.b;

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

	return vec3( hue, saturation, lightness );

}

void main() {

	vec3 hsl = getHSL( vColor );
	if ( hsl[ 0 ] < hue[ 0 ] || hsl[ 0 ] > hue[ 1 ] )discard;

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );

	// accumulation (baked indirect lighting only)
	#ifdef USE_LIGHTMAP

		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;

	#else

		reflectedLight.indirectDiffuse += vec3( 1.0 );

	#endif

	// modulation
	#include <aomap_fragment>

	reflectedLight.indirectDiffuse *= diffuseColor.rgb;

	vec3 outgoingLight = reflectedLight.indirectDiffuse;

	#include <envmap_fragment>

	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
