function intializeParams() {
    var a = {
        url: null,
        headers: {
            Accept: "application/json; charset=utf-8",
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
        },
        requestType: "GET",
        dataType: "json",
        data: "",
        cache: !0,
        async: !0,
        successCallbackFunction: null,
        errorCallBackFunction: null,
        completeCallbackFunction: null
    };
    return null !== getCookie("requestId") && (a.headers.requestId = getCookie("requestId")), null !== getCookie("sessionId") && (a.headers.sessionId = getCookie("sessionId")), a
}

function doAjax(a) {
    var b = a.url,
        c = a.requestType,
        d = a.async,
        e = a.cache,
        f = a.headers,
        g = a.data,
        h = a.successCallbackFunction,
        i = a.errorCallBackFunction,
        j = a.completeCallbackFunction;
    $.ajax({
        url: aurl + b,
        crossDomain: !0,
        type: c,
        headers: f,
        data: g,
        async: d,
        cache: e,
        success: function(a, b, c) {
            var d = c.getResponseHeader("user");
            null !== d && setCookie("user", d);
            var e = h.split(",");
            for (j = 0; j < e.length; j++) {
                var f, g = [];
                if (e[j].indexOf("-") > -1) {
                    var i = e[j].split("-");
                    f = i[0];
                    for (var j = 1; j < i.length; j++) g.push(i[j])
                } else f = e[j];
                var k = window[f];
                "function" == typeof k && k(a, b, g)
            }
        },
        complete: function(a, b) {
            var c = window[j];
            "function" == typeof c && c(a, b)
        }
    })
}

function sessionExpire() {
    var a = "../common/sessionExpire";
    server.indexOf("localhost") > 0 && (a = "http://localhost:8080/MyAccount/sessionExpire.jsp"), $.ajax({
        url: a,
        success: function(a, b, c) {
            $("body").append(a), $(".modal").modal("hide"), $("#myModal").modal("show"), clearClientBrowser()
        }
    })
}

function getUrlParameter(a) {
    a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var b = "[\\?&]" + a + "=([^&#]*)",
        c = new RegExp(b),
        d = c.exec(decodeURIComponent(window.location.href));
    return null === d ? "" : d[1]
}

function updateUserAddress(a) {
    addrflag = !1, crudId = a.addressId;
    var b = intializeParams();
    if (b.url = ajaxUrlLogin + "updateUserAddr", b.requestType = "POST", b.successCallbackFunction = "updateUserAddressSuccess", b.errorCallBackFunction = "updateUserAddressError", b.data = JSON.stringify(a), b.async = !1, doAjax(b), addrflag) {
        var c, d;
        "false" === localStorage.getItem("onBehalf") ? d = JSON.parse(localStorage.getItem("userDetailandFamilyTree")) : "true" === localStorage.getItem("onBehalf") && (d = JSON.parse(localStorage.getItem("onBehalfUserDetailandFamilyTree"))), $.each(d.userAddressList, function(a, b) {
            b.addressId === crudId && (c = a)
        }), d.userAddressList[c] = a, "false" === localStorage.getItem("onBehalf") ? localStorage.setItem("userDetailandFamilyTree", JSON.stringify(d)) : "true" === localStorage.getItem("onBehalf") && localStorage.setItem("onBehalfUserDetailandFamilyTree", JSON.stringify(d))
    }
    return addrflag
}

function updateUserAddressSuccess(a) {
    "true" === a.message && (addrflag = !0)
}

function updateUserAddressError() {
    addrflag = !1
}

function deleteUserAddress(a) {
    addrflag = !1, crudId = a;
    var b = intializeParams();
    return b.url = ajaxUrlLogin + "deleteUserAddr/" + a, b.requestType = "POST", b.successCallbackFunction = "deleteUserAddressSuccess", b.errorCallBackFunction = "deleteUserAddressError", b.async = !1, doAjax(b), addrflag
}

function deleteUserAddressSuccess(a) {
    if ("true" === a.message) {
        addrflag = !0;
        var b;
        "false" === localStorage.getItem("onBehalf") ? b = JSON.parse(localStorage.getItem("userDetailandFamilyTree")) : "true" === localStorage.getItem("onBehalf") && (b = JSON.parse(localStorage.getItem("onBehalfUserDetailandFamilyTree")));
        var c = $.grep(b.userAddressList, function(a) {
            return a.addressId !== crudId
        });
        b.userAddressList = c, "false" === localStorage.getItem("onBehalf") ? localStorage.setItem("userDetailandFamilyTree", JSON.stringify(b)) : "true" === localStorage.getItem("onBehalf") && localStorage.setItem("onBehalfUserDetailandFamilyTree", JSON.stringify(b)), jcarouselInit();
        var d = preConfirmDetail.userAddress().length;
        corouselLength(d), 1 > d && $(".address-form .selectpicker").selectric({
            disableOnMobile: !1
        })
    }
}

function deleteUserAddressError() {
    addrflag = !1
}

function addUserAddress(a) {
    tempAddr = a;
    var b = intializeParams();
    return b.url = ajaxUrlLogin + "saveUserAddr", b.requestType = "POST", b.successCallbackFunction = "addUserAddressSuccess", b.data = JSON.stringify(a), b.async = !1, doAjax(b), tempAddr
}

function addUserAddressSuccess(a) {
    if (tempAddr.addressId = a.message, 0 !== tempAddr.addressId) {
        var b;
        "false" === localStorage.getItem("onBehalf") ? b = JSON.parse(localStorage.getItem("userDetailandFamilyTree")) : "true" === localStorage.getItem("onBehalf") && (b = JSON.parse(localStorage.getItem("onBehalfUserDetailandFamilyTree"))), b.userAddressList.push(tempAddr), "false" === localStorage.getItem("onBehalf") ? localStorage.setItem("userDetailandFamilyTree", JSON.stringify(b)) : "true" === localStorage.getItem("onBehalf") && localStorage.setItem("onBehalfUserDetailandFamilyTree", JSON.stringify(b)), jcarouselInit();
        var c = preConfirmDetail.userAddress().length + 1;
        corouselLength(c)
    }
}

function shareFB() {
    window.open("http://www.facebook.com/sharer.php?u=" + shareURL, "newwindow", "width=500, height=450")
}

function shareTwitter() {
    window.open("https://twitter.com/intent/tweet?url=" + shareURL, "newwindow", "width=500, height=450")
}

function shareGooglePlus() {
    window.open("https://plus.google.com/share?url=" + shareURL, "newwindow", "width=500, height=450")
}

function shareWhatsApp() {
    window.location = "whatsapp://send?text=" + shareURL
}

function getRandomString() {
    var a = intializeParams();
    a.url = ajaxUrlLogin + "savePass", a.requestType = "GET", a.successCallbackFunction = "getSavePassSuccess", a.errorCallBackFunction = "getSavePassError", a.async = !1, doAjax(a)
}

function getSavePassSuccess(a) {
    randomString = a.text
}

function getSavePassError() {}

function onBlurLoginIdVerify() {
    if ("PCPLOGIN" !== pcpcheck) {
        var a = $("#loginId").val();
        loginType(a, "login")
    } else console.log(pcpcheck)
}

function loginType(a, b) {
    console.log("Inside Login Type --> ", $("#registerMobileNo").val()), checkRegisterOrLogin = b;
    var c = intializeParams(),
        d = "" != $("#registerMobileNo").val() ? $("#registerMobileNo").val() : null;
    console.log("Mobile No : " + d), c.url = ajaxUrlLogin + "user/" + a + "/" + d, "login" === b ? c.successCallbackFunction = "verifyHeaderEmailSuccess" : "register" === b ? c.successCallbackFunction = "verifyRegisterHeaderEmailSuccess" : "resetPwd" === b && (c.successCallbackFunction = "resetPwdSuccess"), c.async = !1, doAjax(c)
}

function onBlurRegisterEmailIdVerify() {
    var a = $("#registerEmailId").val();
    $("#existloginPass").removeAttr("disabled"), $("#loginButton").removeAttr("disabled"), $("#emailTypeVerification").html(""), $("#loginErrorMessage").html(""), $(".fbLogin").addClass("hide"), $(".gpLogin").addClass("hide"), $(".tcLogin").addClass("hide"), loginType(a, "register")
}

function verifyHeaderEmailSuccess(a) {
    verifyRegisterHeaderEmailResponse = a, "TC" === a.accountType || ("FB" === a.accountType ? ($("#loginErrorMessage").html(""), $(".fbLogin").removeClass("hide"), $(".gpLogin").addClass("hide"), $(".tcLogin").addClass("hide"), $(".noAccount").addClass("hide"), $("#existloginPass").attr("disabled", "disabled"), $("#loginButton").prop("disabled", "disabled")) : "GP" === a.accountType ? ($("#loginErrorMessage").html(""), $(".gpLogin").removeClass("hide"), $(".fbLogin").addClass("hide"), $(".tcLogin").addClass("hide"), $(".noAccount").addClass("hide"), $("#existloginPass").attr("disabled", "disabled"), $("#loginButton").prop("disabled", "disabled")) : ($("#loginErrorMessage").html(""), $(".noAccount").removeClass("hide"), $(".gpLogin").addClass("hide"), $(".fbLogin").addClass("hide"), $(".tcLogin").addClass("hide"), "NA" === a.accountType ? registerLink = "create" : "GU" === a.accountType && (registerLink = "create/guestUser")))
}

function verifyRegisterHeaderEmailSuccess(a) {
    verifyRegisterHeaderEmailResponse = a, console.log("cust id>> " + verifyRegisterHeaderEmailResponse.custId), "TC" === verifyRegisterHeaderEmailResponse.accountType && "true" === verifyRegisterHeaderEmailResponse.message ? "N" == verifyRegisterHeaderEmailResponse.isActive ? (registerLink = "create", $(".fbLogin").addClass("hide"), $(".gpLogin").addClass("hide")) : "Y" == verifyRegisterHeaderEmailResponse.isActive && ($(".tcLogin").removeClass("hide"), $(".fbLogin").addClass("hide"), $(".gpLogin").addClass("hide")) : "false" === verifyRegisterHeaderEmailResponse.message && ($("#emailTypeVerification").css("display", "block"), "FB" === verifyRegisterHeaderEmailResponse.accountType ? ($(".fbLogin").removeClass("hide"), $(".gpLogin").addClass("hide"), $(".tcLogin").addClass("hide")) : "GP" === verifyRegisterHeaderEmailResponse.accountType ? ($(".gpLogin").removeClass("hide"), $(".fbLogin").addClass("hide"), $(".tcLogin").addClass("hide")) : ($(".fbLogin").addClass("hide"), $(".gpLogin").addClass("hide"), $(".tcLogin").addClass("hide"), "NA" === verifyRegisterHeaderEmailResponse.accountType ? registerLink = "create" : "GU" === verifyRegisterHeaderEmailResponse.accountType && (registerLink = "create/guestUser")))
}

function resetPwdSuccess(a) {
    "TC" === a.accountType && forgetPasswordHeader(), $(".resetpass-wrap").addClass("hide"), $(".support-message").removeClass("hide")
}

function validateCredential() {
    if (captchaLoad === !1) callVerify();
    else {
        var a = isCaptchValid();
        a === !0 && callVerify()
    }
}

function callVerify() {
    var a = 1e3,
        b = 128,
        c = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex),
        d = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex),
        e = new AesUtil(b, a),
        f = e.encrypt(d, c, randomString, $("#existloginPass").val()),
        g = {
            userId: $("#loginId").val(),
            text1: d,
            text2: c,
            text3: f,
            otp: $("#loginOTP").val()
        },
        h = intializeParams();
    h.url = ajaxUrlLogin + "verifyCrediential", h.requestType = "POST", h.successCallbackFunction = "validateCredentialSuccessHeader", h.errorCallBackFunction = "validateCredentialErrorHeader", h.data = JSON.stringify(g), h.async = !1, doAjax(h)
}

function isCaptchValid() {
    var a = !0;
    return "" === $("#captchaValue").val() ? ($("#captchaValue").addClass("parsley-error"), $("#loginErrorMessage").html("Invalid Captcha!!"), a = !1) : ($("#captchaValue").removeClass("parsley-error"), $("#loginErrorMessage").parent().find(".field-error").html(""), $.ajax({
        url: paymentGatewayBaseUrl + "Captcha/CaptchaServlet?captchaValue=" + $("#captchaValue").val(),
        dataType: "json",
        type: "GET",
        async: !1,
        success: function(b) {
            "false" === b.validated && ($("#captchaValue").addClass("parsley-error"), $("#loginErrorMessage").html("Invalid Captcha!!"), $("#captcha").attr("src", paymentGatewayBaseUrl + "Captcha/CaptchaServlet"), a = !1)
        },
        error: function(a, b, c) {}
    })), a
}

function validateCredentialSuccessHeader(a) {
    if ($("#loginButton").addClass("loading"), localStorage.setItem("userDetailandFamilyTree", JSON.stringify(a)), a.invalidLoginCount > 2 && (captchaLoad = !0, $("#captchalogin").removeClass("hide"), $("#captcha").attr("src", paymentGatewayBaseUrl + "Captcha/CaptchaServlet")), "false" !== a.message)
        if ("Staff" === a.userDetail.userTypeId) {
            restrictDropOutMail = !0;
            a.userDetail.roleId;
            server.indexOf("uatastra") > 0 ? (window.location.href = window.location.origin + "/common/onBehalf", a.isForexRole === !0 ? localStorage.setItem("onBehalfRedirectUrl", window.location.origin + "/foreign-exchange") : localStorage.setItem("onBehalfRedirectUrl", window.location.origin + "/")) : server.indexOf("pprod.thomascook.in") > 0 ? (window.location.href = window.location.origin + "/common/onBehalf", a.isForexRole === !0 ? localStorage.setItem("onBehalfRedirectUrl", window.location.origin + "/foreign-exchange") : localStorage.setItem("onBehalfRedirectUrl", window.location.origin + "/")) : (window.location.href = window.location.origin + "/common/onBehalf", a.isForexRole === !0 ? localStorage.setItem("onBehalfRedirectUrl", window.location.origin + "/foreign-exchange") : localStorage.setItem("onBehalfRedirectUrl", window.location.origin + "/"))
        } else "Agent" === a.userDetail.userTypeId ? (localStorage.setItem("onBehalf", "true"), localStorage.setItem("onBehalfCheck", !0), onBehalfOption = "onbehalf", console.log("inside agent1234"), server.indexOf("uatastra") > 0 ? (window.location.href = window.location.origin + "/common/onBehalf", a.isForexRole === !0 ? localStorage.setItem("onBehalfRedirectUrl", window.location.origin + "/foreign-exchange") : localStorage.setItem("onBehalfRedirectUrl", window.location.origin + "/")) : server.indexOf("pprod.thomascook.in") > 0 ? (window.location.href = window.location.origin + "/common/onBehalf", a.isForexRole === !0 ? localStorage.setItem("onBehalfRedirectUrl", window.location.origin + "/foreign-exchange") : localStorage.setItem("onBehalfRedirectUrl", window.location.origin + "/")) : (window.location.href = window.location.origin + "/common/onBehalf", a.isForexRole === !0 ? localStorage.setItem("onBehalfRedirectUrl", window.location.origin + "/foreign-exchange") : localStorage.setItem("onBehalfRedirectUrl", window.location.origin + "/"))) : (restrictDropOutMail = !0, window.location.href = window.location.href.split("sessionExpireLogin")[0]);
    else $("#loginButton").removeClass("loading"), $("#loginErrorMessage").html('<p class="error-info"><span>' + a.reasonOfMessage + "</span></p>");
    localStorage.setItem("onBehalf", "false")
}

function validateCredentialErrorHeader() {}

function registerAndLoginHeader(a, b, c, d, e, f) {
    var g = 1e3,
        h = 128,
        i = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex),
        j = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex),
        k = new AesUtil(h, g),
        l = k.encrypt(j, i, randomString, b),
        m = {
            userId: a,
            text1: j,
            text2: i,
            text3: l,
            mobileNo: c,
            firstName: d,
            lastName: e,
            title: f
        },
        n = intializeParams();
    n.url = ajaxUrlLogin + registerLink, n.requestType = "POST", n.successCallbackFunction = "registerAndLoginSuccessHeader", n.data = JSON.stringify(m), n.async = !1, doAjax(n)
}

function registerAndLoginSuccessHeader(a) {
    $("#registerButton").removeClass("loading"), $("#loginRegisterPopup").modal("hide"), localStorage.setItem("onBehalf", "false"), localStorage.setItem("userDetailandFamilyTree", JSON.stringify(a)), loogedIn()
}

function forgetPasswordHeader() {
    var a = $("#confirmId").val().trim();
    if ("" === a) return $("#confirmId").addClass("parsley-error"), $(".resetError").addClass("show"), !1;
    var b = intializeParams();
    b.url = ajaxUrlLogin + "forgetPassword/" + a, b.requestType = "GET", b.successCallbackFunction = "forgetPasswordSuccessHeader", b.errorCallBackFunction = "forgetPasswordErrorHeader", b.async = !0, doAjax(b)
}

function forgetPasswordSuccessHeader() {}

function forgetPasswordErrorHeader() {}

function ClickToCallTimeoutSuccessFunction(a) {
    if (a.success === !0) {
        var b = 1e3 * a.timeout;
        setTimeout(function() {
            $(".click-bott").show()
        }, b)
    }
}

function validateClickToCall() {
    var a = click2CallMobileValidation();
    if (a === !0) {
        var b = server,
            c = sessionStorage.getItem("deviceType"),
            d = getGACampaignCodesnew(),
            e = "",
            f = localStorage.getItem("geoCords");
        e = {
            pageUrl: b,
            mobileNo: $("#click2callmobnumber").val(),
            deviceType: c,
            utmParam: d
        }, "undefined" != typeof f && null !== f && "" !== f && (e = {
            pageUrl: b,
            mobileNo: $("#click2callmobnumber").val(),
            deviceType: c,
            utmParam: d,
            geoCords: f
        }), window.location.href.includes("Irctc") && (e.boargingCity = "undefined" != typeof selectedBoardingStatioName && null !== selectedBoardingStatioName ? selectedBoardingStatioName : "", e.destinationCity = "undefined" != typeof selectedDeBoardingStatioName && null !== selectedDeBoardingStatioName ? selectedDeBoardingStatioName : "");
        var g = $('input[name="click_to_call_radio"]:checked').val();
        "Video_call" === g ? e.leadSource = "video" : e.leadSource = "audio";
        var h = intializeParams();
        h.url = "tcCommonRS/click2Call/clickToCall", h.requestType = "POST", h.data = JSON.stringify(e), h.successCallbackFunction = "ClickToCallSuccessFunction", h.async = !1, doAjax(h)
    }
}

