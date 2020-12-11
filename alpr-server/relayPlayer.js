const config = require('config');
const axios = require("axios");
const xmlParser = require("xml2json");
//const logger = require("./middleware/logger");
const _ = require('lodash');

async function showDO( ioModuleId ) {
  try {
    const { data } = await axios.get(config.get(`adamURL.${ioModuleId}`), config.get('adamConfig'));
    let moduleStatus = xmlParser.toJson(data, config.get('xmlOptions'));
    moduleStatus = moduleStatus['ADAM-6060'];
    return moduleStatus;
  } catch(error) {
    console.error('unable to connect to IOmodule, maybe offline.', error.message);
  }
}

async function setDO( ioModuleId, relayId, setValue ) {

  try {
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
      let relayStatus = xmlParser.toJson(data, config.get('xmlOptions'));
      return relayStatus;
  } catch (error) {
    console.error('unable to connect to IOmodule, maybe offline.', error.message);
  }
  // const datastring = `DO${relayId}=1`;
  // try {
  //   const { data } = await axios.post( config.get(`adamURL.${ioModuleId}`), datastring, config.get('adamConfig') );
  //   let relayStatus = xmlParser.toJson(data, config.get('xmlOptions'));
  //   //await resetDO(ioModuleId, relayId);
  //   // console.log(`>>>> Opening ALB >>> ${licensePlate} .....`);
  //   return relayStatus;
  // } catch (error) {
  //   console.error('unable to connect to IOmodule, maybe offline.', error.message);
  // }

}

async function resetDO( ioModuleId, relayId ) {
  const datastring = `DO${relayId}=0`;
  try {
    const { data } = await axios.post( config.get(`adamURL.${ioModuleId}`), datastring, config.get('adamConfig') );
    return data;
  } catch (error) {
    console.error('unable to connect to IOmodule, maybe offline.', error.message);
  }
  
//const relays = await showDO( ioModuleId );
//const relayONcollection=[];
//   _.find( relays.DO, function (o) {
//     if( o.ID == relayId )
//     o.VALUE = '0';
//     relayONcollection.push(`DO${o.ID}=${o.VALUE}&`);
// });
 //const removedComma =  _.replace(relayONcollection, /,/g,"");
 //const datastring = _.toString(removedComma);
 //console.log(datastring);
}

//showDO('1');
//setDO('1', 5, '0');
module.exports.showDO = showDO;
module.exports.setDO = setDO;