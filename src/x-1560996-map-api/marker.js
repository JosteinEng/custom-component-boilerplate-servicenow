export function addOfficeMarkersToMap(map, offices, dispatch) {
	const L = window.L;
	if (map && Array.isArray(offices)) {
		const customIcon = L.divIcon({
			className: "custom-div-icon",
			html: '<div style="background:#FF0000;width:15px;height:15px;border-radius:50%;"></div>',
			iconSize: [22, 22],
			iconAnchor: [11, 22],
			popupAnchor: [0, -22],
		});
		offices.forEach((office) => {
			if (office.latitude && office.longitude) {
				const marker = L.marker(
					[parseFloat(office.latitude), parseFloat(office.longitude)],
					{
						icon: customIcon,
					}
				)
					.addTo(map)
					.bindPopup(office.name);

				marker.on("click", () => {
					console.log("Marker clicked:", office.name);
					dispatch &&
						dispatch("MARKER_NAME_DISPATCHED", {
							value: office.name,
						});
				});
			}
		});
	}
}