function ClickToCallSuccessFunction(a) {
    a.success === !0 ? $("#clickToCallSuccessMessage").css("display", "block") : $("#clickToCallFailureMessage").css("display", "block")
}

function fetchMenuListForPageHeader() {
    if ($("#holidaysMenu").addClass("hide"), $("#forexMenu").addClass("hide"), $("#flightsMenu").addClass("hide"), $("#hotelsMenu").addClass("hide"), $("#visaMenu").addClass("hide"), $("#offersMenu").addClass("hide"), null !== getCookie("menuList") && "" !== getCookie("menuList") && void 0 !== getCookie("menuList") && "null" !== getCookie("menuList"))
        if (console.log("cookies : " + getCookie("menuList")), menuPojo = JSON.parse(getCookie("menuList")), "object" != typeof menuPojo)
            if (menuPojo = JSON.parse(menuPojo), console.log(menuPojo), "false" === menuPojo.isCustomer)
                for (var a = menuPojo.menuList, b = 0; b < a.length; b++) "Holidays" === a[b].categoryName ? $("#holidaysMenu").removeClass("hide") : "Forex" === a[b].categoryName ? $("#forexMenu").removeClass("hide") : "Hotel" === a[b].categoryName ? $("#flightsMenu").removeClass("hide") : "Flights" === a[b].categoryName ? $("#hotelsMenu").removeClass("hide") : "Visa" === a[b].categoryName ? $("#visaMenu").removeClass("hide") : "Offers" === a[b].categoryName && $("#offersMenu").removeClass("hide");
            else $("#holidaysMenu").removeClass("hide"), $("#forexMenu").removeClass("hide"), $("#flightsMenu").removeClass("hide"), $("#hotelsMenu").removeClass("hide"), $("#visaMenu").removeClass("hide"), $("#offersMenu").removeClass("hide");
    else $("#holidaysMenu").removeClass("hide"), $("#forexMenu").removeClass("hide"), $("#flightsMenu").removeClass("hide"), $("#hotelsMenu").removeClass("hide"), $("#visaMenu").removeClass("hide"), $("#offersMenu").removeClass("hide")
}

function headerNameDisplay() {
    var a, b;
    void 0 !== JSON.parse(localStorage.getItem("userDetailandFamilyTree")).userDetail.fname && null !== JSON.parse(localStorage.getItem("userDetailandFamilyTree")).userDetail.fname ? (b = JSON.parse(localStorage.getItem("userDetailandFamilyTree")).userDetail.fname, a = JSON.parse(localStorage.getItem("userDetailandFamilyTree")).userDetail.fname) : (b = JSON.parse(localStorage.getItem("userDetailandFamilyTree")).userDetail.userId, a = b.length < 10 ? b : b.substring(0, 9) + "...."), $("#userNameId").text(a), $("#userNameId").attr("title", b), $("#LoginLogoutToggel").text(a), $("#loginRegisterDropdown").attr("title", b)
}

function loogedIn() {
    $("#mainLogIn").hide(), $("#newUserId").hide(), $(".loggedInshow").removeClass("hide"), $("#userNameId").removeClass("hide"), headerNameDisplay(), $("#loginProfilePic").attr("src", JSON.parse(localStorage.getItem("userDetailandFamilyTree")).userDetail.profilePicUrl), "Staff" === JSON.parse(localStorage.getItem("userDetailandFamilyTree")).userDetail.userTypeId && $(".onbehalfClass").removeClass("hide"), "Agent" === JSON.parse(localStorage.getItem("userDetailandFamilyTree")).userDetail.userTypeId && (console.log("inside loged in"), localStorage.setItem("onBehalf", "true")), "Non ebiz channel" === JSON.parse(localStorage.getItem("userDetailandFamilyTree")).userDetail.departmentId && (console.log("insidde hide customer"), $("#agentcustonbehalf").addClass("hide")), localStorage.setItem("customerType", "Customer"), callHeaderPopup()
}

function callHeaderPopup() {
    if (void 0 !== localStorage.getItem("userDetailandFamilyTree") || "" !== localStorage.getItem("userDetailandFamilyTree") || null !== localStorage.getItem("userDetailandFamilyTree")) {
        var a = JSON.parse(localStorage.getItem("userDetailandFamilyTree"));
        "Customer" === a.userDetail.userTypeId && "TC" === a.accountType ? ($("#headerProfile").show(), $("#headerSetting").show()) : "Customer" === a.userDetail.userTypeId && "TC" !== a.accountType ? ($("#headerProfile").show(), $("#headerSetting").hide()) : ($("#headerProfile").hide(), $("#headerSetting").hide(), $("#viewAccount").hide())
    }
}

function logout() {
    $("#LoginLogoutToggel").text("Login");
    var a = intializeParams();
    a.url = ajaxUrlLogin + "logoutUser", a.requestType = "GET", a.successCallbackFunction = "logoutUserSuccessFunction", a.async = !1, doAjax(a)
}

function logoutUserSuccessFunction(a) {
    delete_cookie("sessionId"), delete_cookie("requestId"), clearClientBrowser(), restrictDropOutMail = !0, server.indexOf("uatastra") > 0 ? window.location.href = window.location.origin + "/" : server.indexOf("pprod.thomascook.in") > 0 ? window.location.href = window.location.origin + "/" : window.location.href = window.location.origin + "/"
}

function onbehalfMailCheck() {
    var a = !0;
    if ("onbehalf" === onBehalfOption) {
        var b = $("#onBehalfEmailId").val().trim();
        "" === b ? ($("#user_onbehalf").addClass("parsley-error"), $("#user_onbehalf").next(".onbehalfError").find("p").html("You missed this"), $("#user_onbehalf").next(".onbehalfError").addClass("show"), a = !1) : IsEmail(b) || ($("#user_onbehalf").addClass("parsley-error"), $("#user_onbehalf").next(".onbehalfError").find("p").html("Please enter valid email"), $("#user_onbehalf").next(".onbehalfError").addClass("show"), a = !1)
    }
    return a
}

function onbehalfAgentIdOrMail() {
    var a = !0;
    if ("onbehalf" === onBehalfOption) {
        var b = $("#onBehalfAgentId").val().trim(),
            c = $("#onBehalfAgentEmail").val().trim();
        "" === b ? ($("#onBehalfAgentId").addClass("parsley-error"), $("#onBehalfAgentId").next(".onbehalfError").find("p").html("You missed this"), $("#onBehalfAgentId").next(".onbehalfError").addClass("show"), a = !1) : ($("#onBehalfAgentId").removeClass("parsley-error"), $("#onBehalfAgentId").next(".onbehalfError").find("p").html(""), $("#onBehalfAgentId").next(".onbehalfError").addClass("hide")), "" === c ? ($("#onBehalfAgentEmail").addClass("parsley-error"), $("#onBehalfAgentEmail").next(".onbehalfError").find("p").html("You missed this"), $("#onBehalfAgentEmail").next(".onbehalfError").addClass("show"), a = !1) : IsEmail(c) || ($("#onBehalfAgentEmail").addClass("parsley-error"), $("#onBehalfAgentEmail").next(".onbehalfError").find("p").html("Please enter valid email"), $("#onBehalfAgentEmail").next(".onbehalfError").addClass("show"), a = !1)
    }
    return a
}

function onbehalfMailCheckB2c() {
    var a = !0;
    if ("onbehalf" === onBehalfOption) {
        var b = $("#b2c_onBehalfEmailId").val().trim();
        "" === b ? ($("#b2c_onBehalfEmailId").addClass("parsley-error"), $("#b2c_onBehalfEmailId").next(".onbehalfError").find("p").html("You missed this"), $("#b2c_onBehalfEmailId").next(".onbehalfError").addClass("show"), a = !1) : IsEmail(b) || ($("#b2c_onBehalfEmailId").addClass("parsley-error"), $("#b2c_onBehalfEmailId").next(".onbehalfError").find("p").html("Please enter valid email"), $("#b2c_onBehalfEmailId").next(".onbehalfError").addClass("show"), a = !1)
    }
    return a
}

function onBehalfSuccess(a) {
    "true" === a.message && localStorage.setItem("onBehalfUserDetailandFamilyTree", JSON.stringify(a))
}

function onBehalfAgentSuccess(a) {
    "Present" === a.text && (localStorage.setItem("AgentNameorId", $("#onBehalfAgentId").val().trim()), agentSuccess = !0)
}

function onBehalfAgenterror() {
    console.log("onBehalfAgenterror")
}

function onBehalfAgentIdOrName() {
    var a = intializeParams();
    a.url = ajaxUrlLogin + "verifyAgent/" + $("#onBehalfAgentId").val(), a.requestType = "GET", a.successCallbackFunction = "onBehalfAgentSuccess", a.errorCallBackFunction = "onBehalfAgenterror", a.async = !1, doAjax(a)
}

function fbLogin() {
    FB.login(function(a) {
        a.authResponse && getFBData()
    }, {
        scope: "public_profile,email"
    })
}

function getFBData() {
    FB.api("/me?fields=name,email", function(a) {
        socialLogin("FB", a.name, a.email, a.id, "http://graph.facebook.com/" + a.id + "/picture")
    })
}

function attachSignin(a) {
    auth2.attachClickHandler(a, {}, function(a) {
        var b = a.getBasicProfile();
        socialLogin("GP", b.getName(), b.getEmail(), b.getId(), b.getImageUrl())
    }, function(a) {})
}

function socialLogin(a, b, c, d, e) {
    if (socialLoginType = a, void 0 !== c && "" !== c) {
        var f = b.split(" "),
            g = f.length - 1,
            h = {
                type: a,
                firstName: f[0],
                lastName: f[g],
                userId: c,
                id: d,
                imgUrl: e
            },
            i = intializeParams();
        i.url = ajaxUrlLogin + "socialLogin", i.requestType = "POST", i.async = !1, i.data = JSON.stringify(h), i.successCallbackFunction = "socialLoginSuccess", doAjax(i)
    } else $(".soc-login").append('<p class="col-xs-12 error-info"><span>Unable to login</span></p>'), setTimeout(function() {
        $(".soc-login").find(".error-info").remove()
    }, 3e3)
}



function myProfileFunction() {
    restrictDropOutMail = !0;
    var a = getCookie("user");
    localStorage.setItem("sideBar", "profile");
    var b = JSON.parse(localStorage.getItem("userDetailandFamilyTree"));
    null !== a && "Customer" === b.userDetail.userTypeId ? server.indexOf("localhost") > 0 ? window.location.href = "/MyAccount/MyAccount/profile.jsp" : window.location.href = "/MyAccount/profile.html" : $("#loginRegisterPopup").modal("show")
}

function mySettingFunction() {
    restrictDropOutMail = !0;
    var a = getCookie("user");
    localStorage.setItem("sideBar", "setting");
    var b = JSON.parse(localStorage.getItem("userDetailandFamilyTree"));
    null !== a && "Customer" === b.userDetail.userTypeId && "TC" === b.accountType ? server.indexOf("localhost") > 0 ? window.location.href = "/MyAccount/MyAccount/setting.jsp" : window.location.href = "/MyAccount/setting.html" : $("#loginRegisterPopup").modal("show")
}

function sendOTP(a) {
    var b = intializeParams();
    b.url = ajaxUrlLogin + "sendOTP/" + a + "/", b.successCallbackFunction = "sendOTPSuccessFunction", b.async = !1, doAjax(b)
}

function sendOTPSuccessFunction(a) {
    "blocked" === a.text ? ($(".otplimit").removeClass("hide"), setTimeout(function() {
        $(".otplimit").addClass("hide")
    }, 5e3)) : ($(".SucessMess").removeClass("hide"), setTimeout(function() {
        $(".SucessMess").addClass("hide")
    }, 5e3))
}

function myBookingFunction() {
    restrictDropOutMail = !0;
    var a = getCookie("user");
    localStorage.setItem("sideBar", "booking"), null !== a ? server.indexOf("localhost") > 0 ? window.location.href = "/MyAccount/MyAccount/my-bookings.jsp" : window.location.href = "/MyAccount/my-bookings.html" : $("#loginRegisterPopup").modal("show")
}

function detectRefresh() {
    try {
        void 0 !== window.opener.title && (isRefresh = !0)
    } catch (a) {
        isRefresh = !1
    }
}

function cityStateAutoSuccess(a) {
    localStorage.setItem("cityList", JSON.stringify(a)), cityStateList = a
}

function onBehalfFunction() {
    restrictDropOutMail = !0, "onBehalf" !== $("#onBehalf").val() ? (localStorage.removeItem("onBehalfRedirectUrl"), localStorage.setItem("onBehalfRedirectUrl", window.location.origin + "/holidays"), localStorage.removeItem("onBehalfEmail"), localStorage.setItem("onBehalf", "false"), localStorage.removeItem("onBehalfUserDetailandFamilyTree"), server.indexOf("localhost") > 0 ? window.location.href = "/MyAccount/onBehalf.jsp" : window.location.href = window.location.origin + "/common/onBehalf") : (localStorage.removeItem("onBehalfEmail"), localStorage.removeItem("onBehalfUserDetailandFamilyTree"))
}

function clearClientBrowser() {
    delete_cookie("sessionId"), delete_cookie("requestId"), delete_cookie("user"), delete_cookie("menuList"), localStorage.removeItem("onBehalfRedirectUrl"), localStorage.removeItem("onBehalfEmail"), localStorage.removeItem("onBehalf"), localStorage.removeItem("userDetailandFamilyTree"), localStorage.removeItem("email"), localStorage.removeItem("onBehalfUserDetailandFamilyTree"), localStorage.removeItem("mobile"), localStorage.removeItem("onBehalfCheck")
}

function loginLoad() {
    if (1 !== loadCounter) return !1;
    var a = document.createElement("script");
    a.setAttribute("type", "text/javascript"), a.setAttribute("src", "https://apis.google.com/js/api:client.js"), document.head.appendChild(a),
        function(a, b, c) {
            var d, e = a.getElementsByTagName(b)[0];
            a.getElementById(c) || (d = a.createElement(b), d.id = c, d.src = "//connect.facebook.net/en_US/sdk.js", e.parentNode.insertBefore(d, e))
        }(document, "script", "facebook-jssdk");
    var b = document.createElement("script");
    b.setAttribute("type", "text/javascript"), b.setAttribute("src", "//connect.facebook.net/en_US/all.js"), document.head.appendChild(b), loadCounter++
}

function updateReadMore() {
    if (allOSB.length > 0)
        for (var a = 0; a < allOSB.length; a++) allOSB[a].scrollHeight > mxh ? (allOSB[a].hasAttribute("style") && updateHeight(allOSB[a]), allOSB[a].nextElementSibling.className = "read_more_static") : allOSB[a].nextElementSibling.className = "read_more_static hid_static"
}

function revealThis(a) {
    var b = a.previousElementSibling;
    b.hasAttribute("style") ? (a.innerHTML = "Read More", b.removeAttribute("style")) : (updateHeight(b), a.innerHTML = "Read Less")
}

function updateHeight(a) {
    a.style.maxHeight = a.scrollHeight + "px"
}

function insertAfter(a, b) {
    a.parentNode.insertBefore(b, a.nextSibling)
}

function readCookie(a) {
    for (var b = a + "=", c = document.cookie.split(";"), d = 0; d < c.length; d++) {
        for (var e = c[d];
            " " == e.charAt(0);) e = e.substring(1, e.length);
        if (0 == e.indexOf(b)) return e.substring(b.length, e.length)
    }
    return null
}

function getGACampaignCodesnew() {
    if (null != readCookie("__utmz") || void 0 != readCookie("__utmz")) {
        var a = readCookie("__utmz"),
            b = function() {
                var b = a.split(".").slice(4).join(".");
                return b = b.replace(/\|/g, "&")
            }(),
            c = getCookie("Banner");
        return null !== c && (c = getCookie("Banner").replace("src=", "")), b.replace(/{/g, "%7B").replace(/}/g, "%7D") + "&match_tag=" + c + "&random_text=" + getCookie("User Mobile") + "&pagename=" + (window.location.pathname + window.location.search.replace(/&/g, "?")).substring(0, 254)
    }
}

function googleTag(a, b, c) {}

function googleTagMap(a, b, c, d) {}

function logJsError(a) {
    a.module || (a.module = module.COMMON);
    var b = intializeParams();
    b.url = "tcCommonRS/logging/logJsError", b.requestType = "POST", b.cache = !1, b.async = !0, b.data = JSON.stringify(a), b.successCallbackFunction = "logErrorSuccess", doAjax(b)
}

function logErrorSuccess(a) {}

function createErrorObject(a, b, c, d, e, f, g, h, i) {
    return {
        module: a,
        fileName: b,
        functionName: c,
        errorName: d,
        errorMessage: e,
        lineNo: f,
        columnNo: g,
        stack: h,
        customParam: i
    }
}

function fetchInsuranceUrl() {
    "true" === localStorage.getItem("onBehalf") ? window.location = window.location.origin + "/tcinsurance" : window.location = window.location.origin + "/travel-insurance"
}

function onBehalfAutoSuggest(a) {
    console.log("inside autosuggest"), agentAutoSuggestData = a
}

function cruiseLink() {
    var a = JSON.parse(localStorage.getItem("userDetailandFamilyTree")),
        b = a.userDetail.userId,
        c = {
            userId: b
        };
    console.log("USERID", c);
    var d = intializeParams();
    d.url = ajaxUrlLogin + "encodedCruiseLink", d.requestType = "POST", d.successCallbackFunction = "generateCruiseLinkSuccess", d.errorCallBackFunction = "generateCruiseLinkError", d.async = !1, d.data = JSON.stringify(c), doAjax(d)
}

function generateCruiseLinkSuccess(a) {
    var b = a.encodedString,
        c = localStorage.getItem("onBehalf");
    console.log("TEXT-->", b), console.log("Onbehlaf-->", a);
    var d = "https://cruise.thomascook.in/autosignin?userlogin=" + b;
    console.log("LINK-->" + d), "true" === c ? (console.log("True"), $("#cruisePath").attr("href", d)) : (console.log("FALSE"), $("#cruisePath").attr("href", "https://cruise.thomascook.in"))
}

function generateCruiseLinkError() {
    console.log("generateCruiseLinkError")
}

