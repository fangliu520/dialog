define(['ko-dialog'], function (Dialog) {
    var confirm = function (text, cb) {
        var me = this;
        var opt = {};
        var length = arguments.length;

        opt.title = '确认提示';
        opt.body = text;
        if (length == 1) {
            var type = typeof (arguments[0]);
            if (type == "function") {
                opt.body = '删除是不可恢复性操作，确认删除吗？';
                cb = arguments[0];
            } else {
                cb = function () { };
            }
        }

        opt.onconfirm = function () {
            cb();
        };
        Dialog.call(this, opt);
    }
    confirm.prototype = Dialog.prototype;
    confirm.prototype.constructor = confirm;
    return confirm;
})