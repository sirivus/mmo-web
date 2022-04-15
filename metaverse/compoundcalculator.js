/*
4% apy
compounded daily
amount is estimated, may change
*/

var x = '1000000'
var money = x
var interest = '0.005'

function daysperyear() {
    return 365
}
    
function interestperday() { 
    return interest / daysperyear()
}

var days = '365.00' // just make it without leap year, 365.25 is leap year
var leapyear = '1'
var amount = money * (interest) / 365.25 * days
// should be 40000
console.log(amount)
