//move these under the $document ready line?
var $cal = $(".calendar") 
var $week = $('.week');  //this is the class for the rows of the table
var $month = $('.month');  //this is the class for the month tables
var $aDay = $('.aDay'); //class for day cells
var $monthframe = $('.monthframe');
var temporaryStorageKey = "temporaryStorageKey"; //temporary storage key for month object
var yearKey = "yearKey"; //temporaryStorageKey for year object


$(document).ready(function() {


    
    $('#saveButton').click(function(){
        month.retrieveCheckedDays();
        month.storeMonth();
        alert("Progress saved");
    });
    
    $('#clearButton').click(function() {
        month.clearCheckMarks();
        
    });
    
    //year.generateEmptyYearDiv();
    //year.fillYearDiv();
    //year.attachYearClickHandler();
    
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

var getMonthIndex = function(date) {
    date.getMonth
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
        //today: new Date(),
        //monthID
        monthId: ""
    }
};

var Month = function (date) {
    //represents a single month
    var self = this;
    self.monthState = emptyMonthState();
    self.date = date || new Date();
    
    self.attachClickHandler = function(monthId) {
        var $monthId = $('#' + monthId);
        $monthId.find('.cell').click(function (event) {
            console.log(event);  // prints so you can look at the event object in the console
            $( this ).children().toggleClass("hidden");// toggles between hidden and daynumber/fa fa-check
            
        });
    };

    self.clearMonthDiv = function(monthId) {
        //clear the days of the month
        var $monthId = $('#'+monthId);
        $monthId.find('.header').find('.month-year').empty();
        $monthId.find($week).find('td').each(function(index) {
            $(this).empty();
            $(this).append('<div class="nill"></div>');
        })
    };
    
    self.generateEmptyMonthDiv = function() {
        //generates an empty month div template
         $('.calendar').append('<div class="monthframe"></div>');
         $('.monthframe').append($('#template').html());
    };
    
    self.generateMonthDiv = function(monthId) {
        //fills in the days of the month in an empty month template
        var $monthId = $('#'+monthId);
        self.clearMonthDiv(monthId);
        $monthId.find(".month-year").empty();
        $monthId.find(".month-year").append(self.monthState.monthName + " " + self.monthState.monthYear);
        
        $monthId.find($('.week')).find('td').each( function(index) {
        
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
        
    };
    
    self.generateCheckmarks = function(monthId) {
        console.log("generateCheckMarks is about to run");
        //checked days index: daynumber
        var $monthId = $('#'+monthId);
        $monthId.find('.month').find('td').each( function(index) {
            
            if (self.monthState.checkedDays[index]) {
                console.log("yes, the index is a key in the checkedDays object");
                $(this).find('.cell').children().toggleClass("hidden");
            }
         })
    };
    
    
    self.retrieveCheckedDays = function(monthId) {
        var $monthId = $('#'+monthId);
        //retrieves the daynumber attribute of the checked days and stores it in monthState.checkedDays
        if ($monthId.find('.month').find('.daynumber.hidden')) {
           $monthId.find('.month').find('.daynumber.hidden').each(function (index) {
                var daynumber = $(this).attr('daynumber');
                //the key is the index of the day for now
                self.monthState.checkedDays[self.monthState.dayIndex[daynumber]] = daynumber;
                self.storeMonth();
            });
        }
    };
    
    
    self.initializeMonthDiv = function() {   // CURRENT LINE is this what I want
    //initialize a month
        self.loadMonth();
        if (self.loadMonth() !== undefined) {            // IS THIS WRITTEN IN A GOOD WAY?
            self.monthState = self.loadMonth();
        }
        else {
            self.initCurrentMonthState();
        }
        console.log(self.monthState);
        self.generateEmptyMonthDiv();
        self.addAttrToMonthFrame('monthframe');
        self.retrieveCheckedDays(self.monthState.monthId);
        self.generateMonthDiv(self.monthState.monthId);
        self.generateCheckmarks(self.monthState.monthId);
        self.attachClickHandler(self.monthState.monthId);
    
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
        self.generateMonthDiv(self.monthState.monthId);
        self.attachClickHandler(self.monthState.monthId);
    };
    
  
    self.initCurrentMonthState = function() {
        self.monthState.monthName = getMonthName(self.date);
        self.monthState.numberOfDays = getNumberOfDays(self.monthState.monthName);
        self.monthState.monthYear = getYear(self.date);
        self.monthState.firstIndex = getDayOfWeek(self.date);
        return self.monthState;
        
    };
    
    self.addAttrToMonthFrame = function(monthFrame) {  
    //adds a unique id to each month
        var $monthframe = $('.' + monthFrame);
        var monthIds = {"January":0, "February":1, "March":2, "April":3,
            "May":4, "June":5, "July":6, "August":7, "September":8, 
            "October":9, "November":10, "December":11};
        $monthframe.attr('id', 'month'+ monthIds[self.monthState.monthName]);
        self.monthState.monthId = 'month'+ monthIds[self.monthState.monthName]
        
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
        $('.monthframe').append($('#template').html()); //having $monthframe didn't work here
    };
    
    self.fillYearDiv = function() {
    //fills an empty year div with appropriate months and their data
   
         var monthNames = {
        0:"January", 1:"February", 2:"March", 3:"April", 4:"May", 5:"June",
        6:"July", 7:"August", 8:"September", 9:"October", 10:"November",
        11:"December"};
        for (i=0; i<=11; i++) {
            var monthi = new Month(monthNames[i] + ' ' + year.yearState.currentYear);
            monthi.initCurrentMonthState();
            //console.log(monthi.monthState);
            year.yearState.months[i] = monthi;
            
            monthi.addAttrToMonthFrame($('.monthframe'));
            monthi.generateMonthDiv($('#month' + i));
            
        }
    };
    
    self.attachYearClickHandler = function() {
    //attaches clickhandler to each month in a year
        for(i=0;i<=11;i++) {
            self.yearState.months[i].attachClickHandler($('#month' + i));
        }
    };
    
    self.storeYear = function() {
        //stores the yearState
        var storageItem = year.yearState;
        storeInLocalStorage(yearKey, storageItem);
    }
    
    self.loadYear = function() {
        //loads the yearState
        var loadedYear = loadFromLocalStorage(yearKey);
        return loadedYear;
    }
};
var month = new Month();
var year = new Year();
