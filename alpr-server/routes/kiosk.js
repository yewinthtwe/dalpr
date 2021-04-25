const auth = require("../middleware/auth");
const { InOutRecord } = require("../models/inOutRecordModel");
const express = require("express");
const router = express.Router();
const { casher } = require("../casher");
// const _ = require("lodash");
// const { format } = require("date-fns");
// const isAdmin = require("../middleware/isAdmin");

router.get("/:ticketId", [auth], async (req, res) => {
	const searchResult = await InOutRecord.findOne({
		"ticket.ticketId": req.params.ticketId,
		"ticket.isPaid": false,
	});
	if (!searchResult) {
		return res.status(404).send("The give Ticket id was not found.");
	} else {
		const { ticket } = searchResult;
		return res.send(ticket);
	}
});

router.post("/", [auth], async (req, res) => {
	console.log("kioksJs: post:", req.body);
	const searchResult = await InOutRecord.findOne({
		"ticket.ticketId": req.body.ticketId,
		"ticket.isPaid": false,
	});
	if (!searchResult) {
		return res.status(404).send("The give Ticket id was not found.");
	} else {
		const { ticket } = searchResult;
		const ticketReturnedByCahser = await casher(ticket);
		const { parkingFee, ticketId } = ticketReturnedByCahser;
		req.body.parkingFee == parkingFee ? (isPaid = true) : (isPaid = false);
		const ticketStatus = await updateTicket(ticketId, isPaid);
		return res.send(ticketStatus);
	}
});

async function updateTicket(ticketId, isPaid) {
	await InOutRecord.findOneAndUpdate(
		{ "ticket.ticketId": ticketId },
		{ "ticket.isPaid": isPaid }
	);
}

module.exports = router;
