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



Upcoming:
	a "save" option so that the edited content can be put in local or session storage


Known Defects / issues:
	you have to use the up arrow to edit the styles
	only works on browsers with 'scoped' as an enabled flag (basically, beta versions of chrome or Chrome 26+)




License: Copyright 2013 and All Rights Reserved by Frank Marshall Taylor