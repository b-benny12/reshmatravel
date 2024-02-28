function commonPage(a) {
    if (console.log("TEST- DDD"), a.recommendedPackagesVO.length > 0) {
        var b = 0;
        b = a.recommendedPackagesVO.length <= 12 ? a.recommendedPackagesVO.length : 8;
        for (var c = "", d = [], e = 0; b > e; e++) {
            d = a.recommendedPackagesVO[e].startingPrice.split(".");
            var f = repSpaceWS(a.recommendedPackagesVO[e].pkgName),
                g = "";
            g = url.indexOf("international") > -1 ? "international-tour-packages" : "india-tour-packages", c += '<li class="placedetailblk"><div class="col-lg-12 col-xs-12 col-md-12 col-sm-12"><div class="border_gray">', dest[dest.length - 1].indexOf("places-to-visit-in-") > -1 ? destN = dest[dest.length - 1].replace("places-to-visit-in-", "") : dest[dest.length - 1].indexOf("best-time-to-visit-") > -1 ? destN = dest[dest.length - 1].replace("best-time-to-visit-", "") : dest[dest.length - 1].indexOf("how-to-reach-") > -1 ? destN = dest[dest.length - 1].replace("how-to-reach-", "") : dest[dest.length - 1].indexOf("-photo-video-gallery") > -1 ? destN = dest[dest.length - 1].replace("-photo-video-gallery", "") : dest[dest.length - 1].indexOf("-faqs") > -1 && (destN = dest[dest.length - 1].replace("-faqs", "")), destName = destN, c += '<a href="' + window.location.origin + "/holidays/" + g + "/" + destN + "-tour-packages/" + repSpaceWS(f) + "?pkgId=" + a.recommendedPackagesVO[e].packageId + '" target="_blank">', "" === a.recommendedPackagesVO[e].packageThumbnailImage || void 0 === a.recommendedPackagesVO[e].packageThumbnailImage ? c += '<div class="col-lg-12 no-padding"><img src="' + imageURL + '/holidays/staticPage/no-images.jpg" alt="' + a.recommendedPackagesVO[e].pkgName + '" class="img-responsive" title="' + a.recommendedPackagesVO[e].pkgName + '"/></div>' : void 0 !== a.recommendedPackagesVO[e].packageThumbnailImage && "" != a.recommendedPackagesVO[e].packageThumbnailImage && (c += '<div class="col-lg-12 no-padding"><img src="' + imageURL + "/holidays/" + a.recommendedPackagesVO[e].packageId + "/" + imageRepSpace(a.recommendedPackagesVO[e].packageThumbnailImage) + '" alt="' + a.recommendedPackagesVO[e].pkgName + '" title="' + a.recommendedPackagesVO[e].pkgName + '" class="img-responsive"/></div>'), c += '<div class="col-lg-12 padd10 tc_recomend"><h2>' + a.recommendedPackagesVO[e].pkgName + "</h2></div>", c += 1 == a.recommendedPackagesVO[e].pkgSubtypeId || 3 == a.recommendedPackagesVO[e].pkgSubtypeId ? '<div class="col-lg-12 padd10"><p class="bdr-top">Group Holidays</p>' : '<div class="col-lg-12 padd10"><p class="bdr-top">Customized Holidays</p>', c += '<div class="tour_inclusive pdp_details_srp_data"><ul>', "Y" === a.recommendedPackagesVO[e].isFlightIncluded && (c += '<li class="bg-icon1">', c += '<span class="flight-txt">Flight</span>', "2" === a.recommendedPackagesVO[e].holidayPlusSubType && (c += '<span class="optional">optional</span>'), c += "</li>"), "N" === a.recommendedPackagesVO[e].isFlightIncluded && (c += '<li class="bg-icon1 no_available_data_click_pdp_li"></li>'), void 0 !== a.recommendedPackagesVO[e].category && null !== a.recommendedPackagesVO[e].category && "" != a.recommendedPackagesVO[e].category ? a.recommendedPackagesVO[e].category.indexOf("Accommodation") > -1 && (c += '<li class="bg-icon2">', c += '<span class="hotel-txt">Hotel</span>', c += "</li>") : "Y" === a.recommendedPackagesVO[e].isHotelIncluded ? (c += '<li class="bg-icon2">', c += '<span class="hotel-txt">Hotel</span>', c += "</li>") : "N" === a.recommendedPackagesVO[e].isHotelIncluded && (c += '<li class="bg-icon2 no_available_data_click_pdp_li"></li>'), void 0 !== a.recommendedPackagesVO[e].category && null !== a.recommendedPackagesVO[e].category && "" != a.recommendedPackagesVO[e].category ? a.recommendedPackagesVO[e].category.indexOf("Sightseeing") > -1 && (c += '<li class="bg-icon3">', c += '<span class="sightseeing-txt">Sightseeing</span>', c += "</li>") : "Y" === a.recommendedPackagesVO[e].isSightseeingIncluded ? (c += '<li class="bg-icon3">', c += '<span class="sightseeing-txt">Sightseeing</span>', c += "</li>") : "N" === a.recommendedPackagesVO[e].isSightseeingIncluded && (c += '<li class="bg-icon3 no_available_data_click_pdp_li"></li>'), void 0 !== a.recommendedPackagesVO[e].category && null !== a.recommendedPackagesVO[e].category && "" != a.recommendedPackagesVO[e].category ? a.recommendedPackagesVO[e].category.indexOf("Transfer") > -1 && (c += '<li class="bg-icon4">', c += '<span class="transfer-txt">Transfer</span>', c += "</li>") : "Y" === a.recommendedPackagesVO[e].isTransferIncluded ? (c += '<li class="bg-icon4">', c += '<span class="transfer-txt">Transfer</span>', c += "</li>") : "N" === a.recommendedPackagesVO[e].isTransferIncluded && (c += '<li class="bg-icon4 no_available_data_click_pdp_li"></li>'), void 0 !== a.recommendedPackagesVO[e].category && null !== a.recommendedPackagesVO[e].category && "" != a.recommendedPackagesVO[e].category ? a.recommendedPackagesVO[e].category.indexOf("Visa") > -1 && (c += '<li class="bg-icon5">', c += '<span class="visa-txt">Visa</span>', c += "</li>") : "Y" === a.recommendedPackagesVO[e].isVisaIncluded ? (c += '<li class="bg-icon5">', c += '<span class="visa-txt">Visa</span>', c += "</li>") : "N" === a.recommendedPackagesVO[e].isVisaIncluded && (c += '<li class="bg-icon5 no_available_data_click_pdp_li"></li>'), void 0 !== a.recommendedPackagesVO[e].category && null !== a.recommendedPackagesVO[e].category && "" != a.recommendedPackagesVO[e].category ? a.recommendedPackagesVO[e].category.indexOf("Meal") > -1 && (c += '<li class="bg-icon6">', c += '<span class="meals-txt">Meals</span>', c += "</li>") : "Y" === a.recommendedPackagesVO[e].isMealsIncluded ? (c += '<li class="bg-icon6">', c += '<span class="meals-txt">Meals</span>', c += "</li>") : "N" === a.recommendedPackagesVO[e].isMealsIncluded && (c += '<li class="bg-icon6 no_available_data_click_pdp_li"></li>'), c += "</ul></div>", c += "</div>", c += '<div class="col-lg-12 padd10 margin10">\n<div class="col-md-12 col-xs-12 no-padding text-left text_skyblue font22" style="display:block;">\n<span class="price">Starting From</span><span>&#8377;</span><span class="holiday-amt">' + currencyFormate(d[0]) + '</span><span class=""></span>\n</div><div class="col-md-5 col-xs-6 no-padding"><div class="package-box">\n<a href="' + window.location.origin + "/holidays/" + g + "/" + destN + "-tour-packages/" + repSpaceWS(f) + "?pkgId=" + a.recommendedPackagesVO[e].packageId + '" target="_blank">Book Now</a>\n</div></div></div></div></a></div></li>'
        }
        $("#recommendedHolidays").empty().append(c);
        var h = $(".jcarousel");
        h.on("jcarousel:reload jcarousel:create", function() {
            var a = $(this),
                b = a.innerWidth();
            b >= 600 ? b /= 4 : b >= 350 && (b /= 2), a.jcarousel("items").css("width", Math.ceil(b) + "px")
        }).jcarousel({
            wrap: "circular"
        }), $(".jcarousel").jcarousel("reload")
    } else $("#Recommend").hide(), $(".PhotoGallery").addClass("hide");
    var i = 0;
    $("#recommendedHolidays li").each(function(a) {
        var b = $(".border_gray").eq(a).height();
        b > i && (i = b)
    }), $(".border_gray").height(i);
    var j = 0;
    $("#recommendedHolidays li").each(function(a) {
        var b = $("#recommendedHolidays .border_gray img").eq(a).height();
        b > j && (j = b)
    }), $("#recommendedHolidays .border_gray img").height(j)
}

