/* the app */
window.addEventListener('DOMContentLoaded', function(){
  
  const form = document.querySelector('#app-form');
  const inputVal = form.querySelector('#input-fi');
  const output = form.querySelector('#output');
  const from = form.querySelector('#from');
  const to = form.querySelector('#to');
  const btn = form.querySelector('#convert');

  const databasePromise = idb.open('currencies', 1, function(fillDb) {
    let store = fillDb.createObjectStore('rates', { keyPath: 'pair' });
  });

  const url = 'https://free.currencyconverterapi.com/api/v5/currencies';
  fetch(url)
    .then(res => res.json())
    .then( data => {
      let dummy = '';

      Object.values(data.results).map(currency => {
        dummy += `
          <option value="${currency['id']}">${currency['id']} - ${currency['currencyName']}</option>
        `;
      });

      from.innerHTML = dummy;
      to.innerHTML = dummy ;
    })
    .catch(err => console.log(err));



    const convert = (inputVal, from, to, cb) => {
        from = encodeURIComponent(from);
        to = encodeURIComponent(to);
        const from_to = `${from}_${to}`;
        const to_from = `${to}_${from}`;
        //check from indexDB
        dbPromise.then(function(db) {
          let tx = db.transaction('rates');
          let keyValStore = tx.objectStore('rates');
          return keyValStore.get(from_to);
        }).then(function(val) {
          // check if it exist in rates db
          if(val) {
            // exist in db
            let total = (inputVal * val.rate);
            
            // display the result
            output.innerHTML = total;
          } else {
            // go online and fetch from the api
            const url = `https://free.currencyconverterapi.com/api/v5/convert?q=${from_to},${to_from}&compact=ultra`;
    
            fetch(url)
              .then(res => {
                return res.json();
              })
              .then(data => {
    
                if(data) {
                  let total;
                  total = (inputVal * data[from_to]);
                  // = Math.round(total * 100) / 100;
    
                  //store in indexDB
                  dbPromise.then(db => {
                    let tx = db.transaction('rates', 'readwrite');
                    let ratesStore = tx.objectStore('rates');
    
                    ratesStore.put({ pair: from_to, rate: data[from_to] });
                    ratesStore.put({ pair: to_from, rate: data[to_from] });
    
                    return tx.complete;
                  }).then(() => {
                    console.log('Rates saved to database');
                  });
    
                  // display the result
                  output.innerHTML = total;
                }
              })
              .catch(e => {
                console.log(e)
              }
            )
          }
        });
      }
  
  

      btn.addEventListener('click', () => {

        if(inputVal.value == '') {
          // display input is empty
          error.innerHTML = 'input  is empty';
          inputVal.classList.add('is-invalid');
        } else {
          convert(parseInt(inputVal.value), from.value, to.value);
        }
      });

});

