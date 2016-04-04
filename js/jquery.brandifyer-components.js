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


		//	# brandifyer.datepickerOptions
		//	used to format date
		this.datepickerOptions = function(settings) {
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
				month: 		'MM',
				year: 		'YYYY'
			};

			var selected = {};
			//console.log('position:', options.position);

			options.onFormatChanged = settings.onFormatChanged || null;

			$(options.element).attr('display', 'none');

			//	set default dateFormat
			$(options.element).attr('data-datepicker-format', dateFormat.day+' '+dateFormat.month+' '+dateFormat.year);

			$('.datepicker-options').css({
				left: options.position.left
			});
			
			$(options.elementButton).on('click', toggleDisplay);

			//	if template passed
			//	load template in options.element
			//	and bind event after async is complete
			if( Boolean(settings.hasOwnProperty('template')) ) {
				$(options.element).load(settings.template, function() {
					$(options.dateTypeNode).on('click', selectNode);
					$(options.dateOptionsNode).on('click', selectNode);
					//phoneHome();
				});
			//	else init event
			} else {
				$(options.dateTypeNode).on('click', selectNode);
				$(options.dateOptionsNode).on('click', selectNode);
				//phoneHome();
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
				var value = String($(event.currentTarget).attr('data-format-type'));//$(event.currentTarget).text().toLowerCase().replace(/ /g, '');
				//console.log(value);
				//	each .node in .date-type
				//	de-select each .node
				$(node).each(function() {
					$(this).attr('selected', false);
				});
				//	highlight new selected .node
				$(this).attr('selected', true);

				//	show .date-options panel
				$(options.dateOptions).attr('display', 'display');

				//	reset display nodes
				$('.date-options li#2.node').removeAttr('display');

				//	if current target is .date-type
				if($(event.currentTarget).parent().parent().hasClass('date-type')){

					$(options.dateOptionsNode).each(function() {
						$(this).attr('selected', false);
					});
					
					offset = Number($(event.currentTarget).attr('id'))-1;
					$(options.dateOptions).css({
						marginTop: 10+(35*offset)
					});

					selected.format = value;

					$('.date-options li#2.node').attr('display', (selected.format === 'year')?'none':'display' );

					return;
				} 


				//	if current target is .date-options
				//	adjust position
				if($(event.currentTarget).parent().parent().hasClass('date-options')) {	
					selected.formatType = value;

					$('.date-options li#2.node').attr('display', (selected.format === 'year')?'none':'display' );
				}
				//	--

				// set new data-datepicker-format attr
				//console.log(formatDate(selected.format, selected.formatType));
				$(options.element).attr('data-datepicker-format', formatDate(selected.format, selected.formatType));
				phoneHome();
				
			}
			//	--


			//	format date-type
			function formatDate(selected, format) {
				//console.log(selected, format);
				var f,d;

				switch(selected) {
					case 'day':
						if(format === 'number') {
							f = 'DD'
						}

						if(format === 'name') {
							f = "dddd";
						}

						if(format === 'none') {
							f = '';
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
							f = '';
						}

						dateFormat.month = f;
					break;

					case 'year':
						if(format === 'number') {
							f = 'YYYY';
						}

						if(format === 'none'){
							f = '';
						}

						dateFormat.year = f;
					break;

				}

				d = dateFormat.day+ ' '+dateFormat.month+' '+dateFormat.year;
				$('.datepicker-format').text(d);

				return dateFormat.day+ ' '+dateFormat.month+' '+dateFormat.year;

			}



			//	callback function
			function phoneHome() {
				//console.log('calling back');
				if(options.onFormatChanged !== null) {
					return options.onFormatChanged(dateFormat);
				}

			}

			return this;
		}
		//-- end # brandifyer.datepickerOptions


		
		return this;
	}


})(jQuery);