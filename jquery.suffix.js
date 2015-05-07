$.fn.suffix = function () {
    "use strict";

    var textfields = this;

    $(textfields).each(function () {
        var instance = this;
        var suffix = $(this).data("suffix");
        var suffix_length = suffix.length;

        var touched = false;
        var textfield = $(this);
        
        $(textfield).on("focus", function () {
            if (!touched) {
                $(textfield).val(suffix);
                
                setTimeout(function () {
                    $(textfield)[0].setSelectionRange(0, 0);
                }, 0);
            } else {
                var position =  $(textfield).val().length - suffix_length;
            }            
        });
        
        $(textfield).on("click", function () {
            var position =  $(textfield).val().length - suffix_length;
            if (this.selectionStart > position) {
                $(textfield)[0].setSelectionRange(position, position);
            }
        });
        
        $(textfield).on("keydown change", function () {
            touched = true;
        });
        
        $(textfield).on("keyup", function () {
            var position =  $(textfield).val().length - suffix_length;
            if (this.selectionStart > position) {
                $(textfield)[0].setSelectionRange(position, position);
            }
        });
        
        $(textfield).on("select", function () {
            var position =  $(textfield).val().length - suffix_length;
            if (this.selectionStart > position) {
                $(textfield)[0].setSelectionRange(position, this.selectionEnd);
            }
            
            if (this.selectionEnd > position) {
                $(textfield)[0].setSelectionRange(this.selectionStart, position);
            }
        });
        
        $(textfield).blur(function () {
            if ($(this).val() === suffix || $(this).val() === '') {
                $(textfield).val("");
                touched = false;
            }
        });
    });
};
