function subCategory(a) {
    var b = "",
        c = 0,
        d = 0;
    if (void 0 !== a)
        for (var e = 0; e < a.length; e++) {
            3 * c === d && (c++, b += '<div class="row pm0 subCategory">'), d++;
            var f = repSpaceWS(a[e].name);
            b += '<div class="col-lg-4 col-xs-12 col-md-4 col-sm-4 things-pack marbot10">', b += '<div class="border_gray photos_to_do_border_gray">', b += void 0 !== a[e].imagePath && "" !== a[e].imagePath ? '<div class="col-lg-12 no-padding"><a href="' + url + "/" + f + "/" + a[e].sightseeingId + '"><img src="' + imageURL + "/holidays/sightSeeing/" + a[e].imagePath + '" title="' + a[e].imageAltTag + '" class="img-responsive"></a></div>' : '<div class="col-lg-12 no-padding"><a href="' + url + "/" + f + "/" + a[e].sightseeingId + '"><img src="' + imageURL + '/holidays/staticPage/no-images.jpg" class="img-responsive"></div>', b += '<div class="col-lg-12 padd10">', b += '<a href="' + url + "/" + f + "/" + a[e].sightseeingId + '"><h2>' + a[e].name + "</h2></a>", b += "</div>", b += '<div class="col-lg-12 padd10 counter_data_thing_to_do">', b += '<div class="text-justify bdr-top">' + a[e].description + "</div>", b += "</div>", b += '<span class="read_more text-right"><a href="' + url + "/" + f + "/" + a[e].sightseeingId + '">View Details</a></span>', b += "</div>", b += "</div>", 3 * c !== d && e !== a.length - 1 || (b += "</div>")
        }
    $("#subCategory_" + catId).empty().append(b)
}

function sightseeingChange() {
    var a = $("#innerCategory").find(".active-things").attr("id"),
        b = a.replace("tab", ""),
        c = document.getElementById("feedProducts" + b),
        d = c.options[c.selectedIndex].value,
        e = $("#" + a).find(".subtxt").empty().append();
    catId = 0, subCatId = 0;
    for (var f = 0; f < category.length; f++)
        if (category[f].categoryName === e && (catId = category[f].catId, category[f].sightseeingSubcatName === d)) {
            subCatId = category[f].sightseeingSubCategory;
            break
        }
    console.log("cat", e, "subCatId", subCatId);
    var g = intializeParams();
    g.requestType = "GET", g.url = "tcStaticPages/staticPage/subCategory/" + catId + "/" + subCatId, g.cache = !0, g.async = !1, g.successCallbackFunction = "subCategory", doAjax(g)
}

function IsEmail(a) {
    var b = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return b.test(a)
}

function IsWhiteSpace(a) {
    var b = /^[^\s]/;
    return b.test(a)
}

function formSubmitMethod() {
    var a = !0,
        b = $("#staticPagemobile").val(),
        c = $("#staticPageemail").val();
    return "" == $("#holidayType").val() ? ($("#holidayType").addClass("parsley-error"), $("#holidayType").parent().find(".errorName").show(), a = !1) : ($("#holidayType").removeClass("parsley-error"), $("#holidayType").parent().find(".errorName").hide()), "" == $("#selectDestination").val() ? ($("#selectDestination").addClass("parsley-error"), $("#selectDestination").parent().find(".errorName").show(), a = !1) : ($("#selectDestination").removeClass("parsley-error"), $("#selectDestination").parent().find(".errorName").hide()), "" == $("#selectHub").val() ? ($("#selectHub").addClass("parsley-error"), $("#selectHub").parent().find(".errorName").show(), a = !1) : ($("#selectHub").removeClass("parsley-error"), $("#selectHub").parent().find(".errorName").hide()), "" == b || isNaN(b) || 10 != b.length || "9" != b.charAt(0) && "8" != b.charAt(0) && "7" != b.charAt(0) ? ($("#staticPagemobile").addClass("parsley-error"), $("#staticPagemobile").parent().find(".errorName").show(), a = !1) : ($("#staticPagemobile").removeClass("parsley-error"), $("#staticPagemobile").parent().find(".errorName").hide()), "" == c || "youremail@domain.com" == c || "xyz@abc.com" == c ? ($("#staticPageemail").addClass("parsley-error"), $("#staticPageemail").parent().find(".errorName").show(), a = !1) : IsEmail(c) ? ($("#staticPageemail").removeClass("parsley-error"), $("#staticPageemail").parent().find(".errorName").hide()) : ($("#staticPageemail").addClass("parsley-error"), $("#staticPageemail").parent().find(".errorName").show(), a = !1), a
}

