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
    const record = db.record(['new_trans'],'readwrite');

    const budgetObjectStore = record.objectStore('new_trans');

    budgetObjectStore.add(trans);
}