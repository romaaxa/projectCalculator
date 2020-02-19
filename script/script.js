//table const from all te options and checkboxes
const DATA = {
    whichSite: ['landing', 'multiPage', 'onlineStore'],
    price: [4000, 8000, 26000],
    desktopTemplates: [50, 40, 30], //percents
    adapt: 20,
    mobileTemplates: 15,
    editable: 10,
    metrikaYandex: [500, 1000, 2000],
    analyticsGoogle: [850, 1350, 3000],
    sendOrder: 500,
    //not from html
    deadlineDay: [[2, 7], [3, 10], [7, 14]],
    deadlinePercent: [20, 17, 15]
};

const startButton = document.querySelector('.start-button'),
    firstScreen = document.querySelector('.first-screen'),
    mainForm = document.querySelector('.main-form'),
    formCalculate = document.querySelector('.form-calculate'),
    endButton = document.querySelector('.end-button'),
    total = document.querySelector('.total'),
    fastRange = document.querySelector('.fast-range'),
    totalPriceSum = document.querySelector('.total_price__sum'), //to write new prices 
    mobileTemplatesDisabled = document.getElementById('mobileTemplates'),
    adaptDisabled = document.getElementById('adapt');

// console.dir(startButton)  output like an object

//add onclick Event
startButton.addEventListener('click', function clickButton() {
    console.log('Click on the calculate button');
})

//show form
function showElements(element) {
    element.style.display = 'block';
}

//hide form
function hideElements(element) {
    element.style.display = 'none';
}


//event Show/Hide block
startButton.addEventListener('click', function () {
    showElements(mainForm);
    hideElements(firstScreen);
});

endButton.addEventListener('click', function () {
    console.log(formCalculate.elements); //collection of elements in the form
    for (const elem of formCalculate.elements) {
        if (elem.tagName === 'FIELDSET') {
            //hiding every element with fieldset
            hideElements(elem);
        }
    }

    showElements(total);
});

function priceCalculation(elem) {
    let result = 0,
        index = 0,
        optionsS = [];
    //all the checkboxes reseted
    if (elem.name === 'whichSite') {
        for (const item of formCalculate.elements) {
            if (item.type === 'checkbox') {
                item.checked = false;
            }
        }
        hideElements(fastRange);
    }

    for (const item of formCalculate.elements) {
        if (item.name === 'whichSite' && item.checked) {
            index = DATA.whichSite.indexOf(item.value); //get index of checked element
        } else if (item.classList.contains('calc-handler') && item.checked) {
            optionsS.push(item.value); //view only checked elements
        }
    }

    //add a table price to start price by clicking on a checkbox
    optionsS.forEach(function (key) {
        if (typeof (DATA[key]) === 'number') {
            if (key === 'sendOrder') {
                result += DATA[key];
            } else {
                result += DATA.price[index] * DATA[key] / 100;
            }
        } else {
            if (key === 'desktopTemplates') {
                result += DATA.price[index] * DATA[key][index] / 100;
            } else {
                result += DATA[key][index];
            }
        }
    })

    result += DATA.price[index]; //output with correct price (get index)

    totalPriceSum.textContent = result; //output result value
}

//mainfunc, start calculation
function handlerCallBackForm(event) {
    //console.log(event); //onclick events
    console.log(event.target); //onclick only target elemets/inputs

    const target = event.target;

    //wanna faster? target value
    if (target.classList.contains('want-faster')) {
        if (target.checked) { //if True
            showElements(fastRange)
        } else {
            hideElements(fastRange);
        }
        //target.checked ? showElements(fastRange) : hideElements(fastRange);
    }

    if (target.classList.contains('calc-handler')) {
        priceCalculation(target);
    }

    //if asapt is not checked = mobileTemplates disabled
    if (mobileTemplatesDisabled && adaptDisabled.checked) {
        mobileTemplatesDisabled.disabled = false;
    } else {
        mobileTemplatesDisabled.disabled = true;
    }
};

formCalculate.addEventListener('change', handlerCallBackForm);



