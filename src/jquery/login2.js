define(['dialog', 'base', 'placeholder'], function (Dialog, BASE) {
    var body = '<div class="check-container" id="popup_login_container">\
                    <input type="text" class="global-input no-border-b" id="popup_login_id" placeholder="手机号码">\
			            <span class="tips-container" id="login_name" style="display:none">用户名不能为空</span>\
                </div><br>\
                <div class="check-container">\
                    <input type="password" class="global-input no-border-t" id="popup_login_password" placeholder="用户密码">\
			        <span class="tips-container" id="login_pwd" style="display:none">密码不能为空</span>\
			        <span class="tips-container" id="popup_login_error" style="display:none">用户名或密码错误</span>\
                </div>'

    var bottom = '<input class="btn status1-btn big-btn long-btn" type="submit" value="登录" id="popup_login">\
	              <div class="pass-area">\
                      <label for="remember" id="remember_password"><input type="checkbox" id="remember">&nbsp;记住登录</label>\
                      <a href="#">忘记密码</a>\
                  </div>\
	              <a href="#" class="btn big-btn long-btn">新用户注册</a>';
    var errorTip = '<span class="tips-container">{msg}</span>';
    var single;
    var login = {
        show: function (callback) {
            single = new Dialog({
                title: '用户登录',
                body: body,
                bottom: bottom,
                afterRender: function () {
                    $('#popup_login_container').find('input', 'focus', function () {
                        $('#popup_login_container').find('.tips-container').hide();
                    });
                    $('#popup_login_password').placeholder();
                    $('#popup_login_id').placeholder();
                    $('#popup_login').click(function () {
                        var username = $('#popup_login_id').val();
                        var password = $('#popup_login_password').val();

                        if ($.trim(username) == '') {
                            BASE.inputError('login_name');
                            return false;
                        }

                        if ($.trim(password) == '') {
                            BASE.inputError('login_pwd');
                            return false;
                        }

                        single.close();
                        if (callback) {
                            callback();
                        }

                        return false;
                    });
                }
            });
        }
    }
    return login;
})
