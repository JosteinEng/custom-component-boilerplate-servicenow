import { createCustomElement, actionTypes } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./styles.scss";
import { loadMap } from "./loadMap";
import { addOfficeMarkersToMap } from "./marker";

//Dummy Data for markers, uncomment for å bruke
// import MarkerDummyData from "./marker-dummy-date.json";

//Action Types
const { COMPONENT_RENDERED } = actionTypes;

//States for component
const initState = {
	kpmgOfficesList: [],
	mapInitialized: false,
};

const view = (state, { dispatch }) => {
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
		// markers: { default: MarkerDummyData },

		//Dette er tomme data, data resource skal fylle inn her fra UI BUILDER
		markers: { default: [] },
	},
	actionHandlers: {
		//Når komponenten er rendret så kaller vi på INIT_MAP dette kan dere kalle hva dere vil.
		//Dette er måten dere kan hente data uten å få shadow DOM problemer og diverse.
		[COMPONENT_RENDERED]: ({ dispatch }) => {
			dispatch("INIT_MAP", {});
		},

		//Her lager vi INIT_MAP hvor vi laster inn kartet og legger til markører fra data resource
		INIT_MAP: ({ updateState, host, state, properties, dispatch }) => {
			if (state.mapInitialized) return;

			//Setter at kartet er initialisert for å unngå dobbel initiering
			updateState({ mapInitialized: true });

			//Laster inn kartet
			loadMap(host);

			//Prøver å legge til markører fra data resource, hvis ikke tilgjengelig prøver vi igjen etter 100ms
			function tryAddMarkers() {
				if (
					host._map &&
					properties.markers &&
					Array.isArray(properties.markers.result)
				) {
					addOfficeMarkersToMap(host._map, properties.markers.result, dispatch);
					console.log("Markers added from data resource:", properties.markers);
				} else {
					setTimeout(tryAddMarkers, 100);
					console.log("Waiting to add markers...");
				}
			}
			tryAddMarkers();
		},
	},
});
