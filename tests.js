//Test code for calendar.js

function createUFixture() {
    var $qunit = $('#qunit-fixture');
    return $qunit;
    
};
    
//UTILITY/HELPER FUNCTION TESTS

test("setStartDate test", function() {
    var fixture = createUFixture();
    fixture.append("<input type='date' id='startDate'/>");
    fixture.find('#startDate').val('2015-11-04');
    equal(fixture.find('input[type=date]').val(), '2015-11-04');
    startDate = setStartDate();
    deepEqual(startDate, moment('2015-11-04'));
});


test("checkFirstOf test", function() {
    var fixture = createUFixture(); 
    fixture.append(
    "<div class='monthframe'>\
     <div class='cell'><div class='daynumber' class='hidden'></div>\
     <div class='second'></div></div><div class='cell'><div class=\
     'daynumber' class='hidden'></div><div class='third'></div></div><div>");
     
     checkFirstOf();
     equal(fixture.find('.second').attr('class'), "second hidden");
     equal(fixture.find('.third').attr('class'), "third");
     checkFirstOf();
     equal(fixture.find('.second').attr('class'), 'second');
     
});

test("hideTemplate test", function() {
    var fixture = createUFixture(); 
    fixture.append('<div id="template"></div>');
    hideTemplate();
    equal(fixture.find('#template').attr('class'), 'hidden');
    hideTemplate();
    equal(fixture.find('#template').attr('class'), "");
});

test("clearPage test", function() {
    var fixture = createUFixture(); 
    fixture.append('<div class="container"><div class="monthframe">\
    </div</div>');
    clearPage();
    equal(fixture.find('.monthframe').length, 0);
});

module( "Storage tests", {
  beforeEach: function() {
    // prepare something for all following tests
    localStorage.clear()
  },
  afterEach: function() {
    // clean up after each test
    localStorage.clear()
  }
});

test("storeInLocalStorage test", function() {
    var storeItem = [1, 2, 3];
    var storeKey = 'key';
    storeInLocalStorage(storeKey, storeItem);
    deepEqual(JSON.parse(localStorage.getItem(storeKey)), storeItem);
});

test("loadFromLocalStorage test", function() {
    var storeKey = 'key';
    equal(loadFromLocalStorage(storeKey), undefined);
    var storeItem = [1, 2, 3];
    localStorage.setItem(storeKey, JSON.stringify(storeItem));
    deepEqual(loadFromLocalStorage(storeKey), storeItem);
});

test("loadMonth test", function() {
    var testMonth = new Month();
    testMonth.monthState.monthId = "testMonth";
    equal(testMonth.monthState.monthId, 'testMonth');
    equal(testMonth.loadMonth(), undefined);
    localStorage.setItem(testMonth.monthState.monthId, JSON.stringify(testMonth.monthState));
    deepEqual(testMonth.loadMonth(), testMonth.monthState);
});



test("storeMonth test", function() {
    var testMonth = new Month();
    testMonth.monthState.monthId = 'testMonth';
    equal(testMonth.loadMonth(), undefined);
    testMonth.storeMonth();
    deepEqual(testMonth.loadMonth(), testMonth.monthState);
});




test("getMonthsOfGivenYear test", function() {
    var monthNames = {
            0:"January", 1:"February", 2:"March", 3:"April", 4:"May", 5:"June",
            6:"July", 7:"August", 8:"September", 9:"October", 10:"November",
            11:"December"};
    var months = getMonthsOfGivenYear(2013);
    equal(months.length, 12);
    var bool = false;
    for (i=0;i<=11;i++){
         bool = months[i] instanceof Month
         equal(bool, true);
         bool = months[i].monthState.monthName === monthNames[i];
         equal(bool, true); 
    }
    var months = getMonthsOfGivenYear();
    equal(months[0].monthState.monthYear, 2015);
});

test("getMonthIndex test", function() {
    equal(getMonthIndex('October 2014'), 9);
    var today = new Date();
    equal(getMonthIndex(), today.getMonth());
});

test("getMonthName test", function() {
    equal(getMonthName(9), "October");
    var today = new Date();
    equal(getMonthName(), getMonthName(today.getMonth()));
});

