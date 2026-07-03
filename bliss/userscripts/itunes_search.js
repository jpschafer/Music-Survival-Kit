// ==UserScript==
// @name         Add Handy Search
// @namespace    http://tampermonkey.net/
// @version      2026-07-03
// @description  Add Handy Search for Ben Dodson's Itunes Album art Lookup
// @author       Jason Schafer
// @match        http://your-bliss-instance/album/*/*/coverart?*
// @icon         https://www.blisshq.com/favicon.ico
// @grant        none
// ==/UserScript==
setTimeout(function () {
    var header = $("h3:contains('Handy searches')");

    var string = window.location.pathname
    var regexp = "\/album\/([^\/]*)\/([^\/]*)\/?.*";
    const matches = string.matchAll(regexp).next().value;
    console.log(matches);
    var artist = matches[1].replaceAll("+", " ");
    var album = matches[2].replaceAll("+", " ");

    console.log(artist, album);

    var artistEncoded = encodeURIComponent(artist);
    var albumEncoded = encodeURIComponent(album);

    var htmlTemplate = '\
        <div class="col-md-3">\
            <a href=\"https://bendodson.com/projects/itunes-artwork-finder/?entity=album&query=${artistEncoded}%20${albumEncoded}" class="btn btn-default btn-block btn-google-search" target="_bliss-google-search">\
                <i class="fa fa-apple"></i>&nbsp; iTunes Image search\
            </a>\
         </div>'

    var htmlTemplateFinalized = htmlTemplate.replace("${artistEncoded}", artistEncoded).replace("${albumEncoded}", albumEncoded);

    $(htmlTemplateFinalized).insertAfter(header);

}, 1000);
// Some Debug Stuff Below I was messing with. Don't want to lose.
//https://bendodson.com/projects/itunes-artwork-finder/?entity=Album&query=I%20Am&ItunesSearch
