export default {

	path: 'robertus',
	title: 'Robertus',
	subtitle: 'Augmented Basilica',
	location: 'Paris',
	date: 'January 2023',
	team: 'Mete Kutlu & Theuns Botha',
	period: 'January - November 2022',
	description: ' ',
	sections: [
		{
			type: 'S1',
			media: {
				source: 'public/gilbertus/gilbertus-intro.mp4',
				caption: 'Gilbertus Video Introduction',
				tags: [ '3D Scanning', 'Augmented Reality', 'French', 'Architectural Heritage' ]

			}
		},
		{
			type: 'S2',
			title: 'Robertus: An Augmented Church',
		},
		{
			type: 'S3',
			media: {
				source: 'public/gilbertus/stories.mp4',
				caption: 'Visualize large-scale architectural environments in AR',
				tags: [ '3D Scanning', 'Augmented Reality', 'French', 'Architectural Heritage' ]
			}
		},
		{
			type: 'S3',
			media: {
				source: 'public/gilbertus/stories-animation.mp4',
				caption: 'Immerse yourself in large-scale architectural settings from France',
				tags: [ '3D Scanning', 'Augmented Reality', 'French', 'Architectural Heritage' ]
			}
		},
		{
			type: 'S3',
			media: {
				source: 'public/gilbertus/choeur.jpg',
				caption: 'Photo of the choir before restoration and painting, Basilica of Notre-Dame-du-Port, Clermont-Ferrand',
				tags: [ '3D Scanning', 'Augmented Reality', 'French', 'Architectural Heritage' ]
			}
		},
		{
			type: 'S3',
			media: {
				source: 'public/gilbertus/stories-context.mp4',
				caption: 'Modelling',
				tags: [ '3D Scanning', 'Augmented Reality', 'French', 'Architectural Heritage' ]
			}
		},
		{
			type: 'S2',
			anchor: 'Making-of',
			title: 'Making-of',
		},
		{
			type: 'S3',
			media: {
				excludeFromSphere: true,
				source: 'public/gilbertus/stories-animate.mp4',
				caption: 'Animation and interaction design for the church apse in Reality Composer',
				tags: [ '3D Scanning', 'Augmented Reality', 'French', 'Architectural Heritage' ]
			}
		},
		{
			type: 'S3',
			media: {
				excludeFromSphere: true,
				source: 'public/gilbertus/stories-material.jpg',
				caption: 'Material design for the churche apse in Quixel Mixer',
				tags: [ '3D Scanning', 'Augmented Reality', 'French', 'Architectural Heritage' ]
			}
		},
	]
};
