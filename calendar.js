//move these under the $document ready line?
var $cal = $(".calendar") 
var $week = $('.week');  //this is the class for the rows of the table
var $month = $('.month');  //this is the class for the month tables
var $aDay = $('.aDay'); //class for day cells
var $monthframe = $('.monthframe');
var temporaryStorageKey = "temporaryStorageKey"; //temporary storage key for month object
var yearKey = "yearKey"; //temporaryStorageKey for year object
var $listTitle = $('#listTitle');

$(document).ready(function() {
    
    var defaultDay = moment();
    var defaultDate = defaultDay.format("YYYY-MM-DD");
    $('#startDate').val(defaultDate);
    
    $("input[placeholder]").each(function () {
        //console.log($(this).attr('placeholder').length + 5);
        $(this).attr('size', $(this).attr('placeholder').length + 5);
    });
    
    $('input[text]').each(function() {
        $(this).attr('size', $(this).val().length);
    });

    
    $('#saveButton').click(function(){
        year.retrieveYearCheckmarks('.calendar');
        year.saveTitle();
        year.storeYear();
        alert("Progress saved");
    });
    
    $('#clearButton').click(function() {
        clearPage();
        
    });
    
    $('#hideButton').click(function() {
        hideTemplate();
    });
    
    $('#startDateButton').click(function() {
        startDate = setStartDate();
        clearPage();
        year.startDate = moment(startDate);
        year.initYear();
        //nextYear.startDate = moment('2016-01-01');
        //nextYear.initYear();
    });
    
    
    $('#listTitle').bind("keydown", function(e) {
        if (e.which == 13)
        {
            e.preventDefault();
            console.log("enter was pressed");
            $('#listTitle').blur();
        }
    });
    
    //year.initYear();
    //nextYear.initYear();
    //$('#listTitle').val(year.yearState.yearName)
});

//UTILITY/HELPER FUNCTIONS

var checkFirstOf = function() {
    // Checks the first day of each month
    $('.monthframe').each( function( index) {
        $(this).find('.cell').first().children().toggleClass("hidden");
    })
};


var hideTemplate = function() {
    //  Hides the month template
    
    $('#template').toggleClass('hidden');
};

