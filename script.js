const DAY_STRING = ['день', 'дня', 'дней'];

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
    adaptDisabled = document.getElementById('adapt'),
    typeSite = document.querySelector('.type-site'),
    maxDeadline = document.querySelector('.max-deadline'),
    rangeDeadline = document.querySelector('.range-deadline'),
    deadlineValue = document.querySelector('.deadline-value'),

    desktopTemplates = document.getElementById('desktopTemplates'),
    editable = document.getElementById('editable'),
    mobileTemplatesValue = document.querySelector('.mobileTemplates_value'),
    adaptValue = document.querySelector('.adapt_value'),
    desktopTemplatesValue = document.querySelector('.desktopTemplates_value'),
    editableValue = document.querySelector('.editable_value'),
    calcDescription = document.querySelector('.calc-description'),
    metrikaYandex = document.getElementById('metrikaYandex'),
    analyticsGoogle = document.getElementById('analyticsGoogle'),
    sendOrder = document.getElementById('sendOrder'),
    cardHead = document.querySelector('.card-head'),
    totalPrice = document.querySelector('.total_price'),
    firstFieldset = document.querySelector('.first-fieldset');


//megausefull (XD) true
//for the declansion of words
function declOfNum(n, titles) {
    return n + ' ' + titles[n % 10 === 1 && n % 100 !== 11 ?
        0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
}

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

function moveBackTotal() {
    if (document.documentElement.getBoundingClientRect().bottom > document.documentElement.clientHeight + 200) {
        totalPrice.classList.remove('totalPriceBottom');
        firstFieldset.after(totalPrice);
        window.addEventListener('scroll', moveBackTotal);
        window.removeEventListener('scroll', moveTotal);
    }
}

function moveTotal() {
    if (document.documentElement.getBoundingClientRect().bottom < document.documentElement.clientHeight + 200) {
        totalPrice.classList.add('totalPriceBottom');
        endButton.before(totalPrice);
        window.removeEventListener('scroll', moveTotal);
        window.addEventListener('scroll', moveBackTotal);
    }
}

//event Show/Hide block
startButton.addEventListener('click', function () {
    showElements(mainForm);
    hideElements(firstScreen);
    window.addEventListener('scroll', moveTotal);
});

endButton.addEventListener('click', function () {
    console.log(formCalculate.elements); //collection of elements in the form
    for (const elem of formCalculate.elements) {
        if (elem.tagName === 'FIELDSET') {
            //hiding every element with fieldset
            hideElements(elem);
        }
    }

    cardHead.textContent = "Заявка на разработку сайта";
    hideElements(totalPriceSum);
    showElements(total);

    showElements(total);
});

function dopOptionsString() {
    //Подключим Яндекс Метрику, Гугл Аналитику и отправку заявок на почту.
    let str = "";

    if (metrikaYandex.checked || analyticsGoogle.checked || sendOrder.checked) {
        str += "Подключим";
        if (metrikaYandex.checked) {
            str += " Яндекс Метрику";
            if (analyticsGoogle.checked && sendOrder.checked) {
                str += ", Гугл Аналитику и отправку заявок на почту."
                return;
            }
            if (analyticsGoogle.checked || sendOrder.checked) {
                str += " и";
            }
        }
        if (analyticsGoogle.checked) {
            str += " Гугл Аналитику";
            if (sendOrder.checked) {
                str += " и";
            }
        }
        if (sendOrder.checked) {
            str += " отправку заявок на почту";
        }
        str += ".";
    }

    return str;
}

//randering of content by clicking
function renderTextContent(total, site, maxDay, minDay) {
    totalPriceSum.textContent = total; //output result value

    typeSite.textContent = site;

    maxDeadline.textContent = declOfNum(maxDay, DAY_STRING);
    rangeDeadline.min = minDay;
    rangeDeadline.max = maxDay;
    deadlineValue.textContent = declOfNum(rangeDeadline.value, DAY_STRING);

    //change no to yes functionality
    adaptValue.textContent = adapt.checked ? 'Да' : 'Нет';
    mobileTemplatesValue.textContent = mobileTemplates.checked ? 'Да' : 'Нет';
    desktopTemplatesValue.textContent = desktopTemplates.checked ? 'Да' : 'Нет';
    editableValue.textContent = editable.checked ? 'Да' : 'Нет';
    if (!adapt.checked) {
        mobileTemplatesValue.textContent = 'Нет';
    }

    calcDescription.textContent = `Сделаем ${site} ${adapt.checked ?
        ', адаптированный под мобильные устройства и планшеты.' : ''}
        ${editable.checked ? 'Установим панель админстратора, чтобы вы могли самостоятельно менять содержание на сайте без разработчика' : ''}.
        ${dopOptionsString()}
    `;
}

function priceCalculation(elem = {}) {
    let result = 0,
        index = 0,
        optionsS = [],
        site = '', //which site is selected -> to this 'site'
        maxDeadLineDay = DATA.deadlineDay[index][1],
        minDeadLineDay = DATA.deadlineDay[index][0],
        overPercent = 0;
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
            site = item.dataset.site; //output text of the dataset
            maxDeadLineDay = DATA.deadlineDay[index][1];
        } else if (item.classList.contains('calc-handler') && item.checked) {
            optionsS.push(item.value); //view only checked elements
        } else if (item.classList.contains('want-faster') && item.checked) {
            //calculationg when want faster icon is checked
            const overDay = (maxDeadLineDay - rangeDeadline.value);
            overPercent = overDay * (DATA.deadlinePercent[index] / 100);

        }
    }

    result += DATA.price[index]; //output with correct price (get index)

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

    result += result * overPercent;
    renderTextContent(result, site, maxDeadLineDay, minDeadLineDay);
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
    if (adaptDisabled.checked) {
        mobileTemplatesDisabled.disabled = false;
    } else {
        mobileTemplatesDisabled.disabled = true;
        mobileTemplatesDisabled.checked = false;
    }
};

formCalculate.addEventListener('change', handlerCallBackForm);

priceCalculation();



