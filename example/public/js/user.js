"use strict";
$(function() {
    // Variables
    var input = $("#numbersInput"), //
        selectOption = $("#options");

    // Click on the option button
    $("#optionButton").on("click", function (e) {
        e.preventDefault();
        // If the input box is null. Show error message
        if (input.val() === "") {
            input.addClass("error");
            input.parent().eq(0).next().addClass("show");
        }
        // Validate input box
        if (typeof parseInt(input.val()) === "number" && input.val() !== "") {
            selectOption.show();
            selectOption.addClass("in");
        } else {
            selectOption.removeClass("in");
        }
    });

    // Remove error message
    input.on("input", function () {
        $(this).removeClass("error");
        $(this).parent().eq(0).next().removeClass("show");
        if (input.val() === "") {
            selectOption.removeClass("in");
        }
    });

    // Hide select option if clik outside
    $(window).click(function () {
        selectOption.fadeOut(200);
    });
    $("#options, #optionButton").click(function (e) {
        e.stopPropagation();
    });

    // Ajax call for the data. And generate the template
    function getPageData(url) {
        $.ajax({
            type: "GET",
            url: url,
            dataType: "html",
            success: function (result) {
                $("#dataAppend").html("");
                $("#dataAppend").html(result);
                selectOption.removeClass("in");
            },
            error: function (error) {
                console.log("Error", error);
            }
        });
    }

    // Select box on change value
    $("#typeSelect").change(function () {
        var selectVal = $(this).val();
        var inputVal = $("#numbersInput").val();
        var url = "/" + inputVal + "/" + selectVal;
        getPageData(url);
    });

    // Ajax call for pagination
    $("#prev, #next").on("click", function (e) {
        e.preventDefault();
        var url = $(this).attr("href");
        getPageData(url);
    });
});