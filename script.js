// ==UserScript==
// @name         Umschool script
// @namespace    http://tampermonkey.net/
// @version      0.3 beta
// @description  Скрипт для того, чтобы запускать вебинары на ютубе
// @author       https://vk.com/uber_vlad
// @match        https://new.umschool.net/*
// @grant        none
// ==/UserScript==

var url = document.URL;
url = url.split('//')[1].split('/');

// стили для кнопки
var style = '.yt_button_script {background-color: #be2413; border: none; border-radius: 4px; color: white; padding: 5px 10.5px; margin-top: 7.5px; text-align: center; text-decoration: none; display: inline-block; font-size: 18px; font-weight: bold;} .yt_button_script:hover {background-color: #df3c2a;} .yt_button_script:active {background-color: #d96154;}';
var autoloading = false; // переключатель автозапуска
var src;
var clock;
var timer = 1.5; // таймер для автозапуска
var initial_timer = 0; // таймер для поиска и добавления элементов
// элементы страницы
var button;
var autoloading_toggler;

if (getCookie('settings_autoloading')) autoloading = (getCookie('settings_autoloading') == '1')? true : false;
console.log(document.cookie); // DEBUG


if (url[1] == 'mastergroup' & url[2] == 'lessons' & url[4] == '') // блок кода для страницы веба
{
    let elem = document.body.getElementsByClassName('preview-title')[0];
    if (!elem) elem = document.body.getElementsByClassName('date-container')[0];
    if (elem)
    {
        document.head.innerHTML += '<style>' + style + '</style>';
        elem.innerHTML += '<br><input class="yt_button_script" type="button" value="Открыть вебинар на ютубе"> ';
        button = elem.getElementsByClassName('yt_button_script')[0];
    }

    if (autoloading)
    {
        clock = setTimeout(yt_start, timer * 1000);
    }

    if (button)
    {
        button.onclick = function SLF1() { yt_start(); };
    }
}
else if (url[1] == 'core' & url[2] == 'profile' & url[3] == 'edit') // блок кода для страницы Профиля/Настроек
{
    let elem = document.body.getElementsByClassName('content')[0];
    if (elem)
    {
        elem.innerHTML += '<h3><b>Настройки Umschool script</b></h3>';
        elem.innerHTML += '<input class="settings_autoloading_toggler" type="checkbox"> автозапуск вебинаров на ютубе';
        elem.innerHTML += '<br><b><a href="https://vk.com/uber_vlad" target="_blank" style="color: #f19137">По всем багам и вопросам писать сюда.</a></b>';
        autoloading_toggler = elem.getElementsByClassName('settings_autoloading_toggler')[0];
        autoloading_toggler.checked = autoloading;
    }

    if (autoloading_toggler)
    {
        autoloading_toggler.onclick = function SLF2() { autoloading_toggle() };
    }
}

//
function autoloading_toggle()
{
    let val = (autoloading_toggler.checked)? '1' : '0';
    setCookie('settings_autoloading', val);
    //alert(getCookie('settings_autoloading')); // DEBUG
}

function yt_start()
{
    src = document.body.getElementsByClassName('plyr__video-wrapper')[0].children[0].src;
    src = 'https://youtu.be/' + src.split('embed')[1].split('?')[0];
    open(src);
}

// для работы с cookie (с сайта https://learn.javascript.ru/cookie#prilozhenie-funktsii-dlya-raboty-s-kuki)
function getCookie(name) {
    let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value) {

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    updatedCookie += '; path=/; domain=umschool.net; expires=Fri, 31 Dec 9999 23:59:59 GMT;';

    document.cookie = updatedCookie;
}

function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}