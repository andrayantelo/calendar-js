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
        month.storeMonth($month);
        alert("Progress saved");
    });
    
    $('#clearButton').click(function() {
        month.clearMonthDiv();
        
    });
    
    month.loadMonth();
        if (month.loadMonth() !== null) {            // IS THIS WRITTEN IN A GOOD WAY?
            month.monthState = month.loadMonth();
        }
    console.log(month.monthState);
    month.generateMonthDiv();
    month.attachClickHandler();
    
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





var emptyMonthState = function() {
    return{
        //first day of the month
        firstIndex: 4,
        //how many days in the month, default 30
        numberOfDays: 31,
        //which days are checked
        checkedDays: {},
        //day and their indices pairs
        dayIndex: {}
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
                 self.monthState.dayIndex[dayOfMonth] = index;
                 $(this).empty();
                 var toAdd = '<div class="cell"><div class="daynumber"'+ ' daynumber="' + dayOfMonth.toString() + '"' + 'dayIndex="' + self.monthState.dayIndex[dayOfMonth] + '" '+'></div><i class="fa fa-check hidden"></i></div>'
                 //var toAdd = toAdd.replace(/\s+/g, ''); <-----why didn't this work?
                 $(this).append(toAdd);
                 $(this).find('.cell').children('.daynumber').append(dayOfMonth);
                 
            }
            
            if (self.monthState.checkedDays[index]) {
                $( this ).find('.cell').children().toggleClass("hidden");
            }
            
        })
        
    };
    
    
    self.retrieveCheckedDays = function(selector) {
        //retrieves the daynumber attribute of the checked days and stores it in monthState.checkedDays
        if (selector.find('.daynumber.hidden')) {
            selector.find('.daynumber.hidden').each(function (index) {
                var daynumber = $(this).attr('daynumber');
                //the key is the index of the day for now
                index = (index + daynumber)
                self.monthState.checkedDays[index] = daynumber;
                console.log("retrievedCheckedDays monthState status " + self.monthState);
            });
        }
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
    
    self.loadMonth = function(key) {
        //loads month state from localstorage
        var loadedMonth = loadFromLocalStorage(key, emptyMonthState());
        return loadedMonth;
    };
    
    self.storeMonth = function() {    
    //will store the state of the month object
        var storageItem = self.monthState;
        storeInLocalStorage(temporaryStorageKey, storageItem);
    
    };
    
    self.getCurrentMonth = function() {
        //updates monthState with current month data
        var today = new Date();
    };
    
    self.clearCheckMarks = function() {
    //this will clear checkmarks from the month
    return;
    };


};

var month = new Month();
