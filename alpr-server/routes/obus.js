const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const { Obu } = require("../models/memberModel");

const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.get("/", async (req, res ) => {
    const obus = await Obu.find({'inUsed': false}).limit(10);
    
    res.status(200).send(obus);
});

// router.get("/:id", auth, async (req, res) => {
//     const member = await Member.findById(req.params.id);
//     if(!member)
//     return res.status(404).send("The give id was not found.");
//     res.send(member);
// });

// router.get("/obu", auth, async (req, res) => {
  
//   const obu = await Obu.find().limit(10);
//   console.log(`Showing OBU`);
//   console.log(obu);
//   if(!obu)
//   return res.status(404).send("There is no OBU.");
//   res.send(obu);
// });

// router.put("/:id", [auth], async (req, res) => {
//     const member = await Member.findByIdAndUpdate(
//       req.params.id,
//       {
//         licensePlate: req.body.licensePlate,
//         memberName: req.body.memberName,
//         address: req.body.address,
//         obuId: req.body.obuId
//       },
//       {new: true}
//     );
//     if (!member)
//       return res.status(404).send("The member with the given ID was not found.");
//     res.send(member);
// });

// router.post("/", auth, async (req, res) => {
//   const { error } = schema.validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);
//   let obu = await Obu.findOne({'inUsed': false});
//   console.log(`Picking random OBU : ${obu}`);
//   let member = await Member.findOne({ licensePlate: req.body.licensePlate });
//   if (member) return res.status(400).send("Car number already registered.");
//   member = new Member(_.pick(req.body, ["memberName", "address", "licensePlate" ]));
//   member.obu = obu._id;
//   member.isActive = true;
//   //console.log(member);
//   await member.save();
//   const updatedRecord = await Obu.updateOne({'_id': obu._id }, { 
//     $set : {
//       'inUsed' : true,
//       'memberId' : member._id
//     }
//   });

//   res.status(200).send(_.pick(member, ["memberName", "address", "licensePlate", "registrationDate" ]));
// });

// router.delete("/:id", [auth, isAdmin], async (req, res) => {
//     const member = await Member.findByIdAndRemove(req.params.id);
//     if(!member) return res.status(404).send("The give id was not found.");
//     res.status(200).send(member);
// });

module.exports = router;
