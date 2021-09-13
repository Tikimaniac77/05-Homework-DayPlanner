var hourSlot = 9;

/*function currentTime() {
    var time = moment().format("LT");

    //time = time.split('');

    //var amPm = '';

    //var hour = parseHour(time);

    console.log(time);

    //if(time[time.length - 2] === "past"])
}*/


// generates hour blocks/text using moment.js & generates text box for input, and save button/block. using jQuery.
function createHourSlots(events)
{
    if(!events){
        events = 1;
    }

    var timeNow = moment().format('LT');

    for(var i = 0; i < events; i++) {

        var textTime = hourSlot;
        
        EcreateBlock = $('<div>').addClass('row py-1');

        EcreateHourText = $('<h2>').addClass('text-center').text(textTime);
        EcreateHourBlock = $('<div>').addClass('col-2 py-3 align-middle').append(EcreateHourText);

        EcreateTextBlock = $('<textarea>').addClass('col-8 py-3 overflow-auto').text('').attr("id", textTime);
        //slotColorBG($EcreateHourBlock, timeNow, textTime);

        EcreateSaveBtn = $('<button>').addClass('saveBtn').html('Save');
        
        EcreateSaveBlock = $('<div>').addClass('col-1 py-3 saveBlock border border-primary').append(EcreateSaveBtn);

        EcreateBlock.append(EcreateHourBlock, EcreateTextBlock, EcreateSaveBlock);

        $('#scheduler').append(EcreateBlock);

        changeHourSlot();
    }
}

//cycles hours displayed to page
function changeHourSlot() {
    if (hourSlot === 12) {
        hourSlot = 1;
    } else if(hourSlot === 11) {
        //need to add suffix for AM & PM
        hourSlot++;
    } else {
        hourSlot++;
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
