module.exports = function(grunt) {

	grunt.initConfig({

		copy: {
			main: {
				files:[
					{src: 'bower_components/jquery/dist/jquery.min.js', dest: 'dist/js/jquery.min.js'},
					{src: 'bower_components/font-awesome/css/font-awesome.min.css', dest: 'dist/css/font-awesome.min.css'},
					{src: 'css/brandifyer-components.css', dest: 'dist/css/brandifyer-components.css'},
					{src: 'js/jquery.brandifyer-components.js', dest: 'dist/js/jquery.brandifyer-components.js'},
					{src: 'index.html', dest: 'dist/example.html'}
				]
			}
		},

		watch: {
			scripts: {
				files: ['index.html', 'js/brandifyer-components.js', 'templates/*'],
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