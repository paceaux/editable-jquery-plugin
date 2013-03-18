(function( $ ){
  $.fn.editable = function( type ) {  
      var $this = $(this);
      var $parent = $(this).parent();
      var stylable = type == 'styles' ? true : false;
      var methods = {
          init : function () {
              this.bindEvents();
              this.addIndexId();
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
                      //we're avoiding adding the option to style the styles
                      childEls.push(tagName);
                  }
              });
              console.log(childEls);
              return childEls;
          },
          addChildElsToStyles: function (p) {
              var childEls = methods.getChildEls($(p));
              $.each(childEls, function(index, value) {
                  $(p).find('style').append(value+'{}');
                });
          },
          makeStylable : function () {
              if(stylable == true){
                  $this.each(function(index) {
                      var styleBlock = $(this).prepend('<style scoped contenteditable></style>');
                  methods.addChildElsToStyles($(this));
                  });
              }
          },
          bindEvents : function () {
              $this.bind({
                  dblclick: function() {
                      methods.makeEditable($(this));
                      if (stylable == true){
                          methods.makeEditable($(this).find('style'));
                      }                      
                  },
                  mouseout: function() {
                      methods.removeEditable($(this));
                      if (stylable == true){
                          methods.removeEditable($(this).find('style'));
                      }                      
                  },
                  focusout: function() {
                      methods.removeEditable($(this));
                      if (stylable == true){
                          methods.removeEditable($(this).find('style'));
                      }                                         
                  }
                });
          }
    };
     methods.init();
  };
})( jQuery );
$('.editable').editable('styles');