define(['dialog'], function (Dialog) {
    var confirm = function (text,cb) {
        var me = this;
        var opt = {};
        var length = arguments.length;

        opt.title = '确认提示';
        opt.body = '<p class="dia-st-tip">' + text + '</p>';
        if (length == 1) {
            var type = typeof (arguments[0]);
            if (type == "function") {
                opt.body = '<p class="dia-st-tip">删除是不可恢复性操作，确认删除吗？</p>';
                cb = arguments[0];
            } else {
                cb = function () { };
            }
        }

        opt.onconfirm = function () {
            cb();
            me.close();
        };
        Dialog.call(this, opt);
        this.el.addClass('dia-sub-tip');
    }
    confirm.prototype = Dialog.prototype;
    confirm.prototype.constructor = confirm;
    return confirm;
})