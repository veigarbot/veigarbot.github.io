$(document).ready(function () {
    $("head").append("<link href='/imgs/Avatar.png' rel='shortcut icon' type='image/x-icon'/>");

    setLanguage("en");
    const ps = new PerfectScrollbar(".dropdown-content");
	
    $.getJSON("veigar-stats.json", function (result) {
        if(!result) return;
        
        //Insert stats.
        $(".statsServersNum").text(numberWithCommas(result.s));
        $(".statsUsersNum").text(numberWithCommas(result.u));
        $(".statsChannelsNum").text(numberWithCommas(result.c));

        console.log("[x] Stats set successfully.");
    });

    //Top bar "shortcuts".
    $(".topBar-Get").on("click", function () {
        window.open("https://discord.com/oauth2/authorize?client_id=784815053547372574&scope=bot&permissions=314368", "_blank");
    });

    $(".topBar-Commands").click(function () {
        $("html, body").animate({
            scrollTop: $("#commands").offset().top - 70
        }, 2000);
    });

    $(".topBar-About").click(function () {
        $("html, body").animate({
            scrollTop: $("#about").offset().top - 70
        }, 2000);
    });

    //Language selector dropdown.
    $(".dropdown-content, .dropbtn").on("mouseover", function () {
        ps.update();

        if ($(window).width() > 466) {
            $(".dropbtn").css("background-color", "#FFF").css("color", "#000");
            $("body").disableScroll();
        }
    });

    $(".dropdown-content, .dropbtn").on("mouseout", function () {
        if ($(window).width() > 466) {
            $(".dropbtn").css("background-color", "inherit").css("color", "#FFF");
            $("body").enableScroll();
        }
    });

    $(".dropbtn").on("click", function () {
        if($(".dropdown-content").hasClass("open")){
            $(".dropdown-content").hide();
            $(".dropdown-content").removeClass("open");

            if ($(window).width() > 466) {
                $("body").enableScroll();
            }
        } else {
            ps.update();
            $(".dropdown-content").show();
            $(".dropdown-content").addClass("open");
            if ($(window).width() > 466) {
                $("body").disableScroll();
            }
        }
    });

    $(".dropdown-content a").on("click", function () {
        let img = $(this).find("img").attr("src");
        let lang = $(this).text();
        let locale = $(this).attr("locale");

        $(".dropbtn-img").attr("src", img);
        $(".dropbtn-txt").text(lang);

        setLanguage(locale);
    });

    //Translators Modal.
    $(".trigger").click(function () {
        $(".modal-wrapper").toggleClass("open");
        $(".page-wrapper").toggleClass("blur");
        $("body").css("overflow", "hidden");
    });

    $(".btn-close").click(function () {
        $("body").css("overflow", "visible");
    });
});

function setLanguage(locale) {
    $.getJSON("locales/" + locale + ".json", function (json) {
        let toTranslate = $("[translate]");
        toTranslate.each(function () {
            let elemAttr = $(this).attr("translate");
            let translatedString = _.get(json, elemAttr);

            $(this).html(translatedString);
        });
        console.log("[x] Language set: " + locale.toUpperCase() + ".");
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$.fn.disableScroll = function() {
    window.oldScrollPos = $(window).scrollTop();

    $(window).on("scroll.scrolldisabler",function ( event ) {
       $(window).scrollTop( window.oldScrollPos );
       event.preventDefault();
    });
};

$.fn.enableScroll = function() {
    $(window).off("scroll.scrolldisabler");
};