function bannerFunction(a) {
    var b = "",
        c = !1;
    if (void 0 !== a)
        for (var d = 0; d < a.length; d++) void 0 !== a[d].position && 0 !== a[d].position && void 0 !== a[d].imagePath && "" != a[d].imagePath && (c = !0, 0 === d || 0 === a[0].position && 1 === d ? (void 0 !== a[d].bannerUrl && "" !== a[d].bannerUrl && (b += '<a href="' + a[d].bannerUrl + '" class="carousel-item active" target="_blank">'), b += '<div class="bannerbgImages activenoo" title= "' + a[d].imageAltTag + '" style="background:url(' + imageURL + "/holidays/staticPage/Banner/" + a[d].imagePath + ') no-repeat center center;background-size: cover;">') : (void 0 !== a[d].bannerUrl && "" !== a[d].bannerUrl && (b += '<a href="' + a[d].bannerUrl + '" class="carousel-item" target="_blank">'), b += '<div class="bannerbgImages activenoo" title= "' + a[d].imageAltTag + '" style="background:url(' + imageURL + "/holidays/staticPage/Banner/" + a[d].imagePath + ') no-repeat center center;background-size: cover;">'), b += "</div>", void 0 !== a[d].bannerUrl && "" !== a[d].bannerUrl && (b += "</a>"));
    c === !1 && (b += url.indexOf("india-tourism") > -1 ? '<div class="item active" title= "Himachal" style="background:url(/images/holiday/sotc-static/himachal-main.jpg) no-repeat center center;background-size: cover;">' : '<div class="item active" title= "Maldives" style="background:url(/images/holiday/sotc-static/malvides1-main.jpg) no-repeat center center;background-size: cover;">'), $("#banner").empty().append(b)
}

