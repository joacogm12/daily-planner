//array that is stored in local storage
var arrayLocal = [];

//container to append the created elements
const containerEl = document.getElementById("container");

//print the date at the top
const currentDayEl = document.getElementById("currentDay");
currentDayEl.innerHTML = moment().format("dddd, MMMM DD, yyyy");

//variable to check if it is in the past, present or future
var hour = moment().format("HH");

//prints the time blocks for the daily planer
function print() {
    for (let i = 0; i < 12; i++) {
        //creates the container for the blocks
        const row = document.createElement("div");
        row.className = "row";

        //creates the div for the time 
        const timeBlock = document.createElement("div");
        timeBlock.className = "time-block";

        //creates the p element and prints the hour
        const hourTime = document.createElement("p");
        hourTime.className = "hourTime";
        hourTime.innerText = (i + 7) + ":00";
        timeBlock.append(hourTime);

        //creates the text area
        const textA = document.createElement("textarea");
        textA.id = (i);

        //creates the button for each time block
        const saveBtn = document.createElement("button");
        saveBtn.className = "saveBtn";
        saveBtn.id = i;
        //makes an onclick event to call btn function
        saveBtn.onclick = function () { btn(this); };

        //img element for the save icon for the buttons
        const foto = document.createElement("img");
        foto.src = "Assets/images/foto.png";
        saveBtn.append(foto)


        //checks the time so the time blocks print with their corresponding color
        if ((i + 7) < hour) {
            textA.className = "past";
        }

        if ((i + 7) > hour) {
            textA.className = "future";
        }

        if ((i + 7) == hour) {
            textA.className = "present";
        }

        //appends all the elements into the container
        row.append(timeBlock);
        row.append(textA);
        row.append(saveBtn);

        containerEl.append(row);
    }
    printLocal();
}


print();
//saves an object into an array and then it is saved into local storage
function btn(e) {
    const saveText = document.getElementById(e.id).value;
    var newText = [];
    var a = 0;

    newText = {
        number: e.id,
        text: saveText
    };

    //checks if the array already something
    if (arrayLocal.length > 0) {
        //passes through each value of the array
        for (let i = 0; i < arrayLocal.length; i++) {
            //check if there is a value equal to the one that is been submitted so there are no repeated values
            if (newText.number == arrayLocal[i].number) {
                arrayLocal[i].text = newText.text;
            } else {
                a++;
            }
            if (a == arrayLocal.length) {
                arrayLocal.push(newText);
            }
        }
    } else {
        arrayLocal.push(newText);
    }

    arrayLocal.sort((a, b) => a.number - b.number);

    localStorage.setItem("arrayLocal", JSON.stringify(arrayLocal));
}

//prints the values that are saved in local storage
function printLocal() {

    arrayLocal = JSON.parse(localStorage.getItem("arrayLocal") || "");

    for (let i = 0; i < arrayLocal.length; i++) {
        const printText = document.getElementById(arrayLocal[i].number);
        printText.innerText = arrayLocal[i].text;
    }
}