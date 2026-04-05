export default {

	path: 'latent-voxels',
	title: 'Latent Voxels',
	subtitle: 'Computing Urban Talismans',
	location: 'Istanbul, Turkey',
	date: '2021',
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam volutpat felis vitae lorem scelerisque placerat. Quisque est dolor, euismod ac ornare vulputate, gravida ac nunc. Nunc suscipit lacinia ante non hendrerit. Donec porta ut leo eu suscipit. Nullam vitae sagittis sapien. Sed lacinia tincidunt risus non scelerisque. Pellentesque et nulla porttitor eros pharetra semper. Nam id dui nec purus condimentum pulvinar. Vivamus a tortor arcu. Ut eu lorem eu turpis vulputate gravida. Duis ut viverra risus. Quisque volutpat in enim in consequat. Mauris vitae efficitur urna, nec interdum erat. ',
	sections: [
		{
			type: 'S1',
			media: {
				source: 'public/latent-voxels/latent_intro.mp4',
				caption: 'Video Introduction',
				tags: [ 'Generative Design', '3D Miniature', 'Ottoman', 'Miniatures', 'Painting' ]
			}
		},
		{
			type: 'S2',
			paragraphs: 'Latent Voxels is a digital experiment that investigates how computational processes reshape architectural form and creative authorship in the age of artificial intelligence. The project is based on the hypothesis that design is shifting from direct composition toward procedural exploration, where forms emerge through algorithmic interpolation rather than manual construction. It is grounded in a seventeenth-century Ottoman miniature of Constantinople from an apocalyptic manuscript, which represents the city as a site of encoded knowledge and as the stage where the destiny of the cosmos is enacted.<br><br>The experiment generates imaginary and futuristic visions of Constantinople by transforming multiple three-dimensional models of the city into volumetric data structures composed of voxels, the three-dimensional equivalents of pixels. These models are converted into cloud-like fields that can merge and dissolve through a procedural system. The city appears as a continuous surface of shifting data, a vast carpet of pixels in which values change to produce different architectural forms. This approach reinterprets the anti-material and color-based conception of space found in Ottoman miniatures within a digital medium. A custom node-based workflow computes intermediate states between different urban configurations, revealing latent architectural possibilities that are not explicitly designed but discovered within the computational process as part of an investigation into human–machine collaboration in design.',
		},
		{
			type: 'S3',
			media: {
				source: 'public/latent-voxels/img/tex03.jpg',
				tags: [ 'Generative Design', '3D Miniature', 'Ottoman', 'Miniatures', 'Painting' ],
				caption: 'The Dusk of Data at the Hippodrome of Constantinople.',
				explain: '<br>Generative simulation based on a 16th-century Ottoman miniature of Constantinople, Mete Kutlu, 2021.'
			}
		},
		{
			type: 'S15',
			media: {
				source: 'https://dai.ly/xa43wvc',
				poster: 'public/latent-voxels/latent-intro.mp4.png'
			}
		},
		{
			type: 'S9',
			anchor: 'Comparative View',
			media: {
				source: 'public/bistami/02-bistami-02.jpg',
				caption: '<strong> Thinking of the apocalypse in Constantinople, now and then.</strong><br><br><strong> The prophesied conquest of Constantinople.</strong>  This miniature depicts the conquest as one of the apocalyptic portents in Ottoman eschatology, which inherited elements of Byzantine traditions. The city was to be taken by the Blessed Guide of humanity, the <em>Mahdi</em>, expected to appear in the final days before the Apocalypse and unite the world under one kingdom. From the Translation of <em>The Key to All Prophecies (Tercüme-i Miftah-i Cifr’ül Cami)</em>, originally written by Abdurrahman Bistami, an Antiochian master of the science of letters, around 1450. This miniature comes from a copy produced in Constantinople for Sultan Ahmed I around 1610. Istanbul University Library, TY 6644, fol. 91b.<br><br><strong>3D miniature of Constantinople.</strong> The miniature is transformed into a 3D environment, letting us see the same painting from different angles. The 3D model invites us into the imagination of the Ottoman painter. Artwork by the author, digital reconstruction, 2020.',
				tags: [ '3D Miniature', 'Ottoman', 'Miniatures', 'Painting' ]
			}
		},
		{
			type: 'S3',
			media: {
				source: 'public/latent-voxels/axo.mp4',
				tags: [ 'Generative Design', '3D Miniature', 'Ottoman', 'Miniatures', 'Painting' ],
				caption: 'Algorithmic Urban Dreams - Axonometric View.',
				explain: '<br>Generative simulation based on a 16th-century Ottoman miniature of Constantinople, Mete Kutlu, 2021.'
			}
		},
		{
			type: 'S16',
			text: 'Algorithmic exploration replaces<br>rational composition'
		},
		{
			type: 'S3',
			media: {
				source: 'public/latent-voxels/ai02.mp4',
				tags: [ 'Generative Design', '3D Miniature', 'Ottoman', 'Miniatures', 'Painting' ],
				caption: 'Algorithmic Urban Dreams - Top View',
				explain: '<br>Generative simulation based on a 16th-century Ottoman miniature of Constantinople, Mete Kutlu, 2021.'
			}
		},
		{
			type: 'S2',
			title: 'MAKING-OF',
		},
		{
			type: 'S3',
			anchor: 'Making-of',
			media: {
				excludeFromSphere: true,
				source: 'public/latent-voxels/img/p3.jpg',
				tags: [ 'Generative Design', '3D Miniature', 'Ottoman', 'Miniatures', 'Painting' ],
				caption: 'Oneirogens: Input Remixed City Models for Interpolation.',
				explain: 'The following urbanscapes emerge from the imagination of the AI upon its encounter with an Ottoman miniature of Byzantine Constantinople (c.1600). The 3D model of the miniature is reorganized according to 6 different kinds of plan. They are used as <em>oneirogens,</em> dream generators. Each frame generates a new interpolated, in-between configuration. 642 city models emerge during the process of transformation. Each scenario is a different oneiropolis, a dream city.',
			}
		},
		{
			type: 'S3',
			media: {
				excludeFromSphere: true,
				source: 'public/latent-voxels/img/makinof03.jpg',
				tags: [ 'Generative Design', '3D Miniature', 'Ottoman', 'Miniatures', 'Painting' ],
				caption: 'Node graph prepared in Houdini for voxel and pixel interpolation',
				explain: 'Screenshot in Houdini, Mete Kutlu, 2021.'
			}
		},
		{
			type: 'S3',
			media: {
				excludeFromSphere: true,
				source: 'public/latent-voxels/img/ss01.png',
				tags: [ 'Generative Design', '3D Miniature', 'Ottoman', 'Miniatures', 'Painting' ],
				caption: ' The interpolating solver node on the right, and the interpolated model on the left',
				explain: 'Screenshot in Houdini, Mete Kutlu, 2021.'
			}
		},
		{
			type: 'S3',
			media: {
				excludeFromSphere: true,
				source: 'public/latent-voxels/img/makinof01.jpg',
				tags: [ 'Generative Design', '3D Miniature', 'Ottoman', 'Miniatures', 'Painting' ],
				caption: 'Conversion of Compositional Assemblage To A Topological Surface',
				explain: 'Screenshot in Houdini, Mete Kutlu, 2021.'
			}
		},
		{
			type: 'S3',
			media: {
				source: 'public/latent-voxels/img/denseToRenai01.jpg',
				tags: [ 'Generative Design', '3D Miniature', 'Ottoman', 'Miniatures', 'Painting' ],
				caption: 'The Turkish Revamp of Filarete`s Ideal City',
				explain: '<br>Generative simulation based on a 16th-century Ottoman miniature of Constantinople, Mete Kutlu, 2021.'
			}
		},
		{
			type: 'S16',
			text: 'Architect as navigator'
		},
		{
			type: 'S3',
			media: {
				source: 'public/latent-voxels/img/renToRandoTop.jpg',
				tags: [ 'Generative Design', '3D Miniature', 'Ottoman', 'Miniatures', 'Painting' ],
				caption: 'Neo Filaret',
				explain: '<br>Generative simulation based on a 16th-century Ottoman miniature of Constantinople, Mete Kutlu, 2021.'
			}
		},
		{
			type: 'S2',
			anchor: 'Konstantinopelidee',
			title: 'KONSTANTINOPELIDEE',
			paragraphs: `
			Second Rome (Δεύτερη Ρώμη, Defteri Romi) in Themistios, Himerios & Libanios <br>
			New Rome (Νέα Ρώμη, Nea Romi) in Gregory of Naziance, Procopius & Paulus Silentiarius <br>
			New Jerusalem <br>
			New Zion <br>
			New Athens <br>
			Ancient city of Byzas <br>
			Center of the world <br>
			City of Constantine <br>
			Rebellious City <br>
			Regent city (βασιλεία πόλη, Basilis Polis) <br>
			Florentissima urbs in the Theodosian Codex
			The city under God's watch (Theophylaktos Polis) in Georges of Psidia, 7th c. <br>
			The eye and the heart of Earth in Micheal Psellos, Théodore Prodrome & Constantin Manassès <br>
			Theater of the universe in Manuel Holobos, Grégoire de Chypre & Théodore Métochite <br>
			The city was named Anthousa by Constantine the Great. (Eusthate, Commentarii in Dionysii Periegesin, Geographi Graeci Minores. F. Didot, p.357)
			`,
		},
		{
			type: 'S3',
			media: {
				source: 'public/latent-voxels/img/orthoToRadi.jpg',
				tags: [ 'Generative Design', '3D Miniature', 'Ottoman', 'Miniatures', 'Painting' ],
				caption: 'Oneiropolis 231',
				explain: '<br>Generative simulation based on a 16th-century Ottoman miniature of Constantinople, Mete Kutlu, 2021.'
			}
		},
		{
			type: 'S3',
			media: {
				source: 'public/latent-voxels/img/central2.jpg',
				tags: [ 'Generative Design', '3D Miniature', 'Ottoman', 'Miniatures', 'Painting' ],
				caption: 'Old Town of Mechanicals',
				explain: '<br>Generative simulation based on a 16th-century Ottoman miniature of Constantinople, Mete Kutlu, 2021.'
			}
		},
		{
			type: 'S3',
			media: {
				source: 'public/latent-voxels/img/orthoToRadi01.jpg',
				tags: [ 'Generative Design', '3D Miniature', 'Ottoman', 'Miniatures', 'Painting' ],
				caption: 'Quarter of Cybernetic Mystics',
				explain: '<br>Generative simulation based on a 16th-century Ottoman miniature of Constantinople, Mete Kutlu, 2021.'
			}
		},
		{
			type: 'S3',
			media: {
				source: 'public/latent-voxels/img/renToRando.jpg',
				tags: [ 'Generative Design', '3D Miniature', 'Ottoman', 'Miniatures', 'Painting' ],
				caption: 'Playgrounds in the Data Land',
				explain: '<br>Generative simulation based on a 16th-century Ottoman miniature of Constantinople, Mete Kutlu, 2021.'
			}
		},
		{
			type: 'S16',
			text: 'Distributed creativity'
		},
		{
			type: 'S3',
			media: {
				source: 'public/latent-voxels/ai03.mp4',
				tags: [ 'Generative Design', '3D Miniature', 'Ottoman', 'Miniatures', 'Painting' ],
				caption: 'Constantinople 2049 - The Oneiropolis 464',
				explain: '<br>Generative simulation based on a 16th-century Ottoman miniature of Constantinople, Mete Kutlu, 2021.'
			}
		},
		{
			type: 'S3',
			media: {
				source: 'public/latent-voxels/cctv.mp4',
				tags: [ 'Generative Design', '3D Miniature', 'Ottoman', 'Miniatures', 'Painting' ],
				caption: 'Algorithmic Urban Dreams - Axonometric View',
				explain: '<br>Generative simulation based on a 16th-century Ottoman miniature of Constantinople, Mete Kutlu, 2021.'
			}
		},
		{
			type: 'S3',
			media: {
				source: 'public/latent-voxels/img/tex01.jpg',
				tags: [ 'Generative Design', '3D Miniature', 'Ottoman', 'Miniatures', 'Painting' ],
				caption: 'Urban Dreams of a Young Cyborg',
				explain: '<br>Generative simulation based on a 16th-century Ottoman miniature of Constantinople, Mete Kutlu, 2021.'
			}
		},
		{
			type: 'S3',
			anchor: 'Notiones constantinopolitana',
			media: {
				source: 'public/latent-voxels/ai04.mp4',
				tags: [ 'Generative Design', '3D Miniature', 'Ottoman', 'Miniatures', 'Painting' ],
				caption: 'Notiones constantinopolitana',
				explain: '<br>Generative simulation based on a 16th-century Ottoman miniature of Constantinople, Mete Kutlu, 2021.'
			}
		},
		{
			type: 'S16',
			text: 'Design beyond human intelligence'
		},
		{
			type: 'S2',
			anchor: 'Divine Protection',
			paragraphs: `Ρώμη Φλώρα, και Κωνσταντινούπολις, ήγουν άνθουσα.<br>
			Rome was Flora, and Constantinople Anthousa.<br>
			—Jean Le Lydien, <em>De Mensibus,</em> IV, 75, ed. Wuensch, p.126, 16-17.<br><br>
			Χριστέ ó Θεος άτάραχτονκαΐ άπόλεμον φύλαττε τήν πόλιν σου.<br>
			Christ o Lord, undisturbed, protect your city from war.<br>
			—Inscription on the walls of Constantinople dating from the 11th century.<br><br>
			Σύ, Χριστέ, κόσμου βασιλεύς και δεσπότης σοί προστίθημι τήνδε τήν δούλην πόλιν και σκήπτρα τήσδε καί τό πάν 'Ρώμης κράτος φύλαττε ταύτην, σώζε δ' έκ πάσης βλάβης.<br>
			O Christ, King and Despot of the world, I added to you the slave city and the scepters of the whole Roman state. Guarded it and save it from all harm.<br>
			—Constantine the Rhodian cited by Kedrenos in <em>Historiarum compendium</em><br><br>
			ή πόλις σου Θεοτόκε<br>
			Your city, o Theotokos!<br><br>
			Της Θεοτόκου ή πόλις τη Θεοτόκω<br>
			The city of Theotokos to Theotokos<br><br>
			Είς άπειρους αιώνας εύόδωσον ταύτην.<br>
			Lord, let this city prosper for infinite centuries.<br>
			—Παραστάσεις σύντομοι χρονικαι, <em>Parastesis,</em> I, p.57, Preger.<br><br>
			`,
		},
		{
			type: 'S3',
			media: {
				source: 'public/latent-voxels/img/renToRando02.jpg',
				tags: [ 'Generative Design', '3D Miniature', 'Ottoman', 'Miniatures', 'Painting' ],
				caption: 'Friday Sunset on the Cybernetic Square',
				explain: '<br>Generative simulation based on a 16th-century Ottoman miniature of Constantinople, Mete Kutlu, 2021.'
			}
		},
		{
			type: 'S3',
			media: {
				source: 'public/latent-voxels/img/central3.jpg',
				tags: [ 'Generative Design', '3D Miniature', 'Ottoman', 'Miniatures', 'Painting' ],
				caption: 'Boulevards of Holographic Turkish Delights',
				explain: '<br>Generative simulation based on a 16th-century Ottoman miniature of Constantinople, Mete Kutlu, 2021.'
			}
		},
		{
			type: 'S3',
			media: {
				source: 'public/latent-voxels/img/orthoToRadi04.jpg',
				tags: [ 'Generative Design', '3D Miniature', 'Ottoman', 'Miniatures', 'Painting' ],
				caption: 'Neo Taksim',
				explain: '<br>Generative simulation based on a 16th-century Ottoman miniature of Constantinople, Mete Kutlu, 2021.'
			}
		},
		{
			type: 'S3',
			media: {
				source: 'public/latent-voxels/img/radiToDense01.jpg',
				tags: [ 'Generative Design', '3D Miniature', 'Ottoman', 'Miniatures', 'Painting' ],
				caption: 'Low-Energy Android Slums in Levent',
				explain: '<br>Generative simulation based on a 16th-century Ottoman miniature of Constantinople, Mete Kutlu, 2021.'
			}
		},
		{
			type: 'S3',
			media: {
				source: 'public/latent-voxels/img/denseToRenai02.jpg',
				tags: [ 'Generative Design', '3D Miniature', 'Ottoman', 'Miniatures', 'Painting' ],
				caption: 'Silicon Dreams',
				explain: '<br>Generative simulation based on a 16th-century Ottoman miniature of Constantinople, Mete Kutlu, 2021.'
			}
		},
		{
			type: 'S16',
			text: 'The city as a cosmotechnic diagram'
		},
		{
			type: 'S3',
			media: {
				source: 'public/latent-voxels/img/orthos.jpg',
				tags: [ 'Generative Design', '3D Miniature', 'Ottoman', 'Miniatures', 'Painting' ],
				caption: 'Quarter of Youngster Androids',
				explain: '<br>Generative simulation based on a 16th-century Ottoman miniature of Constantinople, Mete Kutlu, 2021.'
			}
		},
		{
			type: 'S3',
			media: {
				source: 'public/latent-voxels/img/central4.jpg',
				tags: [ 'Generative Design', '3D Miniature', 'Ottoman', 'Miniatures', 'Painting' ],
				caption: 'Ecumenical Information Processing Complex',
				explain: '<br>Generative simulation based on a 16th-century Ottoman miniature of Constantinople, Mete Kutlu, 2021.'
			}
		},
		{
			type: 'S3',
			media: {
				source: 'public/latent-voxels/streetview.mp4',
				tags: [ 'Generative Design', '3D Miniature', 'Ottoman', 'Miniatures', 'Painting' ],
				caption: 'Transmutating Electronic Urbanscapes inside the Silicon Chip',
				explain: '<br>Generative simulation based on a 16th-century Ottoman miniature of Constantinople, Mete Kutlu, 2021.'
			}
		},
		{
			type: 'S16',
			text: 'City as a carpet of pixels'
		},
		{
			type: 'S3',
			media: {
				source: 'public/latent-voxels/img/renToRando03.jpg',
				tags: [ 'Generative Design', '3D Miniature', 'Ottoman', 'Miniatures', 'Painting' ],
				caption: 'Galactic Comms Towers of Neo-Seraglio',
				explain: '<br>Generative simulation based on a 16th-century Ottoman miniature of Constantinople, Mete Kutlu, 2021.'
			}
		},
		{
			type: 'S3',
			media: {
				source: 'public/latent-voxels/img/toCentral.jpg',
				tags: [ 'Generative Design', '3D Miniature', 'Ottoman', 'Miniatures', 'Painting' ],
				caption: 'The Silicon Nymphaeum in Eminenu',
				explain: '<br>Generative simulation based on a 16th-century Ottoman miniature of Constantinople, Mete Kutlu, 2021.'
			}
		},
	]
};
