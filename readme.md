
editable-jquery-plugin
======================

a fun little jQuery plugin that lets you edit the content or the styles of an element. 

**Document**: 		Editable, the jQuery Plugin

**Author**: 		Frank M. Taylor

**Dependencies**: 	jQuery 1.8.3.min.js

**Requirements**: 	Browser enabled contenteditable and scoped
				
**References**:		http://caniuse.com/#search=contenteditable
					http://caniuse.com/#search=scoped

**APIs**: 			none

**Usage**: 			use as you would any other jQuery plugin.
				`$('.someDivOrWhatever').editable();`
				`$('section aside article').editable('styles');`

**Demo**:			http://blog.frankmtaylor.com/2013/05/12/making-content-editing-easier-with-an-editable-jquery-plugin/

### Version: ###
   1
	.00 :: 	initial upload. Elements can be editable and styled. 
	.1	::  Fixed the hovering issue where user could only edit styles with up arrow. 
	.2  ::	Feature detection
			Added a fallback for when Scoped doesn't work. 
			Also added helpful comments. 
	.3	::	added default settings
			options are passed as an object now
	.3.1::	Added a `.focus()` to the dblclick event so that, after you double click the element, focus is immediately transferred.
	.3.2::	Added a copyright notice, and a precedeing semicolon, to the jQuery plugin	 				 


### Upcoming ###
	a "save" option so that the edited content can be put in local or session storage


### Known Defects / issues ###
+ it returns contenteditable as not being a feature, when it definitely is. 
+ I'm not doing any preventDefault .... this isn't problematic for divs, but certainly could be for interactive elements such as links or labels (which is how I discovered it): doubleclick the label for an input, and it'll transfer focus down to the input. 



License: Copyright 2013 and All Rights Reserved by Frank Marshall Taylor