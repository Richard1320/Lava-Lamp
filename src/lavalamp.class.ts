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
	wrapper: HTMLElement;
	lavalampObject: HTMLDivElement;
	settings: ISettings;
	children: HTMLCollection;

	constructor(wrapper: HTMLElement, customSettings: ISettings) {
		this.wrapper = wrapper;
		this.wrapper.classList.add("lavalamp");
		this.children = wrapper.children;

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
			deepFocus: false, // Animate on descendant focus
		};

		this.settings = {...defaultSettings, ...customSettings};

		// Create lavalamp object
		this.lavalampObject = document.createElement('div');
		this.lavalampObject.classList.add("lavalamp__object");
		this.lavalampObject.style.transitionDuration = `${this.settings.duration / 1000}s`;
		this.wrapper.prepend(this.lavalampObject);

	}
}

declare global {
	interface Window {
		Lavalamp: Lavalamp;
	}
}

// @ts-ignore
window.Lavalamp = Lavalamp;
