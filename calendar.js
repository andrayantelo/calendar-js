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
var $aDay = $('.aDay'); //class for day cells
var temporaryStorageKey = "temporaryStorageKey";

//a sample array of saved checkmarks and daynumbers where everythig is nill except top row

var sampleHTML = '<tbody><tr class="week"><td class="aDay"><div class="cell"><div class="daynumber">1</div><i class="fa fa-check hidden"></i></div></td> \
<td class="aDay"><div class="cell"><div class="daynumber">1</div><i class="fa fa-check hidden"></i></div></td>\
<td class="aDay"><div class="cell"><div class="daynumber">1</div><i class="fa fa-check hidden"></i></div></td> \
<td class="aDay"><div class="cell"><div class="daynumber">1</div><i class="fa fa-check hidden"></i></div></td> \
<td class="aDay"><div class="cell"><div class="daynumber">1</div><i class="fa fa-check hidden"></i></div></td> \
<td class="aDay"><div class="cell"><div class="daynumber">1</div><i class="fa fa-check hidden"></i></div></td> \
<td class="aDay"><div class="cell"><div class="daynumber">1</div><i class="fa fa-check hidden"></i></div></td> \
</tr><tr class="week"><td class="aDay"><div class="nill"></div></td> \
<td class="aDay"><div class="nill"></div></td><td class="aDay"><div class="nill">\
</div></td><td class="aDay"><div class="nill"></div></td><td class="aDay"><div class="nill">\
</div></td><td class="aDay"><div class="nill"></div></td><td class="aDay">\
<div class="nill"></div></td></tr><tr class="week"><td class="aDay">\
<div class="nill"></div></td><td class="aDay"><div class="nill"></div></td>\
<td class="aDay"><div class="nill"></div></td><td class="aDay"><div class="nill">\
</div></td><td class="aDay"><div class="nill"></div></td><td class="aDay"><div class="nill">\
</div></td><td class="aDay"><div class="nill"></div></td></tr><tr class="week"><td class="aDay">\
<div class="nill"></div></td><td class="aDay"><div class="nill"></div></td>\
<td class="aDay"><div class="nill"></div></td><td class="aDay"><div class="nill">\
</div></td><td class="aDay"><div class="nill"></div></td><td class="aDay">\
<div class="nill"></div></td><td class="aDay"><div class="nill"></div></td>\
</tr><tr class="week"><td class="aDay"><div class="nill"></div></td>\
<td class="aDay"><div class="nill"></div></td><td class="aDay"><div class="nill">\
</div></td><td class="aDay"><div class="nill"></div></td><td class="aDay"><div class="nill">\
</div></td><td class="aDay"><div class="nill"></div></td><td class="aDay">\
<div class="nill"></div></td></tr></tbody>'

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


function collectTdChildrenHTML(theWeekRow){
        //returns an array with the inner html of the top level children of each 'td'
        var tdChildrenHTML = new Array();

        theWeekRow.find('td').children().each(function(){
         //array.push($(this).attr('class')); 
             tdChildrenHTML.push($(this).html());
         });      

        return tdChildrenHTML;
        };

function collectMonthHTML(monthSelector) {
    //returns the inner html of the table with class .month  
    var monthHTML = monthSelector.html();
    
    return monthHTML;
};

function replaceMonthHTML(monthSelector, replacementHTML) {   // CURRENT LINE is this what I want
    //replaces the inner HTML of each td with new HTML
    monthSelector.html(replacementHTML);
    
};


var storeMonthHTML = function(monthSelector) {    //CURRENT LINE working on storing and reloading
    //will store the HTML of the table with class .month
    var storageItem = monthSelector.html();
    storeInLocalStorage(temporaryStorageKey, storageItem);
    
};

var loadMonthHTML = function(storageItemKey, substituteItem) {
    //loads the stored HTML of the table with class .month from localstorage
    return loadFromLocalStorage(storageItemKey, substituteItem);
};

var generateCheckMarks = function() {
    //will replace divs in arrayOfDivTypes with other divs (that were previously saved in an array)
};

//isolate the div types from tdContentsArray
//var arrayOfDivTypes = [];
//for (i=0; i <tdContentsArray.length; i++) 
//    {arrayOfDivTypes.push(tdContentsArray[1][1]);}

// check if object is a array
//if( Object.prototype.toString.call( someVar ) === '[object Array]' ) {
//    alert( 'Array!' );
//}
