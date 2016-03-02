/// <reference path="jquery-1.8.3.min.js" />
/// <reference path="knockout-3.2.0.js" />

define(["knockout", "jquery"], function (ko) {
    return {
        show: ko.observable(false),

        MOBILE: /^1[3|4|5|8|9]\d{9}$/,
        IS_MOBILE: function (num) {
            return IS_MOBILE.test(num);
        },
        inputError: function (id,val) {
            var el = $('#' + id);
            if (val) {
                el.text(val);
            }
            el.show();
            setTimeout(function () {
                el.hide();
                el.prev().focus();

            }, 1000);
        }
    };
});