var temporaryStorageKey = "temporaryStorageKey"; //temporary storage key for month object
var yearKey = "yearKey"; //temporaryStorageKey for year object
var temporaryStorageKey = "temp";

$(document).ready(function() {
    
    
    
    var defaultDay = moment();
    var defaultDate = defaultDay.format("YYYY-MM-DD");
    $('#startDate').val(defaultDate);
    
    $listTitle = $('#listTitle');
    // FIXME
    //$listTitle.attr('size', $listTitle.attr('placeholder').length + 5);
    //FIXME
    //$description = $('#description');
    //$description.attr('size', $listTitle.attr('placeholder').length);
    
    //START HERE
    
    //var input = document.querySelectorAll('input');
    //for(i=0; i<input.length; i++){
    //    input[i].setAttribute('width',input[i].getAttribute('placeholder').length);
    //}
    
    //FIX ME FIX ME
    function resizeInput() {
        $(this).attr('size', $(this).val().length);
    }
    
    //$('input[type="text"]').each($(this).attr('size', $(this).val().length));
        
    $('input[type="text"]').each(function() {
        $(this).attr('size', $(this).attr('placeholder').length);
    });
    
    $('.dropdown-menu').delegate('li', 'mouseover mouseout', function(event) {
       // makes the red x appear to remove a list item when mouse hovers over item 
       var $this = $(this).find('button');
       
       if(event.type === 'mouseover') {
           $this.stop(true, true).fadeIn();
       } else {
           $this.stop(true, true).fadeOut();
       }
   });
   
    
    //$('.dropdown-menu').find('button').click(function() {
        //var $this = $('.dropdown-menu').find('#' + monthListState.listName);
        //console.log($this);
    //    console.log("removal button was clicked");
    //});
    
    $(".dropdown-menu").on("click", "button", function(e) {
        e.preventDefault();
        if (confirm("Are you sure you want to delete saved calendar?")){
            $(this).parent().remove();
            monthList.removeMonthList(temporaryStorageKey); //eventually the storage keys will be calendar titles
        }
        
        //want to delete calendar from localstorage also have a popup asking if you really want to do that
        
    });
    

    
    $('#saveButton').click(function(){
        if (document.getElementById('listTitle')) {
            monthList.retrieveCheckMarks('.calendar');
            monthList.saveTitle();
            var storageKey = document.getElementById('listTitle').value;
            monthList.storeMonthList(storageKey);
            monthList.generateCalendarMenu($('.dropdown-menu'));
            alert("Progress saved");
        }
        else { prompt("Give the Calendar a Title, Please.")}
    });
    
    $('#clearButton').click(function() {
        console.log("clear button clicked");
        //monthList.monthListState = emptyMonthListState();              I COMMENTED THESE TWO LINES OUT BUT I DON'T KNOW IF THAT CHANGED ANYTHING.
        //monthList.monthObjects = [];
        clearPage();
        
    });
    
    $('#hideButton').click(function() {
        hideTemplate();
    });
    
    $('#startDateButton').click(function() {
        $('#clearButton').click();
        startDate = setStartDate();
        
        monthList.initMonthList(startDate);
    });
    
    
    $('#listTitle').bind("keydown", function(e) {
        if (e.which == 13)
        {
            e.preventDefault();
            console.log("enter was pressed");
            $('#listTitle').blur();
        }
    });
    
    //WHEN PAGE LOADS, CURRENTLY WORKING WITH ONE CALENDAR
    //check if there is any calendar saved in localStorage
    
    $('#clearButton').click();
    
    //var load = monthList.loadMonthList(temporaryStorageKey);
    
    //if (load) {            // IS THIS WRITTEN IN A GOOD WAY?
    //    console.log("When page started, something was found in localstorage")
    //    monthList.monthListState = load;
        
        
    //    monthList.startDateMoment = moment(monthList.monthListState.startDate);
    //    monthList.monthObjects = monthList.getMonthObjects();
        
    //    monthList.generateEmptyMonthDivs('.calendar');
    //    monthList.fillMonthDivs('.calendar');
    //    document.getElementById('listTitle').value = monthList.monthListState.listName;
    //    monthList.generateCalendarMenu($('.dropdown-menu'));
        
        
    //}
    var load = monthList.loadMonthList(temporaryStorageKey);
    document.getElementById('listTitle').value = monthList.monthListState.listName;
    monthList.generateCalendarMenu($('.dropdown-menu'));
    
    
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
    //Parameters:
    // yearsToClear: array
    var yearsToClear = [2015, 2016, 2017, 2018, 2019];
    yearsToClear.forEach(function(year) {
        $('#' + year).remove();
        $('.monthframe').remove();
    })
    
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

var removeCalendarFromStorage = function(storageItemKey){
    // removes item with key storageItemKey from localStorage
    
        localStorage.removeItem(storageItemKey)
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



var Month = function (date) {
    //Represents a single month
    //date format "YYYY-MM-DD" months 1-12 index  (seconds since epoch???)
    
    var self = this;
    self.monthState = emptyMonthState();
    if (date === undefined) {
        self.date = moment();
    }
    else{
        self.date = moment(date, "x");
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
        self.date.set('date', 1);  //NEED TO LOOK FURTHER INTO THIS
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


var setStartDate = function() {
    // return the startDate string, which is given by the user according to
    // their local time zone, given in "YYYY-MM-DD" format
    var startDate = document.getElementById('startDate').value;
    
    return startDate;
};

var emptyMonthListState = function() {
    return{
        //number of milliseconds since the unix epoch to the startdate
        startDate: "",
        //list of years
        years: [],
        //list of month objects monthStates
        monthStates: [],
        //list name under which it will be saved
        listName: ''
    }
};

var MonthList = function() {
    //startDate format "YYYY-MM-DD" with month index starting at 1
    
    var self = this;
    self.monthListState = emptyMonthListState();
    self.monthObjects = [];
    //self.startDateMoment = moment(startDate) || moment();
    self.startDateMoment = moment(); 
    
    self.initState = function(startDate) {
        //initializes monthListState with current info
        self.startDateMoment = moment(startDate);
        self.monthListState.startDate = self.startDateMoment.valueOf(); //THIS MIGHT BE WHERE I NEED TO DO SOME UTC STUFF
        self.monthListState.monthStates = monthList.getMonthStates(12);
        self.monthObjects = monthList.getMonthObjects();
        
    };

    self.getMonthStates = function(numberOfMonths) {
        var desiredYear = self.startDateMoment.year();
        var monthStates = [];
        self.monthListState.years.push(desiredYear);
        
        for (i = self.startDateMoment.month(); i< self.startDateMoment.month() + numberOfMonths; i++) {
            monthIndex = i%12;
            if (monthIndex == self.startDateMoment.month() && desiredYear == self.startDateMoment.year()) {
                console.log("inside first conditional if statement");
                console.log(self.monthListState.startDate);
                var month = new Month(self.monthListState.startDate);
            }
            else {
                monthIndex += 1;
                var dateEpoch = moment(desiredYear.toString() + '-' + monthIndex.toString() + '-01', "YYYY-MM-DD");
                
                var month = new Month(dateEpoch);
            }
            month.initCurrentMonthState();
            monthStates.push(month.monthState);
            if (i == 11) {
                desiredYear += 1;
                self.monthListState.years.push(desiredYear);
            }
            //if (desiredYear == 2017) {
            //    console.log("breaking");
            //    break;
            //}
        }
        return monthStates;
    };
    
    self.getMonthObjects = function() {
        // generate list of monthObjects from list of monthStates
        //DO I WANT TO RETURN A LIST? OR JUST HAVE IT ADD TO THE MONTHOBJECTS ATTRIBUTE
        
        var monthObjects = [];
        self.monthListState.monthStates.forEach(function(monthState) {
            var month = generateMonthObj(monthState);
            monthObjects.push(month)
        })
        return monthObjects;
    };
    
    self.generateEmptyMonthDivs = function(div) {
        //generates empty month Divs 
        //for the month objects in the list
        
        var $div = $(div);
        self.monthListState.years.forEach(function(year) {
            var id = year.toString();
            $div.append('<div id=' + id + '></div>');
            self.monthObjects.forEach (function(monthObj) { 
                if (monthObj.monthState.monthYear == year) {
                    $('#' + id).append('<div class="monthframe" id="' + monthObj.monthState.monthIndex + '-' + monthObj.monthState.monthYear + '" ></div>');
                }
            })
            $('#' + id).find('.monthframe').append($('#template').html()); 
        })
    };
    
    self.fillMonthDivs = function(div) {
        // fill the empty month divs with correct information.
        self.monthObjects.forEach( function(month) {
            month.retrieveCheckedDays(div);
            month.generateMonthDiv();
            month.generateCheckmarks();
            month.attachClickHandler();
        });
    };
    
    self.retrieveCheckMarks = function(div) {
        self.monthObjects.forEach( function(month) {
            month.clearCheckedDays();
            month.retrieveCheckedDays(div, month.monthState.monthIndex);
        })
    };
    
    self.saveTitle = function() {
        var title = document.getElementById('listTitle').value;
        if (title) {
            var calendarName = document.getElementById('listTitle').value;
            console.log("this is the calendar name" + " " + calendarName);
        }
        
        else { 
           var calendarName = prompt("You must enter a list title");
           if (calendarName === null) {
               return;
               
           }
           while (!calendarName) { 
               var calendarName = prompt("You must enter a list title");
               }
           
           }
        self.monthListState.listName = calendarName;
        //document.getElementById('listTitle').value = calendarName;
        
        
    }
    
    self.storeMonthList = function(yearKey) {
        //stores item into localStorage under key yearKey
        
        var storageItem = self.monthListState;
        storeInLocalStorage(yearKey, storageItem);
    };
    
    self.loadMonthList = function(yearKey) {
        //loads item with key yearKey from localStorage
        var loadedYear = loadFromLocalStorage(yearKey);
        return loadedYear;
    };
    
    self.removeMonthList = function(yearKey) {
        // removes item with key yearKey from localStorage
        removeCalendarFromStorage(yearKey);
        console.log('item was removed');
    };
        
    
    self.initMonthList = function(startDate) {
        monthList.initState(startDate);
        monthList.generateEmptyMonthDivs('.calendar');
        monthList.fillMonthDivs('.calendar');
    };
    
    self.generateCalendarMenu = function(menuClass) {
        //fills the saved calendars tab in the nav bar with the titles
        // of the saved calendars
         //if (!self.isOk) {
         //   console.log("Could not generate listmenu");
         //   updateFlag(self);
         //   return self;
        //}
            
        $(menuClass).empty();
        var listName = self.monthListState.listName 
        //self.monthListState.forEach( function(listName) {
        $(menuClass).append('<li class="dropdown-option" id="' + listName + '"><a href="#">' + listName + '<button id="removalButton">X</button></li>');
        //});
    };
    
    
   
};

var emptyCalendarsState = function() {
    return{
        //list of titles of saved calendars
        savedCalendars: []
    }
};

var Calendars = function(storageKey) {
    var self = this;
    self.calendarsState = emptyCalendarsState();
    self.storageKey = storageKey;
    // The calendars object has an attribute calendarsState, which in it
    // has an array of savedCalendars under their titles. If you want
    // to access a calendar, you get the title from this array, and look
    // into localStorage using that title (because it is saved under it's title
    // name) and the object you retrieve is that calendar's monthList state. 
    // which you can use to generate that calendar's month divs. 
    
    self.generateCalendarMenu = function(menuClass) {
        //fills the saved calendars tab in the nav bar with the titles
        // of the saved calendars
         //if (!self.isOk) {
         //   console.log("Could not generate listmenu");
         //   updateFlag(self);
         //   return self;
        //}
        
        // each item is going to have to have it's own unique ID
            
        $(menuClass).empty();
        var listName = self.monthListState.listName 
        //self.monthListState.forEach( function(listName) {
        $(menuClass).append('<li class="dropdown-option"><a href="#">' + listName + '</a></li>');
        //});
    };
    
    self.storeState = function(self.storageKey) {
        //stores the calendars state (the titles of the savedCalendars)
        var storageItem = self.calendarsState 
        storeInLocalStorage(self.storageKey, storageItem);
    };
    
    self.loadState = function(self.storageKey) {
        //load the calendars state
        var loadedCalendars = loadFromLocalStorage(storageKey);
        return loadedCalendars;
    };
    
    self.addToSavedCalendars = function(calendarToSave) {
        //add title to savedCalendars array in the calendarsState
        self.calendarsState.savedCalendars.push(calendarToSave);
    };
    
    self.removeFromSavedCalendars = function(calendarToRemove) {
        //removes title from savedCalendars array in the calendarsState
        var indexOfCalendar = self.calendarsState.savedCalendards.indexOf(calendarToRemove);
        if (index > -1) {
            self.calendarsSate.savedCalendars.splice(indexOfCalendar, 1);
        }
    };
    
};



var month = new Month();
var monthList = new MonthList();
var calendars = new Calendars();
