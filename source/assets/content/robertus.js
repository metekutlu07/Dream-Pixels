export default {

	path: 'robertus',
	title: 'Robertus',
	subtitle: 'Augmented Basilica',
	location: 'Paris, France',
	date: '2023',
	team: 'Mete Kutlu & Theuns Botha',
	period: 'January - November 2022',
	description: ' ',
	sections: [
		{
			type: 'S1',
			media: {
				source: 'public/robertus/robertus-hero.mp4',
				caption: 'Gilbertus Video Introduction',
				tags: [ '3D Scanning', 'Augmented Reality', 'French', 'Architectural Heritage' ]

			}
		},
		{
			type: 'S2',
			paragraphs: 'Robertus is an augmented reality application that reconstructs the architectural context of a scanned sculptural element through an immersive spatial experience. The project focuses on a capital from the Basilica of Notre-Dame du Port in Clermont-Ferrand, which is reintegrated into a three-dimensional reconstruction of the apse. The user is placed within a life-size reconstruction of the church, moving through its galleries and vaults.<br><br>The application investigates how fragmented or displaced objects can be recontextualized within their original architectural system. In the museum, casts are presented as isolated elements. Here, the sculptural fragment becomes part of a reconstructed spatial ensemble. The experience unfolds progressively, with architectural components assembling around the user. This process enables a direct perception of the relationships between ornament, structure, and space, transforming the scanned object into an active element within a coherent architectural environment.',
		},
		{
			type: 'S12',
			groups: [
				{
					title: 'Partner',
					lines: [ 'Comet Lab' ]
				},
				{
					title: 'Team',
					lines: [ 'Mete Kutlu', 'Theuns Botha' ]
				},
				{
					title: 'Location',
					lines: [ 'Cité de l’architecture, Paris' ]
				}
			],
		},
		{
			type: 'S13',
			media: {
				source: 'https://youtu.be/oI9_U7eZME0',
				note: 'Choose high resolution in the settings at the top right corner.'
			}
		},
		{
			type: 'S3',
			media: {
				source: 'public/robertus/stories.mp4',
				caption: 'Visualization of large-scale architectural environments in AR.',
				explain: 'An AR application for iOS, developed with Xcode and Reality Composer by Mete Kutlu and Theuns Botha, 2023.',
				tags: [ '3D Scanning', 'Augmented Reality', 'French', 'Architectural Heritage' ]
			}
		},
		{
			type: 'S3',
			media: {
				source: 'public/robertus/stories-animation.mp4',
				caption: '3D reconstruction of the basilica\'s apse.',
				explain: '<br>Basilica of Notre-Dame du Port in Clermont-Ferrand, 12th, century. 3D modeling in Cinema 4D and asset creation with Quixel tools by Mete Kutlu, 2023.',
				tags: [ '3D Scanning', 'Augmented Reality', 'French', 'Architectural Heritage' ]
			}
		},
		{
			type: 'S3',
			media: {
				source: 'public/robertus/choeur.jpg',
				caption: 'Photo of the choir before restoration and painting, Basilica of Notre-Dame-du-Port, Clermont-Ferrand.',
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
				source: 'public/robertus/stories-animate.mp4',
				caption: 'Animation and interaction design for the church apse in Reality Composer.',
				explain: '<br>Basilica of Notre-Dame du Port in Clermont-Ferrand, 12th, century. Designed in Reality Composer by Mete Kutlu, 2023.',
				tags: [ '3D Scanning', 'Augmented Reality', 'French', 'Architectural Heritage' ]
			}
		},
		{
			type: 'S3',
			media: {
				excludeFromSphere: true,
				source: 'public/robertus/stories-material.jpg',
				caption: 'Material design for the churche apse in Quixel Mixer.',
				explain: '<br>Basilica of Notre-Dame du Port in Clermont-Ferrand, 12th, century. Designed in Quixel Mixer by Mete Kutlu, 2023.',
				tags: [ '3D Scanning', 'Augmented Reality', 'French', 'Architectural Heritage' ]
			}
		},
		{
			type: 'S3',
			media: {
				source: 'public/robertus/stories-context.mp4',
				caption: 'Material design for the churche apse in Quixel Mixer.',
				explain: '<br>Basilica of Notre-Dame du Port in Clermont-Ferrand, 12th, century. Designed in Quixel Mixer by Mete Kutlu, 2023.',				tags: [ '3D Scanning', 'Augmented Reality', 'French', 'Architectural Heritage' ]
			}
		},
	]
};
