define(["base", 'dialog', 'jquery.cookie', 'placeholder'], function (base, Dialog) {
    //IE placeholder
    jQuery.fn.placeholder = function () {
        var i = document.createElement('input'),
            placeholdersupport = 'placeholder' in i;
        if (!placeholdersupport) {
            var divWrap = $("<div style='position:relative;'></div>");
            var inputs = jQuery(this);
            inputs.wrap(divWrap);
            inputs.each(function () {
                var input = jQuery(this),
                    text = input.attr('placeholder'),
                    pdl = 0,
                    height = input.outerHeight(),
                    width = input.outerWidth(),
                    placeholder = jQuery('<span class="phTips">' + text + '</span>');
                try {
                    pdl = input.css('padding-left').match(/\d*/i)[0] * 1;
                } catch (e) {
                    pdl = 5;
                }
                placeholder.css({ 'margin-left': -(width - pdl) + 5, 'height': height, 'line-height': height + "px", 'position': 'absolute', 'color': "#cecfc9", 'font-size': "14px" });
                placeholder.click(function () {
                    input.focus();
                });
                if (input.val() != "") {
                    placeholder.css({ display: 'none' });
                } else {
                    placeholder.css({ display: 'inline' });
                }
                placeholder.insertAfter(input);
                input.keyup(function (e) {
                    if (jQuery(this).val() != "") {
                        placeholder.css({ display: 'none' });
                    } else {
                        placeholder.css({ display: 'inline' });
                    }
                });
            });
        }
        return this;
    };

    function inputError(id, tag) {
        var el = $('#' + id);
        el.show();
        if (!tag) {
            setTimeout(function () {
                el.hide();
                el.prev().focus();

            }, 1000);
        }
    }

    var body = '<div class="check-container" id="popup_login_container">\
                    <input type="text" class="global-input no-border-b" id="popup_login_id" placeholder="手机号 / 邮箱地址 / 用户名">\
			            <span class="tips-container" id="login_name" style="display:none">用户名不能为空</span>\
                </div><br>\
                <div class="check-container">\
                    <input type="password" class="global-input no-border-t" id="popup_login_password" placeholder="请输入用户密码">\
			        <span class="tips-container" id="login_pwd" style="display:none">密码不能为空</span>\
                </div>'

    var bottom = '<a class="btn status1-btn big-btn long-btn put" id="popup_login">登录</a>\
	              <div class="pass-area">\
                      <label for="remember" id="remember_password"><input type="checkbox" id="remember">&nbsp;记住登录</label>\
                       <span class="tips-error" id="login_error">用户名或密码错误</span>\
                      <a href="/find-pwd/">忘记密码</a>\
                  </div>\
	              <a href="/reg/" class="btn big-btn long-btn buy">新用户注册</a>';
    var errorTip = '<span class="tips-container">{msg}</span>';

    var login = {
        show: function (cb) {
            var me = this;
            var cb = cb || function () { };
            var opt = {};
            opt.title = '用户登录';
            opt.body = body;
            opt.bottom = bottom;
            opt.afterRender = function () {
                $('#popup_login_container').find('input', 'focus', function () {
                    $('#popup_login_container').find('.tips-container').hide();
                });
                $('#popup_login_password').placeholder();
                $('#popup_login_id').placeholder();
                $('#popup_login').click(function () {
                    var username = $('#popup_login_id').val();
                    var password = $('#popup_login_password').val();

                    if ($.trim(username) == '') {
                        inputError('login_name');
                        return false;
                    }

                    if ($.trim(password) == '') {
                        inputError('login_pwd');
                        return false;
                    }

                    var param = {};
                    param.userName = username;
                    param.password = password;
                    param.rememberMe = $("#remember").prop("checked");
                    param.m = "login";
                    param.c = "User";

                    param.type = "userName";
                    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(param.userName)) {
                        param.type = "email";
                    }
                    else if (/^(0|86|17951)?(\d{11})$/.test(param.userName)) {
                        param.type = "phone";
                    }
                    base.post(param, function (data) {
                        if (data.Status === "ok") {
                            var url = base.queryString("url");
                            if (url) {
                                window.location.href = url;
                            } else {
                                if (cb) {
                                    cb();
                                    me.close();
                                };
                            }
                        }
                        else {
                            inputError("login_error", true);
                        }

                    });

                    return false;
                });
            }

            $(document).on("keydown", function (e) {
                if (e.keyCode == 13) {
                    $('#popup_login').trigger("click");
                    return false;
                }
            });

            Dialog.call(this, opt);
            this.el.addClass('dia-sub-tip');
            if ($.cookie("L_USER_COOKIE_USERNAME")) {
                $("#popup_login_id").val($.cookie("L_USER_COOKIE_USERNAME"));
            }
        }
    };
    login.show.prototype = Dialog.prototype;
    login.show.prototype.constructor = login;

    return login;
})
