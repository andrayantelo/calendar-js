 /*   alert("this works");  */
 var $cal = $(".calendar")

var createMonth = function() {
    
    console.log("this is happening"); // check if it's working
    
    var months = ["January", "February", "March", "April", "May", "June", 
                  "July", "August", "September", "October", "November", 
                  "December"];
                  
    var monthYear = [".month-year-0", ".month-year-1", ".month-year-2",
                      ".month-year-3", ".month-year-4", ".month-year-5",
                      ".month-year-6", ".month-year-7", ".month-year-8",
                      ".month-year-9", ".month-year-10", ".month-year-11",];
    
    for (i = 0; i< months.length; i ++) {
        
        for (j = 0; j < monthYear.length; j ++) {
            
        $(".calendar .monthframe").children(monthYear[j]).each(function () {
            $(this).text('hello world'); });
        
        };
    };
    
    
};


$(document).ready(function() {

    $(".cell").click(function (event) {
        console.log(event);  // prints so you can look at the event object in the console
        $( this ).children().toggleClass("hidden");
       })
    
    createMonth();
       
});


/* var CALENDAR = function() {
    
    var wrap, label, 
        months = ["January", "February", "March", "April", "May", "June", 
                  "July", "August", "September", "October", "November", 
                  "December"];
                  
    function init(newWrap) {
        wrap = $(newWrap || "#calendar");
        label = wrap.find("#label");
        wrap.find("#prev").bind("click.calendar", function () { switchMonth(false);});
        wrap.find("#next").bind("click.calendar", function () { switchMonth(true);});
        label.bind("click", function() {switchMonth(null, new Date().getMonth(), new Date().getFullYear()); });
        label.click()
        
    }
    
    function switchMonth(next, month, year) {
        
        var curr = label.text().trim().split(" "), calendar, tempYear = parseInt(curr[1], 10);
        month = month || ((next) ? ( (curr[0] === "December") ? 0: months.indexOf(curr[0]) + 1) : ( (curr[0] ==="January") ? 11: months.indexOf(curr[0]) - 1 ));
        year = year || ((next && month === 0) ? tempYear + 1 : (!next && month === 11) ? tempYear - 1 : tempYear);
        
    }
    
    function createCal(year, month) {
        $('#calendar-frame', wrap)
            .find('.curr')
                .removeClass('curr')
                .addClass('temp')
            .end()
            .prepend(calendar.calendar())
            .find('temp')
                .fadeOut('slow', function() { $(this).remove(); });
            
        $('#label').text(calendar.label);
        
    }
    createCal.cache = {};
    return {
        init: init,
        switchMonth: switchMonth;
        createCal: createCal;
    };
};
*/
