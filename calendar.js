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



$(document).ready(function() {


    
    $('#saveButton').click(function(){
        month.storeMonthHTML($month);
        alert("Progress saved");
    });
    
    $('#clearButton').click(function() {
        month.clearMonthDiv();
        
    });
    
    month.initializeMonthHTML($month);
    
});



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


var clearCheckMarks = function() {
    //this will clear checkmarks from the month
    return;
};

var emptyMonthState = function() {
    return{
        //first day of the month
        firstIndex: 3,
        //how many days in the month, default 30
        numberOfDays: 31,
        //which days are checked
        checkedDays: {}
    }
};

var Month = function () {
    //represents a single month
    var self = this;
    self.monthState = emptyMonthState();
    
    self.attachClickHandler = function() {
        $(".cell").click(function (event) {
            console.log(event);  // prints so you can look at the event object in the console
            $( this ).children().toggleClass("hidden");// toggles between hidden and daynumber/fa fa-check
            
        });
    };

    self.clearMonthDiv = function() {
        //clear the days of the month
        $week.find('td').each(function(index) {
            $(this).empty();
            $(this).append('<div class="nill"></div>');
        })
    };
    
    self.generateMonthDiv = function() {
        //fills in the days of the month in an empty month template
        $week.find('td').each( function(index) {
        
            var dayOfMonth = index - (self.monthState.firstIndex - 1);
            if (dayOfMonth >= 1 && dayOfMonth <= self.monthState.numberOfDays) {
                 $(this).empty();
                 $(this).append('<div class="cell"><div class="daynumber"' + ' daynumber="' + dayOfMonth.toString() + '"></div><i class="fa fa-check hidden"></i></div>')
                 $(this).find('.cell').children('.daynumber').append(dayOfMonth);
            }
        })
        
    };
    
    
    self.initializeMonthHTML = function(monthSelector) {   // CURRENT LINE is this what I want
    //replaces the inner HTML of each td with new HTML
    
        var loadMonth = self.loadMonthHTML(temporaryStorageKey, "");
        if (!loadMonth) {
            self.attachClickHandler();
            return;
        }
        else {monthSelector.html(loadMonth);
            self.attachClickHandler();
        }
    
};

//NEXT THREE METHODS DON'T MAKE SENSE ANYMORE
    
    self.collectMonthHTML = function(monthSelector) {
    //returns the inner html of the table with class .month  
        var monthHTML = monthSelector.html();
    
        return monthHTML;
};

    self.storeMonthHTML = function(monthSelector) {    //CURRENT LINE working on storing and reloading
    //will store the HTML of the table with class .month
        var storageItem = monthSelector.html();
        storeInLocalStorage(temporaryStorageKey, storageItem);
    
};

    self.loadMonthHTML = function(storageItemKey, substituteItem) {
    //loads the stored HTML of the table with class .month from localstorage
        return loadFromLocalStorage(storageItemKey, substituteItem);
};

};

var month = new Month();
