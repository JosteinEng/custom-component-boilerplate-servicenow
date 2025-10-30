import { createCustomElement, actionTypes } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./styles.scss";
import { loadMap } from "./loadMap";
import { addOfficeMarkersToMap } from "./marker";

//Dummy Data for markers, uncomment for å bruke
import MarkerDummyData from "./marker-dummy-date.json";

//Action Types
const { COMPONENT_RENDERED } = actionTypes;

//States for component
const initState = {
	mapInitialized: false,
};

const view = ({ properties }) => {
	const kpmgOfficesList = properties.kpmgOfficesList;
	console.log("kpmgOfficesList VARIABLE", kpmgOfficesList);
	console.log("Logging name and lat lng of all markers from VARIABLE:");
	kpmgOfficesList.forEach((office) => {
		console.log(
			`Name: ${office.u_name?.value}, Latitude: ${office.u_latitude?.value}, Longitude: ${office.u_longitude?.value}`
		);
	});

	return <div id="map" className="map-container" />;
};

//Her lager vi custom elementet
//Viktig at denne har samme navn som hva dere har satt i now-ui.json
//Viktig at vist dere vil kjøre denne i localhost så må denne være i mappen example element.js
createCustomElement("x-1560996-map-data-resource", {
	renderer: { type: snabbdom },
	view,
	styles,
	initialState: initState,
	properties: {
		// Man kan bruke dummy data ved å importere fra marker-dummy-date.json
		// Husk at dette må være samme format som er forventet fra UI-Builder som blir dannet i now-ui.json
		// kpmgOfficesList: { default: MarkerDummyData },

		//Dette er tomme data, data resource skal fylle inn her fra UI BUILDER
		kpmgOfficesList: { default: [] },
	},
	actionHandlers: {
		//Når komponenten er rendret så kaller vi på INIT_MAP dette kan dere kalle hva dere vil.
		//Dette er måten dere kan hente data uten å få shadow DOM problemer og diverse.
		[COMPONENT_RENDERED]: ({ dispatch }) => {
			dispatch("INIT_MAP", {});
		},

		//Her lager vi INIT_MAP hvor vi laster inn kartet og legger til markører fra data resource
		INIT_MAP: ({ updateState, host, state, properties, dispatch }) => {
			updateState({ mapInitialized: true });

			//Setter at kartet er initialisert for å unngå dobbel initiering
			if (!state.mapInitialized) {
				console.error("Map is already initialized, skipping INIT_MAP.");
				return;
			}

			const kpmgOfficesList = properties.kpmgOfficesList;

			//Laster inn kartet
			loadMap(host);

			//Prøver å legge til markører fra data resource, hvis ikke tilgjengelig prøver vi igjen etter 100ms
			function tryAddMarkers() {
				if (!host._map) {
					console.log("Map not initialized yet, retrying...");
					setTimeout(tryAddMarkers, 100);
					return;
				}
				if (kpmgOfficesList.length === 0) {
					console.log("No office data available yet, retrying...");
					setTimeout(tryAddMarkers, 100);
					return;
				}
				console.log("Adding office markers to map from data resource...");
				addOfficeMarkersToMap(host._map, kpmgOfficesList, dispatch);
			}
			tryAddMarkers();
		},
	},
});
