export default class Profiler extends HTMLElement {

	onConnected() {

		this.frameCount = 0;
		this.frameTimeSum = 0;
		this.lastSampleTime = performance.now();
		this.fps = 0;
		this.frameMs = 0;
		this.isLocalhost = [ 'localhost', '127.0.0.1' ].includes( location.hostname );

		if ( ! this.isLocalhost ) this.toggleAttribute( 'hidden', true );

	}

	onPostFrame() {

		if ( ! this.isLocalhost ) return;

		this.frameCount++;
		this.frameTimeSum += Application.time.deltaTime;

		const now = performance.now();
		const elapsed = now - this.lastSampleTime;

		if ( elapsed < 500 ) return;

		this.fps = Math.round( this.frameCount * 1e3 / elapsed );
		this.frameMs = this.frameTimeSum / this.frameCount;
		this.frameCount = 0;
		this.frameTimeSum = 0;
		this.lastSampleTime = now;

		const { fps, frame, drawcalls, triangles, picking, preview, render, sim, dpr } = this.elements;
		const metrics = Application.metrics || {};
		const previewVisible = !! Application.imagePreview?.hasAttribute( 'visible' );
		const postProcessing = Application.postProcessing?.parameters?.enabled;

		fps.textContent = `${ this.fps } fps`;
		frame.textContent = `${ this.frameMs.toFixed( 1 ) } ms`;
		drawcalls.textContent = `${ Application.renderer.info.render.calls } calls`;
		triangles.textContent = `${ Application.renderer.info.render.triangles } tris`;
		picking.textContent = `pick ${ ( metrics.particlePickMs || 0 ).toFixed( 2 ) } ms`;
		preview.textContent = `preview ${ ( metrics.previewLoadMs || 0 ).toFixed( 0 ) } ms${ previewVisible ? ' open' : '' }`;
		render.textContent = `${ postProcessing ? ( metrics.renderMode || 'composer' ) : 'renderer' }`;
		sim.textContent = `sim ${ metrics.simulationState || 'idle' }`;
		dpr.textContent = `dpr ${ window.devicePixelRatio }`;

	}

	static render() {

		css`

		perf-profiler {
			position: fixed;
			right: 14px;
			top: 14px;
			z-index: 60;
			padding: 10px 12px;
			display: flex;
			flex-direction: column;
			gap: 4px;
			border: 1px solid rgba( 255, 255, 255, .35 );
			background: rgba( 0, 0, 0, .72 );
			font-family: var( --font-family-c );
			font-size: 11px;
			line-height: 1.25;
			color: rgba( 255, 255, 255, .92 );
			pointer-events: none;
			min-width: 120px;

			&[ hidden ] {
				display: none;
			}
		}

		`;

		return html`

		<perf-profiler>
			<div #fps>0 fps</div>
			<div #frame>0.0 ms</div>
			<div #drawcalls>0 calls</div>
			<div #triangles>0 tris</div>
			<div #picking>pick 0.00 ms</div>
			<div #preview>preview 0 ms</div>
			<div #render>renderer</div>
			<div #sim>sim idle</div>
			<div #dpr>dpr 1</div>
		</perf-profiler>

		`;

	}

}

customElements.define( 'perf-profiler', Profiler );
