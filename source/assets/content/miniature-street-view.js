export default {

	path: 'miniature-street-view',
	title: 'Miniature Street View',
	subtitle: 'Translating Talismanic To Panoramic Projection',
	location: 'Paris',
	date: 'November 2020',
	description: '',
	sections: [
		{
			type: 'S5',
			points: [
				{
					// Le titre doit correspondre au nom du dossier dans
					// source/assets/public/miniature-street-view/Titles
					// donc pour celui-ci source/assets/public/miniature-street-view/Titles/Palace of Porphyrogenitus
					// (Voir Image_001)
					// Si les assets pour les titres ne sont pas présent dans le dossier ou que le nom ne match pas
					// alors le point se s'affichera pas
					title: 'Palace of Porphyrogenitus',

					// "paragraphs"  correspond au texte du panneau latéral
					// Si il n'ya pas de texte, alors le point n'aura pas de panneau et ne sera pas cliquable
					paragraphs: 'The Palace was constructed during the late 13th or early 14th centuries as part of the Blachernae palace complex, where the Theodosian Walls join with the later walls of the suburb of Blachernae.\nAlthough the palace appears at first glance to be named after the 10th-century emperor Constantine VII Porphyrogenitus, it was built long after his time, and is in fact named after Constantine Palaiologos, a son of the Emperor Michael VIII Palaiologos. "Porphyrogenitus", meaning literally "born to the purple", indicated a child born to a reigning emperor. The palace served as an imperial residence during the final years of the Byzantine Empire.',

					// L'image du panneau latéral (elle n'est pas obligatoirement présente)
					media: { source: 'public/virtual-miniature/000.jpg', caption: 'Palace of Porphyrygenitus' },

					// Les positions du point sur chaques panoramas
					// positions: {
					// 	1: position du point sur la sphère 1
					// 	3: position du point sur la sphère 3
					// 	5: position du point sur la sphère 5
					// }

					// Pour obtenir la position du point:
					// - Se rendre sur http://localhost:3000/miniature-street-view
					// - Ouvrir la console (https://appuals.com/open-browser-console/)
					// - Cliquer à l'endroit où le point sera défini
					// - Les coordonnées s'affichent dans la console (les arrondir au besoin)
					// (Voir Image_002)
					// - Change de panorama et répéter l'opération pour récupérer les coordonées
					positions: {
						1: { x: 13, y: 2.8, z: 6.5 }
					}
				},
				{
					title: 'Church of the Holy Apostles',
					paragraphs: 'The original church of the Holy Apostles was dedicated in about 330 by Constantine the Great, the founder of Constantinople, the new capital of the Roman Empire. The church was dedicated to the Twelve Apostles of Jesus, and it was the Emperors intention to gather relics of all the Apostles in the church. y the reign of the Emperor Justinian I, the church was no longer considered grand enough, and a new Church of the Holy Apostles was built on the same site.\nThe new church was designed and built by the architects Anthemius of Tralles and Isidorus of Miletus,the same architects of the Hagia Sophia, and was consecrated on 28 June 550. or more than 700 years, the church of the Holy Apostles was the second-most important church in Constantinople, after that of the Holy Wisdom, Hagia Sophia.',
					media: { source: 'public/virtual-miniature/001.jpg', caption: 'Church of the Holy Apostles' },
					positions: {
						1: { x: 7.3, y: 12.3, z: 4 },
						3: { x: 24.5, y: -6.2, z: 19.3 }
					}
				},
				{
					title: 'Golden Gate',
					positions: {
						1: { x: -8.1, y: 2.5, z: -30.5 }
					}
				},
				{
					title: 'Tower of Belgrade',
					positions: {
						1: { x: -1, y: 9, z: -11 }
					}
				},
				{
					title: 'Tower of Selymbria',
					// Si la propriété "panorama" est présente alors le clique déclenchera une "téléportation" au point indiqué
					// Ici, vers le panorama numéro 5
					panorama: '5',
					positions: {
						1: { x: 11, y: 7, z: -6 }
					}
				},
				{
					title: 'Armenian Quarter of Psamathia',
					positions: {
						1: { x: 13, y: 1.7, z: -6.4 }
					}
				},
				{
					title: 'Tower of Saint Romanus',
					positions: {
						1: { x: 12, y: 8, z: 1.6 }
					}
				},
				{
					title: 'Mangana Tower',
					positions: {
						2: { x: 10, y: 3.7, z: -9.9 }
					}
				},
				{
					title: 'Pisan Tower',
					positions: {
						2: { x: 13, y: 6, z: -3.5 }
					}
				},
				{
					title: 'Hagia Sofia',
					positions: {
						2: { x: 14.8, y: 1.5, z: 0 }
					}
				},
				{
					title: 'Amalfitan Tower',
					positions: {
						2: { x: 10.4, y: 9.5, z: 4.7 }
					}
				},
				{
					title: 'Venetian Tower',
					positions: {
						2: { x: 8.4, y: 7, z: 10 }
					}
				},
			]
		}
	]

};
