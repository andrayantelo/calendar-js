 /*   alert("this works");  */
 var $cal = $(".calendar")

/* might not need createMonth in the end 
var createMonth = function() {
    
    console.log("this is happening"); // check if it's working
    
    var months = ["January", "February", "March", "April", "May", "June", 
                  "July", "August", "September", "October", "November", 
                  "December"];
                  
    
    for (i = 0; i< months.length; i ++) {
        
            
        $(".calendar .monthframe").children('.month-year').each(function () {
            $(this).text(months[i]); });
        
        };
    };
*/    
    



$(document).ready(function() {

    $(".cell").click(function (event) {
        console.log(event);  // prints so you can look at the event object in the console
        $( this ).children().toggleClass("hidden");// toggles between hidden and daynumber/fa fa-check
       })
    
    //$(".nill").click(function (event) {
    //    console.log(event);
    //    $( this ).toggleClass("cell nill");
    //    console.log(".nill should be .cell");
    //    console.log(this + 'here it is');
    //    addChildrenToCell(this);
    //})
});

//var addChildrenToCell = function(dayDiv) {
//    if (dayDiv === "$('.cell')") {
//        dayDiv.append("<div class='daynumber'>1</div><i class='fa fa-check hidden'></i>");
//        console.log(dayDiv);
//    }
//    else {
//        return;
//    }
//};


var storeInLocalStorage = function(storageItemKey, storageItem) {        
    
        // convert a javascript value (storageItem) to a JSON string
        localStorage.setItem(storageItemKey, JSON.stringify(storageItem));
    
        // access the current domain's local Storage object and add a data item
        //(storageString) to it 
};

var loadFromLocalStorage = function(storageItemKey, substituteLoadedItem) {  
        //loads item from localstorage with key storageItemKey and returns the item
        //if the item is not in localStorage, returns substituteLoadedItem
        var storageItem = localStorage.getItem(storageItemKey)
        
        
        if (storageItem === null) {
            console.log(storageItemKey + "not found in localstorage");
            return substituteLoadedItem;   
        }
                                                                                                   
 
       else {
       var storageItem = JSON.parse(storageItem);  
       console.log(storageItem);
        
       return storageItem
       }
         
};

var storeMonth = function() {
    
};

var collectCellStates = function(theTable) {
    //goes through the rows of a table and stores the tds of the table in $tds
    theTable.find('tr').each(function () {
        var $tds = $(this).find('td');
        console.log($tds);
    })
    
    
};
