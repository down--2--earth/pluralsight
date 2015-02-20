﻿
$(function () {

    var ajaxFormSubmit = function () {
        var $form = $(this);

        var options = {
            url: $form.attr("action"),
            type: $form.attr("method"),
            data: $form.serialize()
        };

        $.ajax(options).done(function (data) {
            var $target = $($form.attr("data-otf-target"));

            var $newHtml = $(data);
            $target.replaceWith($newHtml);
            $newHtml.effect("highlight");
        });

        return false;
    };

    var submitAutoCompleteForm = function (event, ui) {
        var $input = $(this);
        $input.val(ui.item.label);

        var $form = $input.parent("form:first");
        $form.submit();

    };

    var createAutoComplete = function () {
        var $input = $(this);
        var options = {
            source: $input.attr("data-otf-autocomplete"),
            select: submitAutoCompleteForm
        };
        $input.autocomplete(options);
    };

    var getPage = function () {
        var $a = $(this);

        var options = {
            url: $a.attr("href"),
            data: $("form").serialize(),
            type: "get"
        };

        $.ajax(options).done(function (data) {
            var target = $a.parents("div.pagedList").attr("data-otf-target");
            //$(target).replaceWith(data);

            var $newHtml = $(data);
            $(target).replaceWith($newHtml);
            $newHtml.effect("highlight");

        });
        return false;
    };

    $("form[data-otf-ajax='true']").submit(ajaxFormSubmit);

    $("input[data-otf-autocomplete]").each(createAutoComplete);

    $(".main-content").on("click", ".pagedList a", getPage);
});