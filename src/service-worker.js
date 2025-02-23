self.addEventListener("install", (event) => {
  console.log("[Service Worker] Instalando...");
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activado");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  console.log("[Service Worker] Interceptando petición a:", event.request.url);
});
