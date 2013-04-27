Lava-Lamp
=================

Description: A jQuery animating navigation plugin. It creates a div that moves when you mouse over an element, giving it an elastic animation.

Author: Richard Hung

More documentation and examples: http://lavalamp.magicmediamuse.com

Key Features
--------------------

* Very lightweight; plugin is only one JavaScript file
* Allows you to set a new active element on click
* Calculates margins

How to Use
--------------------

Lava Lamp is just a .js file in addition to the jQuery library. Optionally, you can include the <a href="http://gsgd.co.uk/sandbox/jquery/easing/" target="_blank">easing plugin</a> for animations.

```
<script src="http://code.jquery.com/jquery-latest.js"></script>
<script type="text/javascript" src="js/jquery.easing.1.3.js"></script>
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
