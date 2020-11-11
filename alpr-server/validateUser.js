const { GateUser } = require("./models/gateUserModel");
const { Member } = require("./models/memberModel");
const { TrafficHistory } = require("./models/trafficHistoryModel");


async function validateGateUser (licensePlate) {
    const gateuser = await GateUser.findOne({'licensePlate': licensePlate});
    return gateuser;
  }

async function getGateUsers () {
    const gateusers = await GateUser
    .find({ 'markToDelete': false })
    //.find()
    .select('licensePlate photo inTime outTime isMember -_id')
    .limit(10);
    return gateusers;
  }

  async function saveTrafficHistory (gateuser) {
    const traffic = new TrafficHistory ({
      licensePlate: gateuser.licensePlate,
      photo: gateuser.photo,
      inTime: gateuser.inTime,
      outTime: gateuser.outTime,
      isMember: gateuser.isMember
    });

    await traffic.save();
    return traffic;
  }

async function validateMember (licensePlate) {
    const member = await Member.findOne({'licensePlate': licensePlate});
    //console.log(member);
    return member;
  }

 // getGateUsers();
 // validateMember('3M4444');

  module.exports = {
    validateGateUser,
    validateMember,
    getGateUsers,
    saveTrafficHistory
  };

