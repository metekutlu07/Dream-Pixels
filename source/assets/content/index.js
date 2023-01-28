// import P1 from './augustus';
import P2 from './bamistun';
import P3 from './bistami';
import P4 from './cosmic-colors';
import P5 from './humbaba';
import P6 from './latent-voxels';
import P7 from './miniature-street-view';
import P8 from './photogrammetry';
import P9 from './pigmentarium';
import P10 from './rasdelka';
import P11 from './solomon';
import P12 from './tessera';
import P13 from './theodora';
import P14 from './time-travelling-colours';
import P15 from './virtual-miniature';
import P16 from './kizil-elma';
import P17 from './spolia-botanique';
import P18 from './gilbertus';
import P19 from './cyber-lotus';
import P20 from './augustus';
import P21 from './firuze';
import P22 from './marco';
import P23 from './sanshin';
import P24 from './khanum';








// To add a project, create a .js file in the content directory
// Then import it here with a correct name like ( P + index of the project )
// See photogrammetry.js for more explanation
// import P16 from './photogrammetry';

// Add the imported project in the list below
const projects = [

	P2, P3, P4,
	P5, P6, P7, P8,
	P9, P10, P11, P12,
	P13, P14, P15, P16, P17, P18, P19, P20, P21, P22, P23, P24

];

