//move these under the $document ready line?
var $cal = $(".calendar") 
var $week = $('.week');  //this is the class for the rows of the table
var $month = $('.month');  //this is the class for the month tables
var $aDay = $('.aDay'); //class for day cells
var temporaryStorageKey = "temporaryStorageKey";


$(document).ready(function() {


    
    $('#saveButton').click(function(){
        month.retrieveCheckedDays();
        month.storeMonth();
        alert("Progress saved");
    });
    
    $('#clearButton').click(function() {
        month.clearCheckMarks();
        
    });
    
    year.generateEmptyYearDiv();
    
});

//UTILITY FUNCTIONS

var storeInLocalStorage = function(storageItemKey, storageItem) {        
    
        // convert a javascript value (storageItem) to a JSON string
        localStorage.setItem(storageItemKey, JSON.stringify(storageItem));
    
        // access the current domain's local Storage object and add a data item
        //(storageString) to it 
};

var loadFromLocalStorage = function(storageItemKey) {  
        //loads item from localstorage with key storageItemKey and returns the item
        //if the item is not in localStorage, returns substituteLoadItem
        var storageItem = localStorage.getItem(storageItemKey)
        
        
        if (storageItem === null) {
            console.log(storageItemKey + "not found in localstorage");
            return;   
        }
                                                                                                   
 
       else {
       var storageItem = JSON.parse(storageItem);  
      
        
       return storageItem
       }
         
};

var getMonthName = function(date) {
        //updates monthState with current monthYear and monthName
    var months = {
        0:"January", 1:"February", 2:"March", 3:"April", 4:"May", 5:"June",
        6:"July", 7:"August", 8:"September", 9:"October", 10:"November",
        11:"December"};
    if (date) {
        date = new Date(date);
        return months[date.getMonth()];
    }
    else {
        var today = new Date();  //can i pass an argument date and have var today = new Date(date) || new Date(); ???
        return months[today.getMonth()];
    }
};

var getNumberOfDays = function(monthName, date) {
    //updates monthState with current month numberOfDays
    var numberOfDays = { 
        "January":31, "March":31, "April":30, "May":31, "June":30, "July":31,
        "August":31, "September": 30, "October":31, "November":30, "December":31}
        
        
    if (monthName === "February") {
        var monthYearType = year.determineYearType(getYear(date));
        if (monthYearType === "common") {
            numberOfDays["February"] = 28;
            return numberOfDays[monthName];
                
            }
        else if (monthYearType === "leap") {
            numberOfDays["February"] = 29;
            return numberOfDays[monthName];
        }
                
    }
    else {
        return  numberOfDays[monthName];
        }
};

var getYear = function(date) {
    var today = new Date();
    if (date) {
        date = new Date(date);
        return date.getFullYear()
    }
    else {
        return today.getFullYear()
    }
        
};

var diffBetweenDays = function(firstDate, secondDate) {
    //calculates how many days between two dates
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
};
var getDayOfWeek = function(date) {
    
    //retrieves the index (day of the week) of the given day or the current day
    //only works for current month
    var firstDate = new Date(1986, 09, 12);
    if (date) {
        date = new Date(date);
    }
    else {
        date = new Date();
    }
    var dateDate = date.getDate();
    var dateYear = date.getFullYear();
    var dateMonth = date.getMonth();
    var secondDate = new Date(dateYear, dateMonth, dateDate);
    
    var diffDays = diffBetweenDays(firstDate, secondDate);
    var index = diffDays%7;
    return index;
};


var emptyMonthState = function() {
    return{
        //first day of the month
        firstIndex: 4,
        //how many days in the month, default 30
        numberOfDays: 31,
        //which days are checked index:daynumber
        checkedDays: {},
        //day and their indices pairs daynumber:index
        dayIndex: {},
        //month year
        monthYear: "",
        //month name
        monthName: "",
        //current date
        today: new Date()
    }
};

