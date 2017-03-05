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
    //若不想初始化翻转页面，可以调换form标签id的位置即可
    var _html = '<div id="formContainer" method="post">\
                    <form id="login-form" method="post">\
                        <div id="dialog_<%=index%>" class="dialog" style="width:<%=width%>px;z-index:<%=zIndex%>">\
                             <div class="dialog-head">\
                                <p class="dia-title"><%=loginTitle%></p>\
                                <em class="close-ico">X</em>\
                             </div>\
                             <div class="dialog-con">\
                             <div>\
		                        <%=loginBody%>\
		                      </div>\
                            </div>\
                         </div>\
                    </form>\
                    <form id="recover-form" method="post">\
                        <div id="dialog_<%=index+1%>" class="dialog dia-sub-tip" style="width:<%=width%>px;z-index:<%=zIndex+1%>">\
                            <div class="dialog-head">\
                                <p class="dia-title"><%=regTitle%></p>\
                                <em class="close-ico">X</em>\
                            </div>\
                            <div class="dialog-con">\
                                <div>\
                                    <%=regBody%>\
                                </div>\
                            </div>\
                        </div>\
                    </form>\
                </div>';

    var _dialog = function (opt) {
        opt = opt || {};
        this.opt = opt;
        var _index = index++;
        var html = mstmpl(_html, {
            loginTitle: opt.loginTitle,
            loginBody: opt.loginBody,
            regTitle: opt.regTitle,
            regBody: opt.regBody,
            index: _index,
            zIndex: zIndex++,
            width: opt.width || '400',
            notShow: opt.notShow
        });
        $('body').append(html);
        $('body').append('<div class="gray-bg dialog_bg" style="z-index:100"></div>');
        this.el = $('#formContainer');

        this.onshow = opt.onshow || function () { };
        this.onclose = opt.onclose || function () { };
        this.closeButton = $('.close-ico');
        this.bind();
        if (!opt.notShow) {
            this.show();
        }

        ///渲染后可以自己定义一些自定义事件
        var self = this;
        setTimeout(function () {
            //self.el.toggleClass("flipped");
            opt.buttonRender && opt.buttonRender();
        }, 0);
    };

    _dialog.prototype = {
        setTitle: function (html) {
            this.el.find('.dia-title').html(html);
        },
        bind: function () {
            var _self = this;

            this.closeButton.click(function () {
                _self.close();
            });

            $(window).resize(function () {
                _self.bgHeight();
            });

            $.support.css3d = this.supportsCSS3D();

            $(document).on("click", '#regBtn,#loginBtn', function (e) {
                var formContainer = $('#formContainer');
                formContainer.toggleClass('flipped');

                if (!$.support.css3d) {
                    $('#login-form').toggle();
                }
                e.preventDefault();
            });

            return this;
        },

        show: function (d) {
            if (!$('body').find('.dialog_bg').length) {
                $('body').append('<div class="gray-bg dialog_bg" style="z-index:100"></div>');
            }
            this.bgHeight();
            $('body').find('.dialog_bg').css('height', jqWIN.height() + jqWIN.scrollTop());
            this.el.show()
            this.onshow(d);
        },
        close: function () {
            this.el.remove();
            this.onclose();
            $('body').find('.dialog_bg').remove();

        },
        bgHeight: function () {
            var bodyHeight = $(document).height();
            var windowHeight = $(window).height();
            if (windowHeight < bodyHeight) {
                $('body').find('.dialog_bg').height(bodyHeight);
            } else {
                $('body').find('.dialog_bg').height('100%');
            }
        },
        supportsCSS3D: function () {
            var props = [
                'perspectiveProperty', 'WebkitPerspective', 'MozPerspective'
            ], testDom = document.createElement('a');
            for (var i = 0; i < props.length; i++) {
                if (props[i] in testDom.style) {
                    return true;
                }
            }
            return false;
        }
    }
    return _dialog;
});
