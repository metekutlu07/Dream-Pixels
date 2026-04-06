import EffectComposer from './post-processing/EffectComposer';
import RenderPass from './post-processing/RenderPass';
import VignettePass from './post-processing/VignettePass';
import CopyPass from './post-processing/CopyPass';
import MotionBlurPass from './post-processing/MotionBlurPass';
import ChromaticAberrationPass from './post-processing/ChromaticAberrationPass';
import WeakChromaticAberrationPass from './post-processing/WeakChromaticAberrationPass';
import BloomPass from './post-processing/BloomPass';
import NoisePass from './post-processing/NoisePass';

import AfterImagePass from './post-processing/AfterImagePass';
import GlitchPass from './post-processing/GlitchPass';
import RGBShiftPass from './post-processing/RGBShiftPass';
import SlicesPass from './post-processing/SlicesPass';

export default class PostProcessing {

	constructor() {

		Application.events.add( this );

		this.parameters = Application.store.add( 'PostProcessing', {

			enabled: true,

			vignettePass: {
				enabled: false,
				color: '#000000',
				strength: { value: .25, max: 2 },
			},

			chromaticAberrationPass: {
				enabled: true,
				strength: { value: .3, max: 2 },
			},

			weakChromaticAberrationPass: {
				enabled: true,
				strength: { value: .15, max: 2 },
			},

			bloomPass: {
				enabled: true,
				strength: { value: .75, max: 1 },
				radius: { value: .05, max: 5 },
				threshold: { value: .75, max: 1 },
			},

			motionBlurPass: {
				enabled: false,
				strength: { value: 1.5, max: 2 }
			},

			afterImagePass: {
				enabled: true,
				strength: { value: .975, min: .75, max: 1 }
			},

			glitchPass: {
				enabled: false,
				strength: { value: .5, max: 2 },
				size: { value: .25, max: 1 }
			},

			linesPass: {
				enabled: false,
				strength: { value: .5, max: 1 },
			},

			noisePass: {
				enabled: false,
				scale: { value: 8, max: 8 },
				strength: { value: .15, max: 1 },
			},

			rgbShiftPass: {
				enabled: false,
				strength: { value: 1e-5, max: 1e-2 },
				angle: { value: 0, max: 1 }
			},

			slicesPass: {
				enabled: false,
				count: { value: 2, max: 10, step: 1 },
				offset: { value: .025, max: 1 },
				speed: {
					x: { value: 0, max: 1 },
					y: { value: .05, max: 1 }
				}
			}

		} );

		this.passTargets = {

			afterImagePass: [
				{ path: '/' },
				{ path: '/contact' }
			],

			bloomPass: [
				{ path: '/' },
				{ path: '/experiments', list: 'sphere' }
			],

			chromaticAberrationPass: [
				{ path: '/' },
				{ path: '/experiments', list: 'sphere' }
			],

			weakChromaticAberrationPass: [
				{ path: '/experiments', list: 'particles' },
				{ path: '/virtual-miniature' }

			],

			noisePass: [
				{ path: '/experiments', list: 'places' },
				{ path: '/experiments', list: 'grid' },
				{ path: '/augustus' },
			]

		};

		this.copyPass = new CopyPass();
		this.renderPass = new RenderPass();

		this.bloomPass = new BloomPass();
		this.motionBlurPass = new MotionBlurPass();
		this.chromaticAberrationPass = new ChromaticAberrationPass();
		this.weakChromaticAberrationPass = new WeakChromaticAberrationPass();
		this.noisePass = new NoisePass();
		this.vignettePass = new VignettePass();

		this.afterImagePass = new AfterImagePass();
		this.glitchPass = new GlitchPass();
		this.rgbShiftPass = new RGBShiftPass();
		this.slicesPass = new SlicesPass();

		this.composer = new EffectComposer( Application.renderer );
		this.composer.addPass( this.renderPass );

		this.composer.addPass( this.bloomPass );
		this.composer.addPass( this.motionBlurPass );
		this.composer.addPass( this.chromaticAberrationPass );
		this.composer.addPass( this.weakChromaticAberrationPass );
		this.composer.addPass( this.noisePass );
		this.composer.addPass( this.afterImagePass );
		this.composer.addPass( this.glitchPass );
		this.composer.addPass( this.rgbShiftPass );
		this.composer.addPass( this.slicesPass );
		this.composer.addPass( this.vignettePass );

		this.composer.addPass( this.copyPass );

	}

	onPreFrame() {

		Application.renderer.info.autoReset = ! this.parameters.enabled;

	}

	onRender() {

		if ( ! this.parameters.enabled ) return;

		Application.renderer.info.reset();

		const { overrideCamera, camera, scene } = Application;

		const hasActivePass = (
			this.isPassEnabled( 'vignettePass' ) ||
			this.isPassEnabled( 'chromaticAberrationPass' ) ||
			this.isPassEnabled( 'weakChromaticAberrationPass' ) ||
			this.isPassEnabled( 'bloomPass' ) ||
			this.isPassEnabled( 'noisePass' ) ||
			this.isPassEnabled( 'motionBlurPass' ) ||
			this.isPassEnabled( 'afterImagePass' ) ||
			this.isPassEnabled( 'glitchPass' ) ||
			this.isPassEnabled( 'rgbShiftPass' ) ||
			this.isPassEnabled( 'slicesPass' )
		);

		const activeCamera = overrideCamera || camera;

		if ( ! hasActivePass ) {

			Application.metrics.renderMode = 'renderer';
			Application.renderer.render( scene, activeCamera );
			return;

		}

		Application.metrics.renderMode = 'composer';
		this.renderPass.camera = activeCamera;
		this.renderPass.scene = scene;
		this.composer.render();

	}

	onResize() {

		const { x, y } = Application.renderer.resolution;
		this.composer.setSize( Math.round( x * .75 ), Math.round( y * .75 ) );

	}

	isPassEnabled( passID ) {

		const parameters = this.parameters[ passID ];
		if ( ! parameters || ! parameters.enabled ) return false;

		const targets = this.passTargets[ passID ];
		if ( ! targets || ! targets.length ) return true;

		return !! this.getPassTarget( passID );

	}

	getPassTarget( passID ) {

		const targets = this.passTargets[ passID ];
		if ( ! targets || ! targets.length ) return true;

		return targets.find( target => this.matchesTarget( target ) );

	}

	matchesTarget( target = {} ) {

		const state = {
			path: Application.store.path,
			list: Application.store.list,
			particles: Application.store.particles,
			places: Application.store.places
		};

		return Object
			.entries( target )
			.every( ( [ key, value ] ) => {

				const stateValue = state[ key ];
				return Array.isArray( value ) ? value.includes( stateValue ) : stateValue === value;

			} );

	}

}
