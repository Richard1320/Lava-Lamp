/*!
 * Lava Lamp
 * http://lavalamp.magicmediamuse.com/
 *
 * Author
 * Richard Hung
 * http://www.magicmediamuse.com/
 *
 * Version
 * 1.1.0
 * 
 * Copyright (c) 2014 Richard Hung.
 * 
 * License
 * Lava Lamp by Richard Hung is licensed under a Creative Commons Attribution-NonCommercial 3.0 Unported License.
 * http://creativecommons.org/licenses/by-nc/3.0/deed.en_US
 */


(function($) {
	
	'use strict';
	
	var methods = {
		init : function(settings) {

			// Set default parameters
			var defaultSettings = {
				easing:      'ease',    // Easing transition
				duration:    700,       // Duration of animation
				margins:     false,     // Whether or not to include margins
				setOnClick:  false,     // Whether or not to set the new active element on click
				activeObj:   '.active', // Selector for the active element
				autoUpdate:  false,     // Update every interval
				updateTime:  100,       // Time between update checks
				enableHover: true,      // lavalamp moves with hover instead of click
				delayOn:     0,         // Delay time on hover
				delayOff:    0,         // Delay time off hover
				enableFocus: false,     // Animate on keyboard focus
				deepFocus:   false,     // Animate on decendant focus 
			}; // End options
			
			// Override default options
			settings = $.extend({}, defaultSettings, settings);
			
			return this.each(function(){
				
				// Get the options
				var margins     = settings.margins;
				var setOnClick  = settings.setOnClick;
				var activeObj   = settings.activeObj;
				var autoUpdate  = settings.autoUpdate;
				var updateTime  = settings.updateTime;
				var enableHover = settings.enableHover;
				var delayOn     = settings.delayOn;
				var delayOff    = settings.delayOff;
				var enableFocus = settings.enableFocus;
				var deepFocus   = settings.deepFocus;
				var duration    = settings.duration;
				var easing      = settings.easing;
				
				// Set variables
				var list   = $(this);
				var items  = list.children();
				var active = list.children(activeObj);
				
				// Check if active element exists
				if (active.length === 0) {
					active = items.eq(0);
				}
				
				// Set variables to object
				list.addClass('lavalamp').data({
					lavalampActive: active,
					isAnim:         false,
					settings:       settings
				});
				
				// Create lavalamp object
				var obj = $('<div class="lavalamp-object '+easing+'" />').prependTo(list);
				items.addClass('lavalamp-item');
				
				// Check for CSS3 animations
				obj.css({
					WebkitTransitionDuration: duration / 1000 + 's',
					msTransitionDuration: duration / 1000 + 's',
					MozTransitionDuration: duration / 1000 + 's',
					OTransitionDuration: duration / 1000 + 's',
					transitionDuration: duration / 1000 + 's',
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
					width:     w,
					height:    h,
					transform: 'translate('+l+'px,'+t+'px)'
				});
				
				var onHover = false; // check if item is still hovered after delay
				var enAnim  = true; // temporarily disable animations when in focus
				lavalampEnter = function() {
					var des = $(this);
					onHover = true;
					
					// delay and animate
					setTimeout(function() {
						if (onHover && enAnim) {
							list.lavalamp('anim',des);
						}
					},delayOn);
					
				}; // end mousenter
				lavalampLeave = function(des) {
					des = list.data('lavalampActive');
					onHover = false;
					
					// delay and animate
					setTimeout(function() {
						if (!onHover && enAnim) {
							list.lavalamp('anim',des);
						}
					},delayOff);
					
				}; // end mouseleave

				focusIn = function() {
					var des = $(this);
					
					// Back out of deep decendents
					if (!des.hasClass('lavalamp-item')) {
						des = des.parents('.lavalamp-item');
					}
					
					enAnim = false;
					
					// delay and animate
					setTimeout(function() {
						list.lavalamp('anim',des);
					},delayOn);
					
				}; // end focus in
				focusOut = function() {
					enAnim = true;
					
					var des = list.data('lavalampActive');
					
					// delay and animate
					setTimeout(function() {
						list.lavalamp('anim',des);
					},delayOff);
				}; // end focus out
				
				// items.hover(enter, leave);
					
				
				if (enableHover) {
					list.on('mouseenter','.lavalamp-item',lavalampEnter);
					list.on('mouseleave','.lavalamp-item',lavalampLeave);
				}
				if (enableFocus) {
					list.on('focusin','.lavalamp-item',focusIn);
					list.on('focusout','.lavalamp-item',focusOut);
				}
				if (deepFocus) {
					list.on('focusin','.lavalamp-item *',focusIn);
					list.on('focusout','.lavalamp-item *',focusOut);
				}
								
								
				if (setOnClick) {
					items.click(function() {
						active = $(this);
						list.data('lavalampActive',active).lavalamp('update');
					});
				} // End set on click
				
				if (autoUpdate) {
					var updateInterval = setInterval(function() {
						var isAnim = list.data('isAnim');
						if (!onHover && !isAnim) {
							list.lavalamp('update');
						}
					}, updateTime); // End setinterval
					
					list.data('updateInterval',updateInterval);
				} // End auto update
			}); // End object loop
	
		}, // End init
		destroy : function() {
			return this.each(function(){
				var list        = $(this);
				var settings    = list.data('settings');
				var items       = list.children('.lavalamp-item');
				var enableHover = settings.enableHover;
				var enableFocus = settings.enableFocus;
				var deepFocus   = settings.deepFocus;
				var autoUpdate  = settings.autoUpdate;
				
				// Unbind the plugin effect
				if (enableHover) {
					list.off('mouseenter', '.lavalamp-item', lavalampEnter);
					list.off('mouseleave', '.lavalamp-item', lavalampLeave);
				}
				if (enableFocus) {
					list.off('focusin','.lavalamp-item',focusIn);
					list.off('focusout','.lavalamp-item',focusOut);
				}
				if (deepFocus) {
					list.off('focusin','.lavalamp-item *',focusIn);
					list.off('focusout','.lavalamp-item *',focusOut);
				}
				
				// Remove CSS
				list.removeClass('lavalamp');
				items.removeClass('lavalamp-item');
				
				// remove auto update
				if (autoUpdate) {
					var updateInterval = list.data('updateInterval');
					clearInterval(updateInterval);
				} // End auto update
				
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
				var active = list.data('lavalampActive');
				
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
			var settings = list.data('settings');
			var duration = settings.duration;
			var margins  = settings.margins;
			
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
			obj.css({
				width:     w,
				height:    h,
				transform: 'translate('+l+'px,'+t+'px)'
			});
			setTimeout(function() {
				list.data('isAnim',false);
			},duration);
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
	var lavalampEnter, lavalampLeave, focusIn, focusOut;
		
})(jQuery); 