function popularFunc(a) {
    var b = "",
        c = "",
        d = "",
        e = "",
        f = "",
        g = "";
    if (void 0 !== a)
        for (var h = 0; h < a.length; h++) void 0 !== a[h].displayName && "" != a[h].displayName && (1 == a[h].headerPosition && (void 0 !== a[h].header && "" != a[h].header && (e = a[h].header), b += void 0 !== a[h].link && "" != a[h].link ? '<li><a href="' + a[h].link + '">' + a[h].displayName + "</a></li>" : "<li>" + a[h].displayName + "</li>"), 2 == a[h].headerPosition && (void 0 !== a[h].header && "" != a[h].header && (f = a[h].header), c += void 0 !== a[h].link && "" != a[h].link ? '<li><a href="' + a[h].link + '">' + a[h].displayName + "</a></li>" : "<li>" + a[h].displayName + "</li>"), 3 == a[h].headerPosition && (void 0 !== a[h].header && "" != a[h].header && (g = a[h].header), d += void 0 !== a[h].link && "" != a[h].link ? '<li><a href="' + a[h].link + '">' + a[h].displayName + "</a></li>" : "<li>" + a[h].displayName + "</li>"));
    "" == f && (f = "Popular Tourism Destinations"), url.indexOf("india-tourism") > -1 ? ("" == e && (e = "India Honeymoon Packages"), "" == g && (g = "Most Trending India Holidays"), "" == b && (b += '<li><a href="/holidays/honeymoon-packages-india/andaman-honeymoon-packages" alt="Honeymoon Packages in Andaman" title="Andaman Honeymoon Packages" target="_blank">Honeymoon Packages in Andaman</a></li>', b += '<li><a href="/holidays/honeymoon-packages-india/goa-honeymoon-packages" alt="Honeymoon Packages in Goa" title="Goa Honeymoon Packages" target="_blank">Honeymoon Packages in Goa</a></li>', b += '<li><a href="/holidays/honeymoon-packages-india/himachal-honeymoon-packages" alt="Honeymoon Packages in Himachal Pradesh" title="Himachal Pradesh Honeymoon Packages" target="_blank">Honeymoon Packages in Himachal</a></li>', b += '<li><a href="/holidays/honeymoon-packages-india/kashmir-honeymoon-packages" alt="Honeymoon Packages in Kashmir" title="Kashmir Honeymoon Packages" target="_blank">Honeymoon Packages in Kashmir</a></li>', b += '<li><a href="/holidays/honeymoon-packages-india/kerala-honeymoon-packages" alt="Honeymoon Packages in Kerala" title="Kerala Honeymoon Packages" target="_blank">Honeymoon Packages in Kerala</a></li>', b += '<li><a href="/holidays/honeymoon-packages-india/ladakh-honeymoon-packages" alt="Honeymoon Packages in Ladakh" title="Ladakh Honeymoon Packages" target="_blank">Honeymoon Packages in Ladakh</a></li>', b += '<li><a href="/holidays/honeymoon-packages-india/manali-honeymoon-packages" alt="Honeymoon Packages in Manali" title="Manali Honeymoon Packages" target="_blank">Honeymoon Packages in Manali</a></li>', b += '<li><a href="/holidays/honeymoon-packages-india/ooty-honeymoon-packages" alt="Honeymoon Packages in Ooty" title="Ooty Honeymoon Packages" target="_blank">Honeymoon Packages in Ooty</a></li>'), "" == c && (c += '<li><a href="/india-tourism" alt="Tourism in India" title="India Tourism" target="_blank">Tourism in India</a></li>', c += '<li><a href="/india-tourism/kerala" alt="Tourism in Kerala" title="Kerala Tourism" target="_blank">Tourism in Kerala</a></li>', c += '<li><a href="/india-tourism/andaman-and-nicobar" alt="Tourism in Andaman" title="Andaman Tourism" target="_blank">Tourism in Andaman</a></li>', c += '<li><a href="/india-tourism/goa" alt="Tourism in Goa" title="Goa Tourism" target="_blank">Tourism in Goa</a></li>', c += '<li><a href="/india-tourism/ladakh" alt="Tourism in Ladakh" title="Ladakh Tourism" target="_blank">Tourism in Ladakh</a></li>', c += '<li><a href="/india-tourism/himachal-pradesh" alt="Tourism in Himachal" title="Himachal Tourism" target="_blank">Tourism in Himachal</a></li>', c += '<li><a href="/india-tourism/rajasthan" alt="Tourism in Rajasthan" title="Rajasthan Tourism" target="_blank">Tourism in Rajasthan</a></li>', c += '<li><a href="/india-tourism/north-east" alt="Tourism in North East" title="North East Tourism" target="_blank">Tourism in North East</a></li>'), "" == d && (d += '<li><a href="/holidays/india-tour-packages/andaman-and-nicobar-tour-packages" alt="Andaman Packages" title="Andaman Tour Packages" target="_blank">Andaman Packages</a></li>', d += '<li><a href="/holidays/india-tour-packages/goa-tour-packages" alt="Goa Packages" title="Goa Tour Packages" target="_blank">Goa Packages</a></li>', d += '<li><a href="/holidays/india-tour-packages/kerala-tour-packages" alt="Kerala Packages" title="Kerala Tour Packages" target="_blank">Kerala Packages</a></li>', d += '<li><a href="/holidays/india-tour-packages/himachal-pradesh-tour-packages" alt="Himachal Pradesh Packages" title="Himachal Pradesh Tour Packages" target="_blank">Himachal Packages</a></li>', d += '<li><a href="/holidays/india-tour-packages/kashmir-tour-packages" alt="Kashmir Packages" title="Kashmir Tour Packages" target="_blank">Kashmir Packages</a></li>', d += '<li><a href="/holidays/india-tour-packages/sri-lanka-tour-packages" alt="Sri Lanka Packages" title="Sri Lanka Tour Packages" target="_blank">Sri Lanka Packages</a></li>', d += '<li><a href="/holidays/india-tour-packages/north-east-tour-packages" alt="North East Packages" title="North East Tour Packages" target="_blank">North East Packages</a></li>', d += '<li><a href="/holidays/india-tour-packages/uttarakhand-tour-packages" alt="Uttarakhand Packages" title="Uttarakhand Tour Packages" target="_blank">Uttarakhand Packages</a></li>')) : url.indexOf("international-tourism") > -1 && ("" == e && (e = "International Honeymoon Packages"), "" == g && (g = "Most Trending International Holidays"), "" == b && (b += '<li><a href="holidays/international-honeymoon-packages/switzerland-honeymoon-packages" alt="Honeymoon Packages in Switzerland" title="Switzerland Honeymoon Packages" target="_blank">Honeymoon Packages in Switzerland</a></li>', b += '<li><a href="/holidays/international-honeymoon-packages/bali-honeymoon-packages" alt="Honeymoon Packages in Bali" title="Bali Honeymoon Packages" target="_blank">Honeymoon Packages in Bali</a></li>', b += '<li><a href="/holidays/international-honeymoon-packages/europe-honeymoon-packages" alt="Honeymoon Packages in Europe" title="Europe Honeymoon Packages" target="_blank">Honeymoon Packages in Europe</a></li>', b += '<li><a href="/holidays/international-honeymoon-packages/thailand-honeymoon-packages" alt="Honeymoon Packages in Thailand" title="Thailand Honeymoon Packages" target="_blank">Honeymoon Packages in Thailand</a></li>', b += '<li><a href="/holidays/international-honeymoon-packages/malaysia-honeymoon-packages" alt="Honeymoon Packages in Malaysia" title="Malaysia Honeymoon Packages" target="_blank">Honeymoon Packages in Malaysia</a></li>', b += '<li><a href="/holidays/international-honeymoon-packages/maldives-honeymoon-packages" alt="Honeymoon Packages in Maldives" title="Maldives Honeymoon Packages" target="_blank">Honeymoon Packages in Maldives</a></li>', b += '<li><a href="/holidays/international-honeymoon-packages/mauritius-honeymoon-packages" alt="Honeymoon Packages in Mauritius" title="Mauritius Honeymoon Packages" target="_blank">Honeymoon Packages in Mauritius</a></li>', b += '<li><a href="/holidays/international-honeymoon-packages/singapore-honeymoon-packages" alt="Honeymoon Packages in Singapore" title="Singapore Honeymoon Packages" target="_blank">Honeymoon Packages in Singapore</a></li>'), "" == c && (c += '<li><a href="/international-tourism/europe" alt="Tourism in Europe" title="Europe Tourism" target="_blank">Tourism in Europe</a></li>', c += '<li><a href="/international-tourism/maldives" alt="Tourism in Maldives" title="Maldives Tourism" target="_blank">Tourism in Maldives</a></li>', c += '<li><a href="/international-tourism/africa" alt="Tourism in Africa" title="Africa Tourism" target="_blank">Tourism in Africa</a></li>', c += '<li><a href="/international-tourism/singapore" alt="Tourism in Singapore" title="Singapore Tourism" target="_blank">Tourism in Singapore</a></li>', c += '<li><a href="/international-tourism/thailand" alt="Tourism in Thailand" title="Thailand Tourism" target="_blank">Tourism in Thailand</a></li>', c += '<li><a href="/international-tourism/mauritius" alt="Tourism in Mauritius" title="Mauritius Tourism" target="_blank">Tourism in Mauritius</a></li>', c += '<li><a href="/international-tourism/dubai" alt="Tourism in Dubai" title="Dubai Tourism" target="_blank">Tourism in Dubai</a></li>', c += '<li><a href="/international-tourism/malaysia" alt="Tourism in Malaysia" title="Malaysia Tourism" target="_blank">Tourism in Malaysia</a></li>'), "" == d && (d += '<li><a href="/holidays/international-tour-packages/europe-tour-packages" target="_blank">Europe Packages</a></li>', d += '<li><a href="/holidays/international-tour-packages/dubai-tour-packages" target="_blank">Dubai Packages</a></li>', d += '<li><a href="/holidays/international-tour-packages/malaysia-tour-packages" target="_blank">Malaysia Packages</a></li>', d += '<li><a href="/holidays/international-tour-packages/thailand-tour-packages" target="_blank">Thailand Packages</a></li>', d += '<li><a href="/holidays/international-tour-packages/singapore-tour-packages" target="_blank">Singapore Packages</a></li>', d += '<li><a href="/holidays/international-tour-packages/mauritius-tour-packages" target="_blank">Mauritius Packages</a></li>', d += '<li><a href="/holidays/international-tour-packages/hong-kong-tour-packages" target="_blank">Hong Kong Packages</a></li>', d += '<li><a href="/holidays/international-tour-packages/maldives-tour-packages" target="_blank">Maldives Packages</a></li>')), $("#header1").empty().append(e), $("#header2").empty().append(f), $("#header3").empty().append(g), $("#position1").empty().append(b), $("#position2").empty().append(c), $("#position3").empty().append(d)
}

