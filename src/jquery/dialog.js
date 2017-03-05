define(function () {
    var mstmpl = function (str, data) {
        if (!data) {
            return false;
        }
        var cache = {};
        var _inner = function (str, data) {
            var fn = !/\W/.test(str) ? cache[str] = cache[str] || this.$_MSTMPL(document.getElementById(str).innerHTML) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};" + "with(obj){p.push('" + str.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
            return data ? fn(data) : fn;
        };

        return _inner(str, data);
    }
    //默认的层级从1000开始
    var zIndex = 1000;

    //相当于id
    var index = 0;
    var jqWIN = $(window);
    var _html = '<div id="dialog_<%=index%>" class="dialog" style="width:<%=width%>px;display:none;z-index:<%=zIndex%>">\
      <div class="dialog-head">\
        <%if(title){%><p class="dia-title"><%=title%></p><% } %>\
        <%if(!hideCloseBtn){%><em class="close-ico" id="close_<%=index%>">X</em><% } %>\
      </div>\
      <div class="dialog-con" style="<%=textStyle%>">\
        <div>\
		   <p><%=body%></p>\
			<%if(!bottom) {%>\
				<div class="single-btn-area">\
				<a id="dialog_confirm_<%=index%>" class="btn status1-btn put" href="javascript:void(0);">确定</a>\
                <%if(!hasCancelBtn) {%>\
				    <a id="dialog_cancel_<%=index%>" class="btn buy" href="javascript:void(0);">取消</a>\
                <% } %>\
				</div>\
			<% } else {%>\
				<%=bottom%>\
			<% } %>\
		</div>\
      </div>\
    </div>';

    var _dialog = function (opt) {
        opt = opt || {};
        //opt.afterRender = opt.afterRender||function(){};

        this.opt = opt;
        var _index = index++;
        var html = mstmpl(_html, {
            title: opt.title,
            body: opt.body || '',
            bottom: opt.bottom || '',
            index: _index,
            zIndex: zIndex++,
            textStyle: opt.textStyle,
            width: opt.width || '400',
            notShow: opt.notShow,
            hasCancelBtn: opt.hasCancelBtn || null,
            hideCloseBtn: opt.hideCloseBtn
        });
        $('body').append(html);
        $('body').append('<div class="gray-bg dialog_bg" style="z-index:999"></div>');
        this.el = $('#dialog_' + _index);

        //没有底部的结构就不需要事件绑定
        if (!opt.bottom) {
            this.cancelButton = $('#dialog_cancel_' + _index);
            this.confirmButton = $('#dialog_confirm_' + _index);
        }
        this.onshow = opt.onshow || function () { };
        this.onclose = opt.onclose || function () { $("body").find(".dialog").remove().end().find('.dialog_bg').remove(); return true; };
        this.closeButton = $('#close_' + _index);
        this.bind();
        if (!opt.notShow) {
            this.show();
        }



        ///渲染后可以自己定义一些自定义事件
        setTimeout(function () {
            opt.afterRender && opt.afterRender();
        }, 0);
    };

    _dialog.prototype = {
        setTitle: function (html) {
            this.el.find('.dia-title').html(html);
        },
        bind: function () {
            var _self = this;
            this.cancelButton && this.cancelButton.click(function () {
                _self.close();
            });

            this.closeButton.click(function () {
                _self.close();
            });

            this.confirmButton && this.confirmButton.click(function () {
                _self.opt.onconfirm();
                return false;
            });

            $(window).resize(function () {
                //_self._reposition();
            })
            return this;
        },

        show: function (d) {
            if (!$('body').find('.dialog_bg').length) {
                $('body').append('<div class="gray-bg dialog_bg" style="z-index:100"></div>');
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
            bgHeight();
            $(window).resize(function () {
                bgHeight();
            });
            //$('body').find('.dialog_bg').css('height',jqWIN.height()+jqWIN.scrollTop());
            this.el.show()
            //this._reposition();
            this.onshow(d);
        },
        _reposition: function () {
            this.el.css({
                top: (jqWIN.height() - this.el.height()) / 2 + jqWIN.scrollTop(),
                left: (jqWIN.width() - this.el.width()) / 2
            });
        },
        close: function () {
            this.el.remove();
            this.onclose();
            $('body').find('.dialog_bg').remove();

        }
    }
    return _dialog;
});
