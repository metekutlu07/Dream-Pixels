export default class Effects extends HTMLElement {

	onPreFrame() {

		const path = Application.store.path;
		const isProjectPath = Application.content.projects
			.some( project => `/${ project.path }` === path );

		this.toggleAttribute( 'project-noise', isProjectPath );

	}

	static render() {

		css`

		effects-overlay {
			z-index: 30;
			position: fixed;
			inset: 0;
			width: 100vw;
			height: 100vh;
			height: calc(var(--vh, 1vh) * 100);
			pointer-events: none;

			& grid-effect,
			& noise-effect,
			& vignette-effect,
			& lines-effect {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
			}

			& grid-effect {
				background-image: url( "/public/common/Grid.svg" );
				background-size: 50px;
				background-position: center center;
				transition: opacity .5s var( --timing-function );
				opacity: 0;

				[ loading ] &,
				[ path="/experiments" ][ list="particles" ]:not( [ pixel-experience-started ] ):not( [ pixel-experience-transitioning ] ) & {
					opacity: .25;
				}
			}

			& lines-effect {
				background-image: url( "/public/common/Line.svg" );
				background-size: 2px;
				background-position: center center;
				opacity: .25;
				display: none;
			}

			& noise-effect {
				background-image: url( "/public/common/Noise.png" );
				background-repeat: repeat;
				background-size: 320px;
				background-position: 0 0;
				opacity: 0;
				display: none;
				mix-blend-mode: screen;
				filter: contrast( 175% ) brightness( 150% );
			}

			&[ project-noise ] noise-effect {
				display: block;
				opacity: .28;
				animation: project-noise-shift .28s steps( 2 ) infinite;
			}

			& vignette-effect {
				background: radial-gradient( rgba( 0, 0, 0, 0 ), rgba( 0, 0, 0, 1 ) );
				opacity: 0;
				transition: all 1s var( --timing-function );

				[ loading ] & {
					opacity: 1;
					display: none;

				}
			}

			@keyframes project-noise-shift {
				0% { background-position: 0 0; }
				25% { background-position: 37px 19px; }
				50% { background-position: -21px 44px; }
				75% { background-position: 18px -27px; }
				100% { background-position: 0 0; }
			}

		}

		`;

		return html`
			<effects-overlay #>
				<grid-effect #></grid-effect>
				<noise-effect #></noise-effect>
				<lines-effect #></lines-effect>
				<vignette-effect #></vignette-effect>
			</effects-overlay>
		`;

	}

}

customElements.define( 'effects-overlay', Effects );
