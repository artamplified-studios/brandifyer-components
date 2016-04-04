module.exports = function(grunt) {

	grunt.initConfig({

		copy: {
			main: {
				files:[
					{src: 'bower_components/jquery/dist/jquery.min.js', dest: 'dist/js/jquery.min.js'},
					{src: 'node_modules/moment/min/moment.min.js', dest: 'dist/js/moment.min.js'},
					{src: 'bower_components/font-awesome/css/font-awesome.min.css', dest: 'dist/js/font-awesome.min.css'},
					{src: '**', expand:true, cwd: 'css', dest: 'dist/css'},
					{src: '**', expand:true, cwd: 'js', dest: 'dist/js'},
					{src: '**', expand:true, cwd: 'templates', dest: 'dist/templates'},
					{src: 'index.html', dest: 'dist/example.html'},

					{src: '**', expand:true, cwd: 'bower_components/font-awesome/fonts', dest: 'dist/fonts/'}
				]
			}
		},

		watch: {
			scripts: {
				files: ['index.html', 'js/jquery.brandifyer-components.js', 'templates/*', 'css/brandifyer-components.css'],
				tasks: ['copy'],
				options: {
					debounceDelay: 250,
				},
			},
		},

	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['copy', 'watch']);

};