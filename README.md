Lava-Lamp
=================

Description: A jQuery animating navigation plugin. It creates a div that moves when you mouse over an element, giving it an elastic animation.

Author: Richard Hung

More documentation and examples: http://lavalamp.magicmediamuse.com

## Install

Install it using [Bower](http://bower.io):

```sh
$ bower install lavalamp
```

Install it using [npm](https://www.npmjs.org/):

```sh
$ npm install lavalamp
```

Or [download as ZIP](https://github.com/Richard1320/Lava-Lamp/archive/master.zip).

Key Features
--------------------

* Very lightweight; plugin is only one JavaScript file
* Allows you to set a new active element on click
* Calculates margins

How to Use
--------------------

Lava Lamp has a .js  and .css file in addition to the jQuery library. All its animations are done with CSS3 transitions, so you can use or modify the advanced transition-timing-function to create custom easing.

```
<link type="text/css" href="css/jquery.lavalamp.css" rel="stylesheet" media="screen" />
<script src="http://code.jquery.com/jquery-latest.js"></script>
<script type="text/javascript" src="js/jquery.lavalamp.min.js"></script>
```

Create a container for the plugin and the children elements that you will mouse over.

```
<ul id="navlist">
    <li class="active"><a href="/">Home</a></li>
    <li><a href="/about.html">About</a></li>
    <li><a href="/services.html">Services</a></li>
    <li><a href="/programs.html">Programs</a></li>
    <li><a href="/contact.html">Contact</a></li>
</ul>
```

Call the plugin after the HTML markup and required files.

```
$('#navlist').lavalamp({
    easing: 'easeOutBack'
});
```

Style the lava lamp object with CSS.

```
.lavalamp-object {
	background-color:#ccc;
}
```