function myFunction_retealert() {
    $(".QueriesForm").find("form")[0].reset()
}

function getSrpUrl() {
    redirectURL = repSpaceWS(redirectURL), window.location.href = window.location.origin + "/" + redirectURL
}

function forexVisaChild(a) {
    if (void 0 !== a && a.length > 0)
        for (var b = 0; b < a.length; b++) void 0 !== a[b].bannerUrl && "" != a[b].bannerUrl && void 0 !== a[b].bannerName && "" != a[b].bannerName ? links += '<li class="hidden-xs mobVisible text-capitalize"><a href="' + a[b].bannerUrl + '" onclick="window.location.reload()";>' + a[b].bannerName + "</a></li>" : void 0 !== a[b].bannerName && "" != a[b].bannerName && (links += '<li class="hidden-xs mobVisible text-capitalize">' + a[b].bannerName + "</li>")
}

function largeMap(a) {
    "IN" == a.countryCode.toUpperCase().trim() ? (tourism = "india-tourism", redirectURL = "holidays/india-tour-packages/" + destName + "-tour-packages") : (tourism = "international-tourism", redirectURL = "holidays/international-tour-packages/" + destName + "-tour-packages")
}

function isPresentChild(a) {
    if (page.indexOf("places-to-visit") > -1 && "Y" == a.isThingsToDo ? links += '<li class="liactiveTab text-capitalize">Places To Visit in ' + destName + "</li>" : "Y" == a.isThingsToDo && (links += '<li class="text-capitalize"><a href="' + envi + "/" + tourism + "/" + destN + "-tourism/places-to-visit-in-" + destN + '" onclick="window.location.reload()">Places To Visit in ' + destName + "</a></li>"), page.indexOf("best-time-to-visit") > -1 && "Y" == a.isBestTimeToVisit ? links += '<li class="liactiveTab text-capitalize">Best Time To Visit ' + destName + "</li>" : "Y" == a.isBestTimeToVisit && (links += '<li class="text-capitalize"><a href="' + envi + "/" + tourism + "/" + destN + "-tourism/best-time-to-visit-" + destN + '" onclick="window.location.reload()");>Best Time To Visit ' + destName + "</a></li>"), links += '<a class="more-links visible-xs">More Links</a>', page.indexOf("how-to-reach") > -1 && "Y" == a.isHowToReach ? links += '<li class="liactiveTab hidden-xs mobVisible text-capitalize">How To Reach ' + destName + "</li>" : "Y" == a.isHowToReach && (links += '<li class="hidden-xs mobVisible text-capitalize"><a href="' + envi + "/" + tourism + "/" + destN + "-tourism/how-to-reach-" + destN + '" onclick="window.location.reload()";>How To Reach ' + destName + "</a></li>"), page.indexOf("photo-video-gallery") > -1 && "Y" == a.isPhotoGallery ? links += '<li class="liactiveTab hidden-xs mobVisible text-capitalize">Photos & Videos of ' + destName + "</li>" : "Y" == a.isPhotoGallery && (links += '<li class="hidden-xs mobVisible text-capitalize"><a href="' + envi + "/" + tourism + "/" + destN + "-tourism/" + destN + '-photo-video-gallery" onclick="window.location.reload()";>Photos & Videos of ' + destName + "</a></li>"), page.indexOf("faqs") > -1 && "Y" == a.isFaq ? links += '<li class="liactiveTab hidden-xs mobVisible text-capitalize">' + destName + " FAQs</li>" : "Y" == a.isFaq && (links += '<li class="hidden-xs mobVisible text-capitalize"><a href="' + envi + "/" + tourism + "/" + destN + "-tourism/" + destN + '-faqs" onclick="window.location.reload()";>' + destName + " FAQs</a></li>"), links += '<li class="hidden-xs mobVisible text-capitalize"><a href="javascript:;" onclick="getSrpUrl();">' + destName + " Packages</a></li>", links += '<li class="hidden-xs mobVisible text-capitalize"><a href="' + envi + "/" + tourism + "/" + destN + '-tourism" >About ' + destName + "</a></li>", "Y" == a.isForexVisa) {
        var b = intializeParams();
        b.requestType = "GET", b.url = "tcStaticPages/staticPage/tourism/" + destName, b.cache = !1, b.async = !1, b.successCallbackFunction = "forexVisaChild", doAjax(b)
    }
    links += '<a class="less-links hidden-xs hidden-lg hidden-md hidden-sm">Less</a>', $("#links").empty().append(links)
}

