export default class S12 {

	static render( content ) {

		css`

		section-type-12 {
			padding: calc( var( --margin-m ) * 2 ) calc( var( --margin-m ) * 2 ) calc( var( --margin-m ) * 2 ) calc( var( --margin-m ) * 4 );
			display: flex;
			justify-content: flex-start;
			background: var( --color-black );
		}

		presentation-card {
			width: min( 1180px, calc( 100vw - ( var( --margin-m ) * 6 ) ) );
			display: grid;
			grid-template-columns: minmax( 0, 1fr ) minmax( 0, 1fr );
			gap: 18px;
			padding: 0;
			border: none;
			background: none;
			backdrop-filter: none;
		}

		presentation-card[ single-column ] {
			grid-template-columns: minmax( 0, 1fr );
			gap: 0;
		}

		presentation-group {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
		}

		presentation-heading {
			margin-bottom: 20px;
			font-family: var( --font-family-c );
			font-size: 2.1rem;
			font-weight: 600;
			letter-spacing: .04em;
			text-transform: none;
		}

		presentation-line,
		presentation-person {
			font-family: var( --font-family-c );
			font-size: 1.75rem;
			line-height: 1.6;
		}

		presentation-stack {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
		}

		presentation-stack + presentation-stack,
		presentation-line + presentation-line,
		presentation-person + presentation-person {
			margin-top: 10px;
		}

		presentation-stack + presentation-stack {
			margin-top: 44px;
		}

		@media ( max-width: 1024px ) {
			presentation-card {
				grid-template-columns: 1fr;
				gap: 40px;
				padding: 40px 32px;
			}
		}

		@media ( max-width: 650px ) {
			section-type-12 {
				padding: var( --margin-m ) var( --margin-s );
			}

			presentation-card {
				width: 100%;
				padding: 0;
				gap: 28px;
			}

			presentation-heading {
				font-size: 1.9rem;
			}
		}

		`;

		const { sponsor = [], partners = [], team = [], anchor } = content;

		const flattenedTeam = [];

		team.forEach( block => {

			( block.people || [] ).forEach( person => {

				if ( flattenedTeam.includes( person ) ) return;
				flattenedTeam.push( person );

			} );

		} );

		const leaderName = team.find( block => block.leader )?.people?.[ 0 ];
		const orderedTeam = [
			...( leaderName ? [ `${ leaderName } (Team Leader)` ] : [] ),
			...flattenedTeam.filter( person => person !== leaderName )
		];
		const hasTeam = orderedTeam.length > 0;

		return html`

		<section-type-12 section ${ anchor ? `anchor="${ anchor }"` : '' }>
			<presentation-card ${ hasTeam ? '' : 'single-column' }>
				<presentation-group>
					<presentation-stack>
						<presentation-heading>Sponsor</presentation-heading>
						${ sponsor.map( line => html`<presentation-line>${ line }</presentation-line>` ) }
					</presentation-stack>
					<presentation-stack>
						<presentation-heading>Partners</presentation-heading>
						${ partners.map( line => html`<presentation-line>${ line }</presentation-line>` ) }
					</presentation-stack>
				</presentation-group>

				${ hasTeam ? html`
					<presentation-group>
						<presentation-heading>Team</presentation-heading>
						${ orderedTeam.map( person => html`<presentation-person>${ person }</presentation-person>` ) }
					</presentation-group>
				` : '' }
			</presentation-card>
		</section-type-12>

		`;

	}

}
