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

import {ISettings} from "../types";

class Lavalamp {

	constructor(element: HTMLElement, customSettings: ISettings) {
		console.log("constructor");
		const defaultSettings: ISettings = {
			easing: 'ease', // Easing transition
			duration: 700, // Duration of animation
			margins: false, // Whether or not to include margins
			setOnClick: false, // Whether or not to set the new active element on click
			initActiveQuery: '.active', // Initial query selector for the active element
			autoUpdate: false, // Update every interval
			updateTime: 100, // Time between update checks
			enableHover: true, // lavalamp moves with hover instead of click
			delayOn: 0, // Delay time on hover
			delayOff: 0, // Delay time off hover
			enableFocus: false, // Animate on keyboard focus
			deepFocus: false, // Animate on decendant focus
		};

		const settings: ISettings = {...defaultSettings, ...customSettings};
		const children = element.children;

		// Create lavalamp object
		const lavalampObject = document.createElement('div');
		element.prepend(lavalampObject);
	}
}

export {}
declare global {
	interface Window {
		Lavalamp: Lavalamp;
	}
}

window.Lavalamp = Lavalamp;
