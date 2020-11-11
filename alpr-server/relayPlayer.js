const config = require('config');
const axios = require("axios");
const xmlParser = require("xml2json");
const _ = require('lodash');
//const { flatten } = require('lodash');

async function showDO() {
  const response = await axios.get(config.get('adamURL'), config.get('adamConfig'));
  const myjson = xmlParser.toJson(response.data, config.get('xmlOptions'));
  Object.keys(myjson).forEach(function (key) {
    myjson["adam_6060"] = myjson[key];
    
});
  const relays = myjson.adam_6060.DO;
  return relays;
}

async function setDO( relayId, setValue) {
  const relays = await showDO();
 
  const relayONcollection=[];
_.find(relays, function (o) {
  if(o.ID == relayId )
   o.VALUE = setValue;
   relayONcollection.push(`DO${o.ID}=${o.VALUE}&`);
  });

 const removedComma =  _.replace(relayONcollection, /,/g,"");
 const datastring = _.toString(removedComma);
 const response = await axios.post ( config.get('adamURL'), datastring, config.get('adamConfig') );
  return relays;
//console.log(relays);
//console.log(datastring);
}
//showDO();
//setDO(0, '0');
module.exports.showDO = showDO;
module.exports.setDO = setDO;