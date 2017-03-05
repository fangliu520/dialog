/// <reference path="jquery-1.8.3.min.js" />
/// <reference path="knockout-3.2.0.js" />
/// <reference path="base.js" />


require(["knockout", "base"], function (ko, base) {
    var viewModel = {};
    $.extend(viewModel,base, {
        showConfirm: function () {
            require(["ko-confirm"], function (confirm) {
                viewModel.show(true);
                new confirm("确认删除吗？", function () {
                    console.log("confirm ok!");
                    require(['alert'], function (alert) {
                        viewModel.show(true);
                        new alert("删除成功！", function () {
                            console.log("alert ok!");
                        });
                    });
                });
            });
        },
        showLogin: function () {
            require(["ko-login"], function (login) {
                viewModel.show(true);
                new login.show(function () {
                    console.log("congratulations, login in!");
                });
                
            });
        },
        showLogin2: function () {
            require(["ko-login2"], function (login) {
                viewModel.show(true);
                login.show(function () {
                    console.log("congratulations, login in!");
                });
            });
        }
    });

    $(window).ready(function () {
        ko.applyBindings(viewModel);

        $('#header_login').click(function () {
            require(["login"], function (login) {
                new login.show(function () {
                    console.log("congratulations, login in!");
                });
            });
        });

        $('#header_login2').click(function () {
            require(["login2"], function (login) {
                login.show(function () {
                    console.log("congratulations, login in!");
                });
            });
        });

        $('#header_login3').click(function () {
            require(["login-reg"], function (login) {
                new login.show(function () {
                    console.log("congratulations, reg success!");
                });
            });
        });

        $("#header_confirm").click(function () {
            require(['confirm'], function (confirm) {
                new confirm("确认删除吗？", function () {
                    console.log("confirm ok!");
                    require(['alert'], function (alert) {
                        new alert("删除成功！", function () {
                            console.log("alert ok!");
                        });
                    });
                });
            });
        });
    });
});