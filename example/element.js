//Dette er hva som kommer i localhost, nå er det data-resource som blir brukt, dere kan bruke flere her. Eksempel i bunnen.
import "../src/x-1560996-map-data-resource";

const el = document.createElement("DIV");
document.body.appendChild(el);

el.innerHTML = `		
	<x-1560996-map-data-resource></x-1560996-map-data-resource>
`;

//////////////////////////////////////////////////////
/// UNCOMMENT DET UNDER FOR Å BRUKE API -LOCALHOST ///
//////////////////////////////////////////////////////

// import "../src/x-1560996-map-api";

// const el = document.createElement("DIV");
// document.body.appendChild(el);

// el.innerHTML = `
// 	<x-1560996-map-api></x-1560996-map-api>
// `;

//////////////////////////////////////////////////////
///// Hvordan bruke flere komponenter i localhost ////
//////////////////////////////////////////////////////

// import "../src/x-1560996-map-data-resource";
// import "../src/x-1560996-map-api";
// const el = document.createElement("DIV");
// document.body.appendChild(el);

// el.innerHTML = `
// 	<x-1560996-map-data-resource></x-1560996-map-data-resource>
// 	<x-1560996-map-api></x-1560996-map-api>
// `;
