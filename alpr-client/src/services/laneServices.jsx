import http from './httpService';
import { apiUrl } from '../config.json';
const apiEndpoint = apiUrl + "/lane";

export function getLaneStatus() {
    return http.get(apiEndpoint);
}

export function setLaneValue(relayId, relayValue) {
    const body = {};
    body.relayId = relayId;
    body.relayValue = relayValue;
    return http.post(apiEndpoint, body);
}


// import xmlParser from "xml2json";
// import _ from 'lodash';
// import http from './httpService';
// import config from "../config.json";


// const apiEndpoint = config.adamURL;
// const adamConfig = config.adamConfig;
// const xmlOptions = config.xmlOptions;

// export function getLaneStatus(laneId, setValue) {

//   const response = http.get(apiEndpoint, adamConfig);
//   const laneStatus = xmlParser.toJson(response.data, xmlOptions);
//   //console.log(laneStatus["ADAM-6060"]);

//   if(laneId && setValue) {
//     const { DO } = laneStatus["ADAM-6060"];
//     const relayONcollection=[];
//     _.find(DO, function (o) {
//         if(o.ID === laneId )
//           o.VALUE = setValue;
//           relayONcollection.push(`DO${o.ID}=${o.VALUE}&`);
//     });
//    const removedComma =  _.replace(relayONcollection, /,/g,"");
//    const datastring = _.toString(removedComma);
//    http.post ( apiEndpoint, datastring, adamConfig );
//   }
//   return laneStatus;
// }

