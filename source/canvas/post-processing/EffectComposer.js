import {

	LinearFilter,
	RGBAFormat,
	WebGLRenderTarget,
	Vector2

} from 'three';

import CopyPass from './CopyPass';

export default class EffectComposer {

	constructor( renderer, renderTarget ) {

		this.renderer = renderer;

		if ( ! renderTarget ) {

			const parameters = {

				minFilter: LinearFilter,
				magFilter: LinearFilter,
				format: RGBAFormat,
				stencilBuffer: true

			};

			const size = renderer.getSize( Vector2.get() );
			renderTarget = new WebGLRenderTarget( size.width, size.height, parameters );
			renderTarget.texture.name = 'EffectComposer.renderTargetA';

			Vector2.release( size );

		}

		this.renderTargetA = renderTarget;
		this.renderTargetB = renderTarget.clone();
		this.renderTargetB.texture.name = 'EffectComposer.renderTargetB';

		this.writeBuffer = this.renderTargetA;
		this.readBuffer = this.renderTargetB;

		this.passes = [];
		this.renderToScreen = true;

		this.copyPass = new CopyPass();

	}

	swapBuffers() {

		const buffer = this.readBuffer;
		this.readBuffer = this.writeBuffer;
		this.writeBuffer = buffer;

	}

	addPass( pass ) {

		this.passes.push( pass );

		const size = this.renderer.getSize( Vector2.get() );
		pass.setSize( size.width, size.height );

		Vector2.release( size );

	}

	insertPass( pass, index ) {

		this.passes.splice( index, 0, pass );

	}

	getLastPass() {

		let i = this.passes.length;
		let lastPass;

		while ( i-- && lastPass === undefined ) {

			if ( this.passes[ i ].enabled )
				lastPass = this.passes[ i ];

		}

		return lastPass;

	}

	render( delta ) {

		if ( this.renderToScreen ) this.getLastPass().renderToScreen = true;

		const maskActive = false;

		for ( let i = 0, l = this.passes.length; i < l; i++ ) {

			const pass = this.passes[ i ];

			if ( pass.enabled === false ) continue;

			pass.render( this.renderer, this.writeBuffer, this.readBuffer, delta, maskActive );

			if ( pass.needsSwap ) {

				if ( maskActive ) {

					const context = this.renderer.context;
					context.stencilFunc( context.NOTEQUAL, 1, 0xffffffff );
					this.copyPass.render( this.renderer, this.writeBuffer, this.readBuffer, delta );
					context.stencilFunc( context.EQUAL, 1, 0xffffffff );

				}

				this.swapBuffers();

			}

		}

	}

	reset( renderTarget ) {

		if ( renderTarget === undefined ) {

			const size = this.renderer.getSize( Vector2.get() );

			renderTarget = this.renderTargetA.clone();
			renderTarget.setSize( size.width, size.height );

		}

		this.renderTargetA.dispose();
		this.renderTargetB.dispose();

		this.renderTargetA = renderTarget;
		this.renderTargetB = renderTarget.clone();

		this.writeBuffer = this.renderTargetA;
		this.readBuffer = this.renderTargetB;

	}

	setSize( width, height ) {

		this.renderTargetA.setSize( width, height );
		this.renderTargetB.setSize( width, height );

		for ( let i = 0; i < this.passes.length; i++ )
			this.passes[ i ].setSize( width, height );

	}

}