// Use to reorder projects by date, don't touch :)
projects.sort( ( projectA, projectB ) => {

	const dateA = new Date( projectA.date );
	const dateB = new Date( projectB.date );

	return dateA - dateB;

} );

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
		in medieval visual cultures.

		Using AI and digital design tools,
		it invents novel methods of research and
		mediation of miniature paintings.

		It weaves new relationships between
		architecture andart history in the Age of AI.`

	],

	credits: 'Founded by Mete Kutlu',
	copyright: 'Feel free to use and remix, Paris 2023',
	contact: 'Want to collaborate with us<br>or simply have a chat ?',
	user_infos: {

		'Cosmos': {
			title: 'This is the alchemical Cup of Jamshid.',
			paragraphs: `
				Containing the elixir of immortality, it shows to whoever looks in it<br>
				the destiny of all there is in the universe.<br>
				Alexander the Great and Suleyman the Magnificent have drunken from it.<br>
				Tap the Cup to hop on a journey from the heavenly stars to the intesimal particles.
			`
		},

		'Images': {
			title: 'Drag with your mouse<br>or with your fingers<br>to explore the archive.'
		},

		'Particles': {
			title: `
				Drag with your mouse or with your fingers<br>
				to explore the nebula of pixels.`,
			paragraphs: `
				You can use the control bar on the right<br>
				to define the color range of pixels to display.<br>
				You can also use the Timeline mode to fly among the pixels.`
		}
	},

	mail: 'contact@dreampixels.fr',
	address: `
		10 rue du Penthièvre<br>
		75008 Paris<br>
		FRANCE
		`,

	about: [

		`Dream Pixels is an atelier which explores
		forgotten architectural and urban dreams
		in medieval visual cultures.`,

		`Using AI and digital design tools,
		it invents novel methods of research and
		mediation of miniature paintings.`,

		`It weaves new relationships between
		architecture andart history in the Age of AI.`

	],

	views: {

		home: { path: '/', title: 'Home' },
		works: { path: '/works', title: 'Works' },
		about: { path: '/about', title: 'About' },
		contact: { path: '/contact', title: 'Contact' },
		update: { path: '/update', title: 'Update' }

	},

	buttons: {
		'camera-mode': [ 'Orthographic', 'Perspective' ],
		'panorama-map-mode': [ 'Top View', 'Miniature View' ],
		'fullscreen': [ 'Fullscreen', 'Minimize' ],
		'audio': [ 'Muted', 'Unmuted' ],
		'display-points': [ 'Points', 'Solid' ],
		'display-wireframe': [ 'Wireframe', 'Default' ],
		'display-aside': [ 'Show list', 'Hide list' ],
		'augmented-reality': [ 'Augmented Reality' ],
		'home': [ 'Home' ],
		'close': [ 'Close' ],
		'works': [ 'Works' ],
		'project': [ 'See project' ],
		'about': [ 'About' ],
		'contact': [ 'Contact' ],
		'places': [ 'Places' ],
		'grid': [ 'Projects' ],
		'sphere': [ 'Images' ],
		'particles': [ 'Pixels' ],
		'color-range': [ 'Color Range' ],
		'timeline': [ 'Timeline' ],
		'cosmos': [ 'Cosmos' ],
		'world': [ 'World' ],
		'display-menu': [ 'Menu', 'Close' ]
	},

	// Image for link sharing preview on Facebook, WhatsApp, etc...,
	// Should be 1200x600 pixels
	favicon: '/public/favicon.svg', // A square image 96x96 or svg
	robots: '',

	filters: { title: 'Filters' },
	grid: projects,

	panels: {
		'Cosmos': {
			title: 'Cosmos',
			description: [
				'We invite you to explore the digital archive of our works through this immserive interface that we baptised as The Cup of Jamshid. With its three different navigation modes, you can wander around the archive at the level of projects, images or even pixels. ',
				'It represents our attempt to investigate the quasi-alchemical transmutation in our visual culture and perception of architectural space. Brought about by the current transition from pigments to pixels, this paradigm change stands upon our colours which no longer have a body, weight, depth and volume. The Cup of Jamshid offers a glimpse into the novel ways with which we can engage with information in the Age of Artificial Intelligence. It is our humble experiment on how luminous colours can reveal patterns and relationships which otherwise would have stayed undiscovered.',
				'In Persian mythology, the Cup of Jamshid is described as a magical object of divination containing the elixir of immortality, a ruby-colored wine-like drink. On its surface, the elixir would show the whole seven heavens of the universe and the destiny of all the atoms in the cosmos. It was in a way the mystical early imagination of our internet browsers, satellites and radars. It was not associated only with the Persian kings but also with Alexander the Great of the Greeks and Suleyman the Magnificient of the Ottomans.'
			]
		},
		'World': {
			title: 'World',
			description: [
				'We invite you to explore the digital archive of our works through this immserive interface that we baptised as The Cup of Jamshid. With its three different navigation modes, you can wander around the archive at the level of projects, images or even pixels. ',
				'It represents our attempt to investigate the quasi-alchemical transmutation in our visual culture and perception of architectural space. Brought about by the current transition from pigments to pixels, this paradigm change stands upon our colours which no longer have a body, weight, depth and volume. The Cup of Jamshid offers a glimpse into the novel ways with which we can engage with information in the Age of Artificial Intelligence. It is our humble experiment on how luminous colours can reveal patterns and relationships which otherwise would have stayed undiscovered.',
				'In Persian mythology, the Cup of Jamshid is described as a magical object of divination containing the elixir of immortality, a ruby-colored wine-like drink. On its surface, the elixir would show the whole seven heavens of the universe and the destiny of all the atoms in the cosmos. It was in a way the mystical early imagination of our internet browsers, satellites and radars. It was not associated only with the Persian kings but also with Alexander the Great of the Greeks and Suleyman the Magnificient of the Ottomans.'
			]
		},
		'Cup': {
			title: 'Cup of Jamshid',
			description: [
				'We invite you to explore the digital archive of our works through this immserive interface that we baptised as The Cup of Jamshid. With its three different navigation modes, you can wander around the archive at the level of projects, images or even pixels. ',
				'It represents our attempt to investigate the quasi-alchemical transmutation in our visual culture and perception of architectural space. Brought about by the current transition from pigments to pixels, this paradigm change stands upon our colours which no longer have a body, weight, depth and volume. The Cup of Jamshid offers a glimpse into the novel ways with which we can engage with information in the Age of Artificial Intelligence. It is our humble experiment on how luminous colours can reveal patterns and relationships which otherwise would have stayed undiscovered.',
				'In Persian mythology, the Cup of Jamshid is described as a magical object of divination containing the elixir of immortality, a ruby-colored wine-like drink. On its surface, the elixir would show the whole seven heavens of the universe and the destiny of all the atoms in the cosmos. It was in a way the mystical early imagination of our internet browsers, satellites and radars. It was not associated only with the Persian kings but also with Alexander the Great of the Greeks and Suleyman the Magnificient of the Ottomans.'
			]
		}
	},

	objects: [
		{ objectID: '009' },
		{ objectID: '002' },
		{ objectID: '010' },
		{ objectID: '007' },
		{ objectID: '011' }
	],
	quotes: [
		{
			quote: 'Although an architect, clearly he a myriad artists holds in sway. And, of sound jugement, he can tell the secrets of the stars as well. His gaze draws over the sphere a web, like the spider of the astrolabe. Like Apollonius wise, he can devise and loose all talismans. He knows the veiled ones of the sky.',
			author: 'Nizami Ganjavi, Haft Paykar, 12th century'
		},
		{
			quote: 'The pen is of two kinds; the vegetal one is used in writing, and the second, made of cat hair, is used in painting. The wizards of art, similar in intelligence to Mani, and the Chinese and Frankish magicians, ascended the throne in the land of talent and have become masters in the workshop of Destiny.',
			author: 'Kadi Ahmed, The Rosegarden of Talents, 1606'
		},
		{
			quote: 'Let it be clear that the wonderful fantasy and strange native force of the artists are known in all lands. The force of imagination owned by these people are not found in any man of art. The image which the painter reveals on the tablets of the mind cannot be reflected in everybodys mirror of beauty. ',
			author: 'Kadi Ahmed, The Rosegarden of Talents, 1606'
		},
		{
			quote: 'Well done, the magic-working masters of the brush whose bewitching tool bestows a new life. They master every creature, and conjure up to life the likeness of everyone, from the encompassing circle of the sky to the surface of the earth. They cast their glances about creation and make copies of every original. Their creative art is a guide to the plan of the universe. I cannot understand with what art they treat images so that they seem to be speaking to men.',
			author: 'Kadi Ahmed, The Rosegarden of Talents, 1606'
		}
	],

	popins: {


		'alexandria': {
			projects: [ 'bistami' ],
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'antioch': {
			projects: [ 'bistami' ],
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'avignon': {
			projects: [ 'tessera', 'time-travelling-colours' ],
			paragraphs: [
				'XEnim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'baghdad': {
			projects: [ 'time-travelling-colours' ],
			paragraphs: [
				'At the Jalayirid court (1336-1432), heirs of the Ilkhanids, Baghdad becomes the scene of a short but pivotal moment in the evolution of the miniature art patroned by the Persianate Turco-Mongol courts of Western Asia. The Jalayirid School bridges the inaugural Ilkhanid School with the Timurid paintings of the Turquoise Renaissance. It builds upon the pre-Mongol Arab period of the Baghdad School which skillfully blends Byzantine, Persian and Arab traditions of representation. The Baghdad School is characterised by an attention to features of everyday life. The figures are individualized, expressive and sprightly. Of ornamental quality, illustrations with strong bright colors lacked frames and were directly placed between calligraphied writings. Building upon this tradition, the Jalayirid period represents an experimental moment of transition. The graphic image moves from the center of the page to the margins as a major innovation. The Jalayirid taste prefers pastel colours, romantic settings rather than epic stories, lyrical scenes with graceful figures set in lavish interiors or blooming gardens. Using a larger portion of the vertical paper for the landscape, the Jalayirid artists represent depth in a scene by vertically juxtoposing the figures from bottom to top. The most notable work of the period is Khoja Kirmani`s Khamsa illustrated by Ustad Junayd at the court of Sultan Ahmed.',
				''
			]
		},

		'balkh': {
			projects: [ ],
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'belgrad': {
			projects: [ 'kizil-elma' ],
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'buda': {
			projects: [ 'kizil-elma' ],
			paragraphs: [
				'bEnim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'bukhara': {
			projects: [ 'firuze', 'khanum', 'time-travelling-colours' ],
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'busan': {
			projects: [ 'sanshin', 'cyber-lotus' ],
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'carthage': {
			projects: [ 'tessera' ],
			paragraphs: [
				'quat aliqua laboris laborum.',
				'I was invited by the UNESCO Club Volubilis to join an interdisciplinary team to come up with an innovative digital mediation project for the mosaics of Roman villas in Carthage. The project was in  partnership with the Municipality of Carthage, the Tunisian National Institut of Heritage with the funding of the Regional Municipality of Côte d’Azur.'
			]
		},

		'constantinople': {
			projects: [ 'miniature-street-view', 'solomon', 'rasdelka', 'bistami', 'cosmic-colors', 'theodora', 'bamistun', 'latent-voxels', 'virtual-miniature', 'time-travelling-colours' ],
			paragraphs: [
				'Constantinople, the cosmic capital with an apocalyptic destiny. The Ottoman Eye',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'dalian': {
			projects: [ ],
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				' The International Academy of Arts under the Dalian University of Foreign Languages '
			]
		},

		'damas': {
			projects: [ ],
			paragraphs: [
				'Damascus is an ancient center of hermetical knowledge where mystical schools of thinking and alchemical practices florished. The Ottoman magician Bistami has passed from here before writing his eschatological treatise on the messianic destiny of the Ottoman Dynasty.',
				''
			]
		},

		'delhi': {
			projects: [ ],
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'herat': {
			projects: [ 'firuze', 'khanum', 'time-travelling-colours' ],
			paragraphs: [
				'Herat is the Florence of the Turquoise Renaissance. Lorenzo, Ali Shir Navai ',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'iconia': {
			projects: [ ],
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'ispahan': {
			projects: [ ],
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'jerusalem': {
			projects: [ 'solomon' ],
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'khiva': {
			projects: [ 'firuze', 'khanum', 'time-travelling-colours' ],
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'kiev': {
			projects: [ ],
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'nicomedia': {
			projects: [ 'bistami', 'latent-voxels' ],
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'nicopolis': {
			projects: [ 'kizil-elma' ],
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'nishapur': {
			projects: [ ],
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'paris': {
			projects: [ 'gilbertus', 'augustus' ],
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'rome': {
			projects: [ 'solomon', 'theodora' ],
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'samarkand': {
			projects: [ 'firuze', 'khanum', 'time-travelling-colours' ],
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'seoul': {
			projects: [ 'sanshin', 'cyber-lotus' ],
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'shanghai': {
			projects: [ ],
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'shiraz': {
			projects: [ 'time-travelling-colours' ],
			paragraphs: [
				'Named as the "House of Knowledge", Medieval Shiraz is a major city of literature and arts of the book. In the early fourteenth century, the Shiraz School of miniature paintings is founded by the Mongol court of the Ilkhanids. During the reign of Timurid princes, Iskandar Mirza and Ibrahim Sultan, grandsons of Timur, the city becomes a major center of Turkish culture and the Shiraz School reaches its maturity. Building upon the previous Jalayirid and Muzafferid schools, the Shirazi miniatures replace solid-color backgrounds with dreamlike landscapes of fantastical shapes dominated by pale pinks, blues and grays. A new stage begins when the city passes to the Black Sheep Turkmen confederation. The Turkman School is marked by stocky human figures with round childish faces, simple landscapes with a large hillock and pale ground with stylized bulbous flowers. Starting from the 1450s, Baghdad and Shiraz workshops produce a great number of manuscripts ordered by the poet-prince Pir Budaq. In 1468, as the city passes to the White Sheep Turkmen Confederation of Uzun Hasan, the city continues to be a center of illustrated books. With its rich landscapes and intense coloring, the Turkmen School is crystalized in the 1480s. In 1503, Shah Ismail captures Shiraz and the Turkman School leaves its place to the Safavid School.',
				' '
			]
		},

		'tabriz': {
			projects: [ 'time-travelling-colours' ],
			paragraphs: [
				'The Tabriz School of miniature painting is established under the Ilkhanid Mongol dynasty in the 14th century. As the capital of Ghazan Khan, the city turns into a major hub of cultural and commercial activities between the East and West. The intellectual life in Tabriz proliferates thanks to the epoch-making projects of Ghazan Khan and his Jewish vizier Rashid al-Din Hamadani: the scientific centers of Sham-i Ghazan and Rab-i Rashid near Tabriz. The scriptorium of Rab-i Rashid produces many illustrated manuscripts including Jami al-Tawarikh and probably the Great Mongol Shahnameh. The inaugural Rashidiyya style of miniatures reflects the unique international atmosphere of Tabriz and is influenced by Chinese, Turkish, Byzantine and Persian traditions of painting. <br><br> The Turkmen period begins in 1375 when Tabriz becomes the capital of Black Sheep Confederation under the rule of Jahan Shah. A poet himself, he is a patron of arts and architecture who commissions the Blue Mosque of Tabriz. His son Pir Budaq, also a poet and a bibliophile, would become one of the greatest Turkman patrons of miniatures. The Turkman School is characterized by stocky human figures with round childish faces, simple landscapes with large hillocks and pale grounds with stylized bulbous flowers. In 1472, Tabriz becomes the capital of the White Sheep Turkmen Confederation under Uzun Hasan. The reign of his son Yakub Bey (1478-1490) sees a great artistic flowering. Crystalizing in the 1480s, the Turkmen Eye reveals a taste for rich landscapes and intense coloring. Following his father, Yakub Bey creates a lush court supporting artists, poets and scientists. <br><br>A new phase begins when Tabriz becomes the capital of the Safavid Empire under Shah Ismail in 1501. During the Safavid period, the School of Tabriz is fused with the School of Herat after Shah Ismail takes Herat from the Uzbek Shaybanid dynasty. In 1514, the Ottoman Sultan Selim I takes the city from the Safavids and brings many artists and books from the workshops of Tabriz to his court in Istanbul. From this moment on, the Ottoman School of miniature is strongly influenced by the Tabriz School. Shahkulu, one of these artists and a student of the Tabrizi master Aga Mirek, becomes the head of the imperial workshop of Suleyman the Magnificent in Constantinople. Due to continous risk of Ottoman occupation, the Safavid Shah Tahmasp moved the capital from Tabriz to Qazvin. From then on, the Tabriz School declined; Isfahan and Qazvin Schools emerged.',
				''
			]
		},

		'tashkent': {
			projects: [ 'firuze', 'khanum', 'time-travelling-colours' ],
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'trebizond': {
			projects: [ ],
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'venice': {
			projects: [ 'marco' ],
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'vienna': {
			projects: [ 'kizil-elma' ],
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'EarthWireframe': {
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'Moon': {
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'Mercury': {
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'Venus': {
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'Sun': {
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'Mars': {
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'Jupiter': {
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'Saturn': {
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'Stars': {
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'Zodiac': {
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'Imagination': {
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'Divine': {
			paragraphs: [
				'Enim adipisicing proident ex occaecat duis non duis laborum dolore pariatur laboris. Enim ea cillum qui proident ipsum eu anim. Qui enim mollit ipsum consequat aliqua laboris laborum.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		}

	}

};
