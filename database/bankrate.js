arr = [0.740, 0.915, 1.060, 1.530, 2.100];
console.log(arr.length);
arr.forEach(function(item, index, array) {

});

var a = (arr[1]) * 100;
console.log(a);
//
const numbers = [0.740, 0.915, 1.060, 1.530, 2.100];
const numbers_sitting_rate = ['1/2 of numbers']
const time_in_months = [1, 2, 3, 6, 12];

const bankrate = [1.0, 1,1];
const sitting_rate = [0.5, 0.55]
const payout = ['monthly']

let txt = "";
let timetxt= '';
numbers.forEach(myFunction);
bankrate.forEach(myFunction);
document.getElementById("demo").innerHTML = txt;

function myFunction(value, index, array) {

}
function myFunction(value, index, array) {
    txt += value + ' ' + timetxt + "<br>";
}