var clearPage = function() {
    // Remove all divs from page except #template
    $('.monthframe').remove();
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

var getMonthsOfGivenYear = function(givenYear) {
    // An array of month objects for givenYear is generated and returned
    //if givenYear not provided, then current year is used.
    
    // Parameters:
    // currentYear: int
    var monthsOfYear = [];
        var monthsOfYear = [];
        var monthNames = {
            0:"January", 1:"February", 2:"March", 3:"April", 4:"May", 5:"June",
            6:"July", 7:"August", 8:"September", 9:"October", 10:"November",
            11:"December"};
        if (givenYear === undefined) {
            var today = new Date();
            givenYear = today.getFullYear();
        }
        for (i=0; i<=11; i++) {
            var monthi = new Month(monthNames[i] + ' ' + givenYear);
            monthi.initCurrentMonthState();
            monthsOfYear.push(monthi);
        }
    return monthsOfYear;
    };

var getMonthIndex = function(date) {
    //  Returns the index of the month of a given date. If no date is given,
    //  returns the month index of current date.
    
    //  Parameters:
    //  date: string
    //      "YYYY-MM-DD" format. Example: "2013-10-12"
    //      which would be October 12, 2013
    
    return date.month();
};

var getMonthName = function(index) {
    //  Returns the name of the month of the given index. If no index is given,
    //  returns the name of the month of the current date.
    
    //  Parameters: 
    //  index: int
    //      0 index 0-11, 0 being January
    var months = {
        0:"January", 1:"February", 2:"March", 3:"April", 4:"May", 5:"June",
        6:"July", 7:"August", 8:"September", 9:"October", 10:"November",
        11:"December"};
    return months[index];
};

var getNumberOfDays = function(date) {
    //  Returns the number of days of the month of a given date or if no
    //  date is given, of the current date.
    
    //  Parameters: 
    //  date: string
    //      "YYYY-MM" format where MM is 1-12 index
    
    return numberOfDays = date.daysInMonth();
};

var getYear = function(date) {
    // Returns the full year of the date given or if none give, the current
    // date.
    
    //  Parameters: 
    //  date: string
    //      "month year" format.
    //      or "year month" format. Example "2013 10" (10 is October)   
      
    return date.year();
    
        
};


var getDayOfWeek = function(date) {
    //  Returns the index (day of the week) of the given date or the current
    //  date if no date is given.
    
    //  Parameters: 
    //  date: string
    //      "month day year" format. Example "October 12 1995"
    //      or "year month day" format. Example "2013 10 12" (10 is October) 
    //      If no day number is given, the 1st of the month is used.
     
    var index = date.day();
    return index;
};
    
var generateMonthObj = function(mState) {
    // Returns a month object with the given state as it's monthState.
    
    // Parameters:
    // mState: dictionary
    //     contains month information (numberOfDays, firstIndex, etc)
    var monthIndex = mState.monthIndex + 1;
    monthIndex = monthIndex.toString();
    var month = new Month(mState.monthYear.toString() + '-' + monthIndex + '-' + mState.startDay.toString(), 'YYYY-MM-DD');
    month.monthState = mState;
    return month;
};

var extractMonthState = function(monthObj) {
    // Takes a month object, extracts it's monthState, and returns it.
    
    // Parameters:
    // monthObj: object
    //     An instance of the Month class
    
    return monthObj.monthState;
};

var generateYearObj = function(yState) {
    // Returns a year object with the given state as it's yearState.
    
    // Parameters:
    // yState: dictionary
    //     contains year information (yearType, givenYear, etc)
    
    var year = new Year();
    year.yearState = yState;
    return year;
};

var extractYearState = function(yearObj) {
    // Takes a year object, extracts it's yearState, and returns it.
    
    // Parameters:
    // yearObj: object
    //     An instance of the Year class
    
    return yearObj.yearState;
};
    
var emptyMonthState = function() {
    return{
        // first day index of the month
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
        monthId: "",
        //start day
        startDay: 1
    }
};

var generateDateString = function() {
    //Takes a date and returns it as a string in YYYY-MM-DD format
    
};


var Month = function (date) {
    //Represents a single month
    //date format "YYYY-MM-DD" months 1-12 index
    
    var self = this;
    self.monthState = emptyMonthState();
    if (date === undefined) {
        self.date = moment();
    }
    else{
        self.date = moment(date);
    }
    
    self.attachClickHandler = function(div) {
        // Attaches a function to the divs with class "cell" to be triggered
        // when "cell" is clicked. The function toggles the hidden class
        // between the children (daynumber and fa fa-check) of "cell"
        
        div = div || '.calendar';
        var $div = $(div);
        var $monthId = $('#' + self.monthState.monthIndex + '-' + self.monthState.monthYear);
        $div.find($monthId).find('.cell').click(function (event) {
            console.log(event);  // prints so you can look at the event object in the console
            $( this ).children().toggleClass("hidden");
            
        });
    };

    self.clearMonthDiv = function(div) {
        // Clears the days of the month and leaves an empty month template.
        
        div = div || '.calendar';
        var $div = $(div);
        var $monthId = $('#'+ self.monthState.monthIndex + '-' + self.monthState.monthYear);
        $div.find($monthId).find('.header').find('.month-year').empty();
        $div.find($monthId).find('.month').find('td').each(function(index) {
            $(this).empty();
            $(this).append('<div class="nill"></div>');
        })
    };
    
    self.generateEmptyMonthDiv = function(div) {
        // Generates an empty month div template
        
        // Parameters:
        //   divClass: String
        //     the class of the div where you want to place your month.
        
        div = div || '.calendar';
        var $div = $(div);
        $div.append('<div class="monthframe"></div>');
        $('.monthframe').append($('#template').html());
    };
    
    self.generateMonthDiv = function() {
        // Fills in the days of the month, month name, and
        // year in an empty month template
        
        var $monthId = $('#'+ self.monthState.monthIndex + '-' + self.monthState.monthYear);
        self.clearMonthDiv();
        $monthId.find(".month-year").empty();
        $monthId.find(".month-year").append(self.monthState.monthName + " " + self.monthState.monthYear);
        
        $monthId.find($('.week')).find('td').each( function(index) {
        
            var dayOfMonth = index - (self.monthState.firstIndex - 1);
            if (dayOfMonth >= self.monthState.startDay && dayOfMonth <= self.monthState.numberOfDays) { //MODIFIED LINE
                 self.monthState.dayIndex[dayOfMonth] = index;
                 $(this).empty();   
                 var toAdd = '<div class="cell"><div class="daynumber"' + ' daynumber="' + dayOfMonth.toString() + '"></div><i class="fa fa-check hidden"></i></div>'
                 //var toAdd = toAdd.replace(/\s+/g, ''); <-----why didn't this work?
                 $(this).append(toAdd);
                 $(this).addClass('actualDay');
                 $(this).find('.cell').children('.daynumber').append(dayOfMonth);
            }
        })
        
    };
    
    self.generateCheckmarks = function(div, monthIndex) {
        // Toggles the hidden class between the children of the div class="cell" 
        // of the cells whose indices are in the monthState.checkedDays
        // object.
        
        div = div || '.calendar';
        $div = $(div);
        monthIndex = monthIndex || self.monthState.monthIndex;
        var monthId = '#'+ monthIndex + '-' + self.monthState.monthYear;
        $div.find(monthId).find('.month').find('td').each( function(index) {
            
            if (self.monthState.checkedDays[index]) {
                $(this).find('.cell').children().toggleClass("hidden");
            }
         })
    };
    
    self.clearCheckedDays = function() {
        //clears the checkedDays object
        self.monthState.checkedDays = {};
    }
    
    
    self.retrieveCheckedDays = function(div, monthIndex) {
        // Stores index: daynumber pairs in monthState.checkedDays. These
        // pertain to the days which have the daynumber div hidden.
        
        div = div || '.calendar';
        var $div = $(div);
        monthIndex = monthIndex || self.monthState.monthIndex;
        var $monthId = $('#'+ monthIndex + '-' + self.monthState.monthYear);
        //retrieves the daynumber attribute of the checked days and stores it in monthState.checkedDays
        //if ($div.find($monthId).find('.month').find('.daynumber.hidden')) {
        $monthId.find('.month').find('.daynumber.hidden').each(function (index) {
            var daynumber = $(this).attr('daynumber');
            //the key is the index of the day for now
            self.monthState.checkedDays[self.monthState.dayIndex[daynumber]] = daynumber;
        });
        //}
    };
    
    
    self.initializeMonthDiv = function() {   // CURRENT LINE is this what I want
    // Initializes a month div. 
        clearPage();
    
        self.loadMonth();
        if (self.loadMonth() !== undefined) {            // IS THIS WRITTEN IN A GOOD WAY?
            self.monthState = self.loadMonth();
        }
        else {
            self.initCurrentMonthState();
        }
        
        self.generateEmptyMonthDiv();
        self.addAttrToMonthFrame('.monthframe');
        //self.clearCheckedDays();
        //self.retrieveCheckedDays();
        self.generateMonthDiv();
        self.generateCheckmarks();
        self.attachClickHandler();
    
    };
    
    self.loadMonth = function() {
        // Loads month state from localstorage
        
        var loadedMonth = loadFromLocalStorage(self.monthState.monthId);
        return loadedMonth;
    };
    
    self.storeMonth = function() {    
        // Stores the state of the month object in localstorage
    
        var storageItem = self.monthState;
        storeInLocalStorage(self.monthState.monthId, storageItem);
    
    };
    
    self.clearCheckmarks = function() {
        // Clear checkmarks from the month div.
    
        self.monthState.checkedDays = {}; 
        self.generateMonthDiv();
        self.attachClickHandler();
    };
    
  
    self.initCurrentMonthState = function() {
        // Initializes a month object.
        self.monthState.monthIndex = getMonthIndex(self.date);
        self.monthState.monthName = getMonthName(self.date.month());
        self.monthState.monthYear = getYear(self.date);
        self.monthState.numberOfDays = getNumberOfDays(self.date);
        self.monthState.startDay = self.date.date(); 
        self.monthState.firstIndex = getDayOfWeek(self.date); 
        
        self.monthState.monthId = 'month' + self.monthState.monthIndex;
        return self.monthState;
        
    };
    
    self.addAttrToMonthFrame = function(div) {  
        // Adds a unique ID to the month div with class .monthframe
        
        $div = $(div);
        $div.attr('id', self.monthState.monthIndex + '-' + self.monthState.monthYear);
        self.monthState.monthId = 'month'+ self.monthState.monthIndex + '-' + self.monthState.monthYear;
        
    };
    

};

var emptyYearState = function() {
    return{
        // year
        yearGiven: '',
        // array with 12 month objects
        monthStates: [],
        //title of year
        yearName: ''
    }
};

var setStartDate = function() {
    // parse the startDate string, which is given by te user according to
    // their local time zone, into a Date object
    var startDate = document.getElementById('startDate').value;
    
    return startDate;
};

var emptyMonthListState = function() {
    return{
        //defaults to first of the year
        startDate: new Date(moment().year(), moment().month(), 01),
        //list of month objects
        monthObjects: [],
        //list name under which it will be saved
        listName: ''
    }
};

var MonthList = function(startDate) {
    //startDate format "YYYY-MM-DD" with month index starting at 1
    
    var self = this;
    self.monthListState = emptyMonthListState();
    self.startDate = moment(startDate) || moment(moment().year().toString() + '-' + moment().month().toString() + '-' + '01');
    
    self.initState = function(startDate) {
        //initializes monthListState with current info
        self.monthListState.startDate = self.startDate;
    };

    self.getMonthStates = function() {
        var monthStates = [];
        var monthNames = {
            0:"January", 1:"February", 2:"March", 3:"April", 4:"May", 5:"June",
            6:"July", 7:"August", 8:"September", 9:"October", 10:"November",
            11:"December"};
        //if (!self.startDate.getFullYear()) {
        //    desiredYear = moment().year();
        //}
        //else {
        var desiredYear = self.startDate.year();
        //}
        
        for (i = 0; i<12; i++) {
            if (!monthNames.hasOwnProperty(i)) {
            //The current property is not a direct property of monthNames
                continue;
            }
            if (i >= self.startDate.month() && desiredYear == self.startDate.year()) {
                var month = new Month(monthNames[i] + ' ' + desiredYear);
                month.initCurrentMonthState();
                if (i == self.startDate.month()) {
                    month.monthState.startDay = self.startDate.date();
                }
                monthStates.push(month.monthState);
            }
            if (desiredYear > self.startDate.year()) {
                var month = new Month(monthNames[i] + ' ' + desiredYear);
                month.initCurrentMonthState();
                monthStates.push(month.monthState);
            }
            if (i == 11) {
                i = -1;
                desiredYear += 1;
            }
            if (desiredYear == 2017) {
                break;
            }
        }
        
        return monthStates;
    };
    
    self.getMonthObjects = function() {
        //takes the monthStates from previous method and makes month objects
        // with them
    };
    
    self.generateMonthDivs = function() {
        //generates month Divs (empty div, fills it with correct information)
        //for the month objects in the list
    };
    
    self.storeMonthList = function() {
    };
    
    self.loadMonthList = function() {
    };
};


var Year = function(startDate) {
    // Represents a single calendar year
    
    var self = this;
    self.yearState = emptyYearState();
    self.monthObjects = [];
    if (startDate) {
        self.startDate = moment(startDate);
    }
    else {
        self.startDate = moment();
    }
    
    self.getMonthStatesOfGivenYear = function() {
        var monthStatesOfYear = [];
        var desiredYear = self.startDate.year().toString();
        
        for (month = 1; month < 13; month++) {
            console.log(month);
            if (month >= self.startDate.month()) {
                
                if (month == self.startDate.month()) {
                    var monthprop = new Month(self.startDate.format("YYYY-MM-DD"));
                }
                else {
                    var monthprop = new Month(desiredYear + '-' + month.toString() + '-01');
                }
            monthprop.initCurrentMonthState();
            monthStatesOfYear.push(monthprop.monthState);
                
            }
        }
        return monthStatesOfYear;
    };
    
    self.getMonthObjects = function(state) {
        // Returns an array of 12 month objects with monthStates that
        // correspond to the monthStates stored in yearState.monthStates
        
        // Parameters:
        //   state: array
        //     stores monthStates
        
        monthObjectsArray = [];
        state.forEach (function(state) {
            var monthi = generateMonthObj(state);
            monthObjectsArray.push(monthi);
        })
        return monthObjectsArray;
        
    };
    
    
    self.generateEmptyYearDiv = function(div) {
        // will generate the html for 12 empty month divs
        
        // Parameters:
        //     divClass: string
        // The div where you want to generate the months, must specify
        // whether it is an ID or class. eg ".calendar" or "#month0"
        
        var $div = $(div);
        id = self.yearState.yearGiven.toString();
        $div.append('<div id=' + id + '></div>');
        self.monthObjects.forEach (function(monthObj) { 
            $('#' + id).append('<div class="monthframe" id="' + monthObj.monthState.monthIndex + '-' + monthObj.monthState.monthYear + '" ></div>');
        })
            
        $('#' + id).find('.monthframe').append($('#template').html()); 
    };
    
    
    self.retrieveYearCheckmarks = function(div) {
        // Collects the checked days of the year.
        
        self.monthObjects.forEach( function(month) {
            month.clearCheckedDays();
            month.retrieveCheckedDays(div, month.monthState.monthIndex);
        })
    };
            
    self.fillYearDiv = function(div) {
        // Fills the empty year div with correct month information.
        
        self.monthObjects.forEach( function(month) {
            month.retrieveCheckedDays(div);
            month.generateMonthDiv();
            month.generateCheckmarks();
            month.attachClickHandler();
        });
    
    };
    
    
    self.updateMonthStates = function() {
        // Updates the yearState's monthStates array with current information.
        
        monthStates = [];
        self.monthObjects.forEach (function(monthObj) {     
            var state = extractMonthState(monthObj);
            monthStates.push(state);
        })
        self.yearState = monthStates;
        
    };
    
    self.storeYear = function() {
        // Stores the yearState in localstorage.
        
        var storageItem = self.yearState;
        storeInLocalStorage(yearKey, storageItem);
    };
    
    
    self.loadYear = function() {
        // Loads the yearState from localstorage and returns it. If there
        // is no yearState in localStorage, returns yearState for current year.
        
        var loadedYear = loadFromLocalStorage(yearKey);
        if(loadedYear == undefined){
            return;
        }
        
        return loadedYear;
    };
    
    self.emptyMonthStateArray = function() {
        // Returns an array of 12 empty monthStates.
        
        emptyMonthStateArray = [];
        for(i=0;i<=11;i++) {
            emptyMonthStateArray.push(emptyMonthState());
        }
        return emptyMonthStateArray;
    };
    
    self.clearEmptyWeeks = function() {
        // Gets rid of weeks that are only filled with nill days
        
    };
    
    self.initYearState = function() {
        // initializes year object's yearState, 
        
        //Parameters:
        //desiredYear: int
            //the year you want a calendar generated for
        
        self.yearState.yearGiven = self.startDate.year();
        self.yearState.monthStates = self.getMonthStatesOfGivenYear(self.yearState.yearGiven);
        
    }
    
    self.saveTitle = function() {
        var yearName = document.getElementById('listTitle').value;
        self.yearState.yearName = yearName;
    }
    
    
    
    
    self.initYear = function() {
        clearPage();
        var yState = self.loadYear();
        if (yState == undefined) {
            if (self.startDate === undefined) {
                today = new Date();
                yState = self.initYearState();
            }
            else {
                yState = self.initYearState();
            }
        }
        else {
            self.yearState = yState;
        }
        
        self.monthObjects = self.getMonthObjects(self.yearState.monthStates);
        self.generateEmptyYearDiv('.calendar');
        self.fillYearDiv('.calendar');
    };
    

    
};



var month = new Month();
var year = new Year();
var nextYear = new Year();
