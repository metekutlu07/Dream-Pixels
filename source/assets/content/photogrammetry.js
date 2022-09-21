export default {

	// "path" should be the same as the folder containing the assets in /public
	// It is also use for the project's url, like this dreampixels.fr/photogramettry
	path: 'photogrammetry',
	title: 'Photogrammetry',
	subtitle: '3D Web Experience',
	description: '',

	// The thumbnail displayed on the projects list, could be an image or a video

	// Sections types are as below:
	// - S1 is a fullscreen introduction video with overlayed title
	// - S2 is a text only section with a title and some paragraphs
	// - S3 is fullscreen video or image, to add controls to the video,
	// 	add "controls: true"" in the parameters: media: [ { source: '', caption: '', controls: true } ]
	// - S4 is the byzantine miniature picture with some text on the right
	// - S5 is a 3D WebGL scene with informational panels
	// - S6 is the photogramety library

	sections: [ {
		type: 'S6',
		artworks: {
			'france-01-annunciation': {
				title: 'Annunciation',
				location: 'Church of Saint Foy',
				city: 'Conques'
			},
			'france-02-stories-of-mary': {
				title: 'Stories of Mary',
				location: 'Basilica of Notre-Dame-du-Port',
				city: 'Clermont-Ferrand'
			},
			'france-03-fountain-of-choir': {
				title: 'Fountain of Choir',
				location: 'Basilica of Saint-Urbain',
				city: 'Troyes'
			},
			'france-04-gate-of-apocalypse': {
				title: 'Gate of Apocalypse',
				location: 'Ladies\' Abbey',
				city: 'Saintes'
			},
			'france-07-adoration-of-the-magi': {
				title: 'Adoration of the Magi',
				location: 'Saint Mary Magdalena\'s Church',
				city: 'Neuilly-en-Donjon'
			},
			'france-08-temptation-of-jesus': {
				title: 'Temptation of Jesus',
				location: 'Cathedral of Saint Lazarus',
				city: 'Autun'
			},
			'france-09-saint-trophimes': {
				title: 'Saint Trophimes',
				location: 'Church of Saint Trophime',
				city: 'Arles'
			},
			'france-11-last-judgement': {
				title: 'Last Judgement',
				location: 'Cathedral of Saint Lazarus',
				city: 'Arles'
			},
			'france-12-fantastical-hunt': {
				title: 'Fantastical Hunt',
				location: 'Chruch of Saint Pierre',
				city: 'Aulnay'
			},
			'france-13-rivers-of-paradise': {
				title: 'Rivers of Paradise',
				location: 'Cluny Abbey',
				city: 'Cluny'
			},
			'france-14-pillar-of-saints': {
				title: 'Pillar of Saints',
				location: 'Cathedral of Notre-Dame',
				city: 'Chartres'
			},
			'france-15-fall-of-adam': {
				title: 'Fall of Adam',
				location: 'Cluny Abbey',
				city: 'Cluny'
			},
			'venice-01-lorenzo-veneziano': {
				title: 'Lorenzo Veneziano',
				location: '',
				city: ''
			},
			'venice-06-san-marco\'s-saints': {
				title: 'San Marco\'s Saints',
				location: '',
				city: ''
			},
			'venice-14-paolo-veneziano': {
				title: 'Paolo Veneziano',
				location: '',
				city: ''
			},
			'venice-28-san-marco\'s-mary': {
				title: 'San Marco\'s Mary',
				location: '',
				city: ''
			},
			'venice-42-lingzhi-kimono': {
				title: 'Lingzhi Kimono',
				location: '',
				city: ''
			}
		}
	} ]
};
