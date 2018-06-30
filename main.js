var startCurr = ['USD', 'YEN', 'POUNDS', 'NAIRA','EURO','CEDIS','FRANC'];
var endCurr = ['USD','YEN','POUNDS','NAIRA','EURO','CEDIS','FRANC'];

var fromSel = document.getElementById('from');
var toSel  = document.getElementById('to');

var fragment = document.createDocumentFragment();
var fragmentCopy = document.createDocumentFragment();



startCurr.forEach(function(startCurr, index){
    var opt = document.createElement('option');
    opt.innerHTML = startCurr;
    opt.value = startCurr;
    fragment.appendChild(opt);
    
});
fromSel.appendChild(fragment);

endCurr.forEach(function(endCurr, index){
    var opt = document.createElement('option');
    opt.innerHTML = endCurr;
    opt.value = endCurr;
    fragmentCopy.appendChild(opt);
    
});

toSel.appendChild(fragmentCopy);

//change color of button
var button = document.getElementById('convert');
button.setAttribute('class','btn-success');

//get user input and selected currency from the 'input-fi' input
var inputField = document.getElementById('input-fi');
//console.log(inputField);

inputField.addEventListener('keyup', function(event){
    event.preventDefault();
    
    //get input value
    console.log(inputField.value);

    //choose input currency

    //choose output currency

    //run conversion formula

    //display result


});

//


