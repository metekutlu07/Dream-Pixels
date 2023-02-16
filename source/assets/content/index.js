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
	subtitle: 'A Transtemporal Journey Into Cyber Mysticism',
	author: 'Mete Kutlu',

	// Description displayed results from explorer like Google
	description: 'Dream Pixels is an atelier which explores forgotten architectural and urban dreams in medieval visual cultures. Using AI and digital design tools, it invents novel methods of research and mediation of miniature paintings. It weaves new relationships between architecture and art history in the Age of AI.',

	// Keywords used for SEO and displayed on the scrolling text
	themes: 'Cyber Nomadism, Digital Humanities, Postmodern Medievalism, Digital Primitivism, Digital Handcrafts, Medieval Iconography, Premodern Cosmology, Silk Road Cultures, Mediterranean Eschatology, Hermetical Sciences',
	skills: 'Digital Scenography, Virtual Reconstruction, Augmented Reality, 3D Scanning, 3D Modelling, Animation, Mobile App Development, Projection Mapping',

	// Introduction displayed on the home page
	introduction: [

		'Welcome to the virtual archive of Dream Pixels.<br>Here you can explore the birth of a mystico-digital cosmogony through four cybernetic experiences. In Places mode, you can fly over a virtual and transtemporal reflection of a mappa mundi and hop on a journey along the Silk Road. In the projects mode, you will find virtual talismans composing a unique heteroclite visual experience. The Images mode places you at the center of an iconosphere reflecting the mystical notion of the bewildering cosmic mirror. And lastly, the Pixels mode offers you a ride on a cosmic rollercoaster going through a nebula of pixels inside the realm of colours. '

	],

	credits: 'Founded by Mete Kutlu',
	copyright: 'Feel free to use and remix. Paris, 2023.',
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
		architecture and art history in the Age of AI.`

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
		'Pixels': {
			title: 'Pixels',
			description: [
				'We invite you to explore the digital archive of our works through this immserive interface that we baptised as The Cup of Jamshid. With its three different navigation modes, you can wander around the archive at the level of projects, images or even pixels. ',
				'It represents our attempt to investigate the quasi-alchemical transmutation in our visual culture and perception of architectural space. Brought about by the current transition from pigments to pixels, this paradigm change stands upon our colours which no longer have a body, weight, depth and volume. The Cup of Jamshid offers a glimpse into the novel ways with which we can engage with information in the Age of Artificial Intelligence. It is our humble experiment on how luminous colours can reveal patterns and relationships which otherwise would have stayed undiscovered.',
				'In Persian mythology, the Cup of Jamshid is described as a magical object of divination containing the elixir of immortality, a ruby-colored wine-like drink. On its surface, the elixir would show the whole seven heavens of the universe and the destiny of all the atoms in the cosmos. It was in a way the mystical early imagination of our internet browsers, satellites and radars. It was not associated only with the Persian kings but also with Alexander the Great of the Greeks and Suleyman the Magnificient of the Ottomans.'
			]
		},
		'Images': {
			title: 'Images',
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
				'Avignon was home to two key experiences which strongly influenced the evolution of this research project. First one of these is the workshop “From Mosaics to Pixels” organized by the Volubilis Association, a UNESCO Club founded by a group of landscape designers and architects working for the cultural development of the Mediterranean Basin. The workshop took place between 30 June-26 July 2019 in four different places: Carthage in Tunisia and Arles, Vaison-la-Romaine and Avignon in France. Funded by the Regional Municipality of Provence-Alpes-Côte d’Azur, it was undertaken in partnership with the Municipality of Carthage, the Tunisian Ministry of Culture, the National Institute of Heritage (INP), the Agency of Heritage Enhancement and Cultural Promotion (AMVPPC), the Bardo Museum and the Association “Friends of Carthage”. As a Ph.D. candidate, Mete Kutlu was selected to be part of an international and multi-disciplinary team whose goal was the development of an innovative digital mediation tool for the Roman mosaics of Carthage. After the workshop, Mete Kutlu continued to build upon his initial project “Mosaic Go!” which today is baptized as Tessera. <br><br>The second key experience was the International Conference AIC2020: Natural Colors, Digital Colors. The conference was organized by the International Association of Color, and hosted by the French Center of Color. Mete Kutlu’s contribution was in the form of a research paper. His article “Time-Travelling Colors: Artisanal Dreams and Digital Fabrication” was chosen for publication by the scientific magazine Color: Research and Application edited by Wiley. The research was also presented as an animation video in which figures from the medieval miniatures were digitally animated to talk about the ways of the miniaturists. For this innovative research work on colors, Mete Kutlu was selected as the recipient of the Robert W G Hunt Award in 2021 by the Colour Group in London.',
				''
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
				'Bukhara was one of the stops of the Uzbek Mission which took place between November 3 – December 2, 2021. The mission was supported by the French Institute of Central Asian Studies (IFEAC) which welcomed Mete Kutlu as a guest scholar and attributed him a grant. The research program included an archival study at the Biruni Institute of Oriental Studies in Tashkent and an architectural study in the oasis cities of Transoxiana developed through commerce along the Silk Road.<br><br>The objective of the field study in Bukhara was to get a better picture of the historical sedimentation following the successive dynastic changes in the region. As one of the oldest continuously habited cities of Central Asia, a major commercial and intellectual hub along the Silk Road and capital to several dynasties along centuries, Bukhara offered a unique architectural heritage perfectly suited for the mission. Between the numerous monuments examined are the mausoleum from the Samanid period (10th century), Magok-i Attari Mosque from the Qarakhanid period (12th century), Ulugh Beg Madrasa from the Timurid Period (1420) and Mir-i Arab Madrasa from the Shaybanid period (1512). The mission also offered chance to visit the Mausoleum of Bahauddin Naqshband Bukhari, the founder of the mystical Sufi order of Naqshbandiyya whose influence goes beyond the Timurid intellectual world and reaches the Ottoman court, patrons and miniaturists.',
				'Enim incididunt tempor enim magna in pariatur fugiat. Pariatur excepteur labore deserunt enim. Adipisicing officia consequat duis cupidatat cupidatat incididunt mollit deserunt consectetur dolore culpa minim. Esse sit veniam sint eu officia est proident elit magna voluptate esse ullamco. Irure ullamco ullamco cupidatat pariatur reprehenderit sit do.'
			]
		},

		'busan': {
			projects: [ 'sanshin', 'cyber-lotus' ],
			paragraphs: [
				'Busan is situated on the most southern tip of the itinerary which Mete Kutlu followed during the Korean Mission. During this field survey, fine examples of Buddhist temple architecture of the Silla Period are studied and scanned in the vicinity of Busan. These scanning locations are the Tongdosa Temple (646), Bulguksa Temple (751) and Haedong Yonggungsa Temple (1376).<br><br>The Korean Mission was supported by the University of Paris Est with a grant. The School of Architecture of the renown Hanyang University was the host establishment in Seoul. The research was done under the supervision of the architect and professor Ahn Keehyun, the dean of the School. The study lasted for two months between 9 December 2021 and 7 February 2022. After a two-week-long period of confinement due the pandemic, my research was divided into two parts, a first one in Seoul and a second around the Korean Peninsula. In Seoul, I conducted my research at the library of Hanyang University, the National Museum of Korea, the several palace complexes of the capital and the nearby temples of the Bukhansan Mountain. The second part took place at different “mountain temples” around the Korean peninsula.',
				''
			]
		},

		'carthage': {
			projects: [ 'tessera' ],
			paragraphs: [
				'As a Ph.D. candidate working on digital humanities, Mete Kutlu was selected to be part of an international and multi-disciplinary team whose goal was the development of an innovative digital mediation tool for the Roman mosaics of Carthage. Organized by the Volubilis Association, a French UNESCO Club, the workshop “From Mosaics to Pixels” took place between 30 June-26 July 2019 in four different sites: Carthage in Tunisia and Arles, Vaison-la-Romaine and Avignon in France. Funded by the Regional Municipality of Provence-Alpes-Côte d’Azur, it was undertaken in partnership with the Municipality of Carthage, the Tunisian Ministry of Culture, the National Institute of Heritage (INP), the Agency of Heritage Enhancement and Cultural Promotion (AMVPPC), the Bardo Museum and the Association “Friends of Carthage”. After the workshop, Mete Kutlu continued to build upon his initial project “Mosaic Go!” which today is baptized as Tessera.',
				''
			]
		},

		'constantinople': {
			projects: [ 'miniature-street-view', 'solomon', 'rasdelka', 'bistami', 'cosmic-colors', 'theodora', 'bamistun', 'latent-voxels', 'virtual-miniature', 'time-travelling-colours' ],
			paragraphs: [
				'The Istanbul Mission was carried out in November - December 2019 with the support of the French Institute of Anatolian Studies (IFEA). As part of his doctoral research, Mete Kutlu was granted a scholarship and a residency at the Palace of France in Istanbul. The main goal of the mission was to do an archival research on the Ottoman miniatures with representations of architectural and urban scenes. The research locations were the Topkapi Palace Archives, Istanbul University Library, Suleymaniye Library and the Museum of Islamic and Turkish Art. Besides the archival work, the mission included the close-up examination of the architectural monuments and their ornamentation which are represented in the miniatures. The results of this research were shared during an international conference at the Palace of France. Following this mission Mete Kutlu was invited by the Pera Museum and its educational department to organize a workshop as part of the exhibition Miniature 2.0. Due to travel restrictions during the pandemic, the workshop project was transformed into an online conference organized and published by the museum. At the same time as the Istanbul residency, the Quai Branly – Jacques Chirac Museum in Paris invited Mete Kutlu to share his research work during the conference “Electronic Visualization and the Arts”. ',
				''
			]
		},

		'dalian': {
			projects: [ ],
			paragraphs: [
				'Dalian is one of the grounds situated on the Far Eastern side of this research journey. Although no field study was done in the city because of the travel restrictions placed during the pandemic, Dalian was the scene of a unique experience, a year-long exchange with Chinese architects, urban designers, professors and students through online lectures. Between September 2021 and August 2022, Mete Kutlu thought at the International Academy of Arts under the University of Foreign Languages in Dalian. The experimental course offered both the undergraduate and graduate students a chance to explore artistic and innovative approaches in contemporary architecture and urban design.',
				''
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
				'Khiva was one of the stops of the Uzbek Mission which took place between November 3 – December 2, 2021. The mission was supported by the French Institute of Central Asian Studies (IFEAC) which welcomed Mete Kutlu as a guest scholar and attributed him a grant. The research program included an archival study at the Biruni Institute of Oriental Studies in Tashkent and an architectural study in the oasis cities of Transoxiana developed through commerce along the Silk Road.<br><br>Itchan Kala, the historical walled city of Khiva, has probably one of the most well-preserved urban tissues in the Central Asia housing numerous examples of Transoxanian brickwork architecture. Even though the city’s heritage dates mostly from the 18th and 19th centuries, it offers a glimpse into a what a medieval urban experience could be like in an oasis city of the Silk Road with brick architecture.',
				''
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
				'As the hometown of this research project, Paris offered two exceptional study cases on the digital mediation and virtual reconstruction of medieval architectural heritage. The first one is the Philippe Auguste 3D mobile app commissioned by the Philippe Auguste Foundation. The partners of the project are the AUSser Research Laboratory and Comet Lab, a young atelier working on R&D projects in architecture and urban design. As a Ph.D. candidate working on augmented reality in relationship to architecture and heritage, Mete Kutlu worked together with the developer Theuns Botha for developing an augmented reality app. Serving as proof-of-concept, the app offers the user to take a walk in augmented reality along the life-size virtual reconstruction of a section of the wall. ',
				''
			]
		},

		'rome': {
			projects: [ 'solomon', 'theodora' ],
			paragraphs: [
				'The Roman mission was undertaken during a research residency at the historical Villa Medici between January 24 – February 21, 2020. As the Daniel Arasse Laureate of 2020, Mete Kutlu was attributed a grant by the French Academy of Rome and the French School of Rome. The main place of research was the Vatican Apostolic Library and the research object its unique collections of Byzantine and Ottoman manuscripts illustrated with luxurious miniatures in Constantinople. The library of the Palazzo Farnese and the Hertiziana Library housed at the Palazzo Zuccari were also major places of research providing access to numerous valuable art historical resources.',
				''
			]
		},

		'samarkand': {
			projects: [ 'firuze', 'khanum', 'time-travelling-colours' ],
			paragraphs: [
				'It is in Samarkand, in the late-fourteenth century, that the Turquoise Renaissance is initiated at the Turkic court of Timur. The “Timurid Eye” with a taste for “luminous colors” is crystalized after centuries of perpetual reorganization, revitalization and remix of the cultural panorama in Western Asia initiated by the successive reigns of different Turco-Mongol nomadic tribes.<br><br> Under the Samanid rule in the 9th and 10th centuries, Samarkand along with Bukhara becomes the scene of the Persian Renaissance, also called the Iranian Intermezzo. Between the decline of the Arab Abbasid rule and the rise of Turkic dynasties in the region, the Samanid court supports artists, poets and scientists. The Samanid initiative crystalizes a unique Persian taste which, in the following centuries of nomadic Turkish dynasties, would give birth to a unique Turco-Persian culture where nomadic, shamanistic, ancient Persian and Islamic traditions are continuously synthesized in different experimental forms following the migratory waves of different tribes. <br><br>Inheriting a unique vocabulary of brick architecture formulated by the Samanids, the artists and architects of the Ghaznevid and Qarakhanid Turkic courts (9-13th century), progressively experiment with partial claddings of turquoise glazed tiles. These initial trials give birth during the succeeding Seljuk dynasty of the Oghuz Turks, to the design and construction of façades and interiors completely covered in turquoise and blue tiles in a vast region that stretches between Khorasan and Anatolia in Western Asia. After the Mongol conquests, the Ilkhanids would expand on this tradition and transmit it to the Timurids. In the hands of the artists of the Timurid court, the star-shaped glazed tile, would become the vessel of an idealized and glittering expression of a new “taste of world”, a new worldview. The glazed tile is a brilliant representation of high civilization and sophisticated culture at the courts of the last Turkic nomads of the Persianate Western Asia. It is the culmination of scientific and intellectual development throughout centuries. It expresses the power of sciences and literature, but also of the human capacity to “transform” matter into light and reality into dream. In Samarkand, architecture becomes alchemy. <br><br>The rise of such a taste for luminous colors is also reflected in the arts of the book which sees its golden age. Just as brick surfaces of earthly ochre color are covered in radiant colors, the beige color of the manuscript folios is transformed by the sprinkles of gold and glittering metallic pigments. <br><br>After the death of Timur, his son Shahrukh moves the capital to Herat and leaves Samarkand under the rule of his son, Mirza Ulug Beg (Prince the Sublime Lord). Known as the astronomer-prince fascinated by the secrets that the stars hold, he transforms Samarkand into a center of learning and sciences. Himself skilled in mathematics and astronomy, he founds the first madrasa of Registan and an observatory in Samarkand.<br><br>Samarkand was a major research ground of the Uzbek Mission which took place between November 3 – December 2, 2021. The mission was supported by the French Institute of Central Asian Studies (IFEAC) which welcomed Mete Kutlu as a guest scholar and attributed him a grant. The research program included an archival study at the Biruni Institue of Oriental Studies in Tashkent and an architectural study in the oasis cities of Transoxiana developed through commerce along the Silk Road. The experimental study on the architectural ornaments of the Timurid period was mainly centered in Samarkand. The experiment was based on the photogrammetric 3D scanning of Timurid mosaics made of enameled tiles. With its more modest scale compared to the monumental educational complexes, mosques and palaces, the Royal Necropolis of Shah-i Zinda provided the 3D scanning mission with the most appropriate research environment. However, research was also undertaken at the Bibi Khanum Mosque, Tilla Kari Madrasa, Ulugh Beg Madrasa and Sherdor Madrasa.',
				''
			]
		},

		'seoul': {
			projects: [ 'sanshin', 'cyber-lotus' ],
			paragraphs: [
				'Seoul was the center of my field study on the Far Eastern side of the Silk Road. The project was supported by the University of Paris Est with a grant. The School of Architecture of the renown Hanyang University was the host establishment in Seoul. The research was done under the supervision of the architect and professor Ahn Keehyun, the dean of the School. The study lasted for two months between 9 December 2021 and 7 February 2022. After a two-week-long period of confinement due the pandemic, my research was divided into two parts, a first one in Seoul and a second around the Korean Peninsula. In Seoul, I conducted my research at the library of Hanyang University, the National Museum of Korea, the several palace complexes of the capital and the nearby temples of the Bukhansan Mountain. The second part took place at different “mountain temples” around the Korean peninsula.',
				''
			]
		},

		'shanghai': {
			projects: [ ],
			paragraphs: [
				'Although no field study was done in the city because of the travel restrictions placed during the pandemic, Shanghai is an integral part of this research through an academic partnership. The doctoral research of Mete Kutlu is led under the international joint supervision established between the University of Paris-Est in France and the Tongji University in Shanghai, China. Cristiana Mazzoni, Italian architect and professor of urban design, is the main supervisor on the French side, and Zhuo Jian, architect and professor at the College of Architecture and Urban Planning on the Chinese side.',
				''
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
				'Tashkent was the center of the Uzbek Mission which took place between November 3 – December 2, 2021. The mission was supported by the French Institute of Central Asian Studies (IFEAC) which welcomed Mete Kutlu as a guest scholar and attributed him a grant. The research program was divided into two periods: firstly, an architectural study in the oasis cities of Transoxiana and secondly, an archival study in Tashkent.<br><br>The study on the Timurid and Shaybanid miniature paintings took place at the Biruni Institute of Oriental Studies which houses the richest manuscript archives in Central Asia, designated as a “world heritage” by the UNESCO. The results of the research were shared at the Tashkent University of Oriental Studies thanks to the kind invitation of the turcologist Oysara Madalieva. Further potential collaborations were discussed with the Korean Ajou University in Tashkent, Amir Timur Museum and the Biruni Institue. Sanjar Gulam, a senior researcher of the Institute and the architectural researcher Nilufar Iskanadarova, contributed the project with invaluable data on the Timurid architecture, ceramics and manuscripts but also with an incredible welcoming.',
				''
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
				'The Venice mission is undertaken with the support of the Giorgio Cini Foundation in April 2022. Mete Kutlu was attributed a scholarship by the Foundation and a residency at the old Benedictine convent situated on the island of San Giorgio Maggiore.',
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
