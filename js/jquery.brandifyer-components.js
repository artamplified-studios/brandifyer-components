/*
*	Brandifyer components (jquery plugin)
* 	Version: 0.1.0
*	Copyright © Sabern
*	Author: Kiran Mertopawiro
*	Email: 	kiran@sabern.com
*	--
*	Dependencies: jQuery
*	load jQuery before this!
*
*/
(function($) {

	$.fn.brandifyer = function() {
		//console.log('init jquery plugin Brandifyer');

		//	default settings
		var options = {
			element: 			'.brandifyer .datepicker-options',
			elementButton: 		'.datepicker-options-btn',
			position: 			$('.brandifyer .datepicker-options-btn'),
			dateTypeNode: 		'.datepicker-options .date-type ul li.node',
			dateOptions: 		'.brandifyer .datepicker-options .date-options',
			dateOptionsNode: 	'.datepicker-options .date-options ul li.node',
			display: 			false,
			position: 			$('.datepicker-options-btn').position()	
		};
		//	--

		var dateFormat = {
			day: 		'DD',
			month: 		'MMMM',
			year: 		'YYYY'
		};

		var selected = {};


		//	datepicker options
		//	used to format date
		this.datepickerOptions = function(template, callback) {
			//console.log('position:', options.position);

			options.callback = callback || null;

			$(options.element).attr('display', 'none');

			//	set default dateFormat
			$(options.element).attr('data-datepicker-format', dateFormat.day+' '+dateFormat.month+' '+dateFormat.year);

			$('.datepicker-options').css({
				left: '231px'
			});
			$(options.elementButton).on('click', toggleDisplay);

			//	if template passed
			//	load template in options.element
			//	and bind event after async is complete
			if(template !== 'undefined' || '') {
				$(options.element).load(template, function() {
					$(options.dateTypeNode).on('click', selectNode);
					$(options.dateOptionsNode).on('click', selectNode);
					phoneHome();
				});
			//	else init event
			} else {
				$(options.dateTypeNode).on('click', selectNode);
			}


			// Show/hide datepicker options panel
			function toggleDisplay() {
				//console.log(options.display);
				if(!options.display) {
					$(options.element).attr('display', 'display');
					return options.display = true;
				}

				if(options.display) {
					$(options.element).attr('display', 'none');
					return options.display = false;
				}
			}
			//	--


			//	When user interaction with node
			function selectNode(event) {
				var offset;
				var node = ($(event.currentTarget).parent().parent().hasClass('date-type'))? options.dateTypeNode:options.dateOptionsNode;
				var value = $(event.currentTarget).text().toLowerCase().replace(/ /g, '');

				//console.log( $(event.currentTarget).parent().parent().hasClass('date-options'));
				//	each .node in .date-type
				//	de-select each .node
				$(node).each(function() {
					$(this).attr('selected', false);
				});
				//	highlight new selected .node
				$(this).attr('selected', true);

				//	show .date-options panel
				$(options.dateOptions).attr('display', 'display');
				

				//	if current target is .date-type
				if($(event.currentTarget).parent().parent().hasClass('date-type')){
					
					offset = Number($(event.currentTarget).attr('id'))-1;
					$(options.dateOptions).css({
						marginTop: 10+(35*offset)
					});

					return selected.format = value;
				}

				//	if current target is .date-options
				//	adjust position
				if($(event.currentTarget).parent().parent().hasClass('date-options')) {	
					selected.formatType = value;
				}
				//	--

				// set new data-datepicker-format attr
				//console.log(formatDate(selected.format, selected.formatType));
				$(options.element).attr('data-datepicker-format', formatDate(selected.format, selected.formatType));
				options.callback();
				
			}
			//	--


			//	format date-type
			function formatDate(selected, format) {
				//console.log(selected, format);
				var f;

				switch(selected) {
					case 'day':
						if(format === 'number') {
							f = 'DD'
						}

						if(format === 'name') {
							f = "dddd";
						}

						if(format === 'none') {
							f = ' ';
						}

						dateFormat.day = f;
					break;

					case 'month':
						if(format === 'number') {
							f = 'Mo'
						}

						if(format === 'name') {
							f = "MMMM";
						}

						if(format === 'none') {
							f = ' ';
						}

						dateFormat.month = f;
					break;

					case 'year':
						if(format === 'number') {
							f = YYYY;
						}

						if(format === 'none'){
							f = ' ';
						}

						dateFormat.year = f;
					break;

				}

				return dateFormat.day+ ' '+dateFormat.month+' '+dateFormat.year;

			}



			//	callback function
			function phoneHome() {
				//console.log('calling back');
				if(options.callback !== null) {
					options.callback();
				}


			}

			return this;
		}
		//	--


		
		return this;
	}


})(jQuery);