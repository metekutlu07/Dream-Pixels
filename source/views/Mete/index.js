import View from '~/components/View';

export default class Mete extends View {

	static path = '/mete-kutlu';
	static silent = false;

	static render() {

		css`

		mete-view {
			position: relative;
			min-width: 100vw;
			min-height: 100%;
			display: block;
			background: rgba( 0, 0, 0, .25 );
			padding-top: 350px;

			@media (max-width: 1024px) {
				padding-top: 350px;
			}

			@media (max-width: 650px) {
				padding-top: 130px;
			}

			& section {
				margin: 0 auto;
				padding: 0 calc( var(--margin-m ) * 3 ) calc( var(--margin-m ) * 3 );

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
					padding: 0 calc( var(--margin-m ) * 2 ) calc( var(--margin-m ) * 2 );
				}

				@media (max-width: 650px) {
					padding: 0 calc( var(--margin-m ) * 2 ) calc( var(--margin-s ) );
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

		<mete-view view>
			<section>
				<p>
					I'm a creative technologist and researcher based in Paris. Trained as an architect at ENSA Paris-Malaquais (2016), I began my professional career in Japan, China, and South Korea, working with architects such as Kazuyo Sejima, Kengo Kuma, Jean Sonand Wang Shu. Since 2019, I have been teaching the master's seminar <em>Metropolises in Mirror</em> at ENSA Paris-Belleville, where the city is approached as a form of writing specific to a civilization, a place, and a given moment in time. In 2025, I completed my PhD at Université Gustave Eiffel in Paris, under the joint supervision of Tongji University. Since then, I have been an associate researcher at the IPRAUS laboratory.
				</p>
				<p>
					My work operates at the intersection of premodern craft traditions and contemporary technological innovation. Focusing on the medieval Silk Road, it brings to light the existence of an algorithmic tradition of art and a computational cosmology that not only resonates with, but also constitutes a historical precursor to today's global cloud infrastructures. Research conducted along this historical corridor has led to the development of a method that confronts ancient artistic practices with contemporary digital tools, including simulation, photogrammetry, augmented reality, and machine learning.
				</p>
				<p>
					In 2020, I was awarded the Daniel Arasse Prize by the Académie française and the École française de Rome. I have conducted research at the Villa Medici in Rome, the Giorgio Cini Foundation in Venice, and the French Palace in Istanbul. My investigations into different regimes of vision have led to archival work at the Vatican Apostolic Archive, the Topkapı Palace, and the Biblioteca Marciana in Venice. In parallel, I develop projects that reconstruct and reinterpret ancient cosmologies and historical monuments through simulation and immersive media. In collaboration with UNESCO-supported foundations, start-ups, municipalities, and research laboratories, I have carried out projects in Carthage, Samarkand, Paris, and Seoul. In 2022, I was awarded the Innovative Digital Services grant from the French Ministry of Culture and led the project <em>Spolia Botanique</em>, developed in partnership with the Château de Chaumont-sur-Loire.
				</p>
				<p>
					My work unfolds between ancient myths and science-fiction narratives. It advances a non-anthropocentric vision of culture, a cosmic perspective on technology, and a non-Eurocentric understanding of the history of civilization. The world is conceived as a mathematical order composed of enigmatic symbols, a cosmopolitan ecology of intelligence. My experimental methods of design and research are grounded in non-linear, multidirectional, and layered modes of thought. Drawing from hacker culture, this approach challenges established conventions and institutional frameworks. Rather than adhering to predefined structures, I construct open-ended processes in which chance and error become central forces of creation. Within these processes, ideas emerge through iterative and generative dynamics. In contrast to the austere and restrained aesthetics of modernist abstraction, my work proposes a poetic vision of civilization in which metaphor and analogy take the place of strictly rational description. Vivid colors and dense patterns become the medium of these alternative narratives, revealing imaginary worlds embedded within both historical and technological systems.
				</p>
				<p>
					Paris, 2026.
				</p>
			</section>
		</mete-view>

		`;

	}

}

customElements.define( 'mete-view', Mete );
