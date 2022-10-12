import EffectComposer from './post-processing/EffectComposer';
import RenderPass from './post-processing/RenderPass';
import VignettePass from './post-processing/VignettePass';
import CopyPass from './post-processing/CopyPass';
import MotionBlurPass from './post-processing/MotionBlurPass';
import ChromaticAberrationPass from './post-processing/ChromaticAberrationPass';
import BloomPass from './post-processing/BloomPass';

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
				enabled: true,
				color: '#000000',
				strength: { value: .5, max: 2 },
			},

			chromaticAberrationPass: {
				enabled: true,
				strength: { value: .2, max: 2 },
			},

			bloomPass: {
				enabled: false,
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
				enabled: true,
				strength: { value: .5, max: 1 },
			},

			noisePass: {
				enabled: false,
				strength: { value: .15, max: 1 },
			},

			rgbShiftPass: {
				enabled: true,
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

		this.copyPass = new CopyPass();
		this.renderPass = new RenderPass();

		this.bloomPass = new BloomPass();
		this.motionBlurPass = new MotionBlurPass();
		this.chromaticAberrationPass = new ChromaticAberrationPass();
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
		this.renderPass.camera = overrideCamera || camera;
		this.renderPass.scene = scene;
		this.composer.render();

		const { path } = Application.store;
		this.parameters.afterImagePass.enabled = path === '/contact';

	}

	onResize() {

		const { x, y } = Application.renderer.resolution;
		this.composer.setSize( x, y );

	}

}
