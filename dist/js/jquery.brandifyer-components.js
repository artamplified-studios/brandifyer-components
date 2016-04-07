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
	'use strict';
	/*jslint todo: true */
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
				dateFormat:   		{day: 	'DD', month: 	'MM', year: 	'YYYY'},
				interval: 			null,
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
				console.log('what the f')
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




		//	# brandifyer.modal
		//	display overlay
		//	--
		//	todo
		//	rewrite to be able to have multple instances
		//	study jquery plugins dealing with multiple instances
		this.modal = function(settings) {
			//console.log('init modal');
			var self = this,

			//	defaults
			options = {
				modalButton: 		$('.brandifyer-modal-btn'),
				modalElement: 		$('#'+$('.brandifyer-modal-btn').attr('data-target-modal')),
				size: 				{width: '100%', height: '100%'},
				backgroundColor: 	'rgba(0,0,0,0.2',
				display: 			false,
				onModalOpen: 		function() {},
				onModalClose: 		function() {}
			},
			//	--



			//	When user interaction with .brandifyer-modal-btn
			//	toggle modal
			toggleModal = function(event) {
				//console.log('toggle modal', (self.selector === ' '));
				//	set target modalElement
				options.modalElement = (self.selector === '')?$('#'+$(event.target).attr('data-target-modal')):$('#'+self.selector);

				//	bind event transitionend
				$(options.modalElement).on('transitionend', closeModal);

				if(!options.display) {
					$(document).on('click', eventOnModal);
				} else {
					$(document).unbind('click', eventOnModal);
				}

				toggleDisplay();
			},
			//	--




			//	Toggle show/hide .datepicker-options panel	
			toggleDisplay = function() {
				//console.log(options.display);
				if(!options.display) {
					$(options.modalElement).attr('display', 'display');
					options.interval = setInterval(addTransition, 100);
					return options.display = true;
				}

				if(options.display) {
					$(options.modalElement).attr('transition', 'none');
					return options.display = false;
				}
			},
			//	--

			

			//	add transition after display attr has been set
			//	*cannot have transition if display attr is present
			addTransition = function() {
				$(options.modalElement).attr('transition', 'normal');
				clearInterval(options.interval);
			},
			//	--



			//	Check if modal is visible
			//	Set attr display after modal transitionend
			//	Trigger callback
			closeModal = function() {
				//console.log('options frome closemodal', options);
				if(options.display) {
					onModalOpen();
					return false;
				}

				onModalClose();
				$(options.modalElement).attr('display', 'none');
			},
			//	--



			//	When user interaction with custom close button
			//	force modal close
			close = function() {	
				//console.log( $(options.modalButton.selector+"[data-target-modal='"+this.data.selector+"']") )
				//	re-set modalElement
				//	re-set modalButton
				options.modalElement = $(this.data.selector);
				options.modalButton = $(options.modalButton.selector+"[data-target-modal='"+this.data.selector+"']");		
				$(options.modalButton).trigger('click');
			},
			//	--



			//	callback function when modal is opened and transition is finsihed
			onModalOpen = function() {
				options.onModalOpen();
			},
			//	--



			//	callback function when modal is closed and transition is finished
			onModalClose = function() {
				options.onModalClose();
			},
			//	--

			

			//	Event on modal
			//	When modal is open check if click on modal
			//	Close modal if click on modal
			eventOnModal = function(event) {
				var state =  $(event.target).is('div.brandifyer-modal');

				if(! $(event.target).is('div.brandifyer-modal') ) {
					return;
				}

				//	modal is visible
				//	close when toggle
				options.display = true;
				toggleDisplay();

				//	unbind event from document
				$(document).unbind('click', eventOnModal);
			
			},
			//	--


			//	tester
			mrfoo = function() {
				return 'hello, this is mrfoo from brandifyer.modal';
			},


			//	exec didLoadDocument on init
			didLoadDocument = function() {
				//console.log('didLoadDocument')
				//	hide modal on init
				$(options.modalElement).attr('display', 'none');


				//	add event click toggleModal
				$(options.modalButton).on('click', toggleModal);

			};


			//	public api
			return {
				options: options,
				close: close,
				mrfoo: mrfoo,
				init: didLoadDocument,
				data: this
			}
			//	--

		}
		//-- end # brandifyer.modal

		return this.each(function () {
            new $.modal($(this), options);
        });
	}

	$(document).ready(function() {
		//console.log('ready');
		$.fn.brandifyer().modal().init();
	});

})(jQuery);