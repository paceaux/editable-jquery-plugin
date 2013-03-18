editable-jquery-plugin
======================

a fun little jQuery plugin that lets you edit the content or the styles of an element. 

Document: Editable, the jQuery Plugin
Author: Frank M. Taylor
Dependencies: jQuery 1.8.3.min.js
Requirements: Browser enabled contenteditable and scoped
			http://caniuse.com/#search=contenteditable
			http://caniuse.com/#search=scoped
APIs: none
Usage: use as you would any other jQuery plugin.
		$('.someDivOrWhatever').editable();
		$('section aside article').editable('styles');
Version:
   1
	.00 :: 	initial upload. Elements can be editable and styled. 
	.1	::  Fixed the hovering issue where user could only edit styles with up arrow. 
	.2  ::	Feature detection
			Added a fallback for when Scoped doesn't work. 
			Also added helpful comments. 


Upcoming:
	a "save" option so that the edited content can be put in local or session storage


Known Defects / issues:
it returns contenteditable as not being a feature, when it definitely is. 



License: Copyright 2013 and All Rights Reserved by Frank Marshall Taylor