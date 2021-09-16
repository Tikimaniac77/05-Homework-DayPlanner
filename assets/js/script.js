var hourSlot = 9;
var hourAMPM = "AM";
var idHourSlot = 9;

var storedInput = [];
var storedInputName = "Stored Input";


// generates hour blocks/text using moment.js & generates text box for input, and save button/block. using jQuery.
function createHourSlots(events)
{
    if(!events){
        events = 1;
    }

    var timeNow = moment().format('LT');

    for(var i = 0; i < events; i++) {

        var textTime = hourSlot + hourAMPM;
        var divID = idHourSlot; // need to adjust this to match same hours as each row time
        
        EcreateBlock = $('<div>').addClass('row py-1');

        EcreateHourText = $('<h2>').addClass(' text-center').text(textTime);
        EcreateHourBlock = $('<div>').addClass('hour col-2 py-3 align-middle border border-primary').append(EcreateHourText);

        EcreateTextBlock = $('<textarea>').addClass('col-8 py-3 overflow-auto border border-primary').text('').attr("id", divID);
        hourColors(EcreateTextBlock, timeNow, textTime);

        EcreateSaveBtn = $('<button>').addClass('saveBtn i:hover').html('Save');
        
        EcreateSaveBlock = $('<div>').addClass('col-1 py-3 saveBlock border border-primary').append(EcreateSaveBtn);

        EcreateBlock.append(EcreateHourBlock, EcreateTextBlock, EcreateSaveBlock);

        $('#scheduler').append(EcreateBlock);

        changeHourSlot();
        changeIdHourSlot();
        
    }
}



// note: missing proper time block classes that are MILITARY time - AA
function hourColors() {
    // get current hours using moment military time
    var currentHour = moment().hours();
    // loop through the timeblocks so we can check at each block
    $('.row').each(function() {
        var eachSlot = parseInt($(this).attr('id'))
        console.log(eachSlot);
        if( eachSlot < currentHour){
            
            $(this).addClass('past')
        } else if ( eachSlot === currentHour){
            
            $(this).removeClass('past');
            $(this).addClass('present')

        } else {
            
            $(this).removeClass('past');
            $(this).removeClass('present');
            $(this).addClass('future');
        }
    })
    
}




//cycles hours displayed to page
function changeHourSlot() {
    if (hourSlot === 12) {
        //change hour to 1 after 12pm
        hourSlot = 1;
    } else if(hourSlot === 11) {
        //to change AM to PM
        hourAMPM = "PM";
        hourSlot++;
    } else {
        hourSlot++;
    }    
}

function changeIdHourSlot() {
    if (idHourSlot === 12) {
        //change hour to 1 after 12pm
        idHourSlot = 1;
    } else {
        idHourSlot++;
    }    
}


function alterStoredInput(Text,ID){
    input = {
        id :  ID,
        input : Text.trim()
    }

    for(var i = 0; i < storedInput.length; i++){
        
        if(storedInput[i].id === input.id){
            storedInput.splice(i, 1);

            localStorage.setItem(storedInputName, JSON.stringify(storedInput));

            return null;
        }
    }

    storedInput.push(input);

    localStorage.setItem(storedInputName, JSON.stringify(storedInput));
}

function getStoredInput(){

    if(localStorage.getItem(storedInputName)){
        storedInput = JSON.parse(localStorage.getItem(storedInputName));

        storedInput.forEach(block => {

            bID = "#" + block.id;

            getBlock = $(document.getElementById(block.id));

            getBlock.val(block.input);

            save = $((getBlock).parent().children().children()[1])

        });
    }
}


// function displays current date and time using moment.js and adds it to currentDay id.
function DisplayDate(Format)
{
    var date = moment().format(Format);

    $("#currentDay").text(date);
}

DisplayDate("LLLL");
// set to 9 to limit amount of times function runs.
createHourSlots(9);
getStoredInput();

$(".saveBtn").click(function(){
    console.log("save clicked");

    textArea = $($(this).parent().parent().children()[1]);

    input = textArea.val();
    iD = textArea.attr("id");

    alterStoredInput(input, iD);
    getStoredInput();
});

