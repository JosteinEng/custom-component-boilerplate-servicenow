# @boilerplate/boiler-plate

kjør npm i for å fikse error



For å pushe til Instanse bruk
snc ui-component deploy

===============================================

For localhost bruk
/example
element.js

og kjør "snc ui-component develop" i console.

Her er det VIKTIG at dere har riktig navngivning ved import.

===============================================

now-ui.json informasjon:

her er det viktig at dere definerer component mappen dere har opprettet.

Dere ser eksempel i dette repoet.

Kort så er uiBuilder informasjon det som blir sett i UI BUILDER

"x-1560996-map-api": {
"innerComponents": [],
"uiBuilder": {
"associatedTypes": ["global.core", "global.landing-page"], ???
"label": Dette er navnet på komponenten i servicenow,
"tileIcon": Dette er ikonet på komponenten,
"description": Beskrivelse av komponenten,
"category": "primitives" ???
},

      // DETTE ER HVORDAN DERE SETTER OPP KOMPONENTEN TIL Å FÅ EN PROPERTY DATA RESOURCE BUNDET TIL SEG
       "properties": [
        {
          "name": "property_navn_1",
          "label": "Navn/Label komponent",
          "description": "Beskrivelse av komponent",
          "defaultValue": [], // KAN HA DEFAULT TRUE FALSE PÅ BOOLEAN FEKS
          "fieldType": "array", //Definer boolean string etc, hva som skal bli bundet i UI BUILDER
          "items": {
            "type": "object",
            "properties": {}
          }
        },
       { // DETTE ER EKSEMPEL SYNTAX FOR FLERE PROPERTIES TIL EN KOMPONENT
          "name": "property_navn_2",
          "label": "Navn/Label komponent",
          "description": "Beskrivelse av komponent",
          "defaultValue": [],
          "fieldType": "array",
          "items": {
            "type": "object",
            "properties": {}
          }
        },
      ],


        // ACTIONS ER BRUKT TIL Å LAGE EVENTS PÅ KOMPONENTEN
      "actions": [
        {
          "name": "MARKER_NAME_DISPATCHED",
          "label": "Marker Name Dispatched",
          "description": "Dispatches the selected marker name",
          "action": "MARKER_NAME_DISPATCHED",
          "payload": [
            {
              "name": "value",
              "type": "string",
              "description": "The name of the selected marker"
            }
          ]
        }
      ]
    }

===============================================

Lag en ny mappe for hver komponent. Mappe navnet må starte med scope navn, i min pdi x-1560996
Dette blir generert automatisk

===============================================

Tile-icon er ikonet som havner i UIbuilder component biblioteket

===============================================

Filer som ikke trengs å bli endret.

.editorconfig
.eslintignore
.eslintrc.json
.gitignore
.npmignore
.testonic.json
package-lock.json
pom.xml
README.md
