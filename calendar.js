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

var sampleHTML = '<tr class="week"><td class="aDay"><div class="nill"> \
</div></td><td class="aDay"><div class="nill"></div></td><td class="aDay"> \
<div class="nill"></div></td><td class="aDay"><div class="cell">\
<div class="daynumber">1</div><i class="fa fa-check hidden"></i></div></td> \
<td class="aDay"><div class="cell"><div class="daynumber">2</div>\
<i class="fa fa-check hidden"></i></div></td><td class="aDay"><div class="cell"> \
<div class="daynumber">3</div><i class="fa fa-check hidden"></i></div></td>\
<td class="aDay"><div class="cell"><div class="daynumber">4</div>\
<i class="fa fa-check hidden"></i></div></td></tr><tr class="week">\
<td class="aDay"><div class="cell"><div class="daynumber">5</div>\
<i class="fa fa-check hidden"></i></div></td><td class="aDay"><div class="cell">\
<div class="daynumber">6</div><i class="fa fa-check hidden"></i></div></td>\
<td class="aDay"><div class="cell"><div class="daynumber">7</div><i class="fa fa-check hidden"></i>\
</div></td><td class="aDay"><div class="cell"><div class="daynumber">8</div>\
<i class="fa fa-check hidden"></i></div></td><td class="aDay"><div class="cell">\
<div class="daynumber">9</div><i class="fa fa-check hidden"></i></div></td>\
<td class="aDay"><div class="cell"><div class="daynumber">10</div>\
                                <i class="fa fa-check hidden"></i>\
                            </div>   \
                        </td>\
                        <td class="aDay">\
                            <div class="cell">\
                                <div class="daynumber">11</div>\
                                <i class="fa fa-check hidden"></i>\
                            </div>    \
                        </td>\
                    </tr>\
                    <tr class="week">\
                        <td class="aDay">\
                            <div class="cell">\
                                <div class="daynumber">12</div>\
                                <i class="fa fa-check hidden"></i>\
                            </div>    \
                        </td>\
                        <td class="aDay">\
                            <div class="cell">\
                                <div class="daynumber">13</div>\
                                <i class="fa fa-check hidden"></i>\
                            </div>    \
                        </td>\
                        <td class="aDay">\
                            <div class="cell">\
                                <div class="daynumber">14</div>\
                                <i class="fa fa-check hidden"></i>\
                            </div>    \
                        </td>\
                        <td class="aDay">\
                            <div class="cell">\
                                <div class="daynumber">15</div>\
                                <i class="fa fa-check hidden"></i>\
                            </div>    \
                        </td>\
                        <td class="aDay">\
                            <div class="cell">\
                                <div class="daynumber">16</div>\
                                <i class="fa fa-check hidden"></i>\
                            </div>    \
                        </td>\
                        <td class="aDay">\
                            <div class="cell">\
                                <div class="daynumber">17</div>\
                                <i class="fa fa-check hidden"></i>\
                            </div>    \
                        </td>\
                        <td class="aDay">\
                            <div class="cell">\
                                <div class="daynumber">18</div>\
                                <i class="fa fa-check hidden"></i>\
                            </div>    \
                        </td>\
                    </tr>\
                    <tr class="week">\
                         <td class="aDay">\
                            <div class="cell">\
                                <div class="daynumber">19</div>\
                                <i class="fa fa-check hidden"></i>\
                            </div>    \
                        </td>\
                        <td class="aDay">\
                            <div class="cell">\
                                <div class="daynumber">20</div>\
                                <i class="fa fa-check hidden"></i>\
                            </div>   \
                        </td>\
                        <td class="aDay">\
                            <div class="cell">\
                                <div class="daynumber">21</div>\
                                <i class="fa fa-check hidden"></i>\
                            </div>    \
                        </td>\
                        <td class="aDay">\
                            <div class="cell">\
                                <div class="daynumber">22</div></div>\
                                <i class="fa fa-check hidden"></i>\
                            </div>    \
                        </td>\
                        <td class="aDay">\
                            <div class="cell">\
                                <div class="daynumber">23</div>\
                                <i class="fa fa-check hidden"></i>\
                            </div>    \
                        </td>\
                        <td class="aDay">\
                            <div class="cell">\
                                <div class="daynumber">24</div>\
                                <i class="fa fa-check hidden"></i>\
                            </div>    \
                        </td>\
                        <td class="aDay">\
                            <div class="cell">\
                                <div class="daynumber">25</div>\
                                <i class="fa fa-check hidden"></i>\
                            </div>    \
                        </td>\
                    </tr>\
                    <tr class="week">\
                        <td class="aDay">\
                            <div class="cell">\
                                <div class="daynumber">26</div>\
                                <i class="fa fa-check hidden"></i>\
                            </div>    \
                        </td>\
                        <td class="aDay">\
                            <div class="cell">\
                                <div class="daynumber">27</div>\
                                <i class="fa fa-check hidden"></i>\
                            </div>    \
                        </td>\
                        <td class="aDay">\
                            <div class="cell">\
                                <div class="daynumber">28</div>\
                                <i class="fa fa-check hidden"></i>\
                            </div>    \
                        </td>\
                        <td class="aDay">\
                            <div class="cell">\
                                <div class="daynumber">29</div>\
                                <i class="fa fa-check hidden"></i>\
                            </div>    \
                        </td>\
                        <td class="aDay">\
                            <div class="cell">\
                                <div class="daynumber">30</div>\
                                <i class="fa fa-check hidden"></i>\
                            </div>    \
                        </td>\
                        <td class="aDay">\
                            <div class="cell">\
                                <div class="daynumber">31</div>\
                                <i class="fa fa-check hidden"></i>\
                            </div>    \
                        </td>\
                        <td class="aDay">\
                            <div class="nill">\
                            </div>  \
                        </td>\
                    </tr>\
                </tbody>'
