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

//get user input and selected currency from the 'input-fi' input
var inputField = document.getElementById('input-fi').value;


console.log(inputField);

//


