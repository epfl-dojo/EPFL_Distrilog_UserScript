// ==UserScript==
// @name        EPFL Distrilog
// @namespace   none
// @description A script to improve browsing on distrilog.epfl.ch
// @include     https://distrilog.epfl.ch/*
// @include     http://distrilog.epfl.ch/*
// @version     0.1
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @author      EPFL-dojo
// @downloadURL https://raw.githubusercontent.com/epfl-dojo/EPFL_People_UserScript/master/EPFL_People.user.js
// ==/UserScript==

//Avoid conflicts
this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function() {
  console.log("Début du script sur distrilog");
  $("#ctl00_ctl00_ContentPlaceHolder1_rightcolumn_grvLastDist0 tr").each(function () {
    var thistr = this;
    var url = $("a", this).attr('href');
    if (! url.startsWith("ListeLogiciels")) { return }
//    console.log(url);
    console.log(GM_xmlhttpRequest);
    GM_xmlhttpRequest({
      method: "GET",
      url: "https://distrilog.epfl.ch/" + url,
      onload: function(response) {
        var html = $.parseHTML( response.responseText );
        var table = $("table#ctl00_ctl00_ContentPlaceHolder1_rightcolumn_grvLastDist", html);
        var newTab = $("td:first", thistr).append(table);

        $(".gridview-header", newTab).remove();
        $("tr", newTab).each(function () {
            var val = $("td", this).val();
            console.log(val);
        })

      }})
  })
});
