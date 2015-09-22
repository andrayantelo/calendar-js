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
    
});
