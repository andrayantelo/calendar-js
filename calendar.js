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
        $( this ).children().toggleClass("hidden"); // toggles between hidden and daynumber/fa fa-check
       })
    
       
});


var storeInLocalStorage = function(storageItemKey, storageItem) {        
    
        // convert a javascript value (storageItem) to a JSON string
        localStorage.setItem(storageItemKey, JSON.stringify(storageItem));
    
        // access the current domain's local Storage object and add a data item
        //(storageString) to it 
};

var loadFromLocalStorage = function(storageItemKey, storageItem) {  
        loadItem = localStorage.getItem(storageItemKey)
        
        
        if (loadItem === undefined) {
            console.log("Could not load, Key does not exist");
            return storageItem;   //DO I NEED TO RETURN ANYTHING HERE?
                                                                                                                    
         // to account for when storage is empy
        }
        else if (loadItem === null) {                                                            
            console.log("Could not load, key does not exist");
            return storageItem;
        }                                                                                                                           
       // store the results back in the object that was stored //IS THIS NECESSARY?
       storageItem = JSON.parse(loadItem);  
       console.log(loadItem);
        
       return storageItem
         
};