function tc_read_more_dynamic(a) {
    a.tc_read_more = {
        defaults: {
            slicePoint: 100,
            sliceOn: null,
            preserveWords: !0,
            normalizeWhitespace: !0,
            showWordCount: !1,
            detailPrefix: " ",
            wordCountText: " ({{count}} words)",
            widow: 4,
            expandText: "read more",
            expandPrefix: "&hellip; ",
            expandAfterSummary: !1,
            wordEnd: /(&(?:[^;]+;)?|[0-9a-zA-Z\u00C0-\u0100]+|[^\u0000-\u007F]+)$/,
            summaryClass: "tc_first_summary",
            detailClass: "tc_all_details",
            moreClass: "read-more",
            lessClass: "read-less",
            moreLinkClass: "more-link",
            lessLinkClass: "less-link",
            collapseTimer: 0,
            expandEffect: "slideDown",
            expandSpeed: 250,
            collapseEffect: "slideUp",
            collapseSpeed: 200,
            userCollapse: !0,
            userCollapseText: "read less",
            userCollapsePrefix: " ",
            onSlice: null,
            beforeExpand: null,
            afterExpand: null,
            onCollapse: null,
            afterCollapse: null
        }
    }, a.fn.tc_read_more = function(b) {
        function c(a, b) {
            var c = "span",
                d = a.summary,
                e = q.exec(d),
                f = e ? e[2].toLowerCase() : "";
            return b ? (c = "div", e && "a" !== f && !a.expandAfterSummary ? d = d.replace(q, a.moreLabel + "$1") : d += a.moreLabel, d = '<div class="' + a.summaryClass + '">' + d + "</div>") : d += a.moreLabel, [d, a.detailPrefix || "", "<", c + ' class="' + a.detailClass + '"', ">", a.details, "</" + c + ">"].join("")
        }

        function d(a, b) {
            var c = '<span class="' + a.moreClass + '">' + a.expandPrefix;
            return a.showWordCount ? a.wordCountText = a.wordCountText.replace(/\{\{count\}\}/, b.replace(n, "").replace(/&(?:amp|nbsp);/g, "").replace(/(?:^\s+|\s+$)/, "").match(/\w+/g).length) : a.wordCountText = "", c += '<a href="#" class="' + a.moreLinkClass + '">' + a.expandText + a.wordCountText + "</a></span>";
        }

        function e(a, b) {
            return a.lastIndexOf("<") > a.lastIndexOf(">") && (a = a.slice(0, a.lastIndexOf("<"))), b && (a = a.replace(m, "")), a.replace(s, "")
        }

        function f(a, b) {
            b.stop(!0, !0)[a.collapseEffect](a.collapseSpeed, function() {
                var c = b.prev("span." + a.moreClass).show();
                c.length || b.parent().children("div." + a.summaryClass).show().find("span." + a.moreClass).show(), a.afterCollapse && a.afterCollapse.call(b)
            })
        }

        function g(b, c, d) {
            b.collapseTimer && (j = setTimeout(function() {
                f(b, c), a.isFunction(b.onCollapse) && b.onCollapse.call(d, !1)
            }, b.collapseTimer))
        }

        function h(b) {
            var c = "ExpandMoreHere374216623",
                d = b.summaryText.replace(b.sliceOn, c);
            d = a("<div>" + d + "</div>").text();
            var e = d.indexOf(c),
                f = b.summaryText.indexOf(b.sliceOn);
            return -1 !== e && e < b.slicePoint && (b.summaryText = b.allHtml.slice(0, f)), b
        }
        var i = "init";
        "string" == typeof b && (i = b, b = {});
        var j, k = a.extend({}, a.tc_read_more.defaults, b),
            l = /^<(?:area|br|col|embed|hr|img|input|link|meta|param).*>$/i,
            m = k.wordEnd,
            n = /<\/?(\w+)[^>]*>/g,
            o = /<(\w+)[^>]*>/g,
            p = /<\/(\w+)>/g,
            q = /(<\/([^>]+)>)\s*$/,
            r = /^(<[^>]+>)+.?/,
            s = /(?:^\s+|\s+$)/g,
            t = /\s\s+/g,
            u = function(a) {
                return k.normalizeWhitespace ? (a || "").replace(s, "").replace(t, " ") : a
            },
            v = {
                init: function() {
                    this.each(function() {
                        var b, i, m, q, t, v, w, x, y, z, A, B, C, D, E, F = [],
                            G = [],
                            H = "",
                            I = {},
                            J = this,
                            K = a(this),
                            L = a([]),
                            M = a.extend({}, k, K.data("tc_read_more") || {}),
                            N = !!K.find("." + M.detailClass).length,
                            O = !!K.find("*").filter(function() {
                                var b = a(this).css("display");
                                return /^block|table|list/.test(b)
                            }).length,
                            P = O ? "div" : "span",
                            Q = P + "." + M.detailClass,
                            R = M.moreClass + "",
                            S = M.lessClass + "",
                            T = M.expandSpeed || 0,
                            U = u(K.html()),
                            V = U.slice(0, M.slicePoint);
                        if (M.moreSelector = "span." + R.split(" ").join("."), M.lessSelector = "span." + S.split(" ").join("."), !a.data(this, "tc_read_moreInit")) {
                            for (a.data(this, "tc_read_moreInit", !0), a.data(this, "tc_read_more", M), a.each(["onSlice", "beforeExpand", "afterExpand", "onCollapse", "afterCollapse"], function(b, c) {
                                    I[c] = a.isFunction(M[c])
                                }), V = e(V), t = V.replace(n, "").length; t < M.slicePoint;) q = U.charAt(V.length), "<" === q && (q = U.slice(V.length).match(r)[0]), V += q, t++;
                            for (M.sliceOn && (E = h({
                                    sliceOn: M.sliceOn,
                                    slicePoint: M.slicePoint,
                                    allHtml: U,
                                    summaryText: V
                                }), V = E.summaryText), V = e(V, M.preserveWords && U.slice(V.length).length), v = V.match(o) || [], w = V.match(p) || [], m = [], a.each(v, function(a, b) {
                                    l.test(b) || m.push(b)
                                }), v = m, i = w.length, b = 0; i > b; b++) w[b] = w[b].replace(p, "$1");
                            if (a.each(v, function(b, c) {
                                    var d = c.replace(o, "$1"),
                                        e = a.inArray(d, w); - 1 === e ? (F.push(c), G.push("</" + d + ">")) : w.splice(e, 1)
                                }), G.reverse(), N) y = K.find(Q).remove().html(), V = K.html(), U = V + y, x = "";
                            else {
                                if (y = U.slice(V.length), z = y.replace(n, "").replace(s, ""), "" === z || z.split(/\s+/).length < M.widow) return;
                                x = G.pop() || "", V += G.join(""), y = F.join("") + y
                            }
                            M.moreLabel = K.find(M.moreSelector).length ? "" : d(M, y), O ? y = U : "&" === V.charAt(V.length - 1) && (H = /^[#\w\d\\]+;/.exec(y), H && (y = y.slice(H[0].length), V += H[0])), V += x, M.summary = V, M.details = y, M.lastCloseTag = x, I.onSlice && (m = M.onSlice.call(J, M), M = m && m.details ? m : M), A = c(M, O), K.empty().append(A), C = K.find(Q), D = K.find(M.moreSelector), "slideUp" === M.collapseEffect && "slideDown" !== M.expandEffect || K.is(":hidden") ? C.css({
                                display: "none"
                            }) : C[M.collapseEffect](0), L = K.find("div." + M.summaryClass), B = function(a) {
                                a.preventDefault();
                                var b = a.startExpanded ? 0 : T;
                                D.hide(), L.hide(), I.beforeExpand && M.beforeExpand.call(J), C.stop(!1, !0)[M.expandEffect](b, function() {
                                    C.css({
                                        zoom: ""
                                    }), I.afterExpand && M.afterExpand.call(J), g(M, C, J)
                                })
                            }, D.find("a").off("click.tc_read_more").on("click.tc_read_more", B), M.userCollapse && !K.find(M.lessSelector).length && K.find(Q).append('<span class="' + M.lessClass + '">' + M.userCollapsePrefix + '<a href="#" class="' + M.lessLinkClass + '">' + M.userCollapseText + "</a></span>"), K.find(M.lessSelector + " a").off("click.tc_read_more").on("click.tc_read_more", function(b) {
                                b.preventDefault(), clearTimeout(j);
                                var c = a(this).closest(Q);
                                f(M, c), I.onCollapse && M.onCollapse.call(J, !0)
                            }), M.startExpanded && B({
                                preventDefault: function() {},
                                startExpanded: !0
                            })
                        }
                    })
                },
                destroy: function() {
                    this.each(function() {
                        var b, c, d = a(this);
                        d.data("tc_read_moreInit") && (b = a.extend({}, d.data("tc_read_more") || {}, k), c = d.find("." + b.detailClass).contents(), d.removeData("tc_read_moreInit"), d.removeData("tc_read_more"), d.find(b.moreSelector).remove(), d.find("." + b.summaryClass).remove(), d.find("." + b.detailClass).after(c).remove(), d.find(b.lessSelector).remove())
                    })
                }
            };
        return v[i] && v[i].call(this), this
    }, a.fn.tc_read_more.defaults = a.tc_read_more.defaults
}

function TalkToForm() {
    console.log("Start---- New Yourser Form ");
    var a = $("#talk_to_name").val(),
        b = $("#talk_to_email").val(),
        c = $("#talk_to_number").val(),
        d = $("#holidayType").val(),
        e = $("#selectDestination").val(),
        f = $("#selectHub").val(),
        g = sessionStorage.getItem("deviceType"),
        h = !0;
    if ("" === a ? ($("#talk_to_name").next().show(), $("#talk_to_name").next("p").html("You missed this").show(), $("#talk_to_name").addClass("parsley-error"), h = !1) : ($("#talk_to_name").next("p").html("").hide(), $("#talk_to_name").removeClass("parsley-error")), "" === b ? ($("#talk_to_email").next().show(), $("#talk_to_email").next("p").html("You missed this").show(), $("#talk_to_email").addClass("parsley-error"), h = !1) : ($("#talk_to_email").next("p").html("").hide(), $("#talk_to_email").removeClass("parsley-error")), "" === c ? ($("#talk_to_number").next().show(), $("#talk_to_number").next("p").html("You missed this").show(), $("#talk_to_number").addClass("parsley-error"), h = !1) : ($("#talk_to_number").next("p").html("").hide(), $("#talk_to_number").removeClass("parsley-error")), "" === d ? ($("#Holiday-type").next().show(), $("#Holiday-type").next("p").html("You missed this").show(), $("#Holiday-type").addClass("parsley-error"), h = !1) : ($("#Holiday-type").next("p").html("").hide(), $("#Holiday-type").removeClass("parsley-error")), "" === f ? ($("#Select_hub").next().show(), $("#Select_hub").next("p").html("You missed this").show(), $("#Select_hub").addClass("parsley-error"), h = !1) : ($("#Select_hub").next("p").html("").hide(), $("#Select_hub").removeClass("parsley-error")), h) {
        var i = {
            name: a,
            email: b,
            mobile: c,
            holidayType: d,
            hub: f,
            selectDestination: e,
            deviceName: g
        };
        console.log(i);
        var j = intializeParams();
        j.url = "tcHolidayRS/crm/crmUserAccount", j.cache = !1, j.async = !0, j.requestType = "POST", j.data = JSON.stringify(i), j.successCallbackFunction = "talkToFormSuccess", j.errorCallBackFunction = "talkToFormError", doAjax(j)
    }
}

function talkToFormSuccess(a) {
    console.log("Success"), $(".talk_to_form form")[0].reset(), $(".clickToCallSuccessMessageShow").removeClass("hide")
}

function talkToFormError(a) {
    console.log("Error"), $(".clickToCallErrorMessageShow").removeClass("hide")
}

function clicktoCalldestinationOnHoliday() {
    var a = "";
    a = "DOM" === $("#holidayType").val() ? '<option value="">Select Holidays</option><option value="Kashmir">Kashmir</option><option value="Ladakh">Ladakh</option><option value="North East">North East</option><option value="Himachal">Himachal</option><option value="Goa">Goa</option><option value="Andaman">Andaman</option><option value="Kerela">Kerela</option><option value="Sri Lanka">Sri Lanka</option><option value="Bhutan">Bhutan</option><option value="Rajasthan">Rajasthan</option><option value="Nepal">Nepal</option><option value="Gujrat">Gujrat</option><option value="Uttaranchal">Uttaranchal</option><option value="Tibet">Tibet</option><option value="Maldives">Maldives</option><option value="Others">Other</option>' : '<option value="">Select Holidays</option><option value="Europe">Europe</option><option value="Americas">Americas</option><option value="Africa">Africa</option><option value="Aus/NZ">Aus/NZ</option><option value="South America">South America</option><option value="Asia">Asia</option><option value="Thailand">Thailand</option><option value="Dubai">Dubai</option><option value="Singapore">Singapore</option><option value="Malaysia">Malaysia</option><option value="Mauritius">Mauritius</option><option value="Turkey">Turkey</option><option value="Bali">Bali</option><option value="Hongkong/Macau">Hongkong/Macau</option><option value="Others">Other</option>', $("#selectDestination").empty().append(a)
}

function detectIE() {
    var a = window.navigator.userAgent,
        b = a.indexOf("MSIE ");
    if (b > 0) return parseInt(a.substring(b + 5, a.indexOf(".", b)), 10);
    var c = a.indexOf("Trident/");
    if (c > 0) {
        var d = a.indexOf("rv:");
        return parseInt(a.substring(d + 3, a.indexOf(".", d)), 10)
    }
    var e = a.indexOf("Edge/");
    return e > 0 ? parseInt(a.substring(e + 5, a.indexOf(".", e)), 10) : !1
}

function IsWhiteSpace(a) {
    var b = /^[^\s]/;
    return b.test(a)
}

function IsName(a) {
    var b = /^[a-zA-Z ]+$/;
    return b.test(a)
}

function enquiryForm(a) {
    var b, c, d, e, f, g, h, i, j, k, l = !0,
        m = $("#tcilPageType").val(),
        n = $("#crmLeadType").val();
    return k = $("#crmLeadTypePackageEnquiry").length > 0 ? $("#crmLeadTypePackageEnquiry").val() : "", $("#" + a).find("input,select[required],textarea").each(function() {
        var k = $(this),
            m = "You missed this",
            n = "Please enter first name correctly",
            o = "Please enter last name correctly",
            p = "Please enter valid email",
            q = "Please enter valid contact number",
            r = "Please accept the privacy policy";
        $(this).hasClass("form_field1") && (b = k.val(), "" == b ? ($(k).addClass("parsley-error"), $(k).parent().find(".field-error").html(m).show(), l = !1) : IsWhiteSpace(b) ? ($(k).removeClass("parsley-error"), $(k).parent().find(".field-error").html("")) : ($(k).addClass("parsley-error"), $(k).parent().find(".field-error").html(n).show(), l = !1)), $(this).hasClass("form_field2") && (c = k.val(), "" == c ? ($(k).addClass("parsley-error"), $(k).parent().find(".field-error").html(m).show(), l = !1) : IsWhiteSpace(c) ? ($(k).removeClass("parsley-error"), $(k).parent().find(".field-error").html("")) : ($(k).addClass("parsley-error"), $(k).parent().find(".field-error").html(o).show(), l = !1)), $(this).hasClass("form_field3") && (d = k.val(), "" == d ? ($(k).addClass("parsley-error"), $(k).parent().find(".field-error").html(m).show(), l = !1) : 10 !== d.length || "9" != d.charAt(0) && "8" != d.charAt(0) && "7" != d.charAt(0) && "6" != d.charAt(0) ? ($(k).addClass("parsley-error"), $(k).parent().find(".field-error").html(q).show(), l = !1) : ($(k).removeClass("parsley-error"), $(k).parent().find(".field-error").html(""))), $(this).hasClass("form_field4") && (e = k.val(), "" == e ? ($(k).addClass("parsley-error"), $(k).parent().find(".field-error").html(m).show(), l = !1) : emailRegex.test(e) ? ($(k).removeClass("parsley-error"), $(k).parent().find(".field-error").html("")) : ($(k).addClass("parsley-error"), $(k).parent().find(".field-error").html(p).show(), l = !1)), $(this).hasClass("form_field5") && (f = k.val(), "" == f ? ($(k).addClass("parsley-error"), $(k).parents(".selectric-wrapper").find(".selectric").addClass("parsley-error"), $(k).parents(".form-group").find(".field-error").html(m).show(), l = !1) : ($(k).removeClass("parsley-error"), $(k).parents(".selectric-wrapper").find(".selectric").removeClass("parsley-error"), $(k).parents(".form-group").find(".field-error").html(""))), $(this).hasClass("form_field6") && (g = k.attr("data-value"), "" == g ? ($(k).addClass("parsley-error"), $(k).parents(".form-group").find(".field-error").html(m).show(), l = !1) : ($(k).removeClass("parsley-error"), $(k).parents(".form-group").find(".field-error").html(""))), $(this).hasClass("form_field7") && (h = k.val()), $(this).hasClass("form_field8") && (i = k.val()), $(this).hasClass("form_field9") && (j = k.val(), $(k).is(":checked") ? ($(k).removeClass("parsley-error"), $(k).parents(".form-group").find(".field-error").html(""), j = "Y") : (console.log("ï¿½ff"), $(k).addClass("parsley-error"), $(k).parents(".form-group").find(".field-error").html(r).show(), l = !1)), l ? $("#" + a).find("#bs-callout-warning").hide() : $("#" + a).find("#bs-callout-warning").show()
    }), {
        formAlert: l,
        form_field1: b,
        form_field2: c,
        form_field3: d,
        form_field4: e,
        form_field5: f,
        form_field6: g,
        form_field7: h,
        form_field8: i,
        form_field9: j,
        formType: n,
        formTypePackage: k,
        pageType: m
    }
}

function crmSuccessFeedback(a) {
    $("#bs-callout-warning").hide(), $("#thankQFeed").show(), $("#form-feedback").trigger("reset"), window.location.href.indexOf("flights") > -1 || window.location.href.indexOf("Flights") > -1 ? $("#feedProducts").val("Flights").selectric("refresh") : window.location.href.indexOf("hotel") > -1 || window.location.href.indexOf("Hotels") > -1 ? $("#feedProducts").val("Hotels").selectric("refresh") : window.location.href.indexOf("forex") > -1 || window.location.href.indexOf("Forex") > -1 ? $("#feedProducts").val("Forex").selectric("refresh") : $("#feedProducts").val("Holidays").selectric("refresh"), $("#feed-back .btn-primary").removeClass("loading").text("Submit")
}

