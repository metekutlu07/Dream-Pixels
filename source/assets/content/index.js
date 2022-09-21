import P1 from './when-gaspard-meets-bistami';
import P2 from './when-light-escapes-matter';
import P3 from './cosmic-colors';
import P4 from './miniature-street-view';
import P5 from './when-ai-dreams-of-miniatures';
import P6 from './virtual-miniature';
import P7 from './terrazzo-miniatures';
import P8 from './when-gaspard-paints-a-gospel';
import P9 from './pigmentarium';
import P10 from './impossible-columns-of-solomon';
import P11 from './time-travelling-colours';
import P12 from './augustus-ar';
import P13 from './mosaic-go';
import P14 from './humbaba';

// To add a project, create a .js file in the content directory
// Then import it here with a correct name like ( P + index of the project )
// See photogrammetry.js for more explanation
import P15 from './photogrammetry';

export default {

	title: 'Dream Pixels',
	subtitle: 'Founded by Mete Kutlu',
	author: 'Mete Kutlu',

	// Description displayed results from explorer like Google
	description: 'Dream Pixels is an atelier which explores forgotten architectural and urban dreams in medieval visual cultures. Using AI and digital design tools, it invents novel methods of research and mediation of miniature paintings. It weaves new relationships between architecture and art history in the Age of AI.',

	// Keywords used for SEO and displayed on the scrolling text
	keywords: 'Medieval Iconography, Premodern Cosmology, Non-Euclidean Geometry, Mediterranean Eschatology, Hermetical Sciences, Digital Humanities, Motion Graphics, 3D Modelling, Animation, Augmented Reality, 3D Printing, App Development, Projection Mapping, Architectural Drawing, Rendering',

	// Introduction displayed on the home page
	introduction: [

		`Dream Pixels is an atelier which explores
		forgotten architectural and urban dreams
		in medieval visual cultures.`,

		`Using AI and digital design tools,
		it invents novel methods of research and
		mediation of miniature paintings.`,

		`It weaves new relationships between
		architecture andart history in the Age of AI.`

	],

	credits: 'Founded by Mete Kutlu',
	copyright: 'All rights reserved, Paris 2021',
	mail: 'mete.kutlu@gmail.com',

	views: {

		home: { path: '/', title: 'Home' },
		projects: { path: '/projects', title: 'Projects' },
		about: { path: '/about', title: 'About' },
		update: { path: '/update', title: 'Update' }

	},

	buttons: {
		'camera-mode': [ 'Perspective', 'Orthographic' ],
		'panorama-map-mode': [ 'Top View', 'Miniature View' ],
		'fullscreen': [ 'Fullscreen', 'Minimize' ],
		'audio': [ 'Muted', 'Unmuted' ],
		'display-points': [ 'Points', 'Solid' ],
		'display-aside': [ 'Show list', 'Hide list' ],
		'augmented-reality': [ 'Augmented Reality' ],
		'home': [ 'Home' ],
		'close': [ 'Close' ],
		'projects': [ 'Projects' ],
		'project': [ 'See project' ],
		'about': [ 'About' ],
		'contact': [ 'Contact' ],
		'grid': [ 'Grid' ],
		'sphere': [ 'Pictures' ],
		'particles': [ 'Pixels' ],
		'display-menu': [ 'Menu', 'Close' ]
	},

	// Image for link sharing preview on Facebook, WhatsApp, etc...,
	// Should be 1200x600 pixels
	favicon: '/public/favicon.svg', // A square image 96x96 or svg
	robots: '',

	// Add the imported project in the list below
	projects: [ P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, P13, P14, P15 ],

};
