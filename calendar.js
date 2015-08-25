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
        month.retrieveCheckedDays();
        month.storeMonth();
        alert("Progress saved");
    });
    
    $('#clearButton').click(function() {
        month.clearCheckMarks();
        
    });
    
    month.initializeMonth();
    
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
        //which days are checked index:day
        checkedDays: {},
        //day and their indices pairs day:index
        dayIndex: {},
        //month year
        monthYear: "2015",
        //month name
        monthName: "January"
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
        $('.header').find(".month-year").append(self.monthState.monthName + " " + self.monthState.monthYear);
        $week.find('td').each( function(index) {
        
            var dayOfMonth = index - (self.monthState.firstIndex - 1);
            if (dayOfMonth >= 1 && dayOfMonth <= self.monthState.numberOfDays) {
                 self.monthState.dayIndex[dayOfMonth] = index;
                 $(this).empty();
                 var toAdd = '<div class="cell"><div class="daynumber"' + ' daynumber="' + dayOfMonth.toString() + '"></div><i class="fa fa-check hidden"></i></div>'
                 //var toAdd = toAdd.replace(/\s+/g, ''); <-----why didn't this work?
                 $(this).append(toAdd);
                 $(this).find('.cell').children('.daynumber').append(dayOfMonth);
            }
        });
    };
    
    self.generateCheckmarks = function() {
        self.retrieveCheckedDays();
        $week.find('td').each( function(index) {
            
            if (self.monthState.checkedDays[index]) {
                console.log("yes, the index is a key in the checkedDays object");
                $( this ).find(".cell").children().toggleClass("hidden");
            }
         })
    };
    
    
    self.retrieveCheckedDays = function() {
        //retrieves the daynumber attribute of the checked days and stores it in monthState.checkedDays
        if ($week.find('td').find('.daynumber.hidden')) {
            $week.find('td').find('.daynumber.hidden').each(function (index) {
                var daynumber = $(this).attr('daynumber');
                //the key is the index of the day for now
                self.monthState.checkedDays[self.monthState.dayIndex[daynumber]] = daynumber;
                self.storeMonth();
            });
        }
    };
    
    
    self.initializeMonth = function(monthSelector) {   // CURRENT LINE is this what I want
    //initialize a month
    
        self.loadMonth();
        if (self.loadMonth() !== null) {            // IS THIS WRITTEN IN A GOOD WAY?
            self.monthState = self.loadMonth();
        }
        console.log(self.monthState);
        self.retrieveCheckedDays();
        self.generateMonthDiv();
        self.generateCheckmarks();
        self.attachClickHandler();
    
    };
    
    self.loadMonth = function() {
        //loads month state from localstorage
        var loadedMonth = loadFromLocalStorage(temporaryStorageKey, emptyMonthState());
        return loadedMonth;
    };
    
    self.storeMonth = function() {    
    //will store the state of the month object
        var storageItem = self.monthState;
        storeInLocalStorage(temporaryStorageKey, storageItem);
    
    };
    
    self.clearCheckMarks = function() {
    //this will clear checkmarks from the month
         $week.find('td').each( function(index) {
        
                var dayOfMonth = index - (self.monthState.firstIndex - 1);
                if (dayOfMonth >= 1 && dayOfMonth <= self.monthState.numberOfDays) {
                     self.monthState.dayIndex[dayOfMonth] = index;
                     $(this).empty();
                     var toAdd = '<div class="cell"><div class="daynumber"' + ' daynumber="' + dayOfMonth.toString() + '"></div><i class="fa fa-check hidden"></i></div>'
                     //var toAdd = toAdd.replace(/\s+/g, ''); <-----why didn't this work?
                     $(this).append(toAdd);
                     $(this).find('.cell').children('.daynumber').append(dayOfMonth);
                }
        })
        self.monthState.checkedDays = {}; //CURRENT LINE, DO I NEED THIS?
        self.attachClickHandler();
    };
    
    self.getCurrentMonth = function() {
        //updates monthState with current month data
        var months = {
            0:"January", 1:"February", 2:"March", 3:"April", 4:"May", 5:"June",
            6:"July", 7:"August", 8:"September", 9:"October", 10:"November",
            11:"December"};
        var today = new Date();
        console.log(today);
        self.monthState.monthYear = today.getFullYear();
        self.monthState.monthName = months[today.getMonth()];
        console.log(self.monthState.monthYear + " " + self.monthState.monthName);
        
    };
    

};

var month = new Month();