var Month = function (date) {
    //represents a single month
    var self = this;
    self.monthState = emptyMonthState();
    self.date = date;
    
    self.attachClickHandler = function() {
        $(".cell").click(function (event) {
            console.log(event);  // prints so you can look at the event object in the console
            $( this ).children().toggleClass("hidden");// toggles between hidden and daynumber/fa fa-check
            
        });
    };

    self.clearMonthDiv = function() {
        //clear the days of the month
        $('.header').find(".month-year").empty();
        $week.find('td').each(function(index) {
            $(this).empty();
            $(this).append('<div class="nill"></div>');
        })
    };
    
    self.generateMonthDiv = function(currentMonth) {
        //fills in the days of the month in an empty month template
        self.clearMonthDiv();
        $('.header').find(".month-year").empty();
        $('.header').find(".month-year").append(currentMonth.monthState.monthName + " " + currentMonth.monthState.monthYear);
        
        $week.find('td').each( function(index) {
        
            var dayOfMonth = index - (currentMonth.monthState.firstIndex - 1);
            if (dayOfMonth >= 1 && dayOfMonth <= currentMonth.monthState.numberOfDays) {
                 currentMonth.monthState.dayIndex[dayOfMonth] = index;
                 $(this).empty();
                 var toAdd = '<div class="cell"><div class="daynumber"' + ' daynumber="' + dayOfMonth.toString() + '"></div><i class="fa fa-check hidden"></i></div>'
                 //var toAdd = toAdd.replace(/\s+/g, ''); <-----why didn't this work?
                 $(this).append(toAdd);
                 $(this).find('.cell').children('.daynumber').append(dayOfMonth);
            }
        });
    };
    
    self.generateCheckmarks = function(currentMonth) {
        self.retrieveCheckedDays();
        $week.find('td').each( function(index) {
            
            if (currentMonth.monthState.checkedDays[index]) {
                console.log("yes, the index is a key in the checkedDays object");
                $( this ).find(".cell").children().toggleClass("hidden");
            }
         })
    };
    
    
    self.retrieveCheckedDays = function(currentMonth) {
        //retrieves the daynumber attribute of the checked days and stores it in monthState.checkedDays
        if ($week.find('td').find('.daynumber.hidden')) {
            $week.find('td').find('.daynumber.hidden').each(function (index) {
                var daynumber = $(this).attr('daynumber');
                //the key is the index of the day for now
                currentMonth.monthState.checkedDays[currentMonth.monthState.dayIndex[daynumber]] = daynumber;
                currentMonth.storeMonth();
            });
        }
    };
    
    
    self.initializeMonthDiv = function(monthSelector) {   // CURRENT LINE is this what I want
    //initialize a month
    
        self.loadMonth();
        if (self.loadMonth() !== undefined) {            // IS THIS WRITTEN IN A GOOD WAY?
            self.monthState = self.loadMonth();
        }
        else {
            self.initCurrentMonthState();
        }
        console.log(self.monthState);
        self.retrieveCheckedDays(self);
        self.generateMonthDiv(self);
        self.generateCheckmarks(self);
        self.attachClickHandler();
    
    };
    
    self.loadMonth = function() {
        //loads month state from localstorage
        var loadedMonth = loadFromLocalStorage(temporaryStorageKey);
        return loadedMonth;
    };
    
    self.storeMonth = function() {    
    //will store the state of the month object
        var storageItem = self.monthState;
        storeInLocalStorage(temporaryStorageKey, storageItem);
    
    };
    
    self.clearCheckMarks = function() {
    //this will clear checkmarks from the month
        self.monthState.checkedDays = {}; 
        self.generateMonthDiv();
        self.attachClickHandler();
    };
    
    
    self.initCurrentMonthState = function(date) {
        self.monthState.monthName = getMonthName(self.date);
        self.monthState.numberOfDays = getNumberOfDays(self.monthState.monthName);
        self.monthState.monthYear = getYear(self.date);
        self.monthState.firstIndex = getDayOfWeek(self.date);
        return self.monthState;
        
    };
    

};

var emptyYearState = function() {
    return{
        //year type
        yearType: "common",
        //year
        currentYear: getYear(),
        //object with 12 month objects
        months: {}
    }
};

var Year = function() {
    //represents a single calendar year
    var self = this;
    self.yearState = emptyYearState();
    
    self.determineYearType = function(year) {
        //determines whether the year is a common year or a leap year
        if(year%4!==0) {
            self.yearState.yearType = "common"
            return "common";
        }
        else if (year%100!==0) {
            self.yearState.yearType = "leap"
            return "leap";
        }
        else if (year%400!==0) {
            self.yearState.yearType = "common"
            return "common";
        }
        else{
            self.yearState.yearType = "leap"
            return "leap";
        }
        
    };
    
    self.generateEmptyYearDiv = function() {
        //will generate the html for the given year
        for (i=0; i<=11; i++) {
            $('.calendar').append('<div class="monthframe"></div>');
        }
        $('.monthframe').append($('#template').html());
    };
    
    self.fillYearDiv = function() {
         var months = {
        0:"January", 1:"February", 2:"March", 3:"April", 4:"May", 5:"June",
        6:"July", 7:"August", 8:"September", 9:"October", 10:"November",
        11:"December"};
        for (i=0; i<=11; i++) {
            var monthi = new Month(months[i] + ' ' + year.yearState.currentYear);
            year.yearState.months[months[i]] = monthi;
        }
            
        
    };
    
};
var month = new Month();
var year = new Year();
