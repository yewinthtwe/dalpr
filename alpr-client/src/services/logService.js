function init () {
 console.log("Logservice is called");
}

function log(error){
console.error(error);
}

export default {
    init,
    log
};