const Joi = require("joi");
const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const ReportSchema = new Schema ({
    totalTickets: { type: Number },
    visitorCount: { type: Number },
    memberCount: { type: Number },
    avgParkedMinutes: { type: Number },
    freeTickets: { type: Number},
    paidTickets: { type: Number },
    totalSalesAmount: { type: Number},
    totalParkedMinutes: { type: Number},
  });

const Report = mongoose.model( "Report", ReportSchema);

// const schema = Joi.object({
//   ticketId: Joi.string().required(),
//   licensePlate: Joi.array().required(),
// });

exports.Report = Report;
//exports.schema = schema;
