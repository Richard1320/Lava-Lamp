/**
 * Lava Lamp
 * http://lavalamp.magicmediamuse.com/
 *
 * Author
 * Richard Hung
 * http://www.magicmediamuse.com/
 *
 * Version
 * 2.0.0
 *
 * Copyright (c) 2021 Richard Hung.
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
	children: NodeListOf<HTMLElement>;
	activeElement: HTMLElement;
	isAnimating: boolean;
	isFocused: boolean;
	isHovered: boolean;

	/**
	 * Initialize lavalamp plugin on DOM.
	 * Assign values to plugin variables.
	 * Create lavalamp object div element and bind all applicable event listeners.
	 *
	 * @param wrapper HTML element of the direct parent wrapper
	 * @param customSettings
	 */
	constructor(wrapper: HTMLElement, customSettings: ISettings) {
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

		// Initialize classes and declare properties
		this.wrapper = wrapper;
		this.wrapper.classList.add("lavalamp");
		for (let i = 0; i < this.wrapper.children.length; i++) {
			this.wrapper.children[i].classList.add("lavalamp__item");
		}
		this.children = wrapper.querySelectorAll(".lavalamp__item");
		this.activeElement = wrapper.querySelector(this.settings.initActiveQuery);

		// Create lavalamp object
		this.lavalampObject = document.createElement('div');
		this.lavalampObject.classList.add("lavalamp__object");
		this.lavalampObject.style.transitionDuration = `${this.settings.duration / 1000}s`;
		this.wrapper.prepend(this.lavalampObject);

		// Bind hover events
		if (this.settings.enableHover) {
			this.children.forEach((element: HTMLElement) => {
				element.addEventListener("mouseenter", this.mouseEnter.bind(this));
				element.addEventListener("mouseleave", this.mouseLeave.bind(this));
			});
		}

		// Bind focus events
		if (this.settings.deepFocus) {
			this.wrapper.querySelectorAll("*").forEach((element: HTMLElement) => {
				element.addEventListener("focusin", this.focusIn.bind(this));
				element.addEventListener("focusout", this.focusOut.bind(this));
			});
		} else if (this.settings.enableFocus) {
			this.children.forEach((element: HTMLElement) => {
				element.addEventListener("focusin", this.focusIn.bind(this));
				element.addEventListener("focusout", this.focusOut.bind(this));
			});
		}

		// Bind set on click event
		if (this.settings.setOnClick) {
			this.children.forEach((element: HTMLElement) => {
				element.addEventListener("mousedown", this.setOnClick.bind(this));
			});
		}

		// Initial reposition of lavalamp element
		window.addEventListener('DOMContentLoaded', () => {
			this.reposition(this.activeElement);
		});

	}

	/**
	 * Event that gets triggered on mousedown when `setOnClick` option is true
	 */
	setOnClick(e: MouseEvent) {
		this.activeElement = e.target as HTMLElement;
		this.reposition(e.target as HTMLElement);
	}

	/**
	 * Event that gets triggered on mouseenter when `enableHover` option is true
	 */
	mouseEnter(e: MouseEvent) {
		this.isHovered = true;
		setTimeout(() => {
			// If element is still being hovered and is not focused
			if (this.isHovered && !this.isFocused) {
				this.reposition(e.target as HTMLElement);
			}
		}, this.settings.delayOn);
	}

	/**
	 * Event that gets triggered on mouseLeave when `enableHover` option is true
	 */
	mouseLeave() {
		this.isHovered = false;
		setTimeout(() => {
			// If element is not being hovered and is not focused
			if (!this.isHovered && !this.isFocused) {
				this.reposition(this.activeElement);
			}
		}, this.settings.delayOff);
	}

	/**
	 * Event that gets triggered on focusIn when `enableFocus` or `deepFocus` option is true
	 */
	focusIn(e: FocusEvent) {
		this.isFocused = true;

		let lavalampItem: HTMLElement = e.target as HTMLElement;

		// If deep focus, get closest lavalamp item
		if (!lavalampItem.classList.contains("lavalamp__item")) {
			lavalampItem = lavalampItem.closest(".lavalamp__item");
		}

		setTimeout(() => {
			this.reposition(lavalampItem);
		}, this.settings.delayOn);
	}

	/**
	 * Event that gets triggered on focusOut when `enableFocus` or `deepFocus` option is true
	 */
	focusOut() {
		this.isFocused = false;
		setTimeout(() => {
			this.reposition(this.activeElement);
		}, this.settings.delayOff);
	}

	/**
	 * Main function that calculates width / height as well as the top / left position of current active element.
	 * Also sets the lavalamp object to specified size and position.
	 *
	 * @param target HTML element that the lavalamp object should reposition to
	 */
	reposition(target: HTMLElement): void {
		const style: CSSStyleDeclaration = window.getComputedStyle(target);
		const marginTop: number = parseFloat(style.marginLeft) || 0;
		const marginLeft: number = parseFloat(style.marginLeft) || 0;
		const marginRight: number = parseFloat(style.marginRight) || 0;
		const marginBottom: number = parseFloat(style.marginBottom) || 0;

		let width: number = target.offsetWidth;
		let height: number = target.offsetHeight;
		let offsetTop: number = target.offsetTop;
		let offsetLeft: number = target.offsetLeft;

		// Add margins to calculations
		if (this.settings.margins) {
			offsetLeft = offsetLeft - marginLeft;
			offsetTop = offsetTop - marginTop;
			width = width + marginLeft + marginRight;
			height = height + marginTop + marginBottom;
		}

		this.isAnimating = true;
		this.lavalampObject.style.width = `${width}px`;
		this.lavalampObject.style.height = `${height}px`;
		this.lavalampObject.style.transform = `translate(${offsetLeft}px,${offsetTop}px)`;

		setTimeout(() => {
			this.isAnimating = false;
		}, this.settings.duration);
	}
}

declare global {
	interface Window {
		Lavalamp: Lavalamp;
	}
}

// @ts-ignore
window.Lavalamp = Lavalamp;
