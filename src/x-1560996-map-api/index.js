import { createCustomElement, actionTypes } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./styles.scss";
import { loadMap } from "./loadMap";
import { addOfficeMarkersToMap } from "./marker";

//FOR Å TA I BRUK API VERSJON MÅ DENNE LASTES NED
// npm i @servicenow/ui-effect-http
import { createHttpEffect } from "@servicenow/ui-effect-http";

const { COMPONENT_RENDERED } = actionTypes;

const initState = {
	kpmgOfficesList: [],
	mapInitialized: false,
};

const view = (state, { dispatch }) => {
	return <div id="map" className="map-container" />;
};

createCustomElement("x-1560996-map-api", {
	renderer: { type: snabbdom },
	view,
	styles,
	initialState: initState,
	//Har ikke brukt properties her, eksempel i data resource komponent
	//Det er fullt mulig å bruke begge i samme komponent også
	properties: {},
	actionHandlers: {
		// Når komponenten er rendret så kaller vi på INIT_MAP dette kan dere kalle hva dere vil.
		// Dette er måten dere kan hente data uten å få shadow DOM problemer og diverse.
		//Om dere kjører funksjon i toppen så kan det komme problemer, opplevde mye med selve kartet, ellers funker det fint. Dere må bare teste.
		[COMPONENT_RENDERED]: ({ dispatch }) => {
			dispatch("INIT_MAP", {});
		},

		//Her lager vi INIT_MAP hvor vi laster inn kartet og henter KPMG kontorer via API
		INIT_MAP: ({ updateState, dispatch, host, state }) => {
			if (state.mapInitialized) return;
			updateState({ mapInitialized: true });

			loadMap(host);

			//Fetcher KPMG kontorer fra tabellen via API
			//Her kaller vi på FETCH_KPMG_OFFICES og setter query parametere for hva vi vil hente i tabellen
			dispatch("FETCH_KPMG_OFFICES", {
				sysparm_query: `u_nameISNOTEMPTY^u_latitudeISNOTEMPTY^u_longitudeISNOTEMPTY`,
				sysparm_fields: "u_name,u_latitude,u_longitude",
				sysparm_display_value: "all",
			});
		},

		//Her lager vi FETCH_KPMG_OFFICES som en HTTP effekt som henter data fra tabellen
		//Dette er basert på dispatchen over.
		FETCH_KPMG_OFFICES: createHttpEffect("/api/now/table/u_kpmg_offices", {
			method: "GET",
			queryParams: ["sysparm_query", "sysparm_fields"],
			successActionType: "FETCH_KPMG_OFFICES_SUCCESS",
			errorActionType: "FETCH_KPMG_OFFICES_ERROR",
		}),

		//Inni FETCH_KPMG_OFFICES har vi suksess og error handlers
		//Dette er eksempel på hvordan det funker
		//Når vi faktisk får data tilbake fra API kallet så sender vi dataen til state kpmgOfficesList ved hjelp av updateState
		//I tillegg legger vi til markører på kartet ved hjelp av addOfficeMarkersToMap funksjonen
		FETCH_KPMG_OFFICES_SUCCESS: ({ action, updateState, host }) => {
			console.log("FETCH_KPMG_OFFICES_SUCCESS payload:", action.payload);
			const kpmgOfficesList = action.payload.result || [];
			updateState({ kpmgOfficesList });

			addOfficeMarkersToMap(host._map, kpmgOfficesList);
		},

		//Feilhåndtering for API kallet
		FETCH_KPMG_OFFICES_ERROR: ({ action }) => {
			console.error("FETCH_KPMG_OFFICES_ERROR:", action && action.payload);
		},
	},
});
