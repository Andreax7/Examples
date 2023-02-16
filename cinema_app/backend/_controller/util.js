/****
 *** Check fields of cinema input
 ****/
function checkFields(body){
    if( body.name && body.location && body.openDays && body.openHours)
        return true
    else
        return false
}


/****
 *** Check fields of projection input
 ****/

 module.exports = {
    checkFields
 }