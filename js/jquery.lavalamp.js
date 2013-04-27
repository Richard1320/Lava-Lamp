/**
 * Lava Lamp
 * http://www.lavalamp.magicmediamuse.com/
 *
 * Author
 * Richard Hung
 * http://www.magicmediamuse.com/
 *
 * Version
 * 1.0.0
 * 
 * Copyright (c) 2013 Richard Hung.
 * 
 * License
 * Lava Lamp by Richard Hung is licensed under a Creative Commons Attribution-NonCommercial 3.0 Unported License.
 * http://creativecommons.org/licenses/by-nc/3.0/deed.en_US
 */


(function($) {
	
	var methods = {
		init : function(settings) {

			// Set default parameters
			var defaultSettings = {
				easing:     'swing',  // Easing transition
				duration:   700,      // Duration of animation
				margins:    false,    // Whether or not to include margins
				setOnClick: false,    // Whether or not to set the new active element on click
				activeObj:  '.active' // Selector for the active element
			}; // End options
			
			// Override default options
			var settings = $.extend({}, defaultSettings, settings);
			
			return this.each(function(){
				
				// Get the options
				var easing     = settings.easing;
				var duration   = settings.duration;
				var margins    = settings.margins;
				var setOnClick = settings.setOnClick;
				var activeObj  = settings.activeObj;
				
				// Set variables
				var list   = $(this);
				var items  = list.children();
				var active = list.children(activeObj);
				
				// Set variables to object
				list.data({
					easing:   easing,
					duration: duration,
					margins:  margins
				});
				
				// Create basic structure
				list.addClass('lavalamp').css({
					position:'relative'
				});
				var obj = $('<div class="lavalamp-object" />').prependTo(list).css({
					position:'absolute'
				});
				items.addClass('lavalamp-item').css({
					zIndex:5,
					position:'relative'
				});
				
				var w  = active.outerWidth(margins);
				var h  = active.outerHeight(margins);
				var t  = active.position().top;
				var l  = active.position().left;
				var mt = active.css('marginTop');
				var ml = active.css('marginLeft');
				
				// Add margins to calculations
				if(!margins) {
					ml = parseInt(ml);
					mt = parseInt(mt);
				
					l = l + ml;
					t = t + mt;
				}
				
				obj.css({
					width:      w,
					height:     h,
					top:        t,
					left:       l
				});
				
				items.hover(function() {
					var des = $(this);
					list.lavalamp('anim',des);
				}, function() {
					list.lavalamp('anim',active);
				});
				
				if (setOnClick) {
					$(items).click(function() {
						active = $(this);
					});
				} // End set on click
				
				
			}); // End object loop
	
		}, // End init
		destroy : function() {
			return this.each(function(){
				alert('destroy');
			});
		}, // End destroy
		update : function () {
			return this.each(function(){
				alert('update');
			});
		}, // End update
		anim : function(destination) {
			var duration = this.data('duration');
			var easing   = this.data('easing');
			var margins  = this.data('margins');
			
			var obj = this.children('.lavalamp-object');
			
			var w  = destination.outerWidth(margins);
			var h  = destination.outerHeight(margins);
			var t  = destination.position().top;
			var l  = destination.position().left;
			var mt = destination.css('marginTop');
			var ml = destination.css('marginLeft');
			
			// Add margins to calculations
			if(!margins) {
				ml = parseInt(ml);
				mt = parseInt(mt);
				
				l = l + ml;
				t = t + mt;
			}
			
			obj.stop(true,false).animate({
				width:      w,
				height:     h,
				top:        t,
				left:       l
			}, duration, easing);
		} // End animate 
	}; // End method
    
	
	$.fn.lavalamp = function(method) {
		
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.lavalamp' );
		}		
		
	}; // End plugin
	
})(jQuery); 

