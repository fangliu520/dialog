/// <reference path="../knockout-3.2.0.js" />

define(["knockout"], function (ko) {
    var opt = {};
    var bottom = "";
    var dialog = function (_opt) {
        opt = _opt;
    }

    function bgHeight() {
        var bodyHeight = $(document).height();
        var windowHeight = $(window).height();
        if (windowHeight < bodyHeight) {
            $('body').find('.dialog_bg').height(bodyHeight);
        } else {
            $('body').find('.dialog_bg').height('100%');
        }
    }

    ko.components.register('dialog', {
        viewModel: function (params) {
            this.show = params.isShow || null;
            var self = this;
            this.close = function () {
                self.show(false);
            }.bind(this);
            this.confirmOk = function () {
                self.show(false);
                opt.onconfirm();
            }.bind(this);

            //默认的层级从1000开始
            var zIndex = 1000;

            this.html = {
                title: opt.title,
                body: opt.body || '',
                bottom: opt.bottom || null,
                zIndex: zIndex++,
                width: opt.width || '400',
                hasCancelBtn: opt.hasCancelBtn || null
            };
            bgHeight();
            $(window).resize(function () {
                bgHeight();
            });
        },
        template: '<div class="dialog dia-sub-tip" style="display:block;z-index:1000" data-bind="style:{ \'z-index\':html.zIndex,width:html.width + \'px\'}">\
                      <div class="dialog-head">\
                        <p class="dia-title" data-bind="text:html.title"></p>\
                        <em class="close-ico" data-bind="click:close">X</em>\
                      </div>\
                      <div class="dialog-con">\
                        <div>\
			                   <!-- ko if: html.bottom == null  -->\
                                <p class="dia-st-tip" data-bind="html:html.body"></p>\
				                <div class="single-btn-area">\
				                <input class="btn status1-btn" type="submit" value="确定" data-bind="click:confirmOk">\
                                <!-- ko if:!html.hasCancelBtn -->\
				                    <input class="btn" type="reset" value="取消" data-bind="click:close">\
                                <!-- /ko -->\
				                </div>\
				                <!-- /ko -->\
                               <!-- ko if: html.bottom  -->\
                                   <div data-bind=\'component: { name: "login-body",params: { isShow:show } }\'></div>\
                               <!-- /ko -->\
		                </div>\
                      </div>\
                    </div>\
                 <div class="gray-bg dialog_bg" style="z-index:100"></div>'
    });

    return dialog;
});