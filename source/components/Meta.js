export default class Meta {

	static render() {

		const {

			title,
			description,
			themes,
			skills,
			author,
			robots,
			favicon

		} = Application.content;

		const { path } = Application.store;
		const content = Application.content.get( path );
		const image = `${ content.sections ? `/${ content.path }` : '' }/share.png`;
		const keywords = `${ themes }, ${ skills }`;

		return html`

			<title>${ content.title } - ${ title }</title>

			<meta charset="utf-8"/>
			<meta name="viewport" content="width=device-width, initial-scale=1.0,, user-scalable=no">
			<meta name="robots" content="${ robots }"/>

			<link rel="icon" href="${ favicon }">
			<link rel="mask-icon" href="${ favicon }" color="#000000"/>
			<link rel="manifest" href="/public/app.webmanifest"/>
			<meta name="theme-color" content="#000000"/>

			<meta name="author" content="${ author }"/>
			<meta name="description" content="${ content.description || description }"/>
			<meta name="keywords" content="${ keywords }"/>

			<meta property="og:title" content="${ title }"/>
			<meta property="og:description" content="${ content.description || description }"/>
			<meta property="og:site_name" content="${ title }"/>
			<meta property="og:type" content="website"/>
			<meta property="og:image" content="${ image }"/>
			<meta property="og:image:width" content="1200"/>
			<meta property="og:image:height" content="630"/>

			<meta name="twitter:title" content="${ title }"/>
			<meta name="twitter:description" content="${ content.description || description }"/>
			<meta name="twitter:card" content="summary_large_image"/>
			<meta name="twitter:image" content="${ image }"/>

		`;

	}

}
