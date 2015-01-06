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
;(function($) {
    $.fn.editable = function (options) {
        var $this = $(this);

        function testFeature(el, attr) {
            var test = document.createElement(el);
            if (attr in test) {
                return true;
            } else {
                return false;
            }
        }
        var features = {
                contenteditable: testFeature('div', 'contenteditable'),
                scoped: testFeature('style', 'scoped')
            },
            settings = $.extend({
                'trigger': 'dblclick',
                'stylable': false,
                'recoverable': false,
                'savable': false
            }, options),
            methods = {
                init: function () {
                    this.bindEvents();
                    this.addIndexId();
                    this.makeRecoverable();
                    this.makeStylable();
                },
                removeEditable: function (el) {
                    if ($(el).is('[contenteditable="true"]')) {
                        $(el).removeAttr('contenteditable');
                    }
                },
                makeEditable: function (el) {
                    if ($(el).is('[contenteditable="true"]')) {
                        $(el).removeAttr('contenteditable');
                    } else {
                        $(el).attr('contenteditable', true);
                    }
                },
                addIndexId: function () {
                    $this.each(function (index) {
                        $(this).attr('id', 'ce-' + index);
                    });
                },
                getChildEls: function (el) {
                    var childEls = [];
                    $(el).children().each(function(index) {
                        var tagName = $(this).prop('tagName');
                        if (index > 0 && tagName !== 'style') {
                            childEls.push(tagName);
                        }
                    });
                    return childEls;
                },
                addChildElsToStyles: function (p) {
                    var childEls = methods.getChildEls($(p)),
                        fallback = features.scoped === true ? '' : "#" + $(p).attr('id') + ' ';
                    $(p).find('style').append(fallback + '{} ');
                    $.each(childEls, function(index, value) {
                        $(p).find('style').append(fallback + value + '{} ');
                    });
                },
                makeStylable: function () {
                    $this.each(function () {
                        if (settings.stylable === true || $(this).attr('data-stylable') === 'true') {
                            $(this).find('.ce-styleBlock').remove();
                            $(this).prepend('<style class="ce-styleBlock" scoped></style>');
                            methods.addChildElsToStyles($(this));
                        }
                    });
                },
                makeRecoverable: function () {
                    $this.each(function () {
                        if (settings.recoverable === true || $(this).attr('data-recoverable') === 'true') {
                            var originalContent = JSON.stringify($(this).html());
                            $(this).attr('data-original', originalContent);
                        }
                    });
                },
                recoverContent: function (el) {
                    if ($(el).attr('data-original')) {
                        var originalContent = JSON.parse($(el).attr('data-original'));
                        $(el).html(originalContent);
                    }
                },
                helpers: {
                    keydown: function (e) {
                        var map = [];
                        map[e.keyCode] = e.type === 'keydown';
                        if (map[27]) {
                            methods.recoverContent($(this));
                        }
                    }
                },
                bindEvents: function () {
                    $this.bind({
                        mouseout: function () {
                            setTimeout(function () {
                                methods.removeEditable($(this));
                            }, 500);
                        },
                        focusout: function () {
                            setTimeout(function () {
                                methods.removeEditable($(this));
                            }, 500);
                        }
                    });
                    if (settings.trigger !== 'dblclick') {
                        $this.on(settings.trigger, function () {
                            methods.makeEditable($(this));
                            $(this).focus();
                        });
                    } else {
                        $this.bind({
                            dblclick: function () {
                                methods.makeEditable($(this));
                                $(this).focus();
                            }
                        });
                    }
                    if (settings.recoverable === true) {
                        $this.bind({
                            keydown: methods.helpers.keydown
                        });
                    } else {
                        $this.each(function () {
                            if ($(this).attr('data-original') || $(this).attr('data-recoverable')) {
                                $(this).bind({
                                    keydown: methods.helpers.keydown
                                });
                            }
                        });
                    }
                }
            };
        methods.init();
    };
})(jQuery);