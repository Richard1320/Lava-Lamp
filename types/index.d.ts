type TEasing =
	string |
	"ease" |
	"linear" |
	"ease-in" |
	"ease-out" |
	"ease-in-out" |
	"easeInQuad" |
	"easeInCubic" |
	"easeInQuart" |
	"easeInQuint" |
	"easeInSine" |
	"easeInExpo" |
	"easeInCirc" |
	"easeInBack" |
	"easeOutQuad" |
	"easeOutCubic" |
	"easeOutQuart" |
	"easeOutQuint" |
	"easeOutSine" |
	"easeOutExpo" |
	"easeOutCirc" |
	"easeOutBack" |
	"easeInOutQuad" |
	"easeInOutCubic" |
	"easeInOutQuart" |
	"easeInOutQuint" |
	"easeInOutSine" |
	"easeInOutExpo" |
	"easeInOutCirc" |
	"easeInOutBack";

export interface ISettings {
	easing?: TEasing; // Easing transition
	duration?: number; // Duration of animation
	margins?: boolean; // Whether or not to include margins
	setOnClick?: boolean; // Whether or not to set the new active element on click
	initActiveQuery?: string; // Initial query selector for the active element
	enableHover?: boolean; // lavalamp moves with hover instead of click
	delayOn?: number; // Delay time on hover
	delayOff?: number; // Delay time off hover
	enableFocus?: boolean; // Animate on element focus
	deepFocus?: boolean; // Animate on decendant focus
}