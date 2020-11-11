
// function generateObu( obuCount ){
//     const obuObj = [];

//     let i = 0;
//     while (i < obuCount ){
//     i++;
//     const obuId = makeid(16);
//     const obu = {"srNo" : i, "obuId": obuId, "isActive": false};
//     obuObj.push(obu);
//     }
//     const jsonObj = JSON.stringify(obuObj, null, '\t');
//     console.log(jsonObj);
// }
export function makeid(length) {
        var result           = '';
        var characters       = '0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }
console.log('Generting OBU ID....');
console.log(makeid(16));