test("getNumberOfDays test", function() {
    var today = new Date();
    var monthNames = {
            0:"January", 1:"February", 2:"March", 3:"April", 4:"May", 5:"June",
            6:"July", 7:"August", 8:"September", 9:"October", 10:"November",
            11:"December"};
    equal(getNumberOfDays('October 2015'), 31);
    equal(getNumberOfDays('February 2016'), 29);
    equal(getNumberOfDays('February 2015'), 28);
    console.log(monthNames[today.getMonth()] + ' ' + today.getFullYear());
    equal(getNumberOfDays(), getNumberOfDays(monthNames[today.getMonth()] + ' ' + today.getFullYear()));
});

test("getYear test", function() {
    var today = new Date();
    equal(getYear('October 2014'), '2014');
    equal(getYear(), today.getFullYear());
});

test("diffBetweenDays test", function() {
    first = new Date("October 15 1986");
    second = new Date("October 12 1986");
    equal(diffBetweenDays(first, second), 3);
    first = new Date("January 1 2015");
    second = new Date("January 1 2014");
    equal(diffBetweenDays(first, second), 365);
});

test("getDayOfWeek test", function() {
    birthday = new Date("October 12 1986");
    equal(getDayOfWeek(birthday), 0);
    today = new Date();
    equal(getDayOfWeek(), today.getDay());
    
});


test("generateMonthObj test", function() {
    var mState = {"test":1, "monthName":"September"};
    var testObj = generateMonthObj(mState);
    equal(testObj instanceof Month, true);
    equal(testObj.monthState.monthYear, undefined);
    equal(testObj.monthState.monthName, "September");
});

test("extractMonthState test", function() {
    var testMonth = new Month("October 12 1986");
    deepEqual(extractMonthState(testMonth), emptyMonthState());
    equal(extractMonthState(testMonth) instanceof Object, true);
});

test("generateYearObj test", function() {
    var yState = {"test":2, yearGiven: 2015}
    var testYear = generateYearObj(yState);
    equal(testYear instanceof Year, true);
    equal(testYear.yearState.yearName, undefined);
    equal(testYear.yearState.yearGiven, 2015);  
});

test("ExtractYearState test", function() {
    var yState = {"test":2, yearGiven: 2015}
    var testYear = generateYearObj(yState);
    equal(extractYearState(testYear), yState);
});

test("emptyMonthState test", function() {
    var mState = emptyMonthState();
    equal(mState.firstIndex, 4);
    equal(mState.numberOfDays, 31);
    deepEqual(mState.checkedDays, {});
    mState.monthName = "October";
    mState = emptyMonthState();
    equal(mState.monthName, '');
});

test("monthObject test", function() {
    var newMonth = new Month("October 2015");
    equal(newMonth instanceof Month, true);
    equal(newMonth.date instanceof Date, true);
    deepEqual(newMonth.monthState, emptyMonthState());
    var newMonth = new Month();
    equal(newMonth instanceof Month, true);
    equal(newMonth.date instanceof Date, true);
    today = new Date();
    equal(newMonth.date.getFullYear(), today.getFullYear());
});

test("emptyYearState test", function() {
    yState = emptyYearState();
    deepEqual(yState, emptyYearState());
    equal(yState.yearGiven, '');
    yState.yearGiven = 2015;
    notEqual(yState.yearGiven, '');
});

var testMonth 

module( "MonthObj tests", {
  beforeEach: function() {
    // prepare something for all following tests
    localStorage.clear()
    testMonth = new Month();
    testMonth.monthState.monthId = "month0";
    testMonth.monthIndex = 0;
    return testMonth;
    
  },
  afterEach: function() {
    // clean up after each test
    localStorage.clear()
  }
});

test("attachClickHandler test", function() {
    var fixture = createUFixture(); 
    fixture.append('<div id="qunit-fixture"><div id="0"><div class="cell"><div class="one"></div>\
    <div class="two" class="hidden"></div></div></div></div>');
    testMonth.attachClickHandler('#qunit-fixture');
    $('.cell').click();
    equal($('#qunit-fixture').find('.one').attr('class'), 'one hidden');
    $('.cell').click();
    equal($('#qunit-fixture').find('.one').attr('class'), 'one');
});

test("clearMonthDiv test", function() {
    var fixture = createUFixture(); 
    fixture.append('<div id="0" >\
        <div class="header">\
            <span class="month-year"> 2015 </span>\
        </div>\
        <table class="month"><tbody><tr class="week">\
        <td class="aDay"><div class="cell">\
        <div class="daynumber">1</div><i class="fa fa-check hidden"></i></div></td> \
        <td class="aDay"><div class="cell"><div class="daynumber">2</div>\
        <i class="fa fa-check hidden"></i></div></tr></tbody></table>');
    equal($('#0').find('.header').find('.month-year').text(), 2015);
    testMonth.clearMonthDiv('#qunit-fixture');
    equal($('#qunit-fixture').find('#0').find('.header').find('.month-year').text(), '');
    equal($('#qunit-fixture').find('#0').find('.aDay').children().attr('class'), 'nill');
    
});