function repWSpace(a) {
    return a.replace(/-/g, " ")
}

function repSpaceWS(a) {
    a = a.toLowerCase().replace(/[^a-zA-Z0-9/.]/g, "-");
    for (var b = 1, c = 0; b > c; c++) - 1 !== a.indexOf("--") && (a = a.replace("--", "-"), b++);
    return "-" == a.slice(-1) && (a = a.slice(0, -1)), a
}

function repSpace(a) {
    var b = 0;
    a = a.toLowerCase().replace(/[^a-zA-Z0-9.]/g, "-");
    for (var c = 1, d = 0; c > d; d++) - 1 !== a.indexOf("--") && (a = a.replace("--", "-"), c++);
    return 0 === b && ("-" === a.charAt(a.length - 1) && (a = a.slice(0, -1)), b += 1), a
}

function imageRepSpace(a) {
    a = a.replace(/\s+/g, "_");
    for (var b = 1, c = 0; b > c; c++) - 1 !== a.indexOf("--") && (a = a.replace("--", "-"), b++);
    return a
}

function viewMorePack() {
    dest[dest.length - 1].indexOf("places-to-visit-in-") > -1 ? destN = dest[dest.length - 1].replace("places-to-visit-in-", "") : dest[dest.length - 1].indexOf("best-time-to-visit-") > -1 ? destN = dest[dest.length - 1].replace("best-time-to-visit-", "") : dest[dest.length - 1].indexOf("how-to-reach-") > -1 ? destN = dest[dest.length - 1].replace("how-to-reach-", "") : dest[dest.length - 1].indexOf("-photo-video-gallery") > -1 ? destN = dest[dest.length - 1].replace("-photo-video-gallery", "") : dest[dest.length - 1].indexOf("-faqs") > -1 && (destN = dest[dest.length - 1].replace("-faqs", "")), destName = destN;
    var a;
    a = url.indexOf("india") > -1 ? "holidays/india-tour-packages/" + destName + "-tour-packages" : "holidays/international-tour-packages/" + destName + "-tour-packages", a = repSpaceWS(a), window.open(window.location.origin + "/" + a, "_blank")
}

