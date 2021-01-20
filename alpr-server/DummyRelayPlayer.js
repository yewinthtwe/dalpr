console.log ("DummyRelayPlayer: WARNING!!!!! Using Dummy Relay player.");

let moduleStatus = 
        { Status: "OK",
          DO: [ 
                { ID: "0", VALUE: "0"},
                { ID: "1", VALUE: "0"},
                { ID: "2", VALUE: "0"},
                { ID: "3", VALUE: "0"},
                { ID: "4", VALUE: "0"},
                { ID: "5", VALUE: "0"} ]};

function showDO( ioModuleId ) {
    //console.log(`Status of Module ID: ${ioModuleId}`);
    //console.log(moduleStatus);
    return moduleStatus;
}
  
  function setDO( ioModuleId, relayId, setValue ) {
    //console.log(`Dummy Relay >>>>\nModule ID: ${ioModuleId} \nRelay Id: ${relayId} \nSet Value: ${setValue}`);
   
    moduleStatus.DO[relayId].VALUE = setValue;
    console.log (`DummyRelayPlayer: Relay value: ${moduleStatus.DO[relayId].VALUE}`);
    console.log(`DummyRelayPlayer: Relay value reseting to OFF.`);
    moduleStatus.DO[relayId].VALUE = 0;
    return moduleStatus;
  }
  
function resetDO( ioModuleId, relayId ) {
 //console.log(`Module ID: ${ioModuleId} with Relay Id: ${relayId}`);
 let data = null;
 return data;
}
  
  //showDO('1');
  //setDO('1', 5, '0');
  module.exports.showDO = showDO;
  module.exports.setDO = setDO;