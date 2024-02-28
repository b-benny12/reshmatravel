/* global self, caches, Promise, fetch */

var config = {
    apiKey: 'AIzaSyA65QKHcEJB06RPtuP6ZcMlQmgbBXOrYlk',
    messagingSenderId: '889719369722',
    user_key: 'ADGMOT35CHFLVDHBJNIG50K969LAAK8GCQ4EF7R4ANGU1503IS60',
    siteid: 'a64327585b5d41b72a58ac79d18a7ee5'
};
importScripts('//tw.netcore.co.in/sw.js');

var version = "1.0.0";
var CACHE_NAME = "thomasCook-" + version;
var filesToCache = [
    '/css/holiday/home-lib.css',
    '/css/style_optimized.css',
    '/css/holiday/tc_home.css',
    '/js/lib/jquery-1-11-3.js',
    '/js/holiday/homepage-lib.js',
    '/js/common.js?version=1.0',
    '/js/holiday/mapLanding.js?version=1.0',
    '/js/holiday/holiday-home.js?version=1.2',
    '/js/holiday/homepage-static.js?version=1.1'
];

self.addEventListener('install', function(e) {
    e.waitUntil(caches.open(CACHE_NAME).then(function(cache) {
        return cache.addAll(filesToCache);;
    }).then(function(e) {
        return self.skipWaiting();
    }));
});

//self.addEventListener('activate', function (event) {
//console.log('[ServiceWorker]: 2-Activate event');
//event.waitUntil(caches.keys().then(function (cacheNames) {
//return Promise.all(cacheNames.map(function (cacheName) {
// TODO: check for condition
//if (cacheWhitelist.indexOf(cacheName) === -1) {
//return caches.delete(cacheName);
//}
//}));
//}));
//});

self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {
        // check if the cache has the response
        if (response) {
            return response;
        } else {
            return response || fetch(event.request);
        }

        //since cache does not have the response, a network request is made
        //return fetch(event.request).then(function (response) {
        // Check if we received a valid response
        //if (!response || response.status !== 200 || response.type !== 'basic') {
        //console.log('Invalid Response');
        //return response;
        //}

        //Clone the response
        //var responseToCache = response.clone();
        //console.log('Cloned Response', responseToCache);
        //caches.open(CACHE_NAME).then(function (cache) {
        //cache.put(event.request, responseToCache);
        //});

        //return response;
        //}).catch(function (e) {
        //console.log(e);
        //});
    }).catch(function(e) {
        console.log("service worker error:-" + e);
    }));
});