function thingsToDo(a) {
    var b = "Things to do in " + destName;
    a.length > 0 ? ("" !== a[0].header && void 0 !== a[0].header ? $("#h2ThingsToDo").empty().append(a[0].header) : $("#h2ThingsToDo").empty().append(b), "" !== a[0].description && void 0 !== a[0].description && $("#descThingsToDo").empty().append(a[0].description)) : $("#h2ThingsToDo").empty().append(b), readLabels()
}

function subCategoryFirst(a) {
    var b = 0,
        c = 0;
    if (void 0 !== a)
        for (var d = 0; d < a.length; d++) {
            3 * b === c && (b++, cont += '<div class="row pm0 subCategory">'), c++;
            var e = repSpace(a[d].name);
            cont += '<div class="col-lg-4 col-xs-12 col-md-4 col-sm-4 things-pack marbot10">', cont += '<div class="border_gray things_to_do_border_gray">', cont += void 0 !== a[d].imagePath && "" !== a[d].imagePath ? '<div class="col-lg-12 no-padding"><a href="' + url + "/" + e + "/" + a[d].sightseeingId + '"><img data-src="' + imageURL + "/holidays/sightSeeing/" + a[d].imagePath + '" title="' + a[d].imageAltTag + '" class="img-responsive lazyImg" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></a></div>' : '<div class="col-lg-12 no-padding"><a href="' + url + "/" + e + "/" + a[d].sightseeingId + '"><img data-src="' + imageURL + '/holidays/staticPage/no-images.jpg" class="img-responsive lazyImg" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" ></a></div>', cont += '<div class="col-lg-12 padd10">', cont += '<a href="' + url + "/" + e + "/" + a[d].sightseeingId + '"><h2>' + a[d].name + "</h2> </a>", cont += "</div>", cont += '<div class="col-lg-12 padd10 counter_data_thing_to_do">', cont += '<div class="text-justify bdr-top">' + a[d].description + "</div>", cont += "</div>", cont += '<span class="read_more text-right"><a href="' + url + "/" + e + "/" + a[d].sightseeingId + '">View Details</a></span>', cont += "</div>", cont += "</div>", 3 * b !== c && d !== a.length - 1 || (cont += "</div>")
        }
    cont += "</div>", $("#tab" + indexS + "show").append(cont), $("#SubCategoryTabLoader" + indexS).addClass("hide"), cont = "", $(".lazyImg").unveil()
}

