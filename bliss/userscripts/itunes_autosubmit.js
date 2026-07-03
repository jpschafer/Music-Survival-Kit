// ==UserScript==
// @name         Ben Dodson Auto Submit
// @namespace    http://tampermonkey.net/
// @version      2026-07-03
// @description  Assists Bliss Image Search Helper
// @author       You
// @match        https://bendodson.com/projects/itunes-artwork-finder/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bendodson.com
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    var RESOLUTION = 1500;

    // Decode the query field if it's URL-encoded before submitting
    var $query = $('#query');
    var rawValue = $query.val();
    if (rawValue) {
        try {
            var decoded = decodeURIComponent(rawValue);
            if (decoded !== rawValue) {
                $query.val(decoded);
            }
        } catch (e) {
            console.warn('Failed to decode query value:', rawValue, e);
        }
    }

    $('input[type="submit"]').trigger('click')

    // Give the page a second to populate results before touching the links
    setTimeout(function() {
        var list = $('a').filter(function(index) { return $(this).text() === "Standard Resolution"; });
        var first = list.first();

        if (first.length) {
            var href = first.attr('href');
            var newHref = href.replace(/\d+x\d+bb\.jpg$/, RESOLUTION + 'x' + RESOLUTION + '.png');
            first.attr('href', newHref);
            window.open(newHref, '_blank');
        } else {
            console.log('No "Standard Resolution" link found.');
        }
    }, 3000);
})();
