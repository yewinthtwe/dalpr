const { Price } = require("./models/priceModel");
const _ = require("lodash");
const { format, differenceInMinutes } = require("date-fns");

/// casherJs is called by Human casher and Kiosk

async function casher(ticket) {
	let {
		lp,
		ticketId,
		inTime,
		outTime,
		isPaid,
		isUsed,
		parkedMinutes,
		parkingFee,
	} = ticket;

	parkedMinutes = differenceInMinutes(outTime, inTime);
	if (parkedMinutes > 30) {
		parkingFee = await getPrice(parkedMinutes);
	}

	return {
		ticketId: ticketId,
		lp: lp,
		ticketDate: format(Date.now(), "dd/MM/yyy"),
		ticketTime: format(Date.now(), "ppp"),
		inTime: format(inTime, "dd/MM/yyy ppp"),
		outTime: format(outTime, "dd/MM/yyy ppp"),
		parkingFee: price ? _.toNumber(_.map(price, "price")) : 0,
		parkedMinutes: parkedMinutes,
		isPaid: isPaid,
		paidAt: format(Date.now(), "ppp"),
		exitPaidVerify: null,
	};
}

async function getPrice(parkedMinutes) {
	let rate = 0;
	let billingCircle = 0;

	const price = await Price.find({ status: true });
	_.map(price, (p) => {
		rate = p.rate;
		billingCircle = p.billingCircle;
	});
	let bcCount = 2880 / billingCircle; // witin 48 hours
	let bCs = {
		bc0: {
			name: "bc0",
			min: 0,
			max: 0,
			price: 0,
		},
	};

	for (i = 1; i < bcCount; i++) {
		// console.log("bc Object:", bc);
		bCs[`bc${i}`] = Object.create(bCs.bc0);
		bCs[`bc${i}`].name = `billingCircle${i}`;
		bCs[`bc${i}`].min = billingCircle * i - billingCircle;
		bCs[`bc${i}`].max = billingCircle * i;
		bCs[`bc${i}`].price = rate * i;
	}
	//console.log("casherJS: bCs", bCs);

	return _.filter(bCs, (o) => {
		if (_.inRange(parkedMinutes, o.min, o.max)) {
			//console.log("getPrice: ", o);
			return o;
		} else {
			console.log("casherJS: Out of Range:", parkedMinutes);
		}
	});
}

module.exports = {
	casher,
};
