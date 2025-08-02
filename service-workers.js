const CACHE_NAME = 'dial-warehouse-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css',
  'https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js'
];

self.addEventListener('install', evt => {
  evt.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE)));
  self.skipWaiting();
});

self.addEventListener('activate', evt => {
  evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', evt => {
  evt.respondWith(caches.match(evt.request).then(resp => resp || fetch(evt.request)));
});
