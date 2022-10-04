import content from '~/assets/content';

export default class Content {

	constructor() {

		Object.assign( this, content );

		// Ottoman Miniature
		// Timurid Architecture
		// Augmented Reality
		// Artificial Intelligence
		// Photogrammetry
		// Particle Simulation
		// Persian Miniature
		// Korean Architecture
		// Dragons
		// Projection Mapping

		this.projects = this.grid.filter( cell => cell.path );
		this.projects.forEach( ( project, index ) => project.index = index );

	}

	get( path ) {

		path = path.replace( /\//g, '' );

		if ( path === 'routes' ) {

			return this.projects
				.map( project => `/${ project.path }` )
				.concat( [ '/', '/projects', '/about', '/contact', '/update' ] );

		} else {

			const project = this.projects.find( project => project.path === path );
			const view = this.views[ path === '' ? 'home' : path ];
			return view || project;

		}


	}

}
