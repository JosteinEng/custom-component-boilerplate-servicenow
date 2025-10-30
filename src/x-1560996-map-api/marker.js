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
			if (office.u_latitude && office.u_longitude) {
				const marker = L.marker(
					[parseFloat(office.u_latitude), parseFloat(office.u_longitude)],
					{
						icon: customIcon,
					}
				)
					.addTo(map)
					.bindPopup(office.u_name);

				marker.on("click", () => {
					console.log("Marker clicked:", office.u_name);
					console.log("Marker clicked latitude:", office.u_latitude);
					console.log("Marker clicked longitude:", office.u_longitude);
					dispatch &&
						dispatch("MARKER_NAME_DISPATCHED_API", {
							value: office.u_name,
						});
					console.log(
						"MARKER_NAME_DISPATCHED_API: Properties in marker dispatch:",
						office.u_name
					);
				});
			}
		});
	}
}
