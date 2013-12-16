
editable-jquery-plugin
======================

a fun little jQuery plugin that lets you edit the content or the styles of an element. 

**Document**: 		Editable, the jQuery Plugin

**Author**: 		Frank M. Taylor

**Dependencies**: 	jQuery 1.8.3.min.js

**Requirements**: 	Browser enabled contenteditable and scoped
				
**References**:		
http://caniuse.com/#search=contenteditable

http://caniuse.com/#search=scoped

**Demo**:
http://blog.frankmtaylor.com/2013/05/12/making-content-editing-easier-with-an-editable-jquery-plugin/

## Usage ##

### Default Usage ###
The plugin has a default method which let's you just make an element editable: 

    $('.someDivOrWhatever').editable();

### Editing Styles ###
#### from jQuery ####
You can also edit the styles of that element. It'll used the `scoped` attribute to generate a styleblock scoped to your element. If your browser doesn't support `<style scoped>`, then it'll create an `id` on the element and generate a css selector for each element in that block

    $('section aside article').editable({stylable: true});

#### From the HTML ####
You don't have to just control the `stylable` as a parameter passed through jQuery. You can use a data attribute on the element, too:

    <div data-stylable="true">
    $("div").editable();

### Recovering the Content ###
You might spend a lot of time making a lot of changes to your element and not want to `CTRL + Z` to get your changes back to a pristine state. You can mark any element as recoverable, where pressing the `esc` key will take that element back to its original version: 

    $("div").editable({recoverable:true})

#### from the html ####
Just like the stylable parameter, you can set elements as recoverable from the HTML: 
    <div data-recoverable="true">

### Setting a Trigger
By default, an element becomes editable when you doubleclick it. When you mouseout or change focus, the element is no longer contenteditable. You may want a custom trigger (not a bad idea if it's an interactive element like an `<a href>`). For this you have a `trigger` property that accepts jQuery events: 

    $("div").editable({trigger: 'click'});


### Upcoming Features ###
+ a "save" option so that the edited content can be put in local or session storage
+ option to pick the event that makes an element editable


### Known Defects / issues ###
+ it returns contenteditable as not being a feature, when it definitely is. 
+ I'm not doing any preventDefault .... this isn't problematic for divs, but certainly could be for interactive elements such as links or labels (which is how I discovered it): doubleclick the label for an input, and it'll transfer focus down to the input. 



**License**: Copyright (c) 2013 Frank M. Taylor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.