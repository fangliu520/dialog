define(['ko-dialog'], function (Dialog) {
    var confirm = function (text, cb) {
        var me = this;
        var opt = {};
        var length = arguments.length;

        opt.title = '操作确认';
        opt.body = text;
        if (length == 1) {
            var type = typeof (arguments[0]);
            if (type == "function") {
                opt.body = '操作成功！';
                cb = arguments[0];
            } else {
                cb = function () { };
            }
        }
        opt.hasCancelBtn = true;
        opt.onconfirm = function () {
            cb();
        };
        Dialog.call(this, opt);
    }
    confirm.prototype = Dialog.prototype;
    confirm.prototype.constructor = confirm;
    return confirm;
})