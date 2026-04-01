export default {

	path: 'augustus',
	title: 'Augustus',
	subtitle: 'An Augmented Promenade in Medieval Paris',
	location: 'Paris',
	date: 'December 2022',
	team: 'Mete Kutlu & Theuns Botha',
	partners: 'Comet Lab, AUSser Laboratory, Éditions La commune',
	client: 'Philippe Auguste Foundation',
	period: 'Ongoing',
	description: ' ',
	sections: [
		{
			type: 'S1',
			media: {
				source: 'public/augustus/motion-tracking.mp4',
				caption: 'Video Introduction of the Augustus AR App',
				tags: [ 'Augmented Reality', 'Virtual Reconstruction', 'French', 'Architectural Heritage', ]
			}
		},
		{
			type: 'S2',
			paragraphs: 'Philippe Auguste 3D is an augmented reality application that offers an immersive, life-size reconstruction of the first medieval fortifications of Paris. Developed between 2021 and 2023 with the support of the Fondation Philippe Auguste, and in collaboration with the AUSser laboratory (CRS) and Comet Lab, it is the first of seven augmented reality applications I produced during my doctoral research. This project is grounded in the idea that augmented reality can operate as a new mythopoeic medium for the contemporary city, reshaping how urban space is perceived and narrated. It builds on a critical reflection on the use of AR in enhancing urban perception and architectural heritage mediation. By constructing hybrid experiences between past and future, and between physical and virtual environments, the project explores the potential influence of digital cartography, immersive media, and spatial computing on urban experience.<br><br>At its core, Philippe Auguste 3D reconstructs the first medieval fortifications of Paris, known as the Wall of Philippe Augustus, based on surviving architectural evidence and historical records. The AR application, developed as an unpublished prototype, enables users to visualize the reconstructed wall in situ when they are near its original location. They can walk along its path and pass through the gates of medieval Paris while navigating the streets of the contemporary city. This project is the first to achieve such a level of spatial precision at the scale of the city and in outdoor conditions. The reconstructed wall is aligned with millimetric accuracy to the surviving fragments and historical traces embedded in today’s urban fabric. In addition to the mobile application, I also produced an animated visualization that overlays the thirteenth-century wall onto a three-dimensional map of modern Paris, tracing its spatial resonances.',
		},
		{
			type: 'S12',
			sponsor: [
				'Philippe Auguste Foundation'
			],
			partners: [
				'Paris-Belleville School of Architecture',
				'AUSser Laboratory (CNRS 3329)',
				'IPRAUS Laboratory',
				'Comet Lab (R&D)'
			],
			team: [
				{
					role: 'Team Leader',
					leader: true,
					people: [ 'Mete Kutlu' ]
				},
				{
					role: 'Historical Research',
					people: [ 'Flavia Magliacani', 'Reza Japalaghi', 'Pierre-Baptiste Tartas', 'Franck Senet', 'Angel Badillo' ]
				},
				{
					role: '2D Mapping & GIS',
					people: [ 'Flavia Magliacani', 'Pierre-Baptiste Tartas' ]
				},
				{
					role: '3D Mapping & Modelling',
					people: [ 'Mete Kutlu' ]
				},
				{
					role: 'AR Development',
					people: [ 'Mete Kutlu', 'Theuns Botha' ]
				},
				{
					role: '3D Scanning',
					people: [ 'Sri Sahiti Vemavarapu', 'Tugce Topada' ]
				},
				{
					role: 'Animation',
					people: [ 'Mete Kutlu' ]
				},
				{
					role: 'Senior Expert',
					people: [ 'Cristiana Mazzoni', 'Jean Attali' ]
				}
			]
		},
		{
			type: 'S13',
			media: {
				source: 'https://youtu.be/eMNpolIMDtI?si=DOZwlPLNVOmXJdaz'
			}
		},
		{
			type: 'S10',
			anchor: 'Introduction',
			media: {
				source: 'public/augustus/mockup01.mp4',
				caption: 'Life-size virtual reconstruction of the Montgomery Tower seen in augmented reality.',
				explain: 'Screen recording during application stability test in Saint Paul, Paris.',
				tags: [ 'Augmented Reality', 'Virtual Reconstruction', 'French', 'Architectural Heritage', ]
			}
		},
		{
			type: 'S8',
			media: {
				source: 'public/augustus/experience.jpg',
				caption: 'Tour Montgomery in AR, Saint Paul, Paris.',
				explain: '<br>Screenshots and photographs during the user experience test.',
				tags: [ 'Augmented Reality', 'Virtual Reconstruction', 'French', 'Architectural Heritage', ]
			}
		},
		{
			type: 'S3',
			media: {
				source: 'public/augustus/mockup-home.mp4',
				caption: '',
				tags: [ 'Augmented Reality', 'Virtual Reconstruction', 'French', 'Architectural Heritage', ]
			}
		},
		{
			type: 'S3',
			media: {
				centeredText: true,
				source: 'public/augustus/cristiana.mp4',
				caption: 'User experience test with an iPad in Saint Paul.',
				tags: [ 'Augmented Reality', 'Virtual Reconstruction', 'French', 'Architectural Heritage', ]
			}
		},
		{
			type: 'S2',
			anchor: 'Storyboard',
			title: 'Storyboard',
		},
		{
			type: 'S10',
			media: {
				centeredText: true,
				source: 'public/augustus/gps.jpg',
				caption: 'Geofencing system and GPS-based notifications',
				tags: [ 'Augmented Reality', 'Virtual Reconstruction', 'French', 'Architectural Heritage', ]
			}
		},
		{
			type: 'S9',
			media: {
				source: 'public/augustus/stops01.jpg',
				centeredText: true,
				caption: 'Stop 1: Rue Clovis. Screenshots during AR experience.',
				tags: [ 'Augmented Reality', 'Virtual Reconstruction', 'French', 'Architectural Heritage', ]
			}
		},
		{
			type: 'S9',
			media: {
				centeredText: true,
				source: 'public/augustus/stops03.jpg',
				caption: 'Stop 3: Firestation. Screenshots during AR experience.',
				tags: [ 'Augmented Reality', 'Virtual Reconstruction', 'French', 'Architectural Heritage', ]
			}
		},
		{
			type: 'S9',
			media: {
				centeredText: true,
				source: 'public/augustus/stops04.jpg',
				caption: 'Stop 4: La Tournelle. Screenshots during AR experience.',
				tags: [ 'Augmented Reality', 'Virtual Reconstruction', 'French', 'Architectural Heritage', ]
			}
		},
		{
			type: 'S9',
			media: {
				centeredText: true,
				source: 'public/augustus/stops02.jpg',
				caption: 'Stop 5: Montgomery Tower. Screenshots during AR experience.',
				tags: [ 'Augmented Reality', 'Virtual Reconstruction', 'French', 'Architectural Heritage', ]
			}
		},
		{
			type: 'S9',
			media: {
				centeredText: true,
				source: 'public/augustus/stops05.jpg',
				caption: 'Stop 5: Montgomery Tower. Screenshots during AR experience.',
				tags: [ 'Augmented Reality', 'Virtual Reconstruction', 'French', 'Architectural Heritage', ]
			}
		},
		{
			type: 'S2',
			title: 'Iconographic Research',
			anchor: 'Iconographic Research',
		},
		{
			type: 'S10',
			media: {
				source: 'public/augustus/miniature01.jpg',
				caption: 'Paris by Jean Fouquet, illumination from the manuscript of the Hours of Étienne Chevalier, around 1452, Metropolitan Museum of New York, 1975.1.2490',
				tags: [ 'Augmented Reality', 'Virtual Reconstruction', 'French', 'Architectural Heritage', ]
			}
		},
		{
			type: 'S10',
			media: {
				source: 'public/augustus/miniature02.jpg',
				caption: 'The Ile de la Cité seen from the West, illumination from the manuscript of a Book of Hours, circa 1440, Latin MS 164, folio 254v, John Rylands University Library, Manchester, England.',
				tags: [ 'Augmented Reality', 'Virtual Reconstruction', 'French', 'Architectural Heritage', ]
			}
		},
		{
			type: 'S10',
			media: {
				source: 'public/augustus/miniature03.jpg',
				caption: 'Siege of Avignon (118v), Siege of Melun (259r), Cession of Auxerre and Siege of Avalon (folio 262r), Les Grandes Chroniques de France, Royal MS 16 G IV, British Library, London.',
				tags: [ 'Augmented Reality', 'Virtual Reconstruction', 'French', 'Architectural Heritage', ]
			}
		},
		{
			type: 'S2',
			title: 'Workflow',
			anchor: 'Workflow',
		},
		{
			type: 'S10',
			media: {
				excludeFromSphere: true,
				source: 'public/augustus/workflow.jpg',
				caption: '',
				tags: [ 'Augmented Reality', 'Virtual Reconstruction', 'French', 'Architectural Heritage', ]
			}
		},
		{
			type: 'S2',
			title: 'Developing with ARKit',
			anchor: 'Developing with ARKit',
		},
		{
			type: 'S9',
			media: {
				excludeFromSphere: true,
				source: 'public/augustus/code01.jpg',
				caption: 'Importing assets inside an AR view. Screenshot in Xcode.',
				tags: [ 'Augmented Reality', 'Virtual Reconstruction', 'French', 'Architectural Heritage', ]
			}
		},
		{
			type: 'S9',
			media: {
				excludeFromSphere: true,
				source: 'public/augustus/code01.jpg',
				caption: 'Importing assets inside an AR view. Screenshot in Xcode.',
				tags: [ 'Augmented Reality', 'Virtual Reconstruction', 'French', 'Architectural Heritage', ]
			}
		},
		{
			type: 'S9',
			media: {
				excludeFromSphere: true,
				source: 'public/augustus/code02.jpg',
				caption: 'Anchoring 3D models to 3D object targets. Screenshot in Xcode.',
				tags: [ 'Augmented Reality', 'Virtual Reconstruction', 'French', 'Architectural Heritage', ]
			}
		},
		{
			type: 'S2',
			title: '3D Models',
			anchor: '3D Models',
		},
		{
			type: 'S9',
			media: {
				excludeFromSphere: true,
				source: 'public/augustus/uvmap.jpg',
				caption: 'UV mapping of 3D models',
				tags: [ 'Augmented Reality', 'Virtual Reconstruction', 'French', 'Architectural Heritage', ]
			}
		},
		{
			type: 'S9',
			media: {
				excludeFromSphere: true,
				source: 'public/augustus/scene.jpg',
				caption: 'Scene setup',
				tags: [ 'Augmented Reality', 'Virtual Reconstruction', 'French', 'Architectural Heritage', ]
			}
		},
		{
			type: 'S9',
			media: {
				excludeFromSphere: true,
				source: 'public/augustus/interaction.jpg',
				caption: 'Integrating interactive properties to scenes in Reality Composer',
				tags: [ 'Augmented Reality', 'Virtual Reconstruction', 'French', 'Architectural Heritage', ]
			}
		},
		{
			type: 'S2',
			title: 'SDK Testing',
			anchor: 'SDK Testing',
		},
		{
			type: 'S9',
			media: {
				excludeFromSphere: true,
				source: 'public/augustus/test-unity.mp4',
				caption: 'Initial tests with Vuforia in Unity',
				tags: [ 'Augmented Reality', 'Virtual Reconstruction', 'French', 'Architectural Heritage', ]
			}
		},
	]
};
