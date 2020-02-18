const startButton = document.querySelector('.start-button'),
    firstScreen = document.querySelector('.first-screen'),
    mainForm = document.querySelector('.main-form'),
    formCalculate = document.querySelector('.form-calculate'),
    endButton = document.querySelector('.end-button'),
    total = document.querySelector('.total'),
    fastRange = document.querySelector('.fast-range');


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
};

formCalculate.addEventListener('change', handlerCallBackForm);



