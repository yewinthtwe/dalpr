const dateFns = require('date-fns');
var parseISO = require('date-fns/parseISO')
var parseJSON = require('date-fns/parseJSON')
var subDays = require('date-fns/subDays')
//2020-10-29T13:30:29.269Z
    
    
    const byToday = new Date();
    console.log(byToday);

    const byWeek = subDays(parseJSON(byToday), 7);
    console.log(byWeek);

    const byMonth = subDays(parseJSON(byToday), 30);
    console.log(byMonth);

    // Traffic.find({ epoch_time: { $gte: new Date(), $lte: date_fns_date }});
  