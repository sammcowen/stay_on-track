// create variable to hold db connection
let db;

// establish connection to IndexedDB called 'budget_tracker' 
const request = indexedDB.open('budget-tracker', 1);

// this will emit if the db version changes

request.onupgradeneeded = function(event) {
    // save a  reference to the db 
    const db = event.target.result;

    // create an object called 'new_trans', set it to be autoincrementing
    db.createObjectStore('new_trans', {autoIncrement:true});
};

// upon success 
request.onsuccess = function(event) {
    db = event.target.result;

if(navigator.onLine) {
    // upload trans();
}
};


request.onerror = function(event) {
    console.log(event.target.errorCode);
};

function saveTrans(trans) {
    const transaction = db.transaction(['new_transaction'],'readwrite');

    const budgetObjectStore = transaction.objectStore('new_transaction');

    budgetObjectStore.add(trans);
}
function uploadTrans() {
    // open a transaction on the db 
    const transaction = db.transaction(['new_transaction'], 'readwrite');

    const budgetObjectStore = transaction.objectStore('new_transaction');

    const getAll = budgetObjectStore.getAll();

    getAll.onsuccess = function() {
        if(getAll.result.length > 0) {
            fetch('api/transaction', {
                method:'POST',
                body:JSON.stringify(getAll.result),
                headers:{
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            /then(serverResponse => {
                if(serverResponse.message) {
                    throw new Error(serverResponse);
                }
                const transaction = db.transaction(['new_transaction'], 'readwrite');

                const budgetObjectStore = transaction.objectStore('new_transaction');

                budgetObjectStore.clear();

                alert('All saved transactions have been submitted!');

            })
            .catch(err=> {
                console.log(err);
            });
        }
    }
}

// listen for application coming back online
window.addEventListener('online', uploadTrans);