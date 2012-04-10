/**
*	TabHifi your DOM elements to create HIgh FIdelity nested interfaces !
*	@author Adrien Tichoux
*	@reviewers Julien Hedoux, Stéphane Rouillé
*	@date 2009/2010
*	@project Club AEF leclub.aef.info
*
*	Usage :
*	You need to define a ul.tabs list and a list of div.panel

*	Example:
*	<div id='Your_Wrapper'>
*		<ul class='data'>
*			<li><a href='#panel_1'>Panel 1</a></li>
*			<li><a href='#panel_2'>Panel 2</a></li>
*		</ul>	
*
*		<div class='panel' id='panel_1'></div>
*		<div class='panel' id='panel_2'></div>
*	</div>
*
*	//js : 
*	$('#wrapper').tabHiFi();
*	
*
*	Options:
*
*		style		:	'',			// Style of the transition of the panels
*		debug		: 	bolean, 	// true or false, prints the Tabifi Object in the console
*		callback	: function(){}, // Callback...
*
*/

(function($) {
		  
	$.fn.tabHiFi = function (options) {
		
		var defaults = {
			style		: '',
			callback	: function(){ return false; },
			debug		: false
		};
		
		var options = $.extend(defaults, options);
		
		// Loop on tabified objects
		return this.each(function() {
 
			function showPanel(panel){
				
				switch (options.style) {
					case 'slide': 
						function fx (e) { $(e).slideToggle('fast'); }
						panels.slideUp();
						break;
					case 'fade':
						panels.fadeOut();
						function fx (e) { $(e).fadeToggle('slow'); }
						break;
					default: 
						panels.hide();
						function fx (e) { $(e).show(); }
						break;
				} 
				fx(panels.filter(panel));
				//alert(panel);//Le soucis sur IE7 semble cenir de l� : le selecteur est pourri car toute l'URL ressot dans le ALERT...
				
				//wrapper.addClass('-wrapper');
				//wrapper.css('height',wrapper.height);
			}
			
			function showTab(tab){
				tabs.removeClass('active');
				tab.addClass('active');
			}
 
			// Define DOM Elts
			var wrapper = $(this);
			var tabs = $(this).find('ul.tabs li');
			var panels = $(this).find('.panel');
			
			// Display first panel
			
			if (tabs.hasClass('active') === true) {
				var defaultActivePanel = '#'+tabs.filter('.active').contents().filter('a').attr('href').split('#')[1];
			} else {
				showTab(tabs.eq(0));
				var defaultActivePanel = '#'+tabs.eq(0).contents().filter('a').attr('href').split('#')[1];
			}
			
			showPanel(defaultActivePanel);
			
			$(defaultActivePanel).show();
			// Display panel when tab is clicked
			tabs.contents('a').click(function() {
				if (!$(this).parent().hasClass("active")){
					tabs.target =  '#'+$(this).attr('href').split('#')[1];
					
					
						showTab($(this).parent());
						showPanel(tabs.target);
						options.callback();
					
				}
				return false;
			});
						
			// Go to next Tab 
			if ( wrapper.find('a.nextIntroBloc').length > 0 ) {
				var aGotonext = wrapper.find('a.nextIntroBloc');
				aGotonext.click( function() {
					if (wrapper.find('.tabs li.active').is(':last-child')) {
						var action = tabs.filter(':first').find('a').click();
					} else {
						var action = tabs.filter('.active').next().find('a').click();
					}
					return false;
				});
			}
			initWithAnchor(tabs);
			
		});
		
		function initWithAnchor(tabs){
			var anchor=window.location.hash;
			if(anchor!=''){
				tabs.contents('a[href='+anchor+']').click();
			}
			
		}
	};
})(jQuery);
 
jQuery.fn.fadeToggle = function(speed, easing, callback) { 
    return this.animate({opacity: 'toggle'}, speed, easing, callback); 
};