---
title: "Options"
permalink: /options layout: default
---

| Option | Default | Type | Description |
| --- | --- | --- | --- |
| duration | 1000 | Integer | Duration of transition animation. | 
| easing | "ease" | String (See [easing](#easing)) | Easing of transition animation. | 
| margins | false | Boolean | Lava Lamp object's width and height covers the margins. | 
| setOnClick | false | Boolean | The Lava Lamp object moves to the a new element when you click. | 
| initActiveQuery | ".active" | String (Query selector) | Query selector for default active element. | 
| enableHover | true | Boolean | Enable mouseenter and mouseleave events. | 
| delayOn | 0 | Integer | Place a delay when you enter hover state before lava lamp object animates. | 
| delayOff | 0 | Integer | Place a delay when you leave hover state before lava lamp object animates. | 
| enableFocus | false | Boolean | Animate on direct child element focus. | 
| deepFocus | false | Boolean | Animate on any descendant element focus. | 

## Easing

You can make your own custom easing with the
CSS [transition-timing-function](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function) property.

Easing rules already written that you can just use:  
ease, linear, ease-in, ease-out, ease-in-out, easeInQuad, easeInCubic, easeInQuart, easeInQuint, easeInSine, easeInExpo,
easeInCirc, easeInBack, easeOutQuad, easeOutCubic, easeOutQuart, easeOutQuint, easeOutSine, easeOutExpo, easeOutCirc,
easeOutBack, easeInOutQuad, easeInOutCubic, easeInOutQuart, easeInOutQuint, easeInOutSine, easeInOutExpo, easeInOutCirc,
easeInOutBack