function crm(a) {
    myFunction_retealert()
}

function afterLoad() {
    var a = intializeParams();
    if (a.requestType = "GET", a.url = "tcStaticPages/staticPage/map/" + destName, a.cache = !1, a.async = !1, a.successCallbackFunction = "largeMap", doAjax(a), allOSB = document.getElementsByClassName("more_all_big_static"), allOSB.length > 0) {
        mxh = window.getComputedStyle(allOSB[0]).getPropertyValue("max-height"), mxh = parseInt(mxh.replace("px", ""));
        for (var b = 0; b < allOSB.length; b++) {
            var c = document.createElement("button");
            c.innerHTML = "Read More", c.setAttribute("type", "button"), c.setAttribute("class", "read_more_static hid_static"), insertAfter(allOSB[b], c)
        }
    }
    for (var d = document.getElementsByClassName("read_more_static"), b = 0; b < d.length; b++) d[b].addEventListener("click", function() {
        revealThis(this)
    }, !1);
    var e = "";
    if (url.split("/").length <= 6) {
        e += "<li>Also See</li>";
        var a = intializeParams();
        a.requestType = "GET", a.url = "tcStaticPages/staticPage/isPresent/" + destName, a.cache = !1, a.async = !1, a.successCallbackFunction = "isPresentChild", doAjax(a)
    }
    updateReadMore();
    var f = "UA-87247820-1",
        g = g || [];
    g.push(["_setAccount", f]), g.push(["_trackPageview"]),
        function() {
            var a = document.createElement("script");
            a.type = "text/javascript", a.async = !0, a.src = ("https:" == document.location.protocol ? "https://" : "http://") + "stats.g.doubleclick.net/dc.js";
            var b = document.getElementsByTagName("script")[0];
            b.parentNode.insertBefore(a, b)
        }(),
        function(a, b, c, d, e) {
            a[d] = a[d] || [], a[d].push({
                "gtm.start": (new Date).getTime(),
                event: "gtm.js"
            });
            var f = b.getElementsByTagName(c)[0],
                g = b.createElement(c),
                h = "dataLayer" != d ? "&l=" + d : "";
            g.async = !0, g.src = "//www.googletagmanager.com/gtm.js?id=" + e + h, f.parentNode.insertBefore(g, f)
        }(window, document, "script", "dataLayer", "GTM-MH846T");
    var h = $("div.readmore_static");
    $(document).on("click", "a.more", h, function() {
        event.preventDefault(), $(this).hide().prev().hide(), $(this).parents(".readmore_static").find("div").show()
    }), $(document).on("click", "a.less", h, function() {
        event.preventDefault(), $(this).parents(".readmore_static").find(".more").show(), $(this).parent().hide().prev().show().prev().show()
    }), $(document).on("click", ".more-links", function() {
        $("li").removeClass("hidden-xs"), $(".more-links").addClass("hidden-xs"), $(".less-links").removeClass("hidden-xs")
    }), $(document).on("click", ".less-links", function() {
        $("li.mobVisible").addClass("hidden-xs"), $(".more-links").removeClass("hidden-xs"), $(".less-links").addClass("hidden-xs")
    }), $(document).ready(function() {
        $(document).on("click", "#Staticsubmit", function() {
            $("#Staticsubmit").addClass("loading");
            var a = formSubmitMethod();
            if (!a) return $("#Staticsubmit").removeClass("loading"), console.log("form having error ROHIT 3Page"), !1;
            var b = "";
            b += '<span class="close-query">&times;</span>', b += "<h4>Thank you for getting in touch! </h4>", b += "<p>We appreciate that you've taken the </p>", b += "<p>time to write us. We'll get back to you </p>", b += "<p>very soon!</p>", $("#inner-box").empty().append(b), $("#inner-box").css("display", "block"), $("#Staticsubmit").removeClass("loading");
            var c = repWSpace(destN);
            if (null != sessionStorage.getItem("deviceType")) var d = sessionStorage.getItem("deviceType");
            var e = {};
            e.utmParam = getGACampaignCodesnew(), e.name = $("#staticPagename").val(), e.email = $("#staticPageemail").val(), e.mobile = $("#staticPagemobile").val(), e.holidayType = $("#holidayType").val(), e.destination = $("#selectDestination").val(), e.hub = $("#selectHub").val(), e.destName = c + " tourism", e.product = "", e.packageId = "", e.opp_summary = "", e.deviceType = d, e.pagename = (window.location.pathname + window.location.search.replace(/&/g, "?")).substring(0, 254);
            var f = localStorage.getItem("geoCords");
            void 0 !== f && null !== f && "" !== f && (e.geoCords = f);
            var g = intializeParams();
            g.requestType = "POST", g.url = "tcStaticPages/staticPage/crm", g.cache = !1, g.async = !0, g.data = JSON.stringify(e), g.successCallbackFunction = "crm", doAjax(g)
        })
    })
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
    var a = "";
    if (null != readCookie("__utmz") || void 0 != readCookie("__utmz")) {
        var b = readCookie("__utmz");
        a = function() {
            var a = b.split(".").slice(4).join(".");
            return a = a.replace(/\|/g, "&")
        }()
    }
    return a
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

function destinationOnHoliday() {
    var a = "";
    a = "DOM" === $("#holidayType").val() ? '<option value="">Select Holidays</option><option value="Kashmir">Kashmir</option><option value="Ladakh">Ladakh</option><option value="North East">North East</option><option value="Himachal">Himachal</option><option value="Goa">Goa</option><option value="Andaman">Andaman</option><option value="Kerela">Kerela</option><option value="Sri Lanka">Sri Lanka</option><option value="Bhutan">Bhutan</option><option value="Rajasthan">Rajasthan</option><option value="Nepal">Nepal</option><option value="Gujrat">Gujrat</option><option value="Uttaranchal">Uttaranchal</option><option value="Tibet">Tibet</option><option value="Maldives">Maldives</option><option value="Others">Other</option>' : '<option value="">Select Holidays</option><option value="Europe">Europe</option><option value="Americas">Americas</option><option value="Africa">Africa</option><option value="Aus/NZ">Aus/NZ</option><option value="South America">South America</option><option value="Asia">Asia</option><option value="Thailand">Thailand</option><option value="Dubai">Dubai</option><option value="Singapore">Singapore</option><option value="Malaysia">Malaysia</option><option value="Mauritius">Mauritius</option><option value="Turkey">Turkey</option><option value="Bali">Bali</option><option value="Hongkong/Macau">Hongkong/Macau</option><option value="Others">Other</option>', $("#selectDestination").empty().append(a)
}

function repWSpace(a) {
    return a.replace(/-/g, " ")
}
var url = window.location.href;
url.indexOf("webcache.googleusercontent.com") > -1 && (url = "https://www." + decodeURIComponent(url.split("www.")[1].split("&")[0]));
var catId = 0,
    subCatId = 0,
    destNa = url.split("/")[url.split("/").length - 2],
    destN = destNa.substring(0, destNa.indexOf("tourism") - 1),
    destName = repWSpace(destN),
    SubCatTabs = [],
    SubCatDisplay = -1,
    tab = $("#innerCategory").find(".active-things").attr("id"),
    url = window.location.href;
url.indexOf("webcache.googleusercontent.com") > -1 && (url = "https://www." + decodeURIComponent(url.split("www.")[1].split("&")[0]));
var dest2 = url.split("/"),
    page = dest2[dest2.length - 1],
    destN = "",
    links = "",
    envi = window.location.origin;
destNa = page.indexOf("-tourism") > -1 ? dest2[dest2.length - 1] : page.indexOf("places-to-visit") > -1 || page.indexOf("best-time") > -1 || page.indexOf("how-to-reach") > -1 || page.indexOf("faq") > -1 || page.indexOf("photo-video") > -1 ? dest2[dest2.length - 2] : dest2[dest2.length - 4];
var num = destNa.indexOf("tourism");
destN = destNa.substring(0, num - 1), destName = repWSpace(destN);
var tourism = "",
    redirectURL = "",
    alphabetCheck = /^[a-zA-Z ]+$/,
    specialChar = /^[a-zA-Z0-9- ]*$/,
    onlyDigit = /^\d{6}$/,
    onlytowDigit = /^\d{2}$/,
    page = url.split("/")[url.split("/").length - 1];
window.addEventListener("load", afterLoad(), !1), window.onresize = function() {
    updateReadMore()
}, $(document).on("click", ".close-query", function() {
    $("#inner-box").hide(), $(".QueriesForm").find("form")[0].reset()
});