const {TrafficHistory} = require('./models/trafficHistoryModel');
const _ = require('lodash');
const validateUser = require('./validateUser');

async function houseKeeper () {
    //console.log('HouseKeeping called....');
    const trafficHistory =  new TrafficHistory ({
      licensePlate: '',
      photo: '',
      inTime: '',
      outTime: '',
      isMember: false
    });
   
   const gateusers = await validateUser.getGateUsers();
   //console.log(gateusers);
        if(gateusers) {
        _.forEach(gateusers, async function(value, key) {
            trafficHistory.licensePlate = value.licensePlate;
            trafficHistory.photo = value.photo;
            trafficHistory.inTime = value.inTime;
            trafficHistory.outTime = value.outTime;
            trafficHistory.isMember = value.isMember;
            await trafficHistory.save();
        });
      }
    //await GateUser.deleteMany({'markToDelete': true})
    //const deleteOperation = GateUser.deleteMany({'markToDelete': true});
}
module.exports = {
  houseKeeper,
}

