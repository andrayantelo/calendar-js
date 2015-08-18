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
    

var $week = $('.week');  //this is the class for the rows of the table
var $month = $('.month');  //this is the class for the month tables

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

var loadFromLocalStorage = function(storageItemKey, substituteLoadItem) {  
        //loads item from localstorage with key storageItemKey and returns the item
        //if the item is not in localStorage, returns substituteLoadItem
        var storageItem = localStorage.getItem(storageItemKey)
        
        
        if (storageItem === null) {
            console.log(storageItemKey + "not found in localstorage");
            return substituteLoadItem;   
        }
                                                                                                   
 
       else {
       var storageItem = JSON.parse(storageItem);  
       console.log(storageItem);
        
       return storageItem
       }
         
};


var collectDayChildrenFromMonth = function(theMonthTable) {
    //goes through the rows of a table and stores the children of the tds of the table in $tds
    theMonthTable.find('tr').each(function () {
        var $tds = $(this).find('td').children();
        console.log($tds);
    })
    
    
};

var collectDayChildrenFromRow = function(theWeekRow) {
    //goes through the rows ad collects the children of the tds
    theWeekRow.find('td').each(function() {
        var $tdChildren = $(this).children();
        console.log($tdChildren);
        console.log($tdChildren.length + " this is the length of tdChildren");
        console.log(typeof($tdChildren) + " this is the type of tdChildren");
    })
};

var collectDayContentFromRow = function(theWeekRow) {
    //goes through the rows and collects the content() of the tds
    var tdContentsArray = [];
    console.log(tdContentsArray);
    console.log(typeof(tdContentsArray) + " this is the before type of the contents array");
    console.log(tdContentsArray.length + " this is the before length of the contents array");
    theWeekRow.find('td').each(function() {
        var $tdContents = $(this).contents();
        //console.log($tdContents);
        //console.log(typeof($tdContents) + " this is the type of tdContent");
        //console.log($tdContents.length + " this is the length of tdContent");
        tdContentsArray.push($tdContents);
    })
    console.log(tdContentsArray);
    console.log(typeof(tdContentsArray) + " this is the after type of the contents array");
    console.log(tdContentsArray.length + " this is the after length of the contents array");
    return tdContentsArray;
};
var storeMonth = function() {
    
};

//isolate the div types from tdContentsArray
//var arrayOfDivTypes = [];
//for (i=0; i <tdContentsArray.length; i++) 
    {arrayOfDivTypes.push(tdContentsArray[1][1]);}

// check if object is a array
//if( Object.prototype.toString.call( someVar ) === '[object Array]' ) {
//    alert( 'Array!' );
//}
