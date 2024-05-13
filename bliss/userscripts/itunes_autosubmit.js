// ==UserScript==
// @name         Ben Dodson Auto Submit
// @namespace    http://tampermonkey.net/
// @version      2023-12-29
// @description  Assists Bliss Image Search Helper
// @author       You
// @match        https://bendodson.com/projects/itunes-artwork-finder/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bendodson.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $('input[type="submit"]').trigger('click')

    var list = $('a').filter(function(index) { return $(this).text() === "Standard Resolution"; });
    console.log(list);
})();
