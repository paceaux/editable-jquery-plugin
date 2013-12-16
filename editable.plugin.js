/*
EDITABLE JQUERY PLUGIN
License: Copyright (c) 2013 Frank M. Taylor

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
*/
;(function( $ ){
  $.fn.editable = function( options ) {
  //SETUP    
      var $this = $(this);
      var $parent = $(this).parent();
  //INTERNAL FUNCTIONS
      function testFeature (el, attr) {
        var test = document.createElement(el);
        if (attr in test) {
          return true;
        } else {
          return false;
        }                
      }
      //set features as a global variable, that way I'm not access it everytime the plugin runs? maybe?    
      var features = {
          contenteditable : testFeature('div', 'contenteditable'),
          scoped : testFeature('style','scoped')
      };
  //DEFAULT SETTINGS
      var settings = $.extend({
        'trigger' : 'dblclick',
        'stylable' : false,
        'recoverable' : false,
        'savable': false
      }, options);
  //PLUGIN METHODS
      var methods = {
          init : function () {
              this.bindEvents();
              this.addIndexId();
              this.makeRecoverable();
              this.makeStylable();
          },
          removeEditable : function (el) {
            if ($(el).is('[contenteditable="true"]')){
                $(el).removeAttr('contenteditable');
            }     
          },
          makeEditable : function (el) {
            if ( $(el).is('[contenteditable="true"]') ){
                $(el).removeAttr('contenteditable');
            } else {
                $(el).attr('contenteditable', true);    
            }
          },
          addIndexId : function () {
            $this.each(function(index) {
                $(this).attr('id','ce-'+index);
            });
          },
          getChildEls: function (el) {
              var childEls = [];
              $(el).children().each(function(index) {
                var tagName = $(this).prop('tagName');
                  if (index > 0){
                      //don't want to style the style, since it has an index of 0, we get everything after it
                      childEls.push(tagName);
                  }
              });
              return childEls;
          },
          addChildElsToStyles: function (p) {
              var childEls = methods.getChildEls($(p));
              $.each(childEls, function(index, value) {
                //where browser doesn't support scope, append the parent ID selector
                var fallback = features.scoped == true ? '' : "#"+$(p).attr('id')+' ';
                  $(p).find('style').append(fallback+ value+'{} ');
                });
          },
          makeStylable : function () {
            //need to also add a fallback for feature detection
                $this.each(function (index) {
                  if(settings.stylable == true || $(this).attr('data-stylable') == 'true' ){
                    var styleBlock = $(this).prepend('<style scoped></style>');
                    methods.addChildElsToStyles($(this));
                  }
                });
            
          },
          makeRecoverable: function () {
              $this.each( function (index) {
                if (settings.recoverable == true || $(this).attr('data-recoverable') == 'true') {
                    var originalContent = JSON.stringify($(this).html());
                    $(this).attr('data-original', originalContent);
                  }
              });
          },
          recoverContent: function (el) {
            if ( $(el).attr('data-original') ) {
              var originalContent = JSON.parse($(el).attr('data-original'));
              $(el).html(originalContent);
            }
          },
          helpers: {
            keydown: function (e) {

              var map = [];
              map[e.keyCode] = e.type == 'keydown';
              if (map[27]) {
                methods.recoverContent($(this));
              }
            }
          },
          bindEvents : function () {
            //all bindings
            $this.bind({
              mouseout: function() {
                setTimeout(function(){
                  methods.removeEditable($(this));                
                },500);
              },
              focusout: function() {
                setTimeout(function(){
                  methods.removeEditable($(this));                                       
                },500);
              }
            });
            // custom trigger
            if (settings.trigger !== 'dblclick') {
              $this.on(settings.trigger, function () {
                methods.makeEditable($(this));
                $(this).focus();
              });
            } else {
              $this.bind({
                dblclick: function() {
                    methods.makeEditable($(this));
                    $(this).focus();                                     
                  }
                });
            };
            // recoverable
            if (settings.recoverable == true) {
                $this.bind({keydown: methods.helpers.keydown})
            } else {
              $this.each(function (index) {
                if ($(this).attr('data-original') || $(this).attr('data-recoverable') ) {
                  $(this).bind({keydown: methods.helpers.keydown})
                }
              });
            }
          }
    };
     methods.init();
  };
})( jQuery );