function LoadTabData(a) {
    if (a) {
        cont = '<div class="row pm0 col-sm-11">', void 0 === category[a - 1].description || "" == category[a - 1].description || (cont += '<div class="readmore_static">' + category[a - 1].description + "</div>"), cont += "</div>", cont += '<div class="form-group col-lg-5 col-md-5 col-sm-5 col-xs-12 pm0 marbot10 martop20">', cont += '<select id="feedProducts' + a + '" required="" name="feedProducts' + a + '" class="form-control form_field5 selectpicker" onchange="sightseeingChange()">', cont += '<option value="All">All</option>';
        for (var b = 0; b < category.length; b++) category[a - 1].categoryName === category[b].categoryName && void 0 !== category[b].sightseeingSubcatName && (cont += '<option value="' + category[b].sightseeingSubcatName + '">' + category[b].sightseeingSubcatName + "</option>");
        cont += "</select>", cont += '<span class="field-error"></span>', cont += "</div>", cont += '<div class="clearfix"></div>', cont += '<div id="subCategory_' + category[a - 1].catId + '">', indexS = a;
        var c = intializeParams();
        c.requestType = "GET", c.url = "tcStaticPages/staticPage/subCategory/" + category[a - 1].catId + "/-1", c.cache = !1, c.async = !0, c.successCallbackFunction = "subCategoryFirst", doAjax(c)
    }
}

