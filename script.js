// ==UserScript==
// @name         Umschool auto video loader
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  test script
// @author       vk.com/uber_vlad
// @match        https://new.umschool.net/mastergroup/lessons/*
// @grant        none
// ==/UserScript==

/*var elem = document.body.getElementsByClassName('preview-title')[0];
if (elem)
{
    elem.innerHTML += '<button onclick="alert(num)">YT</button>';
}*/
var clock = setTimeout(yt_start, 1500);


function yt_start()
{
    var src = document.body.getElementsByClassName("plyr__video-wrapper")[0].children[0].src;
    src = 'https://youtu.be/' + src.split('embed')[1].split('?')[0];
    open(src);
}