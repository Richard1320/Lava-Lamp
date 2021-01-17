---
layout: default
---

Lava Lamp is a JavaScript plugin for menus. It creates a div that changes its own width, height and position of your
hovered or focused element.

# How to install

**Link Files**

Lava Lamp has a .js and .css file. All its animations are done with CSS3 transitions, so you can use or modify the
advanced transition-timing-function to create custom easing.

```html
<!-- Include the stylesheet -->
<link type="text/css" href="build/lavalamp.css" rel="stylesheet" media="screen"/>
<!-- Include the lava lamp plugin -->
<script type="text/javascript" src="build/lavalamp.js"></script>
```

**Create HTML**

Create a container for the slider and children for the panels. Remember to add a default active element.

```html
<ul id="navlist">
    <li class="active"><a href="/">Home</a></li>
    <li><a href="/about.html">About</a></li>
    <li><a href="/services.html">Services</a></li>
    <li><a href="/programs.html">Programs</a></li>
    <li><a href="/contact.html">Contact</a></li>
</ul>
```

**Call the plugin**

Call the lava lamp plugin after the HTML markup.

```javascript
const settings = {
    margins: true,
};
const element = document.getElementById("navlist");
const lavalampInstance = new Lavalamp(element, settings);
```

**Style it**

The plugin creates a div with the `lavalamp__object` class in the container. This object stretches with the width and
height of the element that you're hovering over.

```css
.lavalamp__object {
    box-shadow: 0 0 5px 0 #999 inset;
}
```
