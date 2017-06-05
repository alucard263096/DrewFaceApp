"use strict";
var api_config_1 = require("./api.config");
var AppUtil = (function () {
    function AppUtil() {
    }
    AppUtil.HtmlDecode = function (str) {
        var s = "";
        if (str.length == 0)
            return "";
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");
        s = s.replace("\"/alucard263096/drewface/upload/", "\"" + api_config_1.ApiConfig.getUploadPath());
        return s;
    };
    AppUtil.Toast = function (toastCtrl, msg) {
        var toast = toastCtrl.create({
            message: msg
        });
        toast.present();
    };
    AppUtil.FormatDateTime = function (val) {
        return val.getFullYear() + "-" + (val.getMonth() + 1) + "-" + val.getDate() +
            " " + val.getHours() + ":" + val.getMinutes() + ":" + val.getSeconds();
    };
    AppUtil.IsMobileNo = function (str) {
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        return myreg.test(str);
    };
    AppUtil.FormatPercent = function (val) {
        val = val * 100.0;
        return val.toFixed(2) + '%';
    };
    AppUtil.FormatPrice = function (val) {
        val = val * 1.0;
        return val.toFixed(2);
    };
    AppUtil.FormatNumber = function (val, digits) {
        val = val * 1.0;
        return val.toFixed(digits);
    };
    AppUtil.FormatDate = function (val) {
        return val.substr(0, 10);
    };
    return AppUtil;
}());
AppUtil.Storage = null;
exports.AppUtil = AppUtil;
//# sourceMappingURL=app.util.js.map