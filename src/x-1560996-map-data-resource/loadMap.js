//Ignorer dette, er open source map, dere skal bruke noe eget.

export function loadMap(host) {
	//Noe som er vrient med custom components er shadowDOM
	//Derfor må vi hente elementer inni shadowRoot
	//Eksempel host.shadowRoot.getElementById("map")
	const mapContainer = host.shadowRoot.getElementById("map");
	if (!host.shadowRoot.querySelector('link[href*="leaflet.css"]')) {
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
		host.shadowRoot.appendChild(link);
	}
	function initMap() {
		host._map = L.map(mapContainer).setView([59.3, 8], 8);
		L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 19,
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(host._map);
	}
	if (!window.L) {
		const script = document.createElement("script");
		script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
		script.onload = () => initMap();
		document.body.appendChild(script);
	} else {
		initMap();
	}
}
