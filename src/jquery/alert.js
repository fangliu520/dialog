define(['dialog'], function (Dialog) {
    var alert = function (text, cb) {
        var me = this;
        var opt = {};
        var length = arguments.length;

        opt.title = '操作确认';
        opt.body = '<p class="dia-st-tip">' + text + '</p>';
        if (length == 1) {
            var type = typeof (arguments[0]);
            if (type == "function") {
                opt.body = '<p class="dia-st-tip">操作成功！</p>';
                cb = arguments[0];
            } else {
                cb = function () { };
            }
        }
        opt.hasCancelBtn = true;
        opt.onconfirm = function () {
            cb();
            me.close();
        };
        Dialog.call(this, opt);
        this.el.addClass('dia-sub-tip');
    }
    alert.prototype = Dialog.prototype;
    alert.prototype.constructor = alert;
    return alert;
})