test("generateEmptyMonthDiv test", function() {
    var fixture = createUFixture(); 
    fixture.append('<div id="0"></div>');
    equal($('#0').text(), '');
    testMonth.generateEmptyMonthDiv('#0');
    equal($('#0').children().attr('class'), 'monthframe');
});

test("generateMonthDiv test", function() {
    var fixture = createUFixture(); 
    fixture.append('<div id="0"></div>');
    testMonth.generateEmptyMonthDiv('#0');
    testMonth.generateMonthDiv();
    equal($('#0').find('.month-year').text(), testMonth.monthState.monthName + " " + testMonth.monthState.monthYear);
    equal($('.monthframe').children().attr('class'), 'header')
});

test("generateCheckMarks test", function() {
    testMonth.monthState.checkedDays = {0:"1", 1:"2" };
    var fixture = createUFixture(); 
    fixture.append('<div id="qunit-fixture"><div id="0">\
    <table class="month">\
    <tr>\
    <td class="aDay">\
    <div class="cell"><div class="daynumber" daynumber="1">1</div>\
    <i class="fa fa-check hidden"></i></div>\
    </td>\
    <td class="aDay">\
    <div class="cell"><div class="daynumber" daynumber="2">2</div>\
    <i class ="fa fa-check hidden"></i></div>\
    </td>\
    </tr>\
    </table></div></div>');
    testMonth.generateCheckmarks('#qunit-fixture', 0);
    equal($('#qunit-fixture').find('.cell').find('.daynumber').attr('class'), 'daynumber hidden');
    fixture.find('.cell').children().toggleClass('hidden');
    testMonth.monthState.checkedDays = {};
    testMonth.generateCheckmarks('#qunit-fixture');
    equal($('#qunit-fixture').find('.cell').find('.daynumber').attr('class'), 'daynumber');

});

test("retrieveCheckedDays test", function() {
    testMonth.monthState.dayIndex = {1:0, 2:1};
    testMonth.monthState.checkedDays = {};
    var fixture = createUFixture(); 
    fixture.append('<div id="0"><table class="month"><td class="aDay"><div class="cell"><div class="daynumber hidden" daynumber="1">1</div>\
    <i class="fa fa-check"></i></div></td><td class="aDay"><div class="cell"><div class="daynumber" daynumber="2">2</div>\
    <i class ="fa fa-check hidden"></i></div></td></table></div>');
    testMonth.retrieveCheckedDays('#qunit-fixture');
    deepEqual(testMonth.monthState.checkedDays, {0:"1"})
    
});
//don't know if I need this one
//test("initializeMonthDiv test", function() {
//});

test("clearCheckmarks test", function() {
    testMonth.monthState.checkedDays = {0:"1"};
    testMonth.clearCheckmarks();
    deepEqual(testMonth.monthState.checkedDays, {});
});

test("initCurrentMonthState test", function() {
    var newMonth = new Month("November 2015");
    deepEqual(newMonth.monthState, emptyMonthState());
    newMonth.initCurrentMonthState();
    equal(newMonth.monthState.monthName, "November");
    equal(newMonth.monthState.monthYear, 2015);
    equal(newMonth.monthState.numberOfDays, 30);
    equal(newMonth.monthState.firstIndex, 0);
});

test("addAttrToMonthFrame test", function() {
    var fixture = createUFixture(); 
    fixture.append('<div class="test"></div>');
    testMonth.monthState.monthIndex = 0;
    testMonth.addAttrToMonthFrame(".test");
    equal(fixture.find('.test').attr('id'), '0');
});

var testYear 

module( "yearObj tests", {
  beforeEach: function() {
    // prepare something for all following tests
    localStorage.clear()
    testYear = new Year();
    return testYear;
    
  },
  afterEach: function() {
    // clean up after each test
    localStorage.clear()
  }
});

test("yearObj test", function() {
    deepEqual(testYear.yearState, emptyYearState());
    deepEqual(testYear.monthObjects, []);
});

test("getMonthStatesOfGivenYear test", function() {
    testYear.yearState.monthStates = testYear.getMonthStatesOfGivenYear(2015);
    equal(testYear.yearState.monthStates.length, 12);
    ok(testYear.yearState.monthStates instanceof Array); 
    equal(testYear.yearState.monthStates[0].monthName, "January");
    equal(testYear.yearState.monthStates[11].monthName, "December");
});

