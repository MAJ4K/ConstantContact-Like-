self.addEventListener("install", e => {
	e.waitUntil(
		caches.open("static").then(cache => {
			return cache.addAll(["./","./layout.css","./script.js","./Images/appLogo180.png"])
		})
	);
	console.info("Install!")
});

self.addEventListener("fetch", e => {
	e.respondWith(
		caches.match(e.request)
		.then(respose => {
			return respose || fetch(e.request);
		})
	);
});