import Parser from './Parser';
import manifest from 'manifest';

export default class Assets {

	constructor() {

		this.manifest = manifest;

		this.parser = new Parser();
		this.dampingFactor = .05;
		this.dampingFactor = .5;
		this.percentLoaded = 0;
		this.progress = 0;

		this.files = {};

		Application.events.add( this );

	}

	onProgress( event ) {

		const { type, loaded, currentTarget } = event;
		const { path } = currentTarget;
		const { length } = this.manifest.packs[ path ];

		const progress = Math.clamp( loaded / length, 0, 1 );
		this.files[ path ].progress = progress;

		if ( type === 'load' ) {

			const { response } = currentTarget;
			this.files[ path ].buffer = response;
			this.files[ path ].isLoading = false;

		}

	}

	onUpdate() {

		if ( ! this.isLoading ) return;

		const files = Object.values( this.files );
		const progress = this.getProgress();

		this.progress = Math.lerp( this.progress, progress, this.dampingFactor );
		this.percentLoaded = Math.ceil( this.progress * 100 );

		if ( this.percentLoaded < 100 ) return;

		this.isLoading = false;

		files
			.filter( file => ! file.isLoaded )
			.forEach( file => file.resolve( file ) );

		files.forEach( file => file.isLoaded = true );

	}

	async load( paths ) {

		if ( ! Array.isArray( paths ) ) paths = [ paths ];

		paths = paths
			.filter( path => ! this.files[ path ] )
			.filter( path => this.manifest.packs[ path ] );

		if ( ! paths.length ) return;

		this.isLoading = true;
		this.progress = 0;
		this.percentLoaded = 0;

		const entries = await Promise.all( paths.map( this.fetch ) );
		const files = Object.fromEntries( entries );
		Object.assign( this, files );

		Application.events.dispatch( 'onLoad', files );

	}

	async fetch( path ) {

		if ( this.files[ path ] ) return;

		const file = await new Promise( resolve => {

			this.files[ path ] = {

				isLoading: true,
				progress: 0,
				resolve

			};

			const request = new XMLHttpRequest();
			const responseType = 'arraybuffer';
			Object.assign( request, { path, responseType } );

			request.addEventListener( 'progress', this.onProgress );
			request.addEventListener( 'load', this.onProgress );

			request.open( 'GET', `packs/${ path }.pack` );
			request.send();

		} );

		delete file.resolve;
		const files = this.sort( await this.parser.unpack( file.buffer ) );
		return [ path, files ];

	}

	sort( files ) {

		const categories = {};
		const types = {

			models: /glb/g,
			svgs: /svg/g,
			jsons: /json/g,
			buffers: /(wav|m4a|mp3)/g,
			textures: /(jpg|png)/g,
			arraybuffers: /(buffer)/g

		};

		files.forEach( file => {

			for ( const type in types ) {

				const { path, data } = file;
				const regExp = types[ type ];

				if ( ! path.match( regExp ) ) continue;
				if ( ! categories[ type ] ) categories[ type ] = {};
				categories[ type ][ path ] = data;

			}

		} );

		return categories;

	}

	get( path ) {

		return this[ path.toLowerCase() ];

	}

	getProgress() {

		const files = Object
			.values( this.files )
			.filter( file => ! file.isLoaded );

		const loaded = files.reduce( ( total, file ) => total + file.progress, 0 );
		const progress = loaded / ( files.length || 1 );
		return Math.clamp( progress, 0, 1 );

	}

}
