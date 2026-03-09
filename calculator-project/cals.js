let calculation = '';

calculation = localStorage.getItem('calculation')

if (calculation==='') {
    calculation = ''
} else {
    calculation = localStorage.getItem('calculation');
}

function updateCalculation(number) {
    calculation += number;
    localStorage.setItem('calculation', calculation);
    return show();
}
function clearCalculation() {
    calculation ='';
    localStorage.setItem('calculation', calculation);
    return show();
}
function show() {
    document.querySelector('.cals').innerHTML = calculation;
}