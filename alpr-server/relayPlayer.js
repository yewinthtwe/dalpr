const config = require('config');
const axios = require("axios");
const xmlParser = require("xml2json");
const _ = require('lodash');

async function showDO( ioModuleId ) {
  const { data } = await axios.get(config.get(`adamURL.${ioModuleId}`), config.get('adamConfig'));
  let moduleStatus = xmlParser.toJson(data, config.get('xmlOptions'));
  moduleStatus = moduleStatus['ADAM-6060'];
  return moduleStatus;
}

async function setDO( ioModuleId, relayId, setValue) {
  const relays = await showDO( ioModuleId );
  const relayONcollection=[];
  _.find(relays.DO, function (o) {
    if( o.ID == relayId )
    o.VALUE = setValue;
    relayONcollection.push(`DO${o.ID}=${o.VALUE}&`);
});
 const removedComma =  _.replace(relayONcollection, /,/g,"");
 const datastring = _.toString(removedComma);
 const { data } = await axios.post( config.get(`adamURL.${ioModuleId}`), datastring, config.get('adamConfig') );
 return data;
}
//showDO('1');
//setDO('2', 5, '0');
module.exports.showDO = showDO;
module.exports.setDO = setDO;