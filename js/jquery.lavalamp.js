/**
 * Lava Lamp
 * http://lavalamp.magicmediamuse.com/
 *
 * Author
 * Richard Hung
 * http://www.magicmediamuse.com/
 *
 * Version
 * 1.0.6
 * 
 * Copyright (c) 2014 Richard Hung.
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
				easing:      'swing',   // Easing transition
				duration:    700,       // Duration of animation
				margins:     false,     // Whether or not to include margins
				setOnClick:  false,     // Whether or not to set the new active element on click
				activeObj:   '.active', // Selector for the active element
				autoUpdate:  false,     // Update every interval
				updateTime:  100,       // Time between update checks
				enableHover: true       // lavalamp moves with hover instead of click
			}; // End options
			
			// Override default options
			var settings = $.extend({}, defaultSettings, settings);
			
			return this.each(function(){
				
				// Get the options
				var easing      = settings.easing;
				var duration    = settings.duration;
				var margins     = settings.margins;
				var setOnClick  = settings.setOnClick;
				var activeObj   = settings.activeObj;
				var autoUpdate  = settings.autoUpdate;
				var updateTime  = settings.updateTime;
				var enableHover = settings.enableHover;
				
				// Set variables
				var list   = $(this);
				var items  = list.children();
				var active = list.children(activeObj);
				
				// Check if active element exists
				if (active.length == 0) {
					active = items.eq(0);
				}
				
				// Set variables to object
				list.data({
					easing:      easing,
					duration:    duration,
					margins:     margins,
					setOnClick:  setOnClick,
					active:      active,
					enableHover: enableHover,
					isAnim:      false
				});
				
				// Create basic structure
				list.addClass('lavalamp').css({
					position: 'relative'
				});
				var obj = $('<div class="lavalamp-object" />').prependTo(list).css({
					position: 'absolute'
				});
				items.addClass('lavalamp-item').css({
					zIndex:   5,
					position: 'relative'
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
					width:  w,
					height: h,
					top:    t,
					left:   l
				});
				
				var onHover = false;
				lavalampEnter = function() {
					var des = $(this);
					onHover = true;
					list.lavalamp('anim',des);
				}; // end mousenter
				lavalampLeave = function() {
					var des = list.data('active');
					onHover = false;
					list.lavalamp('anim',des);
				}; // end mouseleave
				
				// items.hover(enter, leave);
					
				
				if (enableHover) {
					list.on('mouseenter','.lavalamp-item',lavalampEnter);
					list.on('mouseleave','.lavalamp-item',lavalampLeave);
				}
								
				if (setOnClick) {
					items.click(function() {
						active = $(this);
						list.data('active',active).lavalamp('update');
					});
				} // End set on click
				
				if (autoUpdate) {
					setInterval(function() {
						var isAnim = list.data('isAnim');
						if (onHover == false && isAnim == false) {
							list.lavalamp('update');
						}
					}, updateTime); // End setinterval
				} // End auto update
			}); // End object loop
	
		}, // End init
		destroy : function() {
			return this.each(function(){
				var list        = $(this);
				var items       = list.children('.lavalamp-item');
				var enableHover = list.data('enableHover');
				
				// Unbind the plugin effect
				if (enableHover) {
					list.off('mouseenter', '.lavalamp-item', lavalampEnter);
					list.off('mouseleave', '.lavalamp-item', lavalampLeave);
				}
				
				// Remove CSS
				list.removeClass('lavalamp');
				items.removeClass('lavalamp-item');
				
				// Remove the lavalamp object
				list.children('.lavalamp-object').remove();
				
				// Remove data from wrapper
				list.removeData();
				
			});
		}, // End destroy
		update : function () {
			return this.each(function(){
				var list   = $(this);
				var items  = list.children(':not(.lavalamp-object)');
				var active = list.data('active');
				var obj    = list.children('.lavalamp-object');
				
				// reset list objects
				items.addClass('lavalamp-item').css({
					zIndex:5,
					position:'relative'
				});
				
				// reset to active item
				list.lavalamp('anim',active);
				
			});
		}, // End update
		anim : function(destination) {
			var list     = this;
			var duration = list.data('duration');
			var easing   = list.data('easing');
			var margins  = list.data('margins');
			
			var obj = list.children('.lavalamp-object');
			
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
			
			list.data('isAnim',true);
			obj.stop(true,false).animate({
				width:  w,
				height: h,
				top:    t,
				left:   l
			}, duration, easing, function() {
				list.data('isAnim',false);
			});
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
	
	// Create outer variables
	var lavalampEnter, lavalampLeave;
		
})(jQuery); 

