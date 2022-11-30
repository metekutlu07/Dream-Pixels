import Chevron from '~/assets/icons/Chevron';

export default class Navigation extends HTMLElement {

	onClick( event ) {

		const { currentTarget } = event;

		if ( ! currentTarget.matches( 'navigation-title' ) ) {

			const query = `[anchor="${ currentTarget.textContent }"]`;
			const element = document.querySelector( query );
			const top = element.offsetTop;

			document.body.scrollTo( { top, behavior: 'smooth' } );

		} else this.toggleAttribute( 'open' );

	}

	static render( parameters ) {

		css`

		project-navigation {
			z-index: 2;
			position: fixed;
			display: flex;
			flex-direction: column;
			right: var( --margin-m );
			top: var( --margin-m );
			border: var( --border-size ) solid var( --border-color );
			font-size: var( --font-size-s );
			font-family: var( --font-family-c );

			opacity: 0;
			transform: scale( .975 );
			transition: transform .75s var( --timing-function ), opacity .75s var( --timing-function );

			[ view-exit ] &{
				opacity: 0;
				transform: scale( .975 );
			}

			[ view-enter ] &{
				opacity: 1;
				transform: scale( 1 );
			}
		}

		navigation-title {
			padding: var( --margin-xs ) var( --margin-s );
			display: flex;
			justify-content: space-between;
			align-items: center;
			cursor: pointer;

			@media ( hover: hover ) {
				&:hover {
					background-color: rgba( 255, 255, 255, .25 );
				}
			}

			[ open ] & {
				border-bottom: var( --border-size ) solid var( --border-color );
			}

			& navigation-chevron {
				height: 25px;
				width: 25px;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			& svg {
				height: 20px;
				width: 20px;
				fill: var( --color-white );
				transform: rotate( 90deg );

				[ open ] & {
					transform: rotate( -90deg );
				}
			}

			& h3 {
				line-height: 1;
				font-size: var( --font-size-m );
			}
		}

		navigation-anchors {
			max-height: 0;
			overflow: hidden;
			padding: 0;
			overflow: scroll;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-end;
			padding: 0 var( --margin-s );

			[ open ] & {
				max-height: initial;
				padding: var( --margin-s );
			}
		}

		navigation-anchor {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: var( --margin-xs );
			cursor: pointer;

			&:after {
				content: '';
				display: block;
				height: 10px;
				width: 10px;
				border: 1px solid white;
				border-radius: 50%;
				margin-left: 10px;
			}
		}

		`;

		const content = Application.content.get( parameters.project );
		const { sections } = content;

		const anchors = sections
			.filter( section => section.anchor )
			.map( section => html`
				<navigation-anchor @click>${ section.anchor }</navigation-anchor>
			` );

		return html`

		<project-navigation blurred-background open #navigation|project-view>

			<navigation-title @click>
				<h3>Navigation</h3>
				<navigation-chevron>
					${ Chevron }
				</navigation-chevron>
			</navigation-title>

			<navigation-anchors>
				${ anchors }
			</navigation-anchors>

		</navigation-navigation>

		`;

	}

}

customElements.define( 'project-navigation', Navigation );