function errorFeedback() {
    return $("#feed-back .btn-primary").removeClass("loading").text("Submit"), $("#thankQFeed").text("Error Occured. Please try after some time."), $("#thankQFeed").show(), !1
}

function showDiv(a) {}

function onlyAlphabets(a, b) {
    try {
        if (window.event) var c = window.event.keyCode;
        else {
            if (!a) return !0;
            var c = a.which
        }
        return c > 64 && 91 > c || c > 96 && 123 > c
    } catch (d) {}
}

function onlyAlphaNumberic(a, b) {
    try {
        if (window.event) var c = window.event.keyCode;
        else {
            if (!a) return !0;
            var c = a.which
        }
        return c > 64 && 91 > c || c > 96 && 123 > c || c > 47 && 58 > c
    } catch (d) {}
}

function currentDates() {
    return 10 > dd && (dd = "0" + dd), 10 > mm && (mm = "0" + mm), currentDate = yyyy + "/" + mm + "/" + dd
}

function calculateDate(a, b) {
    var c, d = "JANFEBMARAPRMAYJUNJULAUGSEPOCTNOVDEC";
    if (void 0 != a) {
        if (a.indexOf(",") > -1) {
            var e = a.split(","),
                f = e[1].toString().toUpperCase().split(" ");
            f[10] = (d.indexOf(f[3].toString().toUpperCase()) / 3 + 101 + "").substr(1), c = f[1] + "-" + f[10] + "-" + e[2].trim()
        } else {
            var g = a.substring(0, 2),
                h = a.substring(3, 5),
                i = a.substring(6, 10),
                j = new Date(i, h - 1, g, today.getHours(), today.getMinutes(), today.getSeconds(), today.getMilliseconds());
            switch (b) {
                case 1:
                    c = g + ", " + j.toString().substring(0, 3) + " -" + j.toString().substring(3, 7) + ", " + i;
                    break;
                case 2:
                    c = i + "/" + h + "/" + g;
                    break;
                case 3:
                    c = g + "-" + h + "-" + i;
                    break;
                case 4:
                    c = j.toString().substring(0, 3) + ", " + g + j.toString().substring(3, 7) + ", " + i;
                    break;
                case 5:
                    c = g + " " + j.toString().substring(3, 7);
                    break;
                case 6:
                    c = j.toString().substring(0, 3) + ", " + g + " " + j.toString().substring(3, 7);
                    break;
                case 7:
                    c = today.weeks()[new Date(i + "-" + h + "-" + g).getDay()] + ", " + g + " " + j.toString().substring(3, 7) + ", " + i;
                    break;
                case 8:
                    c = j.toString().substring(3, 7) + ", " + i;
                    break;
                case 9:
                    c = j.toString().substring(3, 7) + " " + g + " " + i;
                    break;
                case 10:
                    c = j.toString().substring(3, 7) + " " + g + ", " + i;
                    break;
                case 11:
                    c = j.toString().substring(0, 3) + ", " + g + j.toString().substring(3, 7) + " " + i;
                    break;
                case 12:
                    c = g + " " + j.toString().substring(3, 7) + ", " + i
            }
        }
        return c
    }
}

function monthOfTravel() {
    var a = today.getMonth(),
        b = today.getFullYear(),
        c = "",
        d = "";
    c += '<optgroup label="' + b + '">';
    for (var e = 0; e < today.monthabbrs().length - today.getMonth(); e++) c += ' <option value="' + a + "-" + b + '">' + today.monthabbrs()[a] + "</option>", b = 11 > a ? b : ++b, a = 11 > a ? ++a : 0;
    if (c += "</optgroup>", 0 != today.getMonth()) {
        d += '<optgroup label="' + b + '">';
        for (var e = 0; e < today.getMonth(); e++) d += ' <option value="' + a + "-" + b + '">' + today.monthabbrs()[a] + "</option>", b = 11 > a ? b : ++b, a = 11 > a ? ++a : 0;
        d += "</optgroup>"
    }
    return c + d
}

function applySelectric() {
    $("select").selectric({
        disableOnMobile: !1
    })
}

function IsEmail(a) {
    var b = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return b.test(a)
}

function validateLoginPopUpForm() {
    var a = $("#loginId").val(),
        b = $("#existloginPass").val(),
        c = $("#loginOTP").val(),
        d = !0;
    return "" === a && ($("#loginId").next().show(), $("#loginId").next().find("p").html("You missed this").show(), $("#loginId").addClass("parsley-error"), d = !1), a.indexOf("@") > 0 && (IsEmail(a) || ($("#loginId").next().show(), $("#loginId").next().find("p").html("Please enter valid email id").show(), $("#loginId").addClass("parsley-error"), d = !1)), "" !== b || $("#existloginPass").parent(".form_control_grp").hasClass("hide") || ($("#existloginPass").next().show(), $("#existloginPass").next().find("p").html("You missed this").show(), $("#existloginPass").addClass("parsley-error"), d = !1), "" !== c || $("#loginOTP").parent(".form_control_grp").hasClass("hide") || (console.log("enter otp"), $("#loginOTP").next().show(), $("#loginOTP").next().find("p").html("You missed this").show(), $("#loginOTP").addClass("parsley-error"), d = !1), d
}

function validateResetPwdLogin() {
    var a = $("#confirmId").val(),
        b = !0;
    return "" === a ? ($("#confirmId").next().show(), $("#confirmId").next().find("p").html("You missed this").show(), $("#confirmId").addClass("parsley-error"), b = !1) : IsEmail(a) || ($("#confirmId").next().show(), $("#confirmId").next().find("p").html("Please enter valid email").show(), $("#confirmId").addClass("parsley-error"), b = !1), b
}

function validateRegister() {
    var a = $("#registerFName").val(),
        b = $("#registerLName").val(),
        c = $("#registerEmailId").val(),
        d = $("#registerPwd").val(),
        e = $("#registerConfirmPwd").val(),
        f = $("#registerMobileNo").val(),
        g = !0;
    return $(".reg_form_holder input.form-control,.reg_form_holder select").each(function() {
        -1 == $(this).val() && ($(".reg_form_holder select").addClass("parsley-error"), $(this).parents(".reg_title_holder").find(".invalid-msg-wrapper").show(), $(this).parents(".reg_title_holder").find(".invalid-msg-wrapper").find("p").html("You missed this").show(), g = !1), "" === $(this).val() && ($(this).next().show(), $(this).next().find("p").html("You missed this").show(), $(this).addClass("parsley-error"), $(this).parents(".reg_title_holder").find(".invalid-msg-wrapper").show(), $(this).parents(".reg_title_holder").find(".invalid-msg-wrapper").find("p").html("You missed this").show(), g = !1), "" == a || IsWhiteSpace(a) || ($("#registerFName").parents(".reg_title_holder").find(".invalid-msg-wrapper").show(), $("#registerFName").parents(".reg_title_holder").find(".invalid-msg-wrapper").find("p").html("Please enter first name correctly").show(), $("#registerFName").addClass("parsley-error"), g = !1), "" == b || IsWhiteSpace(b) || ($("#registerLName").parents(".reg_title_holder").find(".invalid-msg-wrapper").show(), $("#registerLName").parents(".reg_title_holder").find(".invalid-msg-wrapper").find("p").html("Please enter last name correctly").show(), $("#registerLName").addClass("parsley-error"), g = !1), "" !== c && (IsEmail(c) || ($("#registerEmailId").next().show(), $("#registerEmailId").next().find("p").html("Please enter valid email").show(), $("#registerEmailId").addClass("parsley-error"), g = !1)), "" !== e && (d !== e ? ($("#registerConfirmPwd").next().show(), $("#registerConfirmPwd").next().find("p").html("The Password and the Confirm Password don't match.").show(), $("#registerConfirmPwd").addClass("parsley-error"), $("#registerConfirmPwd").css({
            color: "#8D0C10"
        }), g = !1) : $("#registerConfirmPwd").css({
            color: "#91c74c"
        })), "" !== f && (10 !== f.length || "9" != f.charAt(0) && "8" != f.charAt(0) && "7" != f.charAt(0) && "6" != f.charAt(0)) && ($("#registerMobileNo").next().show(), $("#registerMobileNo").next().find("p").html("Please enter valid contact number").show(), $("#registerMobileNo").addClass("parsley-error"), g = !1)
    }), $("#tandc").is(":checked") || ($("#tandc").siblings(".invalid-msg-wrapper").show(), $("#tandc").siblings(".invalid-msg-wrapper").find("p").html("Please accept the privacy policy").show(), g = !1), g
}

