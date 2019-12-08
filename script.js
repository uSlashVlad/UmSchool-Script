// ==UserScript==
// @name         Umschool script
// @namespace    http://tampermonkey.net/
// @version      0.2.1 beta
// @description  Скрипт для того, чтобы запускать вебинары на ютубе
// @author       https://vk.com/uber_vlad
// @match        https://new.umschool.net/mastergroup/lessons/*
// @grant        none
// ==/UserScript==

var style='#yt_button_script {background-color: #be2413; border: none; border-radius: 4px; color: white; padding: 10px 21px; text-align: center; text-decoration: none; display: inline-block; font-size: 18px; font-weight: bold;} #yt_button_script:hover {background-color: #df3c2a;} #yt_button_script:active {background-color: #d96154;}';
var add_text = '<b style="margin-left: 15px;">Скрипт в бете и если что-то не так, то пишите <a href="https://vk.com/uber_vlad" target="_blank">сюда</a>.</b> <br><br><block style="color: grey;">Для включения автозапуска поищите в скрипте пункт <i>autoloading</i></block>';

var autoloading = false; // переключатель автозапуска
var src;
var clock;
var timer = 1.5; // таймер для автозапуска
var internal_timer = 0.5; // таймер для поиска и добавления элементов
var button;

clock = setTimeout(start, internal_timer * 1000);

function start()
{
    var elem = document.body.getElementsByClassName('content')[0];
    if (elem)
    {
        elem.innerHTML += '<br><input id="yt_button_script" type="button" value="Открыть на ютубе"> ' + add_text;
        document.head.innerHTML += '<style>' + style + '</style>';
        button = document.getElementById('yt_button_script');
    }
    else
    {
        alert('Скрипт не нашёл места чтобы поместить ссылку автозапуска, поэтому всё откроется автоматически через ' + timer + ' секунд(ы)');
    }

    if (autoloading)
    {
        clock = setTimeout(yt_start, timer * 1000);
    }
}

button.onclick = function button_click() { yt_start(); }

function yt_start()
{
    src = document.body.getElementsByClassName('plyr__video-wrapper')[0].children[0].src;
    src = 'https://youtu.be/' + src.split('embed')[1].split('?')[0];
    open(src);
}