//use regex to take away all the white spaces
var sampleHTML = sampleHTML.replace(/\s+/g, ''); 
$(document).ready(function() {

    $(".cell").click(function (event) {
        console.log(event);  // prints so you can look at the event object in the console
        $( this ).children().toggleClass("hidden");// toggles between hidden and daynumber/fa fa-check
       });
    
    $('#saveButton').click(function(){
        storeMonthHTML($month);
        alert("Progress saved");
    });
    
    $('#clearButton').click(function() {
        replaceMonthHTML($month, sampleHTML);
        
    });
    
    var loadMonth = loadMonthHTML(temporaryStorageKey, "");
    if (!loadMonth) {
        return;
    }
    else {replaceMonthHTML($month, loadMonth);}
    
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
       console.log(storageItem);
        
       return storageItem
       }
         
};


function collectTdChildrenHTML(theWeekRow){
        //returns an array with the inner html of the top level children of each 'td'
        var tdChildrenHTML = new Array();

        theWeekRow.find('td').children().each(function(){
         //array.push($(this).attr('class')); 
             tdChildrenHTML.push($(this).html());
         });      

        return tdChildrenHTML;
        };

function collectMonthHTML(monthSelector) {
    //returns the inner html of the table with class .month  
    var monthHTML = monthSelector.html();
    
    return monthHTML;
};

function replaceMonthHTML(monthSelector, replacementHTML) {   // CURRENT LINE is this what I want
    //replaces the inner HTML of each td with new HTML
    monthSelector.html(replacementHTML);
    
};


var storeMonthHTML = function(monthSelector) {    //CURRENT LINE working on storing and reloading
    //will store the HTML of the table with class .month
    var storageItem = monthSelector.html();
    storeInLocalStorage(temporaryStorageKey, storageItem);
    
};

var loadMonthHTML = function(storageItemKey, substituteItem) {
    //loads the stored HTML of the table with class .month from localstorage
    return loadFromLocalStorage(storageItemKey, substituteItem);
};


var clearCheckMarks = function() {
    //this will clear checkmarks from the month
    return;
};
