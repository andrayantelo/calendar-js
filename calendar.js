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

var hideTemplate = function() {
    //  Hides the month template
    
    $('#template').toggleClass("hidden");
};

var storeInLocalStorage = function(storageItemKey, storageItem) {        
    
    // Convert a javascript value (storageItem) to a JSON string and
    // accesses the current domain's local Storage object and adds a data item
    //  (storageString) to it.
    
    //  Parameters:
    //  storageItemKey: string
    //      The localstorage key to be used to store the data item.
    //  storageItem: string
    //      The item to be stored in localstorage
    
    localStorage.setItem(storageItemKey, JSON.stringify(storageItem));
    
       
};

var loadFromLocalStorage = function(storageItemKey) {  
    //  Loads an item from localstorage with key storageItemKey and returns the item
    //  if the item is not in localStorage, then it returns null
        
    //  Parameters:
    //  storageItemKey: "string"
    //      The key used to store the item and to be used to retrieve it from
    //      localstorage.
    
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
    //  Returns the index of the month of a given date. If no date is given,
    //  returns the month of current date.
    
    //  Parameters:
    //  date: string
    //      "month year" format. Example: "October 2013"
    //      or "year month" format. Example "2013 10" (10 is October)
    
    if (!date) {
        var today = new Date();
        return today.getMonth();
    }
    date = new Date(date);
    return date.getMonth();
};

var getMonthName = function(date) {
    //  Returns the name of the month of the given date. If no date is given,
    //  returns the name of the month of the current date.
    
    //  Parameters: 
    //  date: string
    //      "month year" format.
    //      or "year month" format. Example "2013 10" (10 is October)
    
    var months = {
        0:"January", 1:"February", 2:"March", 3:"April", 4:"May", 5:"June",
        6:"July", 7:"August", 8:"September", 9:"October", 10:"November",
        11:"December"};
    if (!date) {
        var today = new Date();  //can i pass an argument date and have var today = new Date(date) || new Date(); ???
        return months[today.getMonth()];
    }
    date = new Date(date);
    return months[date.getMonth()];
};

var getNumberOfDays = function(date) {
    //  Returns the number of days of the month of a given date or if no
    //  date is given, of the current date.
    
    //  Parameters: 
    //  date: string
    //      "month year" format.
    //      or "year month" format. Example "2013 10" (10 is October)
    
    var numberOfDays = { 
        "January":31, "March":31, "April":30, "May":31, "June":30, "July":31,
        "August":31, "September": 30, "October":31, "November":30, "December":31}
    
    if (!date) {
        date = new Date();
    }
    else {
        date = new Date(date);
    }
    var monthName = getMonthName(date);
    if ( monthName === "February") {
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
    // Returns the full year of the date given or if none give, the current
    // date.
    
    //  Parameters: 
    //  date: string
    //      "month year" format.
    //      or "year month" format. Example "2013 10" (10 is October)   
      
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
    //  Calculates the number of days between firstDate and secondDate.
    
    //  Parameters:
    //      firstDate: date object
    //      secondDate: date object
    
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
};
var getDayOfWeek = function(date) {
    //  Returns the index (day of the week) of the given date or the current
    //  date if no date is given.
    
    //  Parameters: 
    //  date: string
    //      "month day year" format. Example "October 12 1995"
    //      or "year month day" format. Example "2013 10 12" (10 is October) 
    //      If no day number is given, the 1st of the month is used.
     
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
        // first day of the month
        firstIndex: 4,
        // how many days in the month, default 30
        numberOfDays: 31,
        // which days are checked index:daynumber
        checkedDays: {},
        // day and their indices pairs daynumber:index
        dayIndex: {},
        // month year
        monthYear: "",
        // month name
        monthName: "",
        // index of month
        monthIndex: 0,
        // monthID
        monthId: ""
    }
};

