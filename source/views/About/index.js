import View from '~/components/View';

export default class About extends View {

	static path = '/about';
	static silent = false;

	static render() {

		css`

		about-view {
			position: relative;
			min-width: 100vw;
			min-height: 100%;
			display: block;
			background: rgba( 0, 0, 0, .75 );

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
					font-weight: 100;
					line-height: var(--line-height );
					padding-bottom: var( --margin-s );

					@media ( max-width: 650px ) {
						font-size: 2rem;
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

		`;

		return html`

		<about-view view>
			<section>
				<h3>Introduction</h3>
				<p>
					Dream Pixels is the virtual archive of our experiments on
					<b>digital scenography and mediation.</b> We are a young
					interdisciplinary team of creatives gathered around a common passion:
					the exploration of emerging forms of
					<b>spatial and visual experience</b> in the Age of Artificial
					Intelligence. We investigate the current upheaval of our definitions of
					space, time and nature brought about by the ubiquity of algorithms and
					spatialization of pixels. And more than anything, we love colors.
				</p>
				<p>
					<b>Between tradition and innovation,</b> each experiment is a journey
					across time. Past blends with future, here with there, nature with
					technology and virtual with physical. We believe in surrealist
					juxtapositions, hip-hop remixes, nomadic adaptations, mystical
					transmutations and hacker evolutions.
				</p>

				<h3>Services</h3>
				<p>
					We develop <b>augmented reality apps</b> to be used for the mediation
					of cultural heritage as well as for design, research and education
					purposes in various disciplines. We combine augmented reality with
					<b>3D scanning</b> of artworks, plants and buildings to create ever
					more engaging experiences. We make <b>3D miniatures</b> which transform
					medieval miniature paintings into spatial immersive experiences. The
					viewer “jumps” inside a painting and takes a walk in the fantastical
					city it represents. Besides these virtual and medieval augmentations of
					the contemporary image, we use <b>machine learning</b> to reinterpret
					historical artistic traditions in a way that AI becomes the craftsman.
				</p>

				<h3>Theory</h3>
				<p>
					The archive was first designed and developed by Mete Kutlu as an
					immersive platform around 3D miniatures. His doctoral research suggests
					that the digital transition is bringing back certain dynamics of space
					and form-making which belonged to the artisanal traditions of medieval
					and premodern cultures. To investigate this
					<b>digital medievalism,</b> he suggested replacing our conventional
					reference point which is the Florentine Renaissance with the Timurid
					Renaissance and its extension, the Constantinopolitan Eye.
				</p>
				<p>
					His research followed the path on which two key pictorial figures, the
					curly cloud and the dragon were diffused along the Silk Road. During
					his doctoral journey, several creative minds around the world joined
					this dragon chase, among whom Theuns Botha and François Émilien are
					initial key talents. Today our team is mainly composed of young
					<b>artists, developers, architects and researchers.</b> On a project
					basis, our squad expands to include individuals from a wide range of
					backgrounds, such as botanists, producers, art historians,
					archeologists, urban designers and engineers.
				</p>

				<h3>Partners</h3>
				<p>
					The <b>establishments</b> which supported this research with various
					grants, sponsorships, invitations and residencies:
				</p>
				<p>
					Villa Medici, Rome<br />
					French School of Rome<br />
					Giorgio Cini Foundation, Venice<br />
					French Institute of Anatolian Studies, Istanbul<br />
					Pera Museum, Istanbul<br />
					French Ministry of Culture, Paris<br />
					ENSA Paris-Belleville, Paris<br />
					Paris-Est University, Paris<br />
					Quai d’Orsay - Jacques Chirac Museum, Paris<br />
					International Colour Association<br />
					Colour Group, London<br />
					French Institute of Central Asian Studies, Bishkek<br />
					Hanyang University, Seoul<br />
					Tokyo University of Science, Tokyo<br />
					International Academy of Arts, Dalian<br />
					Tongji University, Shanghai<br />
				</p>
			</section>
		</about-view>

		`;

	}

}

customElements.define( 'about-view', About );
