// Dette er syntax for opensource kartet Leaflet
// Dere må bytte dette ut med deres egen kartløsning syntax

export function addOfficeMarkersToMap(map, kpmgOfficesList, dispatch) {
	console.log("addOfficeMarkersToMap - offices data:", kpmgOfficesList);
	const L = window.L;
	if (map && Array.isArray(kpmgOfficesList)) {
		const customIcon = L.divIcon({
			className: "custom-div-icon",
			html: '<div style="background:#FF0000;width:15px;height:15px;border-radius:50%;"></div>',
			iconSize: [22, 22],
			iconAnchor: [11, 22],
			popupAnchor: [0, -22],
		});
		kpmgOfficesList.forEach((office) => {
			if (office.u_latitude?.value && office.u_longitude?.value) {
				const marker = L.marker(
					[
						parseFloat(office.u_latitude.value),
						parseFloat(office.u_longitude.value),
					],
					{
						icon: customIcon,
					}
				)
					.addTo(map)
					.bindPopup(office.u_name?.value);

				marker.on("click", () => {
					console.log("Marker clicked name:", office.u_name?.value);
					console.log("Marker clicked latitude:", office.u_latitude?.value);
					console.log("Marker clicked longitude:", office.u_longitude?.value);
					dispatch &&
						//Eksempel på dispatch av informasjon i component opp til UI-Builder
						//Dette eventet er laget i now-ui.json actions navn MARKER_NAME_DISPATCHED
						dispatch("MARKER_NAME_DISPATCHED_DR", {
							value: office.u_name?.value,
						});
					console.log(
						"MARKER_NAME_DISPATCHED_DR: Properties in marker dispatch:",
						office.u_name?.value
					);
				});
			}
		});
	}
}