var Month = function (date) {
    //Represents a single month
    
    var self = this;
    self.monthState = emptyMonthState();
    self.date = date || new Date();
    
    self.attachClickHandler = function() {
        // Attaches a function to the divs with class "cell" to be triggered
        // when "cell" is clicked. The function toggles the hidden class
        // between the children (daynumber and fa fa-check) of "cell"
        
        var $monthId = $('#' + self.monthState.monthId);
        $monthId.find('.cell').click(function (event) {
            console.log(event);  // prints so you can look at the event object in the console
            $( this ).children().toggleClass("hidden");
            
        });
    };

    self.clearMonthDiv = function() {
        // Clears the days of the month and leaves an empty month template.
        
        var $monthId = $('#'+ self.monthState.monthId);
        $monthId.find('.header').find('.month-year').empty();
        $monthId.find('.month').find('td').each(function(index) {
            $(this).empty();
            $(this).append('<div class="nill"></div>');
        })
    };
    
    self.generateEmptyMonthDiv = function() {
        // Generates an empty month div template
        
         $('.calendar').append('<div class="monthframe"></div>');
         $('.monthframe').append($('#template').html());
    };
    
    self.generateMonthDiv = function() {
        // Fills in the days of the month, month name, and
        // year in an empty month template
        
        var $monthId = $('#'+ self.monthState.monthId);
        self.clearMonthDiv();
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
    
    self.generateCheckmarks = function() {
        // Toggles the hidden class between the children of the div class="cell" 
        // of the cells whose indices are in the monthState.checkedDays
        // object.
        
        var $monthId = $('#'+ self.monthState.monthId);
        $monthId.find('.month').find('td').each( function(index) {
            
            if (self.monthState.checkedDays[index]) {
                $(this).find('.cell').children().toggleClass("hidden");
            }
         })
    };
    
    
    self.retrieveCheckedDays = function() {
        // Stores index: daynumber pairs in monthState.checkedDays. These
        // pertain to the days which have the daynumber div hidden.
        
        var $monthId = $('#'+ self.monthState.monthId);
        //retrieves the daynumber attribute of the checked days and stores it in monthState.checkedDays
        if ($monthId.find('.month').find('.daynumber.hidden')) {
           $monthId.find('.month').find('.daynumber.hidden').each(function (index) {
                var daynumber = $(this).attr('daynumber');
                //the key is the index of the day for now
                self.monthState.checkedDays[self.monthState.dayIndex[daynumber]] = daynumber;
            });
        }
    };
    
    
    self.initializeMonthDiv = function() {   // CURRENT LINE is this what I want
    // Initializes a month div. 
    
        self.loadMonth();
        if (self.loadMonth() !== undefined) {            // IS THIS WRITTEN IN A GOOD WAY?
            self.monthState = self.loadMonth();
        }
        else {
            self.initCurrentMonthState();
        }
        
        self.generateEmptyMonthDiv();
        self.addAttrToMonthFrame();
        self.retrieveCheckedDays();
        self.generateMonthDiv();
        self.generateCheckmarks();
        self.attachClickHandler();
    
    };
    
    self.loadMonth = function() {
        // Loads month state from localstorage
        
        var loadedMonth = loadFromLocalStorage(temporaryStorageKey);
        return loadedMonth;
    };
    
    self.storeMonth = function() {    
        // Stores the state of the month object in localstorage
    
        var storageItem = self.monthState;
        storeInLocalStorage(temporaryStorageKey, storageItem);
    
    };
    
    self.clearCheckMarks = function() {
        // Clear checkmarks from the month div.
    
        self.monthState.checkedDays = {}; 
        self.generateMonthDiv();
        self.attachClickHandler();
    };
    
  
    self.initCurrentMonthState = function() {
        // Initializes a month object.
        
        self.monthState.monthName = getMonthName(self.date);
        self.monthState.monthYear = getYear(self.date);
        self.monthState.numberOfDays = getNumberOfDays(self.monthState.monthName
                                                     + ' ' + self.monthState.monthYear);
        self.monthState.firstIndex = getDayOfWeek(self.date);
        self.monthState.monthIndex = getMonthIndex(self.date);
        self.monthState.monthId = 'month' + self.monthState.monthIndex;
        return self.monthState;
        
    };
    
    self.addAttrToMonthFrame = function() {  
        // Adds a unique ID to the month div with class .monthframe
        
        $('.monthframe').attr('id', 'month'+ self.monthState.monthIndex);
        self.monthState.monthId = 'month'+ self.monthState.monthIndex;
        
    };
    

};

var emptyYearState = function() {
    return{
        // year type
        yearType: "common",
        // year
        currentYear: 2013,
        // array with 12 month objects
        months: []
    }
};

var Year = function() {
    // Represents a single calendar year
    
    var self = this;
    self.yearState = emptyYearState();
    
    self.determineYearType = function() {
        // Determines whether the year is a common year or a leap year.
        
        year = year.yearState.currentYear;
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
        //will generate the html for 12 empty month divs
        var $monthframe = $('.monthframe');
        
        for (i=0; i<=11; i++) {
            $('.calendar').append('<div class="monthframe id="month"' + i + '"></div>');
        }
        $('.monthframe').append($('#template').html()); //having $monthframe didn't work here
    };
    
    self.getMonthsOfGivenYear = function() {
    // An array of month objects for yearState.currentYear is generated and stored in
    // the months array of the yearState object. 
    
    var year = self.yearState.currentYear;
    var monthNames = {
            0:"January", 1:"February", 2:"March", 3:"April", 4:"May", 5:"June",
            6:"July", 7:"August", 8:"September", 9:"October", 10:"November",
            11:"December"};
        if (!year) {
            var today = new Date();
            year = today.getFullYear();
        }
        for (i=0; i<=11; i++) {
            var monthi = new Month(monthNames[i] + ' ' + year);
            //monthi.generateEmptyMonthDiv();
            monthi.initCurrentMonthState();
            self.yearState.months.push(monthi);
        }
            
    self.fillYearDiv = function() {
    }
           // year.yearState.months[i] = monthi;
            //if (!$('.monthframe[id]').length) {
            //    monthi.addAttrToMonthFrame('monthframe');
            //}
            //monthi.generateMonthDiv($('#month' + i));
        
        //$('.calendar').find('.monthframe').each( function(index) {
        //        year.yearState.months[index].addAttrToMonthFrame('monthframe');
        //        return;
        //})

        
        
    };
    
    self.attachYearClickHandler = function() {
    // Attaches month object's clickhandler to each month in a year.
    
        for(i=0;i<=11;i++) {
            self.yearState.months[i].attachClickHandler($('#month' + i));
        }
    };
    
    self.storeYear = function() {
        // Stores the yearState in localstorage.
        
        var storageItem = year.yearState;
        storeInLocalStorage(yearKey, storageItem);
    }
    
    self.loadYear = function() {
        // Loads the yearState from localstorage.
        
        var loadedYear = loadFromLocalStorage(yearKey);
        return loadedYear;
    }
};
var month = new Month();
var year = new Year();
