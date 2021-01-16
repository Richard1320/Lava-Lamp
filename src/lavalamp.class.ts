/*!
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
				element.addEventListener("focusin", this.focusOn.bind(this));
				element.addEventListener("focusout", this.focusOff.bind(this));
			});
		} else if (this.settings.enableFocus) {
			this.children.forEach((element: HTMLElement) => {
				element.addEventListener("focusin", this.focusOn.bind(this));
				element.addEventListener("focusout", this.focusOff.bind(this));
			});
		}

		// Bind set on click event
		if (this.settings.setOnClick) {
			this.children.forEach((element: HTMLElement) => {
				element.addEventListener("mousedown", this.setOnClick.bind(this));
			});
		}
	}

	setOnClick(e: MouseEvent) {
		this.activeElement = e.target as HTMLElement;
		this.reposition(e.target as HTMLElement);
	}

	mouseEnter(e: MouseEvent) {
		this.isHovered = true;
		setTimeout(() => {
			// If element is still being hovered and is not focused
			if (this.isHovered && !this.isFocused) {
				this.reposition(e.target as HTMLElement);
			}
		}, this.settings.delayOn);
	}

	mouseLeave() {
		this.isHovered = false;
		setTimeout(() => {
			// If element is not being hovered and is not focused
			if (!this.isHovered && !this.isFocused) {
				this.reposition(this.activeElement);
			}
		}, this.settings.delayOff);
	}

	focusOn(e: FocusEvent) {
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

	focusOff() {
		this.isFocused = false;
		setTimeout(() => {
			this.reposition(this.activeElement);
		}, this.settings.delayOff);
	}

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