function passwordVerify() {
    var a = "",
        b = "",
        c = $("#registerPwd").val(),
        d = !0;
    "" == c && ($(".alphanumeric, .special_char, .white_spaces").removeClass("correct"), $("#passwordErrorBox").addClass("show"), $("#passwordErrorBox").find(".error").show(), d = !1), c.length < 8 || c.length > 12 ? ($("#passwordErrorBox").addClass("show"), $("#passwordErrorBox").find(".error").show(), $(".alphanumeric").removeClass("correct"), d = !1) : $(".alphanumeric").addClass("correct"), a = /[a-z]/, b = /[0-9]/, a.test(c) && b.test(c) ? 12 > c.length > 8 && $(".alphanumeric").addClass("correct") : ($("#passwordErrorBox").addClass("show"), $("#passwordErrorBox").find(".error").show(), $(".alphanumeric").removeClass("correct"), d = !1), a = /\s/, a.test(c) ? ($("#registerPwd").css({
        color: "#8D0C10"
    }), $("#passwordErrorBox").addClass("show"), $("#passwordErrorBox").find(".error").show(), $(".white_spaces").removeClass("correct"), d = !1) : $(".white_spaces").addClass("correct");
    var e = /[-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
    if (e.test(c)) {
        for (var f = "", a = /^[!@#\$%\^\&*]+$/g, g = 0; g < c.length; g++) e.test(c[g]) && (f += c[g]);
        a.test(f) ? $(".special_char").addClass("correct") : ($("#registerPwd").css({
            color: "#8D0C10"
        }), $(".special_char").removeClass("correct"), $("#passwordErrorBox").addClass("show"), $("#passwordErrorBox").find(".error").show(), d = !1)
    } else $(".special_char").removeClass("correct");
    return d ? ($("#registerPwd").css({
        color: "#91c74c"
    }), setTimeout(function() {
        $("#passwordErrorBox").removeClass("show")
    }, 1e3), $("#registerPwd").removeClass("parsley-error")) : ($("#registerPwd").css({
        color: "#8D0C10"
    }), $("#registerPwd").addClass("parsley-error"), $("#passwordErrorBox").addClass("show"), $("#passwordErrorBox").find(".error").show()), d
}

function newsletter() {
    var a = !0,
        b = $("#subscriberEmail").val(),
        c = emailRegex.test(b);
    return "" == b ? ($("#subscriberEmail").addClass("parsley-error"), $("#subscriberEmail").parent().find(".field-error-footer").html("You missed this"), a = !1) : c ? ($("#subscriberEmail").removeClass("parsley-error"), $("#subscriberEmail").parent().find(".field-error-footer").html("")) : ($("#subscriberEmail").addClass("parsley-error"), $("#subscriberEmail").parent().find(".field-error-footer").html("Please enter valid Email address"), a = !1), a
}

function subscriptionSuccess(a) {
    $("#subscriberEmail").addClass("parsley-error"), $("#subscriberEmail").parent().find(".field-error-footer").html(a.text), $("#subscriberEmail").val("")
}

function subscriptionError(a, b, c) {
    $("#subscriberEmail").addClass("parsley-error"), $("#subscriberEmail").parent().find(".field-error-footer").html("please try again!"), $("#subscriberEmail").val(""), console.log(c)
}

function stickyfooter() {
    pageHeight = $("html").height(), pageHeight > screen.height && $(".stickyfooter footer").css({
        position: "relative",
        bottom: "initial"
    })
}

function isGSTCall() {
    if (localStorage.getItem("isGST")) $("body").append("<input type='hidden' value='" + localStorage.getItem("isGST") + "' name='isGstApplicable' id='isGstApplicable'/>");
    else {
        var a = intializeParams();
        a.url = "tcCommonRS/isGstApplicable/isGST", a.completeCallbackFunction = "isGSTComplete", a.async = !1, doAjax(a)
    }
}

function isGSTComplete(a, b, c) {
    $("body").append("<input type='hidden' value='" + a.responseText + "' name='isGstApplicable' id='isGstApplicable'/>")
}

function click2CallMobileValidation() {
    var a = !0,
        b = $("#click2callmobnumber").val();
    return "" === b || 10 != b.length || "9" !== b.charAt(0) && "8" !== b.charAt(0) && "7" !== b.charAt(0) && "6" !== b.charAt(0) ? ($("#click2callmobnumber").addClass("parsley-error"), $("#click2callmobnumber").next().html("Please Enter Valid Mobile Number").show(), a = !1) : ($("#click2callmobnumber").removeClass("parsley-error"), $("#click2callmobnumber").parent().find(".error").text("")), a
}

function onlyAlphaNumbericforpassport(a, b) {
    try {
        if (window.event) var c = window.event.keyCode;
        else {
            if (!a) return !0;
            var c = a.which
        }
        return c > 64 && 91 > c || c > 47 && 58 > c
    } catch (d) {}
}
var CryptoJS = CryptoJS || function(a, b) {
    var c = {},
        d = c.lib = {},
        e = d.Base = function() {
            function a() {}
            return {
                extend: function(b) {
                    a.prototype = this;
                    var c = new a;
                    return b && c.mixIn(b), c.$super = this, c
                },
                create: function() {
                    var a = this.extend();
                    return a.init.apply(a, arguments), a
                },
                init: function() {},
                mixIn: function(a) {
                    for (var b in a) a.hasOwnProperty(b) && (this[b] = a[b]);
                    a.hasOwnProperty("toString") && (this.toString = a.toString)
                },
                clone: function() {
                    return this.$super.extend(this)
                }
            }
        }(),
        f = d.WordArray = e.extend({
            init: function(a, c) {
                a = this.words = a || [], this.sigBytes = c != b ? c : 4 * a.length
            },
            toString: function(a) {
                return (a || h).stringify(this)
            },
            concat: function(a) {
                var b = this.words,
                    c = a.words,
                    d = this.sigBytes,
                    a = a.sigBytes;
                if (this.clamp(), d % 4)
                    for (var e = 0; a > e; e++) b[d + e >>> 2] |= (c[e >>> 2] >>> 24 - 8 * (e % 4) & 255) << 24 - 8 * ((d + e) % 4);
                else if (65535 < c.length)
                    for (e = 0; a > e; e += 4) b[d + e >>> 2] = c[e >>> 2];
                else b.push.apply(b, c);
                return this.sigBytes += a, this
            },
            clamp: function() {
                var b = this.words,
                    c = this.sigBytes;
                b[c >>> 2] &= 4294967295 << 32 - 8 * (c % 4), b.length = a.ceil(c / 4)
            },
            clone: function() {
                var a = e.clone.call(this);
                return a.words = this.words.slice(0), a
            },
            random: function(b) {
                for (var c = [], d = 0; b > d; d += 4) c.push(4294967296 * a.random() | 0);
                return f.create(c, b)
            }
        }),
        g = c.enc = {},
        h = g.Hex = {
            stringify: function(a) {
                for (var b = a.words, a = a.sigBytes, c = [], d = 0; a > d; d++) {
                    var e = b[d >>> 2] >>> 24 - 8 * (d % 4) & 255;
                    c.push((e >>> 4).toString(16)), c.push((15 & e).toString(16))
                }
                return c.join("")
            },
            parse: function(a) {
                for (var b = a.length, c = [], d = 0; b > d; d += 2) c[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - 4 * (d % 8);
                return f.create(c, b / 2)
            }
        },
        i = g.Latin1 = {
            stringify: function(a) {
                for (var b = a.words, a = a.sigBytes, c = [], d = 0; a > d; d++) c.push(String.fromCharCode(b[d >>> 2] >>> 24 - 8 * (d % 4) & 255));
                return c.join("")
            },
            parse: function(a) {
                for (var b = a.length, c = [], d = 0; b > d; d++) c[d >>> 2] |= (255 & a.charCodeAt(d)) << 24 - 8 * (d % 4);
                return f.create(c, b)
            }
        },
        j = g.Utf8 = {
            stringify: function(a) {
                try {
                    return decodeURIComponent(escape(i.stringify(a)))
                } catch (b) {
                    throw Error("Malformed UTF-8 data")
                }
            },
            parse: function(a) {
                return i.parse(unescape(encodeURIComponent(a)))
            }
        },
        k = d.BufferedBlockAlgorithm = e.extend({
            reset: function() {
                this._data = f.create(), this._nDataBytes = 0
            },
            _append: function(a) {
                "string" == typeof a && (a = j.parse(a)), this._data.concat(a), this._nDataBytes += a.sigBytes
            },
            _process: function(b) {
                var c = this._data,
                    d = c.words,
                    e = c.sigBytes,
                    g = this.blockSize,
                    h = e / (4 * g),
                    h = b ? a.ceil(h) : a.max((0 | h) - this._minBufferSize, 0),
                    b = h * g,
                    e = a.min(4 * b, e);
                if (b) {
                    for (var i = 0; b > i; i += g) this._doProcessBlock(d, i);
                    i = d.splice(0, b), c.sigBytes -= e
                }
                return f.create(i, e)
            },
            clone: function() {
                var a = e.clone.call(this);
                return a._data = this._data.clone(), a
            },
            _minBufferSize: 0
        });
    d.Hasher = k.extend({
        init: function() {
            this.reset()
        },
        reset: function() {
            k.reset.call(this), this._doReset()
        },
        update: function(a) {
            return this._append(a), this._process(), this
        },
        finalize: function(a) {
            return a && this._append(a), this._doFinalize(), this._hash
        },
        clone: function() {
            var a = k.clone.call(this);
            return a._hash = this._hash.clone(), a
        },
        blockSize: 16,
        _createHelper: function(a) {
            return function(b, c) {
                return a.create(c).finalize(b)
            }
        },
        _createHmacHelper: function(a) {
            return function(b, c) {
                return l.HMAC.create(a, c).finalize(b)
            }
        }
    });
    var l = c.algo = {};
    return c
}(Math);
! function() {
    var a = CryptoJS,
        b = a.lib.WordArray;
    a.enc.Base64 = {
        stringify: function(a) {
            var b = a.words,
                c = a.sigBytes,
                d = this._map;
            a.clamp();
            for (var a = [], e = 0; c > e; e += 3)
                for (var f = (b[e >>> 2] >>> 24 - 8 * (e % 4) & 255) << 16 | (b[e + 1 >>> 2] >>> 24 - 8 * ((e + 1) % 4) & 255) << 8 | b[e + 2 >>> 2] >>> 24 - 8 * ((e + 2) % 4) & 255, g = 0; 4 > g && c > e + .75 * g; g++) a.push(d.charAt(f >>> 6 * (3 - g) & 63));
            if (b = d.charAt(64))
                for (; a.length % 4;) a.push(b);
            return a.join("")
        },
        parse: function(a) {
            var a = a.replace(/\s/g, ""),
                c = a.length,
                d = this._map,
                e = d.charAt(64);
            e && (e = a.indexOf(e), -1 != e && (c = e));
            for (var e = [], f = 0, g = 0; c > g; g++)
                if (g % 4) {
                    var h = d.indexOf(a.charAt(g - 1)) << 2 * (g % 4),
                        i = d.indexOf(a.charAt(g)) >>> 6 - 2 * (g % 4);
                    e[f >>> 2] |= (h | i) << 24 - 8 * (f % 4), f++
                }
            return b.create(e, f)
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    }
}(),
function(a) {
    function b(a, b, c, d, e, f, g) {
        return a = a + (b & c | ~b & d) + e + g, (a << f | a >>> 32 - f) + b
    }

    function c(a, b, c, d, e, f, g) {
        return a = a + (b & d | c & ~d) + e + g, (a << f | a >>> 32 - f) + b
    }

    function d(a, b, c, d, e, f, g) {
        return a = a + (b ^ c ^ d) + e + g, (a << f | a >>> 32 - f) + b
    }

    function e(a, b, c, d, e, f, g) {
        return a = a + (c ^ (b | ~d)) + e + g, (a << f | a >>> 32 - f) + b
    }
    var f = CryptoJS,
        g = f.lib,
        h = g.WordArray,
        g = g.Hasher,
        i = f.algo,
        j = [];
    ! function() {
        for (var b = 0; 64 > b; b++) j[b] = 4294967296 * a.abs(a.sin(b + 1)) | 0
    }(), i = i.MD5 = g.extend({
        _doReset: function() {
            this._hash = h.create([1732584193, 4023233417, 2562383102, 271733878])
        },
        _doProcessBlock: function(a, f) {
            for (var g = 0; 16 > g; g++) {
                var h = f + g,
                    i = a[h];
                a[h] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8)
            }
            for (var h = this._hash.words, i = h[0], k = h[1], l = h[2], m = h[3], g = 0; 64 > g; g += 4) 16 > g ? (i = b(i, k, l, m, a[f + g], 7, j[g]), m = b(m, i, k, l, a[f + g + 1], 12, j[g + 1]), l = b(l, m, i, k, a[f + g + 2], 17, j[g + 2]), k = b(k, l, m, i, a[f + g + 3], 22, j[g + 3])) : 32 > g ? (i = c(i, k, l, m, a[f + (g + 1) % 16], 5, j[g]), m = c(m, i, k, l, a[f + (g + 6) % 16], 9, j[g + 1]), l = c(l, m, i, k, a[f + (g + 11) % 16], 14, j[g + 2]), k = c(k, l, m, i, a[f + g % 16], 20, j[g + 3])) : 48 > g ? (i = d(i, k, l, m, a[f + (3 * g + 5) % 16], 4, j[g]), m = d(m, i, k, l, a[f + (3 * g + 8) % 16], 11, j[g + 1]), l = d(l, m, i, k, a[f + (3 * g + 11) % 16], 16, j[g + 2]), k = d(k, l, m, i, a[f + (3 * g + 14) % 16], 23, j[g + 3])) : (i = e(i, k, l, m, a[f + 3 * g % 16], 6, j[g]), m = e(m, i, k, l, a[f + (3 * g + 7) % 16], 10, j[g + 1]), l = e(l, m, i, k, a[f + (3 * g + 14) % 16], 15, j[g + 2]), k = e(k, l, m, i, a[f + (3 * g + 5) % 16], 21, j[g + 3]));
            h[0] = h[0] + i | 0, h[1] = h[1] + k | 0, h[2] = h[2] + l | 0, h[3] = h[3] + m | 0
        },
        _doFinalize: function() {
            var a = this._data,
                b = a.words,
                c = 8 * this._nDataBytes,
                d = 8 * a.sigBytes;
            for (b[d >>> 5] |= 128 << 24 - d % 32, b[(d + 64 >>> 9 << 4) + 14] = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8), a.sigBytes = 4 * (b.length + 1), this._process(), a = this._hash.words, b = 0; 4 > b; b++) c = a[b], a[b] = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8)
        }
    }), f.MD5 = g._createHelper(i), f.HmacMD5 = g._createHmacHelper(i)
}(Math),
function() {
    var a = CryptoJS,
        b = a.lib,
        c = b.Base,
        d = b.WordArray,
        b = a.algo,
        e = b.EvpKDF = c.extend({
            cfg: c.extend({
                keySize: 4,
                hasher: b.MD5,
                iterations: 1
            }),
            init: function(a) {
                this.cfg = this.cfg.extend(a)
            },
            compute: function(a, b) {
                for (var c = this.cfg, e = c.hasher.create(), f = d.create(), g = f.words, h = c.keySize, c = c.iterations; g.length < h;) {
                    i && e.update(i);
                    var i = e.update(a).finalize(b);
                    e.reset();
                    for (var j = 1; c > j; j++) i = e.finalize(i), e.reset();
                    f.concat(i)
                }
                return f.sigBytes = 4 * h, f
            }
        });
    a.EvpKDF = function(a, b, c) {
        return e.create(c).compute(a, b)
    }
}(), CryptoJS.lib.Cipher || function(a) {
        var b = CryptoJS,
            c = b.lib,
            d = c.Base,
            e = c.WordArray,
            f = c.BufferedBlockAlgorithm,
            g = b.enc.Base64,
            h = b.algo.EvpKDF,
            i = c.Cipher = f.extend({
                cfg: d.extend(),
                createEncryptor: function(a, b) {
                    return this.create(this._ENC_XFORM_MODE, a, b)
                },
                createDecryptor: function(a, b) {
                    return this.create(this._DEC_XFORM_MODE, a, b)
                },
                init: function(a, b, c) {
                    this.cfg = this.cfg.extend(c), this._xformMode = a, this._key = b, this.reset()
                },
                reset: function() {
                    f.reset.call(this), this._doReset()
                },
                process: function(a) {
                    return this._append(a), this._process()
                },
                finalize: function(a) {
                    return a && this._append(a), this._doFinalize()
                },
                keySize: 4,
                ivSize: 4,
                _ENC_XFORM_MODE: 1,
                _DEC_XFORM_MODE: 2,
                _createHelper: function() {
                    return function(a) {
                        return {
                            encrypt: function(b, c, d) {
                                return ("string" == typeof c ? o : n).encrypt(a, b, c, d)
                            },
                            decrypt: function(b, c, d) {
                                return ("string" == typeof c ? o : n).decrypt(a, b, c, d)
                            }
                        }
                    }
                }()
            });
        c.StreamCipher = i.extend({
            _doFinalize: function() {
                return this._process(!0)
            },
            blockSize: 1
        });
        var j = b.mode = {},
            k = c.BlockCipherMode = d.extend({
                createEncryptor: function(a, b) {
                    return this.Encryptor.create(a, b)
                },
                createDecryptor: function(a, b) {
                    return this.Decryptor.create(a, b)
                },
                init: function(a, b) {
                    this._cipher = a, this._iv = b
                }
            }),
            j = j.CBC = function() {
                function b(b, c, d) {
                    var e = this._iv;
                    e ? this._iv = a : e = this._prevBlock;
                    for (var f = 0; d > f; f++) b[c + f] ^= e[f]
                }
                var c = k.extend();
                return c.Encryptor = c.extend({
                    processBlock: function(a, c) {
                        var d = this._cipher,
                            e = d.blockSize;
                        b.call(this, a, c, e), d.encryptBlock(a, c), this._prevBlock = a.slice(c, c + e)
                    }
                }), c.Decryptor = c.extend({
                    processBlock: function(a, c) {
                        var d = this._cipher,
                            e = d.blockSize,
                            f = a.slice(c, c + e);
                        d.decryptBlock(a, c), b.call(this, a, c, e), this._prevBlock = f
                    }
                }), c
            }(),
            l = (b.pad = {}).Pkcs7 = {
                pad: function(a, b) {
                    for (var c = 4 * b, c = c - a.sigBytes % c, d = c << 24 | c << 16 | c << 8 | c, f = [], g = 0; c > g; g += 4) f.push(d);
                    c = e.create(f, c), a.concat(c)
                },
                unpad: function(a) {
                    a.sigBytes -= 255 & a.words[a.sigBytes - 1 >>> 2]
                }
            };
        c.BlockCipher = i.extend({
            cfg: i.cfg.extend({
                mode: j,
                padding: l
            }),
            reset: function() {
                i.reset.call(this);
                var a = this.cfg,
                    b = a.iv,
                    a = a.mode;
                if (this._xformMode == this._ENC_XFORM_MODE) var c = a.createEncryptor;
                else c = a.createDecryptor, this._minBufferSize = 1;
                this._mode = c.call(a, this, b && b.words)
            },
            _doProcessBlock: function(a, b) {
                this._mode.processBlock(a, b)
            },
            _doFinalize: function() {
                var a = this.cfg.padding;
                if (this._xformMode == this._ENC_XFORM_MODE) {
                    a.pad(this._data, this.blockSize);
                    var b = this._process(!0)
                } else b = this._process(!0), a.unpad(b);
                return b
            },
            blockSize: 4
        });
        var m = c.CipherParams = d.extend({
                init: function(a) {
                    this.mixIn(a)
                },
                toString: function(a) {
                    return (a || this.formatter).stringify(this)
                }
            }),
            j = (b.format = {}).OpenSSL = {
                stringify: function(a) {
                    var b = a.ciphertext,
                        a = a.salt,
                        b = (a ? e.create([1398893684, 1701076831]).concat(a).concat(b) : b).toString(g);
                    return b = b.replace(/(.{64})/g, "$1\n")
                },
                parse: function(a) {
                    var a = g.parse(a),
                        b = a.words;
                    if (1398893684 == b[0] && 1701076831 == b[1]) {
                        var c = e.create(b.slice(2, 4));
                        b.splice(0, 4), a.sigBytes -= 16
                    }
                    return m.create({
                        ciphertext: a,
                        salt: c
                    })
                }
            },
            n = c.SerializableCipher = d.extend({
                cfg: d.extend({
                    format: j
                }),
                encrypt: function(a, b, c, d) {
                    var d = this.cfg.extend(d),
                        e = a.createEncryptor(c, d),
                        b = e.finalize(b),
                        e = e.cfg;
                    return m.create({
                        ciphertext: b,
                        key: c,
                        iv: e.iv,
                        algorithm: a,
                        mode: e.mode,
                        padding: e.padding,
                        blockSize: a.blockSize,
                        formatter: d.format
                    })
                },
                decrypt: function(a, b, c, d) {
                    return d = this.cfg.extend(d), b = this._parse(b, d.format), a.createDecryptor(c, d).finalize(b.ciphertext)
                },
                _parse: function(a, b) {
                    return "string" == typeof a ? b.parse(a) : a
                }
            }),
            b = (b.kdf = {}).OpenSSL = {
                compute: function(a, b, c, d) {
                    return d || (d = e.random(8)), a = h.create({
                        keySize: b + c
                    }).compute(a, d), c = e.create(a.words.slice(b), 4 * c), a.sigBytes = 4 * b, m.create({
                        key: a,
                        iv: c,
                        salt: d
                    })
                }
            },
            o = c.PasswordBasedCipher = n.extend({
                cfg: n.cfg.extend({
                    kdf: b
                }),
                encrypt: function(a, b, c, d) {
                    return d = this.cfg.extend(d), c = d.kdf.compute(c, a.keySize, a.ivSize), d.iv = c.iv, a = n.encrypt.call(this, a, b, c.key, d), a.mixIn(c), a
                },
                decrypt: function(a, b, c, d) {
                    return d = this.cfg.extend(d), b = this._parse(b, d.format), c = d.kdf.compute(c, a.keySize, a.ivSize, b.salt), d.iv = c.iv, n.decrypt.call(this, a, b, c.key, d)
                }
            })
    }(),
    function() {
        var a = CryptoJS,
            b = a.lib.BlockCipher,
            c = a.algo,
            d = [],
            e = [],
            f = [],
            g = [],
            h = [],
            i = [],
            j = [],
            k = [],
            l = [],
            m = [];
        ! function() {
            for (var a = [], b = 0; 256 > b; b++) a[b] = 128 > b ? b << 1 : b << 1 ^ 283;
            for (var c = 0, n = 0, b = 0; 256 > b; b++) {
                var o = n ^ n << 1 ^ n << 2 ^ n << 3 ^ n << 4,
                    o = o >>> 8 ^ 255 & o ^ 99;
                d[c] = o, e[o] = c;
                var p = a[c],
                    q = a[p],
                    r = a[q],
                    s = 257 * a[o] ^ 16843008 * o;
                f[c] = s << 24 | s >>> 8, g[c] = s << 16 | s >>> 16, h[c] = s << 8 | s >>> 24, i[c] = s, s = 16843009 * r ^ 65537 * q ^ 257 * p ^ 16843008 * c, j[o] = s << 24 | s >>> 8, k[o] = s << 16 | s >>> 16, l[o] = s << 8 | s >>> 24, m[o] = s, c ? (c = p ^ a[a[a[r ^ p]]], n ^= a[a[n]]) : c = n = 1
            }
        }();
        var n = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
            c = c.AES = b.extend({
                _doReset: function() {
                    for (var a = this._key, b = a.words, c = a.sigBytes / 4, a = 4 * ((this._nRounds = c + 6) + 1), e = this._keySchedule = [], f = 0; a > f; f++)
                        if (c > f) e[f] = b[f];
                        else {
                            var g = e[f - 1];
                            f % c ? c > 6 && 4 == f % c && (g = d[g >>> 24] << 24 | d[g >>> 16 & 255] << 16 | d[g >>> 8 & 255] << 8 | d[255 & g]) : (g = g << 8 | g >>> 24, g = d[g >>> 24] << 24 | d[g >>> 16 & 255] << 16 | d[g >>> 8 & 255] << 8 | d[255 & g], g ^= n[f / c | 0] << 24), e[f] = e[f - c] ^ g
                        }
                    for (b = this._invKeySchedule = [], c = 0; a > c; c++) f = a - c, g = c % 4 ? e[f] : e[f - 4], b[c] = 4 > c || 4 >= f ? g : j[d[g >>> 24]] ^ k[d[g >>> 16 & 255]] ^ l[d[g >>> 8 & 255]] ^ m[d[255 & g]]
                },
                encryptBlock: function(a, b) {
                    this._doCryptBlock(a, b, this._keySchedule, f, g, h, i, d)
                },
                decryptBlock: function(a, b) {
                    var c = a[b + 1];
                    a[b + 1] = a[b + 3], a[b + 3] = c, this._doCryptBlock(a, b, this._invKeySchedule, j, k, l, m, e), c = a[b + 1], a[b + 1] = a[b + 3], a[b + 3] = c
                },
                _doCryptBlock: function(a, b, c, d, e, f, g, h) {
                    for (var i = this._nRounds, j = a[b] ^ c[0], k = a[b + 1] ^ c[1], l = a[b + 2] ^ c[2], m = a[b + 3] ^ c[3], n = 4, o = 1; i > o; o++) var p = d[j >>> 24] ^ e[k >>> 16 & 255] ^ f[l >>> 8 & 255] ^ g[255 & m] ^ c[n++],
                        q = d[k >>> 24] ^ e[l >>> 16 & 255] ^ f[m >>> 8 & 255] ^ g[255 & j] ^ c[n++],
                        r = d[l >>> 24] ^ e[m >>> 16 & 255] ^ f[j >>> 8 & 255] ^ g[255 & k] ^ c[n++],
                        m = d[m >>> 24] ^ e[j >>> 16 & 255] ^ f[k >>> 8 & 255] ^ g[255 & l] ^ c[n++],
                        j = p,
                        k = q,
                        l = r;
                    p = (h[j >>> 24] << 24 | h[k >>> 16 & 255] << 16 | h[l >>> 8 & 255] << 8 | h[255 & m]) ^ c[n++], q = (h[k >>> 24] << 24 | h[l >>> 16 & 255] << 16 | h[m >>> 8 & 255] << 8 | h[255 & j]) ^ c[n++], r = (h[l >>> 24] << 24 | h[m >>> 16 & 255] << 16 | h[j >>> 8 & 255] << 8 | h[255 & k]) ^ c[n++], m = (h[m >>> 24] << 24 | h[j >>> 16 & 255] << 16 | h[k >>> 8 & 255] << 8 | h[255 & l]) ^ c[n++], a[b] = p, a[b + 1] = q, a[b + 2] = r, a[b + 3] = m
                },
                keySize: 8
            });
        a.AES = b._createHelper(c)
    }();
var CryptoJS = CryptoJS || function(a, b) {
    var c = {},
        d = c.lib = {},
        e = function() {},
        f = d.Base = {
            extend: function(a) {
                e.prototype = this;
                var b = new e;
                return a && b.mixIn(a), b.hasOwnProperty("init") || (b.init = function() {
                    b.$super.init.apply(this, arguments)
                }), b.init.prototype = b, b.$super = this, b
            },
            create: function() {
                var a = this.extend();
                return a.init.apply(a, arguments), a
            },
            init: function() {},
            mixIn: function(a) {
                for (var b in a) a.hasOwnProperty(b) && (this[b] = a[b]);
                a.hasOwnProperty("toString") && (this.toString = a.toString)
            },
            clone: function() {
                return this.init.prototype.extend(this)
            }
        },
        g = d.WordArray = f.extend({
            init: function(a, c) {
                a = this.words = a || [], this.sigBytes = c != b ? c : 4 * a.length
            },
            toString: function(a) {
                return (a || i).stringify(this)
            },
            concat: function(a) {
                var b = this.words,
                    c = a.words,
                    d = this.sigBytes;
                if (a = a.sigBytes, this.clamp(), d % 4)
                    for (var e = 0; a > e; e++) b[d + e >>> 2] |= (c[e >>> 2] >>> 24 - 8 * (e % 4) & 255) << 24 - 8 * ((d + e) % 4);
                else if (65535 < c.length)
                    for (e = 0; a > e; e += 4) b[d + e >>> 2] = c[e >>> 2];
                else b.push.apply(b, c);
                return this.sigBytes += a, this
            },
            clamp: function() {
                var b = this.words,
                    c = this.sigBytes;
                b[c >>> 2] &= 4294967295 << 32 - 8 * (c % 4), b.length = a.ceil(c / 4)
            },
            clone: function() {
                var a = f.clone.call(this);
                return a.words = this.words.slice(0), a
            },
            random: function(b) {
                for (var c = [], d = 0; b > d; d += 4) c.push(4294967296 * a.random() | 0);
                return new g.init(c, b)
            }
        }),
        h = c.enc = {},
        i = h.Hex = {
            stringify: function(a) {
                var b = a.words;
                a = a.sigBytes;
                for (var c = [], d = 0; a > d; d++) {
                    var e = b[d >>> 2] >>> 24 - 8 * (d % 4) & 255;
                    c.push((e >>> 4).toString(16)), c.push((15 & e).toString(16))
                }
                return c.join("")
            },
            parse: function(a) {
                for (var b = a.length, c = [], d = 0; b > d; d += 2) c[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - 4 * (d % 8);
                return new g.init(c, b / 2)
            }
        },
        j = h.Latin1 = {
            stringify: function(a) {
                var b = a.words;
                a = a.sigBytes;
                for (var c = [], d = 0; a > d; d++) c.push(String.fromCharCode(b[d >>> 2] >>> 24 - 8 * (d % 4) & 255));
                return c.join("")
            },
            parse: function(a) {
                for (var b = a.length, c = [], d = 0; b > d; d++) c[d >>> 2] |= (255 & a.charCodeAt(d)) << 24 - 8 * (d % 4);
                return new g.init(c, b)
            }
        },
        k = h.Utf8 = {
            stringify: function(a) {
                try {
                    return decodeURIComponent(escape(j.stringify(a)))
                } catch (b) {
                    throw Error("Malformed UTF-8 data")
                }
            },
            parse: function(a) {
                return j.parse(unescape(encodeURIComponent(a)))
            }
        },
        l = d.BufferedBlockAlgorithm = f.extend({
            reset: function() {
                this._data = new g.init, this._nDataBytes = 0
            },
            _append: function(a) {
                "string" == typeof a && (a = k.parse(a)), this._data.concat(a), this._nDataBytes += a.sigBytes
            },
            _process: function(b) {
                var c = this._data,
                    d = c.words,
                    e = c.sigBytes,
                    f = this.blockSize,
                    h = e / (4 * f),
                    h = b ? a.ceil(h) : a.max((0 | h) - this._minBufferSize, 0);
                if (b = h * f, e = a.min(4 * b, e), b) {
                    for (var i = 0; b > i; i += f) this._doProcessBlock(d, i);
                    i = d.splice(0, b), c.sigBytes -= e
                }
                return new g.init(i, e)
            },
            clone: function() {
                var a = f.clone.call(this);
                return a._data = this._data.clone(), a
            },
            _minBufferSize: 0
        });
    d.Hasher = l.extend({
        cfg: f.extend(),
        init: function(a) {
            this.cfg = this.cfg.extend(a), this.reset()
        },
        reset: function() {
            l.reset.call(this), this._doReset()
        },
        update: function(a) {
            return this._append(a), this._process(), this
        },
        finalize: function(a) {
            return a && this._append(a), this._doFinalize()
        },
        blockSize: 16,
        _createHelper: function(a) {
            return function(b, c) {
                return new a.init(c).finalize(b)
            }
        },
        _createHmacHelper: function(a) {
            return function(b, c) {
                return new m.HMAC.init(a, c).finalize(b)
            }
        }
    });
    var m = c.algo = {};
    return c
}(Math);
! function(a) {
    for (var b = CryptoJS, c = b.lib, d = c.WordArray, e = c.Hasher, c = b.algo, f = [], g = [], h = function(a) {
            return 4294967296 * (a - (0 | a)) | 0
        }, i = 2, j = 0; 64 > j;) {
        var k;
        a: {
            k = i;
            for (var l = a.sqrt(k), m = 2; l >= m; m++)
                if (!(k % m)) {
                    k = !1;
                    break a
                }
            k = !0
        }
        k && (8 > j && (f[j] = h(a.pow(i, .5))), g[j] = h(a.pow(i, 1 / 3)), j++), i++
    }
    var n = [],
        c = c.SHA256 = e.extend({
            _doReset: function() {
                this._hash = new d.init(f.slice(0))
            },
            _doProcessBlock: function(a, b) {
                for (var c = this._hash.words, d = c[0], e = c[1], f = c[2], h = c[3], i = c[4], j = c[5], k = c[6], l = c[7], m = 0; 64 > m; m++) {
                    if (16 > m) n[m] = 0 | a[b + m];
                    else {
                        var o = n[m - 15],
                            p = n[m - 2];
                        n[m] = ((o << 25 | o >>> 7) ^ (o << 14 | o >>> 18) ^ o >>> 3) + n[m - 7] + ((p << 15 | p >>> 17) ^ (p << 13 | p >>> 19) ^ p >>> 10) + n[m - 16]
                    }
                    o = l + ((i << 26 | i >>> 6) ^ (i << 21 | i >>> 11) ^ (i << 7 | i >>> 25)) + (i & j ^ ~i & k) + g[m] + n[m], p = ((d << 30 | d >>> 2) ^ (d << 19 | d >>> 13) ^ (d << 10 | d >>> 22)) + (d & e ^ d & f ^ e & f), l = k, k = j, j = i, i = h + o | 0, h = f, f = e, e = d, d = o + p | 0
                }
                c[0] = c[0] + d | 0, c[1] = c[1] + e | 0, c[2] = c[2] + f | 0, c[3] = c[3] + h | 0, c[4] = c[4] + i | 0, c[5] = c[5] + j | 0, c[6] = c[6] + k | 0, c[7] = c[7] + l | 0
            },
            _doFinalize: function() {
                var b = this._data,
                    c = b.words,
                    d = 8 * this._nDataBytes,
                    e = 8 * b.sigBytes;
                return c[e >>> 5] |= 128 << 24 - e % 32, c[(e + 64 >>> 9 << 4) + 14] = a.floor(d / 4294967296), c[(e + 64 >>> 9 << 4) + 15] = d, b.sigBytes = 4 * c.length, this._process(), this._hash
            },
            clone: function() {
                var a = e.clone.call(this);
                return a._hash = this._hash.clone(), a
            }
        });
    b.SHA256 = e._createHelper(c), b.HmacSHA256 = e._createHmacHelper(c)
}(Math);
var CryptoJS = CryptoJS || function(a, b) {
    var c = {},
        d = c.lib = {},
        e = d.Base = function() {
            function a() {}
            return {
                extend: function(b) {
                    a.prototype = this;
                    var c = new a;
                    return b && c.mixIn(b), c.$super = this, c
                },
                create: function() {
                    var a = this.extend();
                    return a.init.apply(a, arguments), a
                },
                init: function() {},
                mixIn: function(a) {
                    for (var b in a) a.hasOwnProperty(b) && (this[b] = a[b]);
                    a.hasOwnProperty("toString") && (this.toString = a.toString)
                },
                clone: function() {
                    return this.$super.extend(this)
                }
            }
        }(),
        f = d.WordArray = e.extend({
            init: function(a, c) {
                a = this.words = a || [], this.sigBytes = c != b ? c : 4 * a.length
            },
            toString: function(a) {
                return (a || h).stringify(this)
            },
            concat: function(a) {
                var b = this.words,
                    c = a.words,
                    d = this.sigBytes,
                    a = a.sigBytes;
                if (this.clamp(), d % 4)
                    for (var e = 0; a > e; e++) b[d + e >>> 2] |= (c[e >>> 2] >>> 24 - 8 * (e % 4) & 255) << 24 - 8 * ((d + e) % 4);
                else if (65535 < c.length)
                    for (e = 0; a > e; e += 4) b[d + e >>> 2] = c[e >>> 2];
                else b.push.apply(b, c);
                return this.sigBytes += a, this
            },
            clamp: function() {
                var b = this.words,
                    c = this.sigBytes;
                b[c >>> 2] &= 4294967295 << 32 - 8 * (c % 4), b.length = a.ceil(c / 4)
            },
            clone: function() {
                var a = e.clone.call(this);
                return a.words = this.words.slice(0), a
            },
            random: function(b) {
                for (var c = [], d = 0; b > d; d += 4) c.push(4294967296 * a.random() | 0);
                return f.create(c, b)
            }
        }),
        g = c.enc = {},
        h = g.Hex = {
            stringify: function(a) {
                for (var b = a.words, a = a.sigBytes, c = [], d = 0; a > d; d++) {
                    var e = b[d >>> 2] >>> 24 - 8 * (d % 4) & 255;
                    c.push((e >>> 4).toString(16)), c.push((15 & e).toString(16))
                }
                return c.join("")
            },
            parse: function(a) {
                for (var b = a.length, c = [], d = 0; b > d; d += 2) c[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - 4 * (d % 8);
                return f.create(c, b / 2)
            }
        },
        i = g.Latin1 = {
            stringify: function(a) {
                for (var b = a.words, a = a.sigBytes, c = [], d = 0; a > d; d++) c.push(String.fromCharCode(b[d >>> 2] >>> 24 - 8 * (d % 4) & 255));
                return c.join("")
            },
            parse: function(a) {
                for (var b = a.length, c = [], d = 0; b > d; d++) c[d >>> 2] |= (255 & a.charCodeAt(d)) << 24 - 8 * (d % 4);
                return f.create(c, b)
            }
        },
        j = g.Utf8 = {
            stringify: function(a) {
                try {
                    return decodeURIComponent(escape(i.stringify(a)))
                } catch (b) {
                    throw Error("Malformed UTF-8 data")
                }
            },
            parse: function(a) {
                return i.parse(unescape(encodeURIComponent(a)))
            }
        },
        k = d.BufferedBlockAlgorithm = e.extend({
            reset: function() {
                this._data = f.create(), this._nDataBytes = 0
            },
            _append: function(a) {
                "string" == typeof a && (a = j.parse(a)), this._data.concat(a), this._nDataBytes += a.sigBytes
            },
            _process: function(b) {
                var c = this._data,
                    d = c.words,
                    e = c.sigBytes,
                    g = this.blockSize,
                    h = e / (4 * g),
                    h = b ? a.ceil(h) : a.max((0 | h) - this._minBufferSize, 0),
                    b = h * g,
                    e = a.min(4 * b, e);
                if (b) {
                    for (var i = 0; b > i; i += g) this._doProcessBlock(d, i);
                    i = d.splice(0, b), c.sigBytes -= e
                }
                return f.create(i, e)
            },
            clone: function() {
                var a = e.clone.call(this);
                return a._data = this._data.clone(), a
            },
            _minBufferSize: 0
        });
    d.Hasher = k.extend({
        init: function() {
            this.reset()
        },
        reset: function() {
            k.reset.call(this), this._doReset()
        },
        update: function(a) {
            return this._append(a), this._process(), this
        },
        finalize: function(a) {
            return a && this._append(a), this._doFinalize(), this._hash
        },
        clone: function() {
            var a = k.clone.call(this);
            return a._hash = this._hash.clone(), a
        },
        blockSize: 16,
        _createHelper: function(a) {
            return function(b, c) {
                return a.create(c).finalize(b)
            }
        },
        _createHmacHelper: function(a) {
            return function(b, c) {
                return l.HMAC.create(a, c).finalize(b)
            }
        }
    });
    var l = c.algo = {};
    return c
}(Math);
! function() {
    var a = CryptoJS,
        b = a.lib,
        c = b.WordArray,
        b = b.Hasher,
        d = [],
        e = a.algo.SHA1 = b.extend({
            _doReset: function() {
                this._hash = c.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
            },
            _doProcessBlock: function(a, b) {
                for (var c = this._hash.words, e = c[0], f = c[1], g = c[2], h = c[3], i = c[4], j = 0; 80 > j; j++) {
                    if (16 > j) d[j] = 0 | a[b + j];
                    else {
                        var k = d[j - 3] ^ d[j - 8] ^ d[j - 14] ^ d[j - 16];
                        d[j] = k << 1 | k >>> 31
                    }
                    k = (e << 5 | e >>> 27) + i + d[j], k = 20 > j ? k + ((f & g | ~f & h) + 1518500249) : 40 > j ? k + ((f ^ g ^ h) + 1859775393) : 60 > j ? k + ((f & g | f & h | g & h) - 1894007588) : k + ((f ^ g ^ h) - 899497514), i = h, h = g, g = f << 30 | f >>> 2, f = e, e = k
                }
                c[0] = c[0] + e | 0, c[1] = c[1] + f | 0, c[2] = c[2] + g | 0, c[3] = c[3] + h | 0, c[4] = c[4] + i | 0
            },
            _doFinalize: function() {
                var a = this._data,
                    b = a.words,
                    c = 8 * this._nDataBytes,
                    d = 8 * a.sigBytes;
                b[d >>> 5] |= 128 << 24 - d % 32, b[(d + 64 >>> 9 << 4) + 15] = c, a.sigBytes = 4 * b.length, this._process()
            }
        });
    a.SHA1 = b._createHelper(e), a.HmacSHA1 = b._createHmacHelper(e)
}(),
function() {
    var a = CryptoJS,
        b = a.enc.Utf8;
    a.algo.HMAC = a.lib.Base.extend({
        init: function(a, c) {
            a = this._hasher = a.create(), "string" == typeof c && (c = b.parse(c));
            var d = a.blockSize,
                e = 4 * d;
            c.sigBytes > e && (c = a.finalize(c));
            for (var f = this._oKey = c.clone(), g = this._iKey = c.clone(), h = f.words, i = g.words, j = 0; d > j; j++) h[j] ^= 1549556828, i[j] ^= 909522486;
            f.sigBytes = g.sigBytes = e, this.reset()
        },
        reset: function() {
            var a = this._hasher;
            a.reset(), a.update(this._iKey)
        },
        update: function(a) {
            return this._hasher.update(a), this
        },
        finalize: function(a) {
            var b = this._hasher,
                a = b.finalize(a);
            return b.reset(), b.finalize(this._oKey.clone().concat(a))
        }
    })
}(),
function() {
    var a = CryptoJS,
        b = a.lib,
        c = b.Base,
        d = b.WordArray,
        b = a.algo,
        e = b.HMAC,
        f = b.PBKDF2 = c.extend({
            cfg: c.extend({
                keySize: 4,
                hasher: b.SHA1,
                iterations: 1
            }),
            init: function(a) {
                this.cfg = this.cfg.extend(a)
            },
            compute: function(a, b) {
                for (var c = this.cfg, f = e.create(c.hasher, a), g = d.create(), h = d.create([1]), i = g.words, j = h.words, k = c.keySize, c = c.iterations; i.length < k;) {
                    var l = f.update(b).finalize(h);
                    f.reset();
                    for (var m = l.words, n = m.length, o = l, p = 1; c > p; p++) {
                        o = f.finalize(o), f.reset();
                        for (var q = o.words, r = 0; n > r; r++) m[r] ^= q[r]
                    }
                    g.concat(l), j[0]++
                }
                return g.sigBytes = 4 * k, g
            }
        });
    a.PBKDF2 = function(a, b, c) {
        return f.create(c).compute(a, b)
    }
}();
var AesUtil = function(a, b) {
    this.keySize = a / 32, this.iterationCount = b
};
AesUtil.prototype.generateKey = function(a, b) {
    var c = CryptoJS.PBKDF2(b, CryptoJS.enc.Hex.parse(a), {
        keySize: this.keySize,
        iterations: this.iterationCount
    });
    return c
}, AesUtil.prototype.encrypt = function(a, b, c, d) {
    var e = this.generateKey(a, c),
        f = CryptoJS.AES.encrypt(d, e, {
            iv: CryptoJS.enc.Hex.parse(b)
        });
    return f.ciphertext.toString(CryptoJS.enc.Base64)
}, AesUtil.prototype.decrypt = function(a, b, c, d) {
    var e = this.generateKey(a, c),
        f = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(d)
        }),
        g = CryptoJS.AES.decrypt(f, e, {
            iv: CryptoJS.enc.Hex.parse(b)
        });
    return g.toString(CryptoJS.enc.Utf8)
};
var module = {
        HOLIDAY: "Holidays",
        FOREX: "Forex",
        VISA: "Visa",
        FLIGHTS: "Flights",
        HOTELS: "Hotels",
        COMMON: "Common",
        INSURANCE: "Insurance",
        IRCTCHOLIDAYS: "IrctcHolidays"
    },
    getCookie = function(a) {
        var b = document.cookie.match("(^|;) ?" + a + "=([^;]*)(;|$)");
        return b ? b[2] : null
    };
null === getCookie("user") && "Guest" !== localStorage.getItem("customerType") && (localStorage.removeItem("customerType"), localStorage.removeItem("onBehalf"), localStorage.removeItem("onBehalfCheck"), localStorage.removeItem("onBehalfRedirectUrl"), localStorage.removeItem("userDetailandFamilyTree"), localStorage.removeItem("onBehalfEmail"), localStorage.removeItem("onBehalfUserDetailandFamilyTree"), localStorage.removeItem("guestEmailId"), localStorage.removeItem("loginAccType"), localStorage.removeItem("active"), localStorage.removeItem("sideBar"));
var server = window.location.href,
    aurl = "/",
    imageURL, paymentGatewayBaseUrl = "/",
    randomString = "",
    cityStateList, agentAutoSuggestData, pcpcheck, fbAppId, captchaLoad = !1,
    cityList = [],
    loadCounter = 1,
    gtmPackageName = "",
    socialLoginType, agentSuccess = !1,
    baseUrlCommonRs = "TcilMyAccount/settings/";
server.indexOf("uatastra") > 0 ? (fbAppId = "1698777530406433", aurl = "https://services-uatastra.thomascook.in/", imageURL = "https://resources-uatastra.thomascook.in/images", paymentGatewayBaseUrl = "https://uatastra.thomascook.in/") : server.indexOf("pprod.thomascook.in") > 0 ? (fbAppId = "1698777530406433", aurl = "https://services.thomascook.in/", imageURL = "https://resources.thomascook.in/images", paymentGatewayBaseUrl = "https://pprod.thomascook.in/") : (fbAppId = "1698777530406433", aurl = "https://services.thomascook.in/", imageURL = "https://resources.thomascook.in/images", paymentGatewayBaseUrl = "https://www.thomascook.in/");
var holidayImageURL = "/holidays/",
    flightImageURL = "/flight/airline/",
    hotelImageURL = "/hotels/",
    menuPojo, ajaxUrlLogin = "TcilMyAccount/login/",
    ajaxUrlWebLead = "tcCommonRS/crm/saveCrmLead",
    shareURL = window.location.href,
    restrictDropOutMail = !1,
    registerLink = "",
    addrflag = !1,
    tempAddr = "",
    delete_cookie = function(a) {
        document.cookie = a + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/"
    },
    verifyRegisterHeaderEmailResponse = "";
$(document).on("click", "#loginButton", function(a) {
    if (onBlurLoginIdVerify(), getRandomString(), "" !== randomString) {
        var b = validateLoginPopUpForm();
        b && validateCredential()
    }
}), $(document).on("keypress", "#existloginPass", function(a) {
    13 === a.keyCode && $("#loginButton").click()
}), $(document).on("keypress", "#captchaValue", function(a) {
    13 === a.keyCode && $("#loginButton").click()
});
var checkRegisterOrLogin = "";
$(document).on("input", "#loginId", function(a) {
    $("#existloginPass").removeAttr("disabled"), $("#loginButton").removeAttr("disabled"), $("#emailTypeVerification").html(""), $(".fbLogin").addClass("hide"), $(".gpLogin").addClass("hide"), $(".tcLogin").addClass("hide"), $(".noAccount").addClass("hide")
}), $(document).on("input", "#registerEmailId", function(a) {
    $("#emailTypeVerification").html(""), $("#loginErrorMessage").html(""), $(".fbLogin").addClass("hide"), $(".gpLogin").addClass("hide"), $(".tcLogin").addClass("hide")
}), $(document).on("input", "#existloginPass", function(a) {
    $("#emailTypeVerification").html(""), $("#loginErrorMessage").html("")
}), $(document).on("click", "#resetPwdLogin", function() {
    var a = validateResetPwdLogin();
    if (a) {
        var b = $("#confirmId").val();
        loginType(b, "resetPwd")
    }
}), $(document).on("input", "#confirmId", function() {
    $(".resetPasswordErrorMessage").addClass("hide")
}), $(document).on("click", "#registerButton", function() {
    onBlurRegisterEmailIdVerify();
    var a = !1;
    if (userId = $("#registerEmailId").val(), password = $("#registerPwd").val(), conformPassword = $("#registerConfirmPwd").val(), mobileNo = $("#registerMobileNo").val(), firstName = $("#registerFName").val(), lastName = $("#registerLName").val(), title = $("#regTitle option:selected").val(), validateRegister())
        if (a = !0, "TC" === verifyRegisterHeaderEmailResponse.accountType && "true" === verifyRegisterHeaderEmailResponse.message) {
            if (console.log("verifyRegisterHeaderEmailResponse : ", verifyRegisterHeaderEmailResponse), void 0 != verifyRegisterHeaderEmailResponse.errorType) {
                if ("Email exists" == verifyRegisterHeaderEmailResponse.errorType) return $(".tcLogin").removeClass("hide"), $(".tcLoginMobile").addClass("hide"), !1;
                if ("MobileNumber exists" == verifyRegisterHeaderEmailResponse.errorType) return $(".tcLogin").addClass("hide"), $(".tcLoginMobile").removeClass("hide"), !1
            }
            console.log("in register is active " + verifyRegisterHeaderEmailResponse.isActive), "TC" === verifyRegisterHeaderEmailResponse.accountType && "N" == verifyRegisterHeaderEmailResponse.isActive ? (console.log("inside click register3"), registerLink = "create", $(".fbLogin").addClass("hide"), $(".gpLogin").addClass("hide"), a = !0) : "TC" === verifyRegisterHeaderEmailResponse.accountType && "Y" == verifyRegisterHeaderEmailResponse.isActive && ($(".tcLogin").removeClass("hide"), $(".tcLoginMobile").removeClass("hide"), $(".fbLogin").addClass("hide"), $(".gpLogin").addClass("hide"), a = !1)
        } else "false" === verifyRegisterHeaderEmailResponse.message && ($("#emailTypeVerification").css("display", "block"), "FB" === verifyRegisterHeaderEmailResponse.accountType ? ($(".fbLogin").removeClass("hide"), $(".gpLogin").addClass("hide"), $(".tcLogin").addClass("hide"), a = !1) : "GP" === verifyRegisterHeaderEmailResponse.accountType ? ($(".gpLogin").removeClass("hide"), $(".fbLogin").addClass("hide"), $(".tcLogin").addClass("hide"), a = !1) : ($("#registerButton").addClass("loading"), $(".fbLogin").addClass("hide"), $(".gpLogin").addClass("hide"), $(".tcLogin").addClass("hide"), "NA" === verifyRegisterHeaderEmailResponse.accountType ? (console.log("verifyRegisterHeaderEmailResponse: " + JSON.stringify(verifyRegisterHeaderEmailResponse)), console.log("NA"), registerLink = "create", a = !0) : "GU" === verifyRegisterHeaderEmailResponse.accountType && (registerLink = "create/guestUser", a = !0)));
    else conformPassword === password && "" !== password;
    a && (getRandomString(), "" !== randomString && registerAndLoginHeader(userId, password, mobileNo, firstName, lastName, title))
}), $(document).ready(function() {
    console.log("after chnages");
    var a = new Date;
    $(".likely_travel_date").each(function() {
        $("#" + $(this).attr("id")).datepicker("destroy"), $("#" + $(this).attr("id")).datepicker({
            numberOfMonths: 1,
            changeMonth: !0,
            changeYear: !0,
            yearRange: "0:+1",
            minDate: a,
            dateFormat: "dd-mm-yy"
        })
    }), "true" === getUrlParameter("sessionExpireLogin") && $("#loginRegisterPopup").modal("show");
    var b = getCookie("user");
    if (null !== b && "" !== b && void 0 !== b && "null" !== b && loogedIn(), !(server.indexOf("domestic-flights") > -1 || server.indexOf("international-flights") > -1)) {
        var c = server,
            d = "",
            e = localStorage.getItem("geoCords");
        d = "undefined" != typeof e && null !== e && "" !== e ? {
            pageUrl: c,
            geoCords: e
        } : {
            pageUrl: c
        };
        var f = intializeParams();
        f.url = "tcCommonRS/click2Call/getTimeout", f.requestType = "POST", f.data = JSON.stringify(d), f.successCallbackFunction = "ClickToCallTimeoutSuccessFunction", f.async = !1, doAjax(f)
    }
    window.location.pathname.indexOf("/holidays/international-tour-packages") > -1 && $(".chat_page_tc").removeClass("hide")
}), $(window).on("load", function() {
    767 > screenWidth ? ($("html").addClass("mobile-device"), sessionStorage.setItem("deviceType", "Mobile")) : ($("html").addClass("desktop-device"), sessionStorage.setItem("deviceType", "Desktop"))
});
var onBehalfOption;
$(document).on("click", "#onBehalfContinue", function() {
    onBehalfOption = "onbehalf";
    var a = JSON.parse(localStorage.getItem("userDetailandFamilyTree")) ? JSON.parse(localStorage.getItem("userDetailandFamilyTree")).userDetail.departmentId : "";
    if (console.log(a), "Ebiz Staff" === a || "Ebiz call center" === a || "Non Ebiz shop" === a || "GCP" === a || "TA" === a || "TBA" === a || "HBA" === a || "PSA" === a) {
        if (!onbehalfMailCheck()) return console.log("old code"), !1;
        console.log("enterservice by rakhee");
        var b = intializeParams();
        b.url = ajaxUrlLogin + "onBehalf/" + $("#onBehalfEmailId").val(), b.requestType = "GET", b.successCallbackFunction = "onBehalfSuccess", b.async = !1, doAjax(b), localStorage.setItem("onBehalfEmail", $("#onBehalfEmailId").val()), localStorage.setItem("email", $("#onBehalfEmailId").val()), localStorage.removeItem("onBehalf"), localStorage.setItem("onBehalf", "true"), localStorage.setItem("onBehalfCheck", !0), window.location.href = localStorage.getItem("onBehalfRedirectUrl")
    }
    if ($("input[name='agentmode']").is(":checked")) var c = $(this).parents(".content-block").find("#NonEbij input:checked").attr("data-id");
    if ("Agent_onbehalf" === c) {
        if (!onbehalfAgentIdOrMail()) return !1;
        if (onBehalfAgentIdOrName(), !agentSuccess) return $("#onBehalfAgentId").next(".onbehalfError").addClass("show"), $("#onBehalfAgentId").next(".onbehalfError").find("p").html("Please Enter Valid AgentId"), !1;
        var b = intializeParams();
        b.url = ajaxUrlLogin + "onBehalf/" + $("#onBehalfAgentEmail").val(), b.requestType = "GET", b.successCallbackFunction = "onBehalfSuccess", b.async = !1, doAjax(b), localStorage.setItem("onBehalfEmail", $("#onBehalfAgentEmail").val()), localStorage.setItem("email", $("#onBehalfAgentEmail").val()), localStorage.removeItem("onBehalf"), localStorage.setItem("onBehalf", "true"), localStorage.setItem("onBehalfCheck", !0), window.location.href = localStorage.getItem("onBehalfRedirectUrl")
    }
    if ("b2c_user" === c) {
        var b = intializeParams();
        b.url = ajaxUrlLogin + "onBehalf/" + $("#b2c_onBehalfEmailId").val(), b.requestType = "GET", b.successCallbackFunction = "onBehalfSuccess", b.async = !1, doAjax(b), localStorage.setItem("onBehalfEmail", $("#b2c_onBehalfEmailId").val()), localStorage.setItem("email", $("#b2c_onBehalfEmailId").val()), localStorage.removeItem("onBehalf"), localStorage.setItem("onBehalf", "true"), localStorage.setItem("onBehalfCheck", !0), window.location.href = localStorage.getItem("onBehalfRedirectUrl")
    }
}), window.fbAsyncInit = function() {
    FB.init({
        appId: fbAppId,
        xfbml: !0,
        version: "v2.7"
    })
};
var gplusLogin = function() {
    gapi.load("auth2", function() {
        auth2 = gapi.auth2.init({
            client_id: "1070810676135-3qvf7htjrred3ua3ae09bv0u795ag09s.apps.googleusercontent.com",
            approvalprompt: "force",
            scope: "https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read"
        }), attachSignin(document.getElementById("google-login-1")), attachSignin(document.getElementById("google-login-2")), attachSignin(document.getElementById("google-login-3")), attachSignin(document.getElementById("google-login"))
    })
};
$(document).on("click", "#mainLogIn", function() {
    $("#loginErrorMessage").html(""), $(".gpLogin").addClass("hide"), $(".tcLogin").addClass("hide")
}), $(document).on("click", "input[name='radio_login']", function() {
    var a = $(this).attr("data-id");
    if ($(this).is(":checked"))
        if ($(".tcloginDiv").parent(".form_control_grp").addClass("hide"), $(".resend_otp").parent(".form_control_grp").addClass("hide"), $("#" + a).removeClass("hide"), "otpdiv" == a) {
            $(".resend_otp").parent(".form_control_grp").removeClass("hide"), $("#" + a).parents(".login_reg_form").find(".error-info-wrapper").html(""), $("#" + a).children("input").removeClass("parsley-error"), $("#" + a).parent(".login_reg_form").find(".invalid-msg-wrapper").hide();
            var b = $("#loginId").val();
            sendOTP(b)
        } else $("#" + a).parents(".login_reg_form").find(".error-info-wrapper").hide(), $("#" + a).children("input").removeClass("parsley-error"), $("#" + a).parent(".login_reg_form").find(".invalid-msg-wrapper").hide();
    else $("#" + a).addClass("hide")
}), $(document).on("click", "input[name='agentmode']", function() {
    var a = $(this).attr("data-id");
    $(".labelHide").addClass("hide"), $("#" + a).removeClass("hide")
}), $(document).on("click", "#ResendOTP", function() {
    var a = $("#loginId").val();
    sendOTP(a)
});
var inFormOrLink;
$("a").on("click", function() {
    inFormOrLink = !0
}), $("form").on("submit", function() {
    inFormOrLink = !0
}), $(window).on("beforeunload", function() {
    detectRefresh()
}), $(window).on("load", function() {
    $(document).on("focus", ".your_city_autocomplete", function() {
        if (void 0 !== localStorage.getItem("cityList") && null !== localStorage.getItem("cityList") && "" !== localStorage.getItem("cityList")) cityStateList = JSON.parse(localStorage.getItem("cityList"));
        else {
            var a = intializeParams();
            a.url = "tcCommonRS/profile.autosuggest/state.city", a.requestType = "GET", a.successCallbackFunction = "cityStateAutoSuccess", a.async = !1, doAjax(a)
        }
        0 === cityList.length && $.each(cityStateList, function(a, b) {
            cityList.push(b.cityName)
        }), $(".your_city_autocomplete").autocomplete({
            source: cityList,
            appendTo: $(this).parent(),
            minLength: 3,
            select: function(a, b) {
                var c = (b.item.label, b.item.value);
                $(this).attr("data-value", c)
            },
            response: function(a, b) {
                if (!b.content.length) {
                    var c = {
                        value: "",
                        label: "No results found"
                    };
                    b.content.push(c)
                }
            }
        })
    })
}), $(document).on("click", "#mainLogIn", function() {
    gplusLogin()
}), $(document).on("click", "#allow_block_left", function() {
    $("#allow_block_left").modal("hide")
}), $(document).ready(function() {
    $("#onBehalfAgentId").autocomplete({
        delay: 20,
        minLength: 3,
        source: function(a, b) {
            var c = intializeParams();
            c.url = ajaxUrlLogin + "autoSuggestAgent/" + $("#onBehalfAgentId").val(), c.requestType = "GET", c.successCallbackFunction = "onBehalfAutoSuggest", c.async = !1, doAjax(c);
            var d = [];
            if (agentAutoSuggestData)
                for (var e = 0; e < agentAutoSuggestData.length; e++) d.push(agentAutoSuggestData[e].agentName);
            b(d)
        }
    }), pcpcheck = $("#loginPageType").val();
    var a = JSON.parse(localStorage.getItem("userDetailandFamilyTree")) ? JSON.parse(localStorage.getItem("userDetailandFamilyTree")).userDetail.departmentId : "";
    "Non ebiz channel" != a ? (console.log("inside dept: " + a), $("#NonEbij").addClass("hide"), $("#tconbehalf").removeClass("hide"), onBehalfOption = "onbehalf", $("#onbehalf input[value='onbehalf']").attr("checked", !0), $("#user_onbehalf").removeClass("hide")) : ($("#NonEbij").removeClass("hide"), $("#tconbehalf").addClass("hide"))
}), $(window).bind("DOMContentLoaded load resize", function() {
    $(window).innerWidth() <= 767 && $(".navbar-right li").removeClass("dropdown-submenu")
}), $(document).ready(function() {
    $("a").click(function() {
        $(this).removeClass("parsley-error"), $(this).siblings(".errorName").hide(), $(this).siblings(".field-error").hide(), $(this).siblings(".error").hide()
    }), $("select").focus(function() {
        $(this).removeClass("parsley-error"), $(this).siblings(".errorName").hide(), $(this).siblings(".field-error").hide(), $(this).siblings(".error").hide()
    })
});
var allOSB = [],
    mxh = "";
window.onload = function() {
    if (allOSB = document.getElementsByClassName("more_all_big_static"), allOSB.length > 0) {
        mxh = window.getComputedStyle(allOSB[0]).getPropertyValue("max-height"), mxh = parseInt(mxh.replace("px", ""));
        for (var a = 0; a < allOSB.length; a++) {
            var b = document.createElement("button");
            b.innerHTML = "Read More", b.setAttribute("type", "button"), b.setAttribute("class", "read_more_static hid_static"), insertAfter(allOSB[a], b)
        }
    }
    for (var c = document.getElementsByClassName("read_more_static"), a = 0; a < c.length; a++) c[a].addEventListener("click", function() {
        revealThis(this)
    }, !1);
    updateReadMore()
}, window.onresize = function() {
    updateReadMore()
}, String.prototype.startsWith || (String.prototype.startsWith = function(a, b) {
    return b = b || 0, this.indexOf(a, b) === b
}), $(function() {
    var a = location.pathname.split("/");
    switch (a[1]) {
        case "holidays":
            $(".holidays_menu").addClass("active"), $("#hamburger").removeClass("hide");
            break;
        case "foreign-exchange":
            $(".forex_menu").addClass("active");
            break;
        case "visa":
            $(".visa_menu_header").addClass("active");
            break;
        case "flights":
            $(".flight_menu").addClass("active");
            break;
        case "Flights":
            $(".flight_menu").addClass("active");
            break;
        case "Flights":
            $(".flight_menu").addClass("active");
            break;
        case "hotels":
            $(".hotel_menu").addClass("active");
            break;
        case "travel-insurance":
            $(".visa_menu_header").addClass("active");
            break;
        case "gift-cards":
            $(".gift_menu").addClass("active");
            break;
        case "eurail":
            $(".eurailMenu").addClass("active");
            break;
        case "partner-deals":
            $(".offer_menu").addClass("active");
            break;
        case "product-offers":
            $(".offer_menu").addClass("active")
    }
}), $(document).on("focus", "input,textarea", function() {
    $(this).removeClass("parsley-error"), $(this).siblings(".errorName").hide(), $(this).siblings(".field-error").hide(), $(this).siblings(".error").hide()
}), $(document).on("change", ".traveller-title select", function() {
    $(this).parents(".selectric-wrapper").find(".selectric").removeClass("parsley-error")
}), tc_read_more_dynamic($), $(document).ready(function() {
    $(".read_more_data").tc_read_more({
        slicePoint: 180,
        showWordCount: !1,
        expandEffect: "fadeIn",
        collapseEffect: "fadeOut"
    }), $(".more_all_big").tc_read_more({
        slicePoint: 320,
        showWordCount: !1,
        expandEffect: "fadeIn",
        collapseEffect: "fadeOut"
    }), $(".more_landipage").tc_read_more({
        slicePoint: 151,
        showWordCount: !1,
        expandEffect: "fadeIn",
        collapseEffect: "fadeOut"
    })
}), $(".talk_to_submit").click(function(a) {
    a.preventDefault(), TalkToForm()
});
var dateToday = new Date,
    SelectedDates = {},
    DayValue = {},
    today = new Date,
    currentDate = new Date,
    dd = today.getDate(),
    mm = today.getMonth() + 1,
    yyyy = today.getFullYear(),
    newDate = new Date(currentDates()),
    screenWidth = window.innerWidth > 0 ? window.innerWidth : screen.width,
    screenHeight = screen.height,
    regEx = /^[a-zA-Z ]+$/,
    NumericRegEx = /^([0-9])*$/,
    emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    ajaxUrlFeedbackLead = "tcCommonRS/crm/saveFeedback";
Date.prototype.getMonthNames = function() {
    return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
}, Date.prototype.monthabbrs = function() {
    return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
}, Date.prototype.weekabbrs = function() {
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
}, Date.prototype.weeks = function() {
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
}, Date.prototype.getMonthValue = function() {
    return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
}, Date.prototype.getDaysInMonth = function() {
    return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate()
}, Date.prototype.getMonthDays = function(a, b) {
    return new Date(b, a + 1, 0).getDate()
};
var setCookie = function(a, b) {
        var c = new Date;
        c.setTime(c.getTime() + 1728e5), document.cookie = a + "=" + b + ";expires=" + c + ";path=/"
    },
    uisetCookie = function(a, b) {
        var c = new Date;
        c.setTime(c.getTime() + 31536e6), document.cookie = a + "=" + b + ";expires=" + c + ";path=/"
    },
    getCookie = function(a) {
        var b = document.cookie.match("(^|;) ?" + a + "=([^;]*)(;|$)");
        return b ? b[2] : null
    },
    currencyFormate = function(a) {
        return $.currencyConvertor(a)
    },
    currencyFormateUSD = function(a) {
        return $.currencyConvertorUSD(a)
    },
    animateValue = function(a, b, c, d) {
        function e() {
            var a = (new Date).getTime(),
                b = Math.max((l - a) / d, 0),
                e = Math.round(c - b * g);
            f.innerHTML = e, e == c && (f.innerHTML = $.currencyConvertor(e), clearInterval(j))
        }
        var f = document.getElementById(a),
            g = c - b,
            h = 50,
            i = Math.abs(Math.floor(d / g));
        i = Math.max(i, h);
        var j, k = (new Date).getTime(),
            l = k + d;
        j = setInterval(e, i), e()
    };
$(document).ready(function() {
        $("#gstPopUp .close").click(function() {
            $("#search-button").removeClass("loading")
        }), $(document).on("keypress", "input[type=number]", function(a) {
            return 43 == a.which || 45 == a.which || 46 == a.which ? !1 : void 0
        }), $(document).on("focus", "input[type=number]", function(a) {
            $(this).on("wheel", function(a) {
                a.preventDefault()
            })
        }), $(document).on("blur", "input[type=number]", function(a) {
            $(this).off("wheel")
        }), $(document).on("keydown", "input[type=number]", function(a) {
            38 != a.which && 40 != a.which || a.preventDefault()
        }), $(document).on("keyup", ".form_field1,.form_field2,#registerFName,#registerLName", function(a) {
            var b = $(this).val();
            b.match(/[^a-zA-Z ]/g) && $(this).val(b.replace(/[^a-zA-Z ]/g, ""))
        }), $(document).on("focus", "#form-feedback input,#form-feedback  textarea,#form-feedback select", function(a) {
            $(this).siblings(".field-error").hide(), $(this).removeClass("parsley-error")
        }), $(document).on("change", "#form-feedback select", function(a) {
            $("#form-feedback").find(".selectric-wrapper").siblings(".field-error").hide(), $("#form-feedback").find(".selectric-wrapper").find(".selectric").removeClass("parsley-error")
        }), showDiv(), $(document).on("keydown", 'input[type="number"]', function(a) {
            return $(this).val().length <= 9 ? !0 : void(9 !== a.which && $(this).val($(this).val().slice(0, 9)))
        }), $(".your_city_autocomplete ").bind("propertychange change input paste", function(a) {}), $(".feed-backClick,#form-feedback input[type=reset],#form-feedback-holidays input[type=reset]").click(function() {
            var a = $(".feed-backClick").parent().find("#feed-back").is(":visible");
            a ? ($(".remove").hide(), $("#feed-back").hide(300), $("#form-feedback").find(".form-control").val(""), $("#form-feedback").find(".form-control").removeClass("parsley-error"), $("#form-feedback").find("#bs-callout-warning").hide(), $("#form-feedback").find(".field-error").html("")) : ($(".remove").show(), $("#feed-back").show(300), $(window).width() > 767 && $("#feed-back").css("top", "-140px")), $("#thankQFeed").hide(), $("#feed-back .btn-primary").removeClass("loading").text("Submit"), $("#form-feedback").find(".selectric-wrapper").find(".selectric").removeClass("parsley-error"), $("#form-feedback").find(".your_city_autocomplete").attr("data-value", ""), console.log("fdsf IN ESLE")
        }), $("#close-btn").click(function() {
            $("div#clickTocall").hide(), $("div#plus").show()
        }), $("#plus").click(function() {
            $("div#clickTocall").show(), $("div#plus").hide()
        }), $("#wantUsSubmit").click(function() {
            var a = $("#wantUsMobile").val(),
                b = !0;
            if ("" == a || 10 !== a.length || "9" != a.charAt(0) && "8" != a.charAt(0) && "7" != a.charAt(0) && "6" != a.charAt(0) ? ($("#wantUsMobile").addClass("parsley-error"), $("#wantUsMobile").removeClass("parsley-success"), b = !1) : ($("#wantUsMobile").addClass("parsley-success"), $("#wantUsMobile").removeClass("parsley-error"), $("#wantUsMobile").parent().hide(), $("#wantUsThanks").show()), b) {
                var c = JSON.stringify($("#wantUsSubmit").parents("form").serializeObject()),
                    d = intializeParams();
                return d.url = "/flightRS/webresources/tcilinstantcallback/p", d.data = c, d.requestType = "POST", d.successCallbackFunction = "successInstantCallback", doAjax(d), !1
            }
            return !1
        }), $("#feed-back .btn-primary").click(function() {
            $("#thankQFeed").hide();
            var a = enquiryForm("form-feedback"),
                b = a.form_field5,
                c = -1 != b.indexOf("Holidays") ? "Holidays" : b,
                d = b.split(" "),
                e = (d.length > 1 ? d[0] : "", !(a.form_field7.length >= 1e3));
            if ("" === a.form_field7) return e = !1, $("#feedComments").addClass("parsley-error"), $("#feedComments").parent().find(".field-error").show().html("You miss this"), !1;
            if (e ? ($("#feedComments").removeClass("parsley-error"), $("#feedComments").parent().find(".field-error").hide().html("")) : ($("#feedComments").addClass("parsley-error"), $("#feedComments").parent().find(".field-error").show().html("max length 1000 character")), 1 != a.formAlert || !e) return !1;
            $(this).addClass("loading").text("Loading");
            var f = {
                name: a.form_field1,
                phoneNo: a.form_field3,
                email: a.form_field4,
                comment: a.form_field7,
                product: c,
                feedbackType: $("#feedbackCategory").val()
            };
            console.log(f);
            var g = intializeParams();
            g.url = ajaxUrlFeedbackLead, g.requestType = "POST", g.data = JSON.stringify(f), g.successCallbackFunction = "crmSuccessFeedback", g.async = !0, doAjax(g)
        }), $(".close-bttn").click(function() {
            $(".click-bott").hide(), $(".click-plus").show()
        }), $(".click-plus").click(function() {
            $(".click-bott").show(), $(".click-plus").hide()
        }), $(".click-bott").hide()
    }), $(document).ready(function() {
        $("body").addClass("showCookeiPolicy"), $(".dropdown-toggle").dropdown(), $(window).width() > 991 && $(function() {
            $("#bs-navbar .dropdown").hover(function() {
                $(".dropdown-menu", this).stop(!0, !0).fadeIn("fast"), $(this).toggleClass("open"), $("span", this).toggleClass("caret caret-up")
            }, function() {
                $(".dropdown-menu", this).stop(!0, !0).fadeOut("fast"), $(this).toggleClass("open"), $("span", this).toggleClass("caret caret-up")
            })
        }), $('[data-toggle="offcanvas"]').click(function() {
            $("#bs-navbar").toggleClass("active")
        }), $("#bs-navbar").on("click", "[data-toggle=collapse]", function(a) {
            a.preventDefault(), $(this).next().is(":visible") ? ($(this).next().hide(350), $(this).find("i.glyphicon").removeClass("nav-down-arrow")) : ($(this).next().show(350), $(this).find("i.glyphicon").addClass("nav-down-arrow"))
        }), $("#flight-home, .container.flight-body").click(function() {
            $("#bs-navbar").hasClass("active") && $("#bs-navbar").removeClass("active")
        })
    }), $(document).mouseup(function(a) {
        var b = $(".dropdown-menu-left");
        b.is(a.target) || 0 !== b.has(a.target).length || (b.is(":visible") ? (b.hide(350), b.prev("a").find("i.glyphicon").removeClass("nav-down-arrow")) : b.prev("a").find("i.glyphicon").addClass("nav-down-arrow"))
    }), $(function() {
        $("#bs-navbar .dropdown").hover(function() {
            $(".dropdown-menu", this).stop(!0, !0).fadeIn("fast"), $(this).toggleClass("open"), $("span", this).toggleClass("caret caret-up")
        }, function() {
            $(".dropdown-menu", this).stop(!0, !0).fadeOut("fast"), $(this).toggleClass("open"), $("span", this).toggleClass("caret caret-up")
        })
    }),
    function(a) {
        a.fn.unveil = function(b, c) {
            function d() {
                var b = j.filter(function() {
                    var b = a(this);
                    if (!b.is(":hidden")) {
                        var c = f.scrollTop(),
                            d = c + f.height(),
                            e = b.offset().top,
                            h = e + b.height();
                        return h >= c - g && d + g >= e
                    }
                });
                e = b.trigger("unveil"), j = j.not(e)
            }
            var e, f = a(window),
                g = b || 0,
                h = window.devicePixelRatio > 1,
                i = h ? "data-src-retina" : "data-src",
                j = this;
            return this.one("unveil", function() {
                var a = this.getAttribute(i);
                a = a || this.getAttribute("data-src"), a && (this.setAttribute("src", a), "function" == typeof c && c.call(this))
            }), f.on("scroll.unveil resize.unveil lookup.unveil", d), d(), this
        }, a.fn.serializeObject = function() {
            var b = {},
                c = this.serializeArray();
            return a.each(c, function() {
                void 0 !== b[this.name] ? (b[this.name].push || (b[this.name] = [b[this.name]]), b[this.name].push(this.value || "")) : b[this.name] = this.value || ""
            }), b
        }
    }(window.jQuery || window.Zepto), $(document).on("click", ".show_register_form", function() {
        if ($("#loginRegisterPopup").find(".modal-header h4").html("Get a Thomascook Account"), $(".login_form_holder").hide(), $(".reg_form_holder").show(), $(".fbLogin").addClass("hide"), $(".gpLogin").addClass("hide"), $(".tcLogin").addClass("hide"), $("#registerFormReset")[0].reset(), $(window).width() > 767) {
            var a = $(".reg_form_holder").outerHeight();
            if (0 == a) var b = 300;
            else b = a - 200;
            $("body").append("<style>.or_separator_login:after{height: " + b + "px;}</style>")
        }
    }), $(document).on("click", ".show_login_form,.main_btn", function() {
        if ($("#loginRegisterPopup").find(".modal-header h4").html("Login to Thomascook"), $("style").remove(), $(".login_form_holder").show(), $(".reg_form_holder").hide(), $(window).width() > 767) {
            var a = 100;
            $("body").append("<style>.or_separator_login:after{height: " + a + "px;}</style>")
        }
    }), $(document).on("click", "#loginButton", function() {
        $("#loginId").val(), $("#existloginPass").val();
        $("#loginId, #existloginPass").each(function() {
            "" === $(this).val() && ($(this).next().show(), $(this).next().find("p").html("You missed this").show(), $(this).addClass("parsley-error"))
        })
    }), $(document).on("change", "#tandc", function() {
        $(this).is(":checked") && $("#tandc").siblings(".invalid-msg-wrapper").hide()
    }), $(document).on("keyup", "#registerConfirmPwd", function() {
        var a = $("#registerPwd").val(),
            b = $("#registerConfirmPwd").val();
        a == b ? $("#registerConfirmPwd").css({
            color: "#91c74c"
        }) : $("#registerConfirmPwd").css({
            color: "#8D0C10"
        })
    }), $(document).on("keyup", "#registerPwd", function() {
        var a = $("#registerPwd").val();
        a.length >= 12 && $("#passwordErrorBox").removeClass("hide").addClass("show"), passwordVerify()
    }), $(document).on("focus", ".form_control_grp > input.form-control,.form_control_grp select , #forgotPassword input", function(a) {
        $(this).parents(".reg_title_holder").find(".invalid-msg-wrapper").hide(), $(this).next().hide(), $(this).removeClass("parsley-error"), $(this).parent().find(".invalid-msg-wrapper").removeClass("show")
    }), $(document).on("focusout", "#registerPwd", function(a) {
        $(this).siblings(".passwordErrorBox").removeClass("show").addClass("hide")
    }), $(window).on("load", function() {
        $(".main_menu_div .nav-tabs li").removeClass("active"), $(".main_menu_div .tab-content .tab-pane").removeClass("active in")
    }), $(document).on("click", ".main_menu_div .nav-tabs li", function() {
        if ($(window).width() <= 992) {
            var a = $(this).find("a").attr("href"),
                b = a.substring(1, a.length),
                c = $(a).html();
            console.log(b), $(".main_menu_div .tab-content").addClass("hide"), $(".new").remove(), $(this).after('<div class="new"></div>'), $(".new").html(c)
        }
        "+" === $(this).find(".expand_footer_row").html() ? ($(".expand_footer_row").html("+"), $(this).find(".expand_footer_row").html("-")) : "-" === $(this).find(".expand_footer_row").html() && $(this).find(".expand_footer_row").html("+")
    }), $(document).on("click", ".main_menu_div .nav-tabs li.active", function() {
        $(this).removeClass("active"), $(".main_menu_div .tab-content .tab-pane.active").removeClass("active in"), $(window).width() <= 992 && $(this).next(".new").remove()
    }), $(document).on("click", "#otpSign", function() {
        $("#otpdiv").removeClass("hide"), $("#pswddiv").addClass("hide"), $("#sendOTP").parent(".form_control_grp").removeClass("hide")
    }), $(document).on("click", "#newsletterSubmit", function() {
        var a = newsletter();
        if (a) {
            console.log(a + "Now Submit");
            var b = intializeParams();
            b.url = "tcCommonRS/subscribe/email/" + $("#subscriberEmail").val(), b.requestType = "POST", b.successCallbackFunction = "subscriptionSuccess", b.errorCallBackFunction = "subscriptionError", doAjax(b)
        } else console.log(a + "Please fix")
    }), $(window).on("load", function() {
        $(document).on("focus", "#feedCity", function() {
            var a;
            void 0 != localStorage.getItem("cityList") && null != localStorage.getItem("cityList") && "" != localStorage.getItem("cityList") ? a = JSON.parse(localStorage.getItem("cityList")) : $.getJSON(aurl + "tcCommonRS/profile.autosuggest/state.city", function(b) {
                localStorage.setItem("cityList", JSON.stringify(b)), a = b
            }), 0 == cityList.length && $.each(a, function(a, b) {
                cityList.push(b.cityName)
            }), $("#feedCity").autocomplete({
                source: cityList,
                appendTo: $("#feedCity").parent(),
                minLength: 3,
                select: function(a, b) {
                    var c = (b.item.label, b.item.value);
                    $(this).attr("data-value", c)
                },
                response: function(a, b) {
                    if (!b.content.length) {
                        var c = {
                            value: "",
                            label: "No results found"
                        };
                        b.content.push(c)
                    }
                }
            })
        }), $("#feedTravelDate").datepicker({
            numberOfMonths: 1,
            changeMonth: !0,
            changeYear: !0,
            yearRange: "0:+1",
            minDate: dateToday,
            dateFormat: "dd-mm-yy"
        }), $(".feedcal-Icon").on("click", function() {
            $(this).siblings(".form-control").datepicker("show")
        }), $(".campaign-datepicker").datepicker({
            numberOfMonths: 1,
            changeMonth: !0,
            changeYear: !0,
            minDate: dateToday,
            dateFormat: "dd-mm-yy"
        }), $(".feedcal-Icon").on("click", function() {
            $(this).siblings(".form-control").datepicker("show")
        }), $(window).width() < 767 && $(".EnquiryIcon").click(function() {
            var a = $(".feed-backClick").parent().find("#feed-back").is(":visible");
            a ? ($(".remove").hide(), $("#feed-back").hide(500), $("#form-feedback").find(".form-control").val(""), $("#form-feedback").find(".form-control").removeClass("parsley-error"), $("#form-feedback").find("#bs-callout-warning").hide(), $("#form-feedback").find(".field-error").html("")) : ($(".remove").show(), $("#feed-back").show(500))
        })
    }), $(document).on("click", '#loginRegisterPopup [data-dismiss="modal"]', function(a) {
        $(this).parents(".modal-content").find("form").trigger("reset"), $(this).parents(".modal-content").find("form .parsley-error").removeClass("parsley-error"), $(this).parents(".modal-content").find("form .invalid-msg-content").hide()
    }), $(document).on("hidden.bs.modal", "#loginRegisterPopup", function() {
        $("#loginRegisterPopup").find("form").trigger("reset"), $("#loginRegisterPopup").find("form .parsley-error").removeClass("parsley-error"), $("#loginRegisterPopup").find("form .invalid-msg-content").hide()
    }), $(window).on("load", function() {
        $("#number_Save").click(function() {
            var a = click2CallMobileValidation();
            return a ? void 0 : !1
        });
        var a = getCookie("cp");
        a || (uisetCookie("cp", "Y"), $("#showCookeiPolicy").removeClass("hide"))
    }), $(document).on("click", "#showCookeiPolicyCloce,.showCookeiPolicy", function() {
        $("#showCookeiPolicy").addClass("hide"), $("body").removeClass("showCookeiPolicy")
    });