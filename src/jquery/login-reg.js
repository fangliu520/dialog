define(["base", 'dialog-double'], function (base, Dialog) {
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

    var loginBody = '<div class="check-container">\
                        <input type="text" class="global-input no-border-b" id="popup_login_id" placeholder="手机号码">\
			            <span class="tips-container" id="login_name" style="display:none">用户名不能为空</span>\
                     </div>\
                     <div class="check-container">\
                         <input type="password" class="global-input no-border-t" id="popup_login_password" placeholder="用户密码">\
			             <span class="tips-container" id="login_pwd" style="display:none">密码不能为空</span>\
			             <span class="tips-container" id="popup_login_error" style="display:none">用户名或密码错误</span>\
                     </div>\
                     <input class="btn status1-btn big-btn long-btn" type="submit" value="登录" id="popup_login">\
	                 <div class="pass-area">\
                         <label for="remember" id="remember_password"><input type="checkbox" id="remember">&nbsp;记住登录</label>\
                         <a href="#">忘记密码</a>\
                     </div>\
	                 <a href="#" class="btn big-btn long-btn" id="regBtn">新用户注册</a>';
    var errorTip = '<span class="tips-container">{msg}</span>';

    var regBody = '<div class="check-container">\
                       <input type="text" class="global-input no-border-b" id="popup_reg_id" placeholder="手机号码/邮箱/用户名">\
                       <span class="tips-container" id="reg_name" style="display:none">手机号码/邮箱/用户名不能为空</span>\
                   </div>\
                   <div class="check-container">\
                       <input type="password" class="global-input no-border-m" id="popup_reg_password1" placeholder="用户密码">\
                       <span class="tips-container" id="reg_pwd1" style="display:none">密码不能为空</span>\
                       <span class="tips-container" id="popup_login_error" style="display:none">用户名或密码错误</span>\
                   </div>\
                   <div class="check-container">\
                       <input type="password" class="global-input no-border-t" id="popup_reg_password2" placeholder="用户密码确认">\
                       <span class="tips-container" id="reg_pwd2" style="display:none">密码不能为空</span>\
                   </div>\
                   <input class="btn status1-btn big-btn long-btn" type="submit" value="注册" id="popup_reg">\
                   <div class="pass-area">\
                       <a id="loginBtn" href="#">登录老用户</a>\
                   </div>';

    var login = {
        show: function (cb) {
            var me = this;
            var cb = cb || function () { };
            var opt = {};
            opt.loginTitle = '用户登录';
            opt.loginBody = loginBody;
            opt.regTitle = '用户注册';
            opt.regBody = regBody;
            opt.buttonRender = function () {
                $('#popup_login_password').placeholder();
                $('#popup_login_id').placeholder();
                $('#popup_reg_id').placeholder();
                $('#popup_reg_password1').placeholder();
                $('#popup_reg_password2').placeholder();
                $('#popup_login').click(function () {
                    var username = $('#popup_login_id').val();
                    var password = $('#popup_login_password').val();

                    if ($.trim(username) == '') {
                        base.inputError('login_name');
                        return false;
                    }

                    if ($.trim(password) == '') {
                        base.inputError('login_pwd');
                        return false;
                    }
                    if (cb) {
                        cb();
                        me.close();
                    };
                    return false;
                });

                $("#popup_reg").click(function () {
                    var username = $('#popup_reg_id').val();
                    var password1 = $('#popup_reg_password1').val();
                    var password2 = $('#popup_reg_password2').val();
                    if ($.trim(username) == '') {
                        base.inputError('reg_name');
                        return false;
                    }

                    if ($.trim(password1) == '') {
                        base.inputError('reg_pwd1');
                        return false;
                    }
                    if ($.trim(password2) == '') {
                        base.inputError('reg_pwd2');
                        return false;
                    }
                    if ($.trim(password1) != $.trim(password2)) {
                        base.inputError('reg_pwd2', "两次密码输入不一致");
                        return false;
                    }
                    if (cb) {
                        cb();
                        me.close();
                    };

                    return false;
                });
            };

            Dialog.call(this, opt);
            this.el.addClass('dia-sub-tip');
        }
    };
    login.show.prototype = Dialog.prototype;
    login.show.prototype.constructor = login;

    return login;
})
