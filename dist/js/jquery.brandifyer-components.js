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

		//	# brandifyer.datepickerOptions
		//	Shows .datepicker-options popup
		this.datepickerOptions = function(settings) {
			var self = this,


			//	default settings
			options = {
				element: 			'.datepicker-options',
				elementButton: 		settings.elementButton || $('.datepicker-options-btn'),
				position: 			settings.position || $('.datepicker-options-btn').position(),
				dateTypeNode: 		'.datepicker-options .date-type ul li.node',
				dateOptions: 		'.datepicker-options .date-options',
				dateOptionsNode: 	'.datepicker-options .date-options ul li.node',
				display: 			false,
				dateFormat:   		{day: 	'DD', month: 	'MM', year: 	'YYYY'}
			},
			//	--



			//	store selected node
			selected = {
				format: 	'',
				formatType: ''
			},
			//	--



			//	When user interaction with .datepicker-options-btn
			//	Add click event to document
			//	Hide .datepicker-options if not focused on .datepicker-options-btn
			focusOut = function() {		
				$(document).on('click', focusIn);
				toggleDisplay();
			},
			//	--



			//	When user interaction with .datepicker-options popup
			//	Check event.target
			//	Hide .datepicker-options panel when panel is open and user clicks outside
			focusIn = function(event) {
				//	todo
				//	prevent bubble 
				var state = $(event.target).is('li.node') || $(event.target).is('.datepicker-options-btn') || $(event.target).is('i');
				
				if(state) {
					return $(options.elementButton).focus();
				}

				//	.datepicker-options is visible
				options.display = true;
				toggleDisplay();

				//	unbind event from document
				$(document).unbind('click', focusIn);
				
			},
			//	--



			//	Toggle show/hide .datepicker-options panel
			toggleDisplay = function() {
				
				if(!options.display) {
					$(options.element).attr('display', 'display');
					return options.display = true;
				}

				if(options.display) {
					$(options.element).attr('display', 'none');
					return options.display = false;
				}
			},
			//	--



			//	When user interaction with node
			selectNode = function(event) {
				var offset;
				var node = ($(event.target).parents('.date-type').length === 1)? options.dateTypeNode:options.dateOptionsNode;
				var value = String($(event.currentTarget).attr('data-format-type'));
				

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
				if( $(event.target).parents('.date-type').length === 1 ) {

					//	When user switch between .date-type
					//	de-select each node in .date-options panel
					$(options.dateOptionsNode).each(function() {
						$(this).attr('selected', false);
					});
					
					//	adjust position of .date-options
					offset = Number($(event.currentTarget).attr('id'))-1;
					$(options.dateOptions).css({
						marginTop: 10+(35*offset)
					});

					//	store selected node value
					selected.format = value;

					$('.date-options li#2.node').attr('display', (selected.format === 'year')?'none':'display' );

					return;
				}


				//	if current target is .date-options
				if( $(event.target).parents('.date-options').length === 1 ) {
					// store selected node value
					selected.formatType = value;

					$('.date-options li#2.node').attr('display', (selected.format === 'year')?'none':'display' );
				}
				//	--

				// set new data-datepicker-format attr
				//console.log(formatDate(selected.format, selected.formatType));
				$(options.element).attr('data-datepicker-format', formatDate(selected.format, selected.formatType));
				phoneHome();
				
			},
			//	--



			//	format date-type
			formatDate = function(selected, format) {
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

						options.dateFormat.day = f;
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

						options.dateFormat.month = f;
					break;

					case 'year':
						if(format === 'number') {
							f = 'YYYY';
						}

						if(format === 'none'){
							f = '';
						}

						options.dateFormat.year = f;
					break;

				}

				d = options.dateFormat.day+ ' '+options.dateFormat.month+' '+options.dateFormat.year;
				$('.datepicker-format-output').text(d);

				return d;

			},
			//	--



			//	callback function
			phoneHome = function() {
				//console.log('calling back');
				if(options.onFormatChanged !== null) {
					return options.onFormatChanged(options.dateFormat);
				}

				console.log('New date format: ', options.dateFormat);

			},
			//	--



			//	exec didLoadDocument on init
			didLoadDocument = function() {

				//	set callback
				options.onFormatChanged = settings.onFormatChanged || null;

				$(options.elementButton).on('click', focusOut);
				

				//	set default dateFormat
				$(options.element).attr('data-datepicker-format', options.dateFormat.day+' '+options.dateFormat.month+' '+options.dateFormat.year);

				//	position datepicker-options popup
				$('.datepicker-options').css({
					top: options.position.top+20,
					left: options.position.left
				});

				//	hide on init .datepicker-options popup
				$(options.element).attr('display', 'none');

				//	if template passed
				//	load template in options.element
				//	and add event after async is complete
				if( Boolean(settings.hasOwnProperty('template')) ) {
					$(options.element).load(settings.template, function() {
						$(options.dateTypeNode).on('click', selectNode);
						$(options.dateOptionsNode).on('click', selectNode);
					});
				//	else add event
				} else {
					$(options.dateTypeNode).on(' click', selectNode);
					$(options.dateOptionsNode).on('click', selectNode);

				}

			};


			$(document).ready(function() {
				didLoadDocument();
			});


		}
		//-- end # brandifyer.datepickerOptions


		
		return this;
	}


})(jQuery);