function completeCat() {
    cont = '<div class="clearfix"></div>';
    for (var a = 0; a < tabCountLoader.length; a++) cont += '<div class="desti_data paddtop20" id="tab' + tabCountLoader[a] + 'show"> ', cont += '<div id="SubCategoryTabLoader' + tabCountLoader[a] + '"><div class="thomas_loader"><span class="spinner"></span></div></div>', cont += "</div>";
    $("#category").append(cont), cont = "", LoadTabData(tabCountLoader[0].toString()), isTabDataLoaded.push(tabCountLoader[0].toString()), tabIdStatus = tabCountLoader[0].toString(), $(document).on("click", ".bdr-top-blue div", function() {
        $(".bdr-top-blue div").removeClass("active-things"), $(this).addClass("active-things")
    });
    var b = $(".desti_data");
    b.slice(1).hide(), $(".things").click(function() {
        var a = $("#" + this.id + "show").show();
        b.not(a).hide()
    }), $(document).on("click", "#tab" + tabCountLoader[0].toString(), function() {
        $("#tab" + tabCountLoader[0].toString()).removeClass("things-white-bg"), $(this).addClass("things-blue-bg")
    })
}
var geoCords = "";
$(document).ready(function() {
    function a(a) {
        var b = localStorage.getItem("geoCords");
        return void 0 !== typeof b && null !== b && "" != b || $("#allow_block_left").modal("show"), a === !1 && navigator.geolocation ? navigator.geolocation.getCurrentPosition(function(a) {
            localStorage.setItem("geoCords", a.coords.latitude + "," + a.coords.longitude)
        }, function() {
            localStorage.setItem("geoCords", "")
        }) : localStorage.setItem("geoCords", ""), localStorage.getItem("geoCords")
    }
    var b = localStorage.getItem("onBehalf");
    void 0 !== b && "false" !== b && "" !== b && null !== b || (geoCords = a(!1), console.log("geoCords" + geoCords))
});
var url = window.location.href;
url.indexOf("webcache.googleusercontent.com") > -1 && (url = "https://www." + decodeURIComponent(url.split("www.")[1].split("&")[0]));
var dest = url.split("/"),
    destNa = dest[dest.length - 2],
    dest2 = url.split("/"),
    envi = window.location.origin,
    destName = "",
    notFaq = !1;
destNa = dest2[dest2.length - 2];
var n = destNa.indexOf("tourism"),
    destN = destNa.toLowerCase().substring(0, n - 1);
dest[dest.length - 1].indexOf("places-to-visit-in-") > -1 ? destN = dest[dest.length - 1].replace("places-to-visit-in-", "") : dest[dest.length - 1].indexOf("best-time-to-visit-") > -1 ? destN = dest[dest.length - 1].replace("best-time-to-visit-", "") : dest[dest.length - 1].indexOf("how-to-reach-") > -1 ? destN = dest[dest.length - 1].replace("how-to-reach-", "") : dest[dest.length - 1].indexOf("-photo-video-gallery") > -1 ? destN = dest[dest.length - 1].replace("-photo-video-gallery", "") : dest[dest.length - 1].indexOf("-faqs") > -1 && (destN = dest[dest.length - 1].replace("-faqs", "")), destName = repWSpace(destN);
var tourism = "",
    page = dest2[dest2.length - 1],
    heading = destName + " Tour Packages";
if ($("#heading").empty().append(heading), -1 == url.indexOf("faq")) {
    $("#Recommend").removeClass("hide");
    var params = intializeParams();
    params.requestType = "GET", params.url = "tcStaticPages/staticPage/commonPage/" + destName, params.cache = !0, params.async = !0, params.successCallbackFunction = "commonPage", doAjax(params)
} else $("#Recommend").addClass("hide");
if (screenWidth >= 767) {
    console.log("bannerPages display----:" + destName);
    var params = intializeParams();
    params.requestType = "GET", params.url = "tcStaticPages/staticPage/banner/" + destName, params.cache = !1, params.async = !0, params.successCallbackFunction = "bannerFunction", doAjax(params)
}
var params = intializeParams();
params.requestType = "GET", params.url = "tcStaticPages/staticPage/popular/" + destName, params.cache = !0, params.async = !0, params.successCallbackFunction = "popularFunc", doAjax(params), $(".lazyImg").unveil();
var url = window.location.href;
url.indexOf("webcache.googleusercontent.com") > -1 && (url = "https://www." + decodeURIComponent(url.split("www.")[1].split("&")[0]));
var destNa = url.split("/")[url.split("/").length - 2],
    destN = destNa.substring(0, destNa.indexOf("tourism") - 1),
    destName = repWSpace(destN),
    category = [],
    tabCountLoader = [],
    cont = "",
    isTabDataLoaded = [],
    tabIdStatus, indexS, cont = "",
    check = dest2[dest2.length - 1],
    des = check.replace("places-to-visit-in-", ""),
    thingstodo = '<div class="row col-sm-12 col-xs-12"><h1 id="h2ThingsToDo" class="text-capitalize"></h1><div id="descThingsToDo" class="readmore_static"></div></div><div class="things_todo" style="clear: both; position: relative;min-height: 450px;" id="category"></div>';
$("#thingsToDo").empty().append(thingstodo);
var params = intializeParams();
params.requestType = "GET", params.url = "tcStaticPages/staticPage/thingsToDo/" + destName, params.cache = !1, params.async = !0, params.successCallbackFunction = "thingsToDo", doAjax(params), cont = '<div class="row col-sm-12 col-xs-12 bdr-top-blue pm0 martop20" id="innerCategory"></div>', $("#category").append(cont), cont = "", $(window).load(function() {}), $(document).ready(function() {
    var a = 120,
        b = " ",
        c = "...read more";
    $(".read_more_st_count").each(function() {
        var d = $(this).html();
        if (d.length > a) {
            var e = d.substr(0, a),
                f = d.substr(a, d.length - a),
                g = e + '<span class="moreellipses">' + b + '</span><span><span class="morecontent" style="display:none;">' + f + '</span><a href="" class="morelink_landingPage">' + c + "</a></span>";
            $(this).html(g)
        }
    })
});