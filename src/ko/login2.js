define(['knockout', 'ko-dialog'], function (ko, Dialog) {
    var bottom = '<div class="check-container" id="popup_login_container">\
                    <input type="text" class="global-input no-border-b" id="popup_login_id" placeholder="请输入手机号码" data-bind="value:userName">\
			        <span class="tips-container" id="login_name" style="display:none">用户名不能为空</span>\
                  </div><br>\
                  <div class="check-container">\
                    <input type="password" class="global-input no-border-t" id="popup_login_password" placeholder="请输入用户密码" data-bind="value:passWord">\
                    <span class="tips-container" id="login_pwd" style="display:none">密码不能为空</span>\
                  </div>\
                  <input class="btn status1-btn big-btn long-btn" type="submit" value="登录" id="popup_login" data-bind="click:login">\
	              <div class="pass-area">\
                      <label for="remember" id="remember_password"><input type="checkbox" id="remember">&nbsp;记住登录</label>\
                      <a href="#">忘记密码</a>\
                  </div>\
	              <a href="#" class="btn big-btn long-btn">新用户注册</a>';

    var callback;

    var inputError = function (id) {
        var el = $('#' + id);
        el.show();
        setTimeout(function () {
            el.hide();
            if (!el.prev().attr("id")) {//修复 ie bug，fuck IE！
                $("#popup_login_password").focus();
            }
            el.prev().focus();

        }, 1000);
    }

    var login = {
        show: function (_cb) {
            callback = _cb || null;
            new Dialog({
                title: '用户登录',
                bottom: bottom
            });
        }
    }

    ko.components.register('login-body', {
        viewModel: function (params) {
            var self = this;
            self.show = params.isShow || null;
            self.userName = ko.observable(null);
            self.passWord = ko.observable(null);

            this.login = function () {
                if (!self.userName()) {
                    inputError('login_name');
                    return false;
                }
                if (!self.passWord()) {
                    inputError('login_pwd');
                    return false;
                }
                if (callback) {
                    self.show(false);
                    callback();
                }
                return false;
            }.bind(this);

            //setTimeout(function () {
            //    $('#popup_login_id').placeholder();
            //    $('#popup_login_password').placeholder();
            //}, 0);
        },
        template: bottom
    });

    return login;
})
