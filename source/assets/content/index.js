import P1 from './bistami';
import P2 from './theodora';
import P3 from './latent-voxels';
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
	subtitle: 'Experiments in Digital Scenography',
	author: 'Mete Kutlu',

	// Description displayed results from explorer like Google
	description: 'Dream Pixels is an atelier which explores forgotten architectural and urban dreams in medieval visual cultures. Using AI and digital design tools, it invents novel methods of research and mediation of miniature paintings. It weaves new relationships between architecture and art history in the Age of AI.',

	// Keywords used for SEO and displayed on the scrolling text
	themes: 'Medieval Iconography, Premodern Cosmology, Non-Euclidean Geometry, Mediterranean Eschatology, Hermetical Sciences, Digital Humanities',
	skills: 'Motion Graphics, 3D Modelling, Animation, Augmented Reality, 3D Printing, App Development, Projection Mapping, Architectural Drawing, Rendering',

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
	copyright: 'Feel free to use and remix, Paris 2022',
	contact: 'Want to collaborate with us<br>or simply have a chat ?',
	mail: 'metekutlu@gmail.com',
	address: `
		10 rue du Penthièvre<br>
		75008 Paris<br>
		FRANCE
		`,

	views: {

		home: { path: '/', title: 'Home' },
		projects: { path: '/projects', title: 'Projects' },
		about: { path: '/about', title: 'About' },
		contact: { path: '/contact', title: 'Contact' },
		update: { path: '/update', title: 'Update' }

	},

	buttons: {
		'camera-mode': [ 'Perspective', 'Orthographic' ],
		'panorama-map-mode': [ 'Top View', 'Miniature View' ],
		'fullscreen': [ 'Fullscreen', 'Minimize' ],
		'audio': [ 'Muted', 'Unmuted' ],
		'display-points': [ 'Points', 'Solid' ],
		'display-wireframe': [ 'Wireframe', 'Default' ],
		'display-aside': [ 'Show list', 'Hide list' ],
		'augmented-reality': [ 'Augmented Reality' ],
		'home': [ 'Home' ],
		'close': [ 'Close' ],
		'projects': [ 'Works' ],
		'project': [ 'See project' ],
		'about': [ 'About' ],
		'contact': [ 'Contact' ],
		'grid': [ 'Projects' ],
		'sphere': [ 'Images' ],
		'particles': [ 'Pixels' ],
		'color-range': [ 'Color Range' ],
		'timeline': [ 'Timeline' ],
		'display-menu': [ 'Menu', 'Close' ]
	},

	// Image for link sharing preview on Facebook, WhatsApp, etc...,
	// Should be 1200x600 pixels
	favicon: '/public/favicon.svg', // A square image 96x96 or svg
	robots: '',

	// Add the imported project in the list below
	filters: { title: 'Filters' },
	exploration: {
		title: 'Cup of Jamshid',
		description: [
			'We invite you to explore the digital archive of our works through this immserive interface that we baptised as The Cup of Jamshid. With its three different navigation modes, you can wander around the archive at the level of projects, images or even pixels. ',
			'It represents our attempt to investigate the quasi-alchemical transmutation in our visual culture and perception of architectural space. Brought about by the current transition from pigments to pixels, this paradigm change stands upon our colours which no longer have a body, weight, depth and volume. The Cup of Jamshid offers a glimpse into the novel ways with which we can engage with information in the Age of Artificial Intelligence. It is our humble experiment on how luminous colours can reveal patterns and relationships which otherwise would have stayed undiscovered.',
			'In Persian mythology, the Cup of Jamshid is described as a magical object of divination containing the elixir of immortality, a ruby-colored wine-like drink. On its surface, the elixir would show the whole seven heavens of the universe and the destiny of all the atoms in the cosmos. It was in a way the mystical early imagination of our internet browsers, satellites and radars. It was not associated only with the Persian kings but also with Alexander the Great of the Greeks and Suleyman the Magnificient of the Ottomans.'
		]
	},

	grid: [

		P1,
		{ objectID: '009' },
		P2,
		P3,
		{
			quote: 'Although an architect, clearly he a myriad artists holds in sway. And, of sound jugement, he can tell the secrets of the stars as well. His gaze draws over the sphere a web, like the spider of the astrolabe. Like Apollonius wise, he can devise and loose all talismans. He knows the veiled ones of the sky.',
			author: 'Nizami Ganjavi, Haft Paykar, 12th century'
		},
		P4,
		P5,
		{ objectID: '002' },
		P6,
		P7,
		{
			quote: 'The pen is of two kinds; the vegetal one is used in writing, and the second, made of cat hair, is used in painting. The wizards of art, similar in intelligence to Mani, and the Chinese and Frankish magicians, ascended the throne in the land of talent and have mecome masters in the workshop of Destiny.',
			author: 'Kadi Ahmed, The Rosegarden of Talents, 1606'
		},
		P8,
		P9,
		{ objectID: '010' },
		P10,
		P11,
		{
			quote: 'Let it be clear that the wonderful phantasy and strange native force of the artists are known in all lands. The force of imagination owned by these people are not found in any man of art. The image which the painter reveals on the tablets of the mind cannot be reflected in everybodys mirror of beauty. ',
			author: 'Kadi Ahmed, The Rosegarden of Talents, 1606'
		},
		P12,
		{ objectID: '007' },
		P13,
		{ objectID: '011' },
		P14,
		P15,
		{
			quote: 'Well done, the magic-working masters of the brush whose bewitching tool bestows a new life. They master every creature, and conjure up to life the likeness of everyone, from the encompassing circle of the sky to the surface of the earth. They cast their glances about creation and make copies of every original. Their creative art is a guide to the plan of the universe. I cannot understand with what art they treat images so that they seem to be speaking to men.',
			author: 'Kadi Ahmed, The Rosegarden of Talents, 1606'
		}

	],

};
