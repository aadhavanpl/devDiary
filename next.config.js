/** @type {import('next').NextConfig} */
module.exports = {
	async headers() {
		if (process.env.NODE_ENV === 'development') {
			return [
				{
					source: '/_next/static/css/_app-client_src_app_globals_css.css',
					headers: [
						{
							key: 'Vary',
							value: '*',
						},
					],
				},
			]
		} else {
			return []
		}
	},
	reactStrictMode: false,
}
