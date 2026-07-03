// ==UserScript==
// @name         Ben Dodson Auto Submit
// @namespace    http://tampermonkey.net/
// @version      2027-07-03
// @description  Assists Bliss Image Search Helper
// @author       You
// @match        https://bendodson.com/projects/itunes-artwork-finder/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bendodson.com
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    var RESOLUTION = 1500;

    console.log('[BenDodson] Script loaded. Waiting to process query field...');

    setTimeout(function() {
        // Decode the query field if it's URL-encoded before submitting
        var $query = $('#query');
        var rawValue = $query.val();
        console.log('[BenDodson] Raw query value:', rawValue);

        if (rawValue) {
            try {
                var decoded = decodeURIComponent(rawValue.replace(/\+/g, ' '));
                console.log('[BenDodson] Decoded query value:', decoded);
                if (decoded !== rawValue) {
                    $query.val(decoded);
                    console.log('[BenDodson] Query field updated with decoded value.');
                } else {
                    console.log('[BenDodson] Decoded value matched raw value, no update needed.');
                }
            } catch (e) {
                console.warn('[BenDodson] Failed to decode query value:', rawValue, e);
            }
        } else {
            console.log('[BenDodson] Query field was empty at time of check.');
        }

        console.log('[BenDodson] Triggering submit click.');
        $('input[type="submit"]').trigger('click')

        // Give the page a second to populate results before touching the links
        setTimeout(function() {
            var list = $('a').filter(function(index) { return $(this).text() === "Standard Resolution"; });
            console.log('[BenDodson] Found', list.length, '"Standard Resolution" link(s).');

            var first = list.first();

            if (first.length) {
                var href = first.attr('href');
                console.log('[BenDodson] Original href:', href);

                var newHref = href.replace(/\d+x\d+bb\.jpg$/, RESOLUTION + 'x' + RESOLUTION + '.png');
                console.log('[BenDodson] Rewritten href:', newHref);

                first.attr('href', newHref);
                console.log('[BenDodson] Opening rewritten URL in new tab.');
                window.open(newHref, '_blank');
            } else {
                console.log('[BenDodson] No "Standard Resolution" link found.');
            }
        }, 1000);
    }, 1000);
})();
