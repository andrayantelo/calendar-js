//Test code for calendar.js

function createUlFixture() {
    var $qunit = $('#qunit-fixture');
    var fixture = $('#qunit-fixture').append("<ul></ul>");
    
};
    
//UTILITY/HELPER FUNCTION TESTS

test("checkFirstOf test", function() {
    var fixture = $('#qunit-fixture');
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
    var fixture = $('#qunit-fixture');
    fixture.append('<div id="template"></div>');
    hideTemplate();
    equal(fixture.find('#template').attr('class'), 'hidden');
    hideTemplate();
    equal(fixture.find('#template').attr('class'), "");
});

test("clearPage test", function() {
    var fixture = $('#qunit-fixture');
    fixture.append('<div class="container"><div class="monthframe">\
    </div</div>');
    clearPage();
    equal(fixture.find('.monthframe').length, 0);
});

test("storeInLocalStorage test", function() {
    var storeItem = [1, 2, 3];
    var storeKey = 'key';
    storeInLocalStorage(storeKey, storeItem);
    deepEqual(JSON.parse(localStorage.getItem(storeKey)), storeItem);
});

test("loadFromLocalStorage test", function() {
    var storeKey = 'itemkey';
    equal(loadFromLocalStorage(storeKey), undefined);
    var storeItem = [1, 2, 3];
    localStorage.setItem(storeKey, JSON.stringify(storeItem));
    deepEqual(loadFromLocalStorage(storeKey), storeItem);
});

localStorage.clear();

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

test("determineYearType test", function() {
    var rightNow = new Date("September 22 2015");
    equal(determineYearType(rightNow), "common");
    var then = new Date("October 1904");
    equal(determineYearType(then), "leap");
    var today = new Date();
    equal(determineYearType(today), determineYearType(today.getFullYear()));
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
    equal(yState.yearType, "common");
    equal(yState.yearGiven, '');
    yState.yearGiven = 2015;
    notEqual(yState.yearGiven, '');
});

test("attachClickHandler test", function() {
    var testMonth = new Month();
    testMonth.monthState.monthId = "month0";
    var fixture = $('#qunit-fixture');
    fixture.append('<div id="month0"><div class="cell"><div class="one"></div>\
    <div class="two" class="hidden"></div></div></div>');
    testMonth.attachClickHandler();
    $('.cell').click();
    equal(fixture.find('.one').attr('class'), 'one hidden');
    $('.cell').click();
    equal(fixture.find('.one').attr('class'), 'one');
});

test("clearMonthDiv test", function() {
});

