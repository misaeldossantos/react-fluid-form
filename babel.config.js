module.exports = api => {
	api.cache(false);
	
	const presets = [
		'@babel/preset-typescript',
		[
			'@babel/preset-env', {
				modules: false
			}
		]
	]
	const plugins = [
		'@babel/plugin-transform-runtime',
		'@babel/plugin-proposal-class-properties'
	]
	return {
		presets,
		plugins
	}
}