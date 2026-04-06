import View from '~/components/View';

export default class About extends View {

	static path = '/about';
	static silent = false;

	constructor() {

		super();

		this.runRevealSequence = this.runRevealSequence.bind( this );

	}

	onDisconnected() {

		clearTimeout( this.revealTimeout );

	}

	async onViewChange( view ) {

		await super.onViewChange( view );

		if ( view !== this ) return;

		this.runRevealSequence();

	}

	runRevealSequence() {

		clearTimeout( this.revealTimeout );

		this.toggleAttribute( 'revealing', true );

		this.revealTimeout = setTimeout( () => {

			this.toggleAttribute( 'revealing', false );

		}, 600 );

	}

	static render() {

		const sections = [
			{
				title: 'Introduction',
				paragraphs: [
					html`Dream Pixels is a cloud platform I developed to gather the experiments of my doctoral thesis, <em>Empire of Clouds: Codes, Colors and Cosmos.</em> The first version was created in 2020 following my residency at Villa Medici in Rome. In 2023, I collaborated with Émilien François on a second iteration, establishing the visual atmosphere and interactive language of the project. The current version is the third iteration of the platform, centered on the particle cloud and completed in 2026.`
				]
			},
			{
				title: 'The Cloud Paradigm',
				paragraphs: [
					html`The cloud is not merely an infrastructure, but a technology that triggers a profound transformation in how we think, create, and understand the world. It is no longer just a tool of everyday convenience, but a central figure shaping how we perceive reality and imagine the universe. Today, we inhabit multiple forms of clouds, often without noticing them: data clouds, point clouds, noise textures, and cosmic clouds. Together, these clouds define the contours of our age. The cloud becomes the shape that thought itself begins to take. To investigate this shift, I propose a radical decentering of perspective. As the origin of Western modern thought, the Italian Renaissance has long served as a compass for tracking cultural change, establishing a human-centered model of knowledge. Yet this model is no longer sufficient to grasp the systems emerging with artificial intelligence and planetary-scale technologies. These systems are shaped not by an isolated human mind, but by distributed operations extending beyond the body and beyond the planet. This research turns instead to a largely forgotten moment of cultural flourishing along the Silk Road, particularly in the Turkish courts of Samarkand, Herat, and Constantinople in the fifteenth century.`,
					html`This period, which I refer to as the <em>Turkish Renaissance,</em> offers an alternative model of creativity in which art and technology are deeply entangled with cosmology. In this broader worldview, knowledge was not thought to arise solely from the mind, but to descend from an external and immaterial source, often described as a kind of cloud, echoing those that shape our present. Placed alongside contemporary developments in artificial intelligence, this moment reveals a hidden lineage of algorithms, pixels, computers, and simulations. What was once expressed through myth, metaphysical speculation, and occult imagination now reappears as technological reality. As we relinquish control of our destinies to clouds once more, we move further away from the anthropocentric worldview established by modernity. This worldview has brought us to the edge of ecological collapse and extinction. A return to a more planetary and cosmocentric perspective becomes possible, echoing the values of premodern civilizations that lived within a mythic understanding of the world. Such a shift allows technological development to be understood not as a force opposed to nature, but as something emerging from within its rhythms. As synthetic minds become increasingly widespread, intelligence is no longer our defining trait, but a shared capacity. Qualities such as inspiration, emotion, and subjective experience regain significance. Scientific and artistic practices shift away from linear reasoning toward immersive, spatial, and exploratory modes of inquiry. In this context, some have described the emergence of a new <em>postmodern primitivism,</em> not as a return to the past, but as a transformation in our relationship to knowledge, matter, and the universe.`
				]
			},
			{
				title: 'The Platform',
				paragraphs: [
					html`I present the cloud paradigm through Dream Pixels, an online platform built to gather and structure six years of research, design, and development. It is conceived as an immersive archive of the age of artificial intelligence, both a storage space and a database of many other clouds, including those imagined by our ancestors and those still to come. It offers a journey within a space modeled after the internal structure of artificial intelligence. This space corresponds to the high-dimensional <em>latent space</em> of machine learning models. Through algorithmic projection, thousands of dimensions are transformed into a three-dimensional navigable atmosphere. Each colorful pixel represents an algorithmic prediction of the synthetic mind. It appears as a polychrome point cloud, similar to the data of a 3D scan before interpolation into surfaces. It resembles a <em>nebula</em>, an interstellar dust cloud reflecting light gathered by the Hubble Space Telescope. It recalls a deep field image, where the James Webb Space Telescope captures thousands of galaxies in a single frame, each point becoming a galaxy containing hundreds of billions of stars. We are inside an astronomer’s cloud chamber, observing infinitesimal cosmic rays arriving from distant supernovae. We are within the Large Hadron Collider at CERN, watching protons collide at nearly the speed of light, simulating the moment just after the Big Bang. It is also the image evoked by the Mongol-era Persian mystic Shabestari: <em>a hundred blazing suns in every atom.</em> This environment forms a particulate trace of the deep entanglement between computation and cosmology. It operates simultaneously as an algorithmically sequenced datascape and a cosmic odyssey. It recalls the first analog computers built by medieval astronomers of the Silk Road, known as the astrolabe, Greek for star-taker, a device that reminds us that our gaze has always been turned toward the heavens.`
				]
			},
			{
				title: 'Navigation',
				paragraphs: [
					html`The archive unfolds as an immersive timeline navigated through color and data rather than form and object. Like the swirling clouds and atmospheric turbulence it evokes, it does not follow a straight line, but continuously folds onto itself. It is shaped by a cyclical, spiraling perception of history. It evokes the meandering body of the cosmic dragon <em>Evren,</em> believed in Turkish mythology to set the celestial spheres in motion. A mathematical function of <em>curl noise</em> introduces turbulence, temporal instability, and unpredictability, generating randomness within a larger, coherent motion. The result is a <em>sandogram</em> of a galactic empire suspended between predictive algorithms and prophecy, echoing Asimov’s <em>Foundation</em>. These are not merely metaphors, but literal descriptions. Each figure mentioned here constitutes the actual content of the cloud, accessible from any of the millions of pixels within it. At the same time, these figures define the structure of the timeline itself. This cloud of colorful dust evokes all these forms simultaneously. It can be read as a simulation of galactic formation or as a representation of the mind of an artificial intelligence. Within this convergence, the cloud paradigm becomes visible. Across scientific research, visual effects, history, and computer science, the cloud operates not only as a metaphor, but as a structuring principle. It is a medium, a method, and a mode of thought. It is turbulent and unpredictable, yet governed by underlying patterns.`
				]
			},
			{
				title: 'The Curly Cloud',
				paragraphs: [
					html`Each cluster of points corresponds to an experiment that binds art history with technology, and artistic creation with scientific inquiry. It traces the path of this doctoral journey, vaporized into millions of colored particles. Algorithms have sequenced more than 300 images and over 200 million pixels, organizing 25 experiments according to color. Each particle is a pixel extracted from an image in the archive, opening onto a different world. Together, they map six years of research and creation along the Silk Road, from Seoul to Constantinople, between 2019 and 2025. The swirling timeline also functions as an abstract map of the Silk Road, reflecting its meandering paths of exchange. It also traces the trajectory of my own journey along this route, following the diffusion of the <em>curly cloud</em> motif. Originating in Chinese art, this figure traveled alongside porcelains and silks, entering the visual vocabulary of painting traditions across Central Asia, India, Iran, and Eastern Europe. The curly cloud generated an imaginary atmosphere within manuscripts circulating across this vast region. This parallel atmosphere, animated by winds of imagination, is what the pixel cloud seeks to evoke and investigate. The motif represents the breath of the dragon, the vital force of the cosmos known in Chinese thought as <em>qi</em>. It also echoes the Sufi concept of the breath of the All-Merciful (<em>nafas al-rahmani</em>), which gives form to all existence. It is the pre-cosmic mist within which truth resides. Across architecture, it covers surfaces and dissolves structures into atmospheric fields. It evokes storms and primordial oceans, where matter emerges through turbulence. These are cosmogonic images, resonating with the music of the spheres. This was a civilization of clouds, an empire of clouds, grounded in the understanding that the world is dynamic and ever-changing. Dream Pixels brings us back into these cosmic vapors.`
				]
			},
			{
				title: 'Cosmic Rhythms',
				paragraphs: [
					html`Dream Pixels also reflects the turbulent dynamics of Earth’s atmosphere. It echoes the jet stream, the powerful winds circulating between equatorial regions and polar vortices. These flows shift over geological time in response to climatic cycles shaped by variations in Earth’s orbit and axial tilt, known as the <em>Milankovitch cycles</em>. Governed in part by planetary configurations, these cycles regulate glacial and interglacial periods. As they reshape atmospheric circulation, glaciers melt and oasis cities emerge, forming corridors of habitation. Along a band near the 40th parallel, a stabilized corridor gave rise to the major cities of the Silk Road: Beijing, Dunhuang, Kashgar, Samarkand, Tabriz, and Constantinople. These routes emerge from cosmic and atmospheric rhythms. As the medieval Persian cosmographer Qazwini observed, celestial motions shape atmospheric currents, which in turn shape trade routes. Civilization emerges from these cycles, carried by winds and planetary motion. Dream Pixels operates within this entanglement. It is a digital <em>cloud of clouds,</em> placing worlds within worlds. It forms a <em>cloud cosmogram</em>, a worldview structured around the cloud. It resists linear calculation and fixed interpretation. It unfolds as a non-linear, fractal, and kaleidoscopic space between code, color, and cosmos.`
				]
			}
		];

		css`

		about-view {
			position: relative;
			min-width: 100vw;
			min-height: 100%;
			display: block;
			background: rgba( 0, 0, 0, .80 );

			& section {
				margin: 0 auto;
				padding: calc( var(--margin-m ) * 3 ) ;

				& h3 {
					font-size: var(--font-size-l );
					font-family: var(--font-family-c );
					font-weight: bold;
					line-height: var(--line-height );
					padding-top: var( --margin-m );
					padding-bottom: var( --margin-s );
					text-transform: uppercase;
				}

				& p {
					font-size: var(--font-size-l );
					font-family: var(--font-family-c );
					font-weight: 200;
					line-height: var(--line-height );
					padding-bottom: var( --margin-s );

					@media ( max-width: 650px ) {
						font-size: 1.5rem;
					}
				}

				@media (max-width: 1024px) {
					padding: calc( var(--margin-m ) * 2 ) calc( var(--margin-m ) );
				}

				@media (max-width: 650px) {
					padding: calc( var(--margin-m ) * 2 ) calc( var(--margin-s ) );
				}

				@media (min-width: 768px) {
					max-width: 720px;
				}

				@media (min-width: 1024px) {
					max-width: 960px;
				}

				@media (min-width: 1200px) {
					max-width: 1140px;
				}

				@media (min-width: 1400px) {
					max-width: 1320px;
				}
			}
		}

		about-reveal {
			position: fixed;
			inset: 0;
			z-index: 39;
			background: var( --color-black );
			opacity: 0;
			visibility: hidden;
			pointer-events: none;
			transition:
				opacity 1.8s var( --timing-function ),
				visibility 0s linear 1.8s;

			[ revealing ] & {
				opacity: 1;
				visibility: visible;
				transition: none;
			}
		}

		about-credit {
			display: block;
			margin-top: calc( var( --margin-m ) * 2 );
			padding: 0 calc( var( --margin-s ) );
			font-family: var( --font-family-c );
			font-size: 1.5rem;
			letter-spacing: .04em;
			color: rgba( 255, 255, 255, .78 );
			pointer-events: none;
			text-align: right;

			@media ( max-width: 650px ) {
				margin-top: var( --margin-m );
				padding: 0;
			}
		}

		`;

		return html`

		<about-view view>
			<about-reveal></about-reveal>
			<section>
				${ sections.map( ( { title, paragraphs } ) => html`
					<h3>${ title }</h3>
					${ paragraphs.map( paragraph => html`<p>${ paragraph }</p>` ) }
				` ) }
				<about-credit>© Mete Kutlu, 2026</about-credit>
			</section>
		</about-view>

		`;

	}

}

customElements.define( 'about-view', About );
