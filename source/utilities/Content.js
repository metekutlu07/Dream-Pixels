import content from '~/assets/content';

export default class Content {

	constructor() {

		Object.assign( this, content );

		const filters = new Set();

		this.projects = this.grid.filter( cell => cell.path );
		this.projects.forEach( async project => {

			const { sections } = project;

			sections
				.filter( section => section.media )
				.filter( section => section.media.tags )
				.map( async section => {

					const { tags } = section.media;
					tags.forEach( tag => filters.add( tag ) );

				} );

		} );

		this.filters.tags = Array.from( filters );

	}

	get( path ) {

		path = path.replace( /\//g, '' );

		if ( path === 'routes' ) {

			return this.projects
				.map( project => `/${ project.path }` )
				.concat( [ '/', '/experiments', '/mete-kutlu', '/about', '/contact' ] );

		} else {

			const project = this.projects.find( project => project.path === path );
			const key = path === '' ? 'home' : path;
			const view = this.views[ key ] ||
				Object.values( this.views ).find( view => view.path === `/${ path }` );
			return view || project;

		}


	}

}