test("getMonthObjects test", function() {
    var monthStates = [{monthName: "January", monthYear:2015}, {monthName: "February",
        monthYear:2015}, {monthName: "March", monthYear: 2015}];
    testYear.monthObjects = testYear.getMonthObjects(monthStates);
    equal(testYear.monthObjects.length, 3);
    ok(testYear.monthObjects instanceof Array);
    ok(testYear.monthObjects[0] instanceof Month);
    equal(testYear.monthObjects[0].monthState.monthName, "January");
});

test("generateEmptyYearDiv test", function() {
    var fixture = createUFixture(); 
    fixture.append('<div id="template"> <p>Template text.</p></div><div class="test"></div>');
    var month1 = new Month("January 2015");
    month1.monthState.monthIndex = 0;   
    var month2 = new Month("February 2015")
    month2.monthState.monthIndex = 1;
    testYear.monthObjects = [month1, month2];
    equal(fixture.find('.test').children().attr('class'), undefined);
    testYear.generateEmptyYearDiv(fixture.find('.test'));
    equal(fixture.find('.test').children().attr('class'), 'monthframe');
    equal(fixture.find('.test').children().attr('id'), '0');
    
});

test("retrieveYearCheckmarks test", function() {
    var monthStates = [{monthName: "January", monthYear:2015, checkedDays: {},
        dayIndex:{1:0, 2:1}, monthIndex: 0},{monthName: "February",
        monthYear:2015, checkedDays: {}, dayIndex:{1:0, 2:1}, monthIndex: 1}];
    testYear.monthObjects = testYear.getMonthObjects(monthStates);
    equal(testYear.monthObjects.length, 2);
    deepEqual(testYear.monthObjects[0].monthState.checkedDays, {});
    deepEqual(testYear.monthObjects[1].monthState.checkedDays, {});
    var fixture = createUFixture(); 
    fixture.append('\
    <div id="0">\
    <table class="month">\
    <tr>\
    <td class="aDay">\
    <div class="cell"><div class="daynumber hidden" daynumber="1">1</div>\
    <i class="fa fa-check"></i></div></td>\
    <td class="aDay"><div class="cell"><div class="daynumber" daynumber="2">2</div>\
    <i class ="fa fa-check hidden"></i></div>\
    </td>\
    </tr>\
    <\table>\
    </div>\
    <div id="1">\
    <table class="month">\
    <tr>\
    <td class="aDay">\
    <div class="cell"><div class="daynumber hidden" daynumber="1">1</div>\
    <i class="fa fa-check"></i></div></td>\
    <td class="aDay"><div class="cell"><div class="daynumber" daynumber="2">2</div>\
    <i class ="fa fa-check hidden"></i></div>\
    </td>\
    </tr>\
    </table>\
    </div>\
    ');
    testYear.retrieveYearCheckmarks('#qunit-fixture');
    deepEqual(testYear.monthObjects[0].monthState.checkedDays, {0:"1"});
    deepEqual(testYear.monthObjects[1].monthState.checkedDays, {0:"1"});
    
});


test("fillYearDiv test", function() {
    expect(0);
    var monthStates = [{monthName: "January", monthYear:2015, checkedDays: {},
        dayIndex:{1:0, 2:1}, monthIndex: 0, firstIndex: 0, numberOfDays: 2},
        {monthName: "February", monthYear:2015, checkedDays: {}, dayIndex:{1:0, 2:1},
        monthIndex: 1, firstIndex: 0, numberOfDays: 2}];
    testYear.monthObjects = testYear.getMonthObjects(monthStates);
    var fixture = createUFixture(); 
    //January has day 1 checked
    //February has day 1 checked
    fixture.append('\
    <div class = ".monthframe" id="0">\
    <table class="month">\
    <tr>\
    <td class="aDay">\
    </td>\
    <td class="aDay"></div>\
    </td>\
    </tr>\
    <\table>\
    </div>\
    <div class=".monthframe" id="1">\
    <table class="month">\
    <tr>\
    <td class="aDay">\
    </td>\
    <td class="aDay">\
    </td>\
    </tr>\
    </table>\
    </div>\
    ');
    testYear.yearState.monthStates = monthStates;
    testYear.fillYearDiv('#qunit-fixture');
    console.log(testYear.monthObjects);
    console.log(fixture.find('#0').html());
    
});


