function email_test(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

//MINUS
document.querySelectorAll(".quantity__button_minus").forEach(function (minus) {
    minus.addEventListener('click', function () {
        this.nextElementSibling.stepDown();
        this.nextElementSibling.onchange();
    })
})

//PLUS
document.querySelectorAll(".quantity__button_plus").forEach(function (plus) {
    plus.addEventListener('click', function () {
        this.previousElementSibling.stepUp();
        this.previousElementSibling.onchange();
    })
})

//INPUT-LENGTH
document.querySelectorAll(".quantity-year, .quantity-month, .quantity-day").forEach(function (quantityLength) {
    quantityLength.addEventListener("input", function () {
        if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);
    });
});

//INPUT-SLICE
function yearNumber() {
    let year = document.querySelector(".quantity-year");

    if (parseInt(year.value, 10) < 10) year.value = "0" + year.value;
}

function monthNumber() {
    let month = document.querySelector(".quantity-month");

    if (parseInt(month.value, 10) < 10) month.value = "0" + month.value;
}

function dayNumber() {
    let day = document.querySelector(".quantity-day");

    if (parseInt(day.value, 10) < 10) day.value = "0" + day.value;
}

// textarea

let autoExpand = function (field) {
    // Reset field height
    field.style.height = '48px';

    // Calculate the height
    let height = field.scrollHeight - 2;

    field.style.height = height + 'px';
};

document.addEventListener('input', function (event) {
    if (event.target.tagName.toLowerCase() !== 'textarea') return;
    autoExpand(event.target);
}, false);

//header popup

let whatIsItLink = document.getElementById("header-info");
let whatIsItBlock = document.getElementById("header-popup");
let whatIsItClose = document.getElementById("popupCloseDesktop");
let whatIsItCheckbox = document.getElementById("infoCheck");
let whatIsItCloseMobile = document.getElementById("popupCloseMobile");

if (window.innerWidth > 1366) {
    whatIsItLink.addEventListener("mouseenter", function () {
        whatIsItBlock.classList.add('active');
    });

    whatIsItLink.addEventListener("mouseleave", function () {
        whatIsItBlock.classList.remove('active');
    });
} else {
    whatIsItCloseMobile.addEventListener("click", function () {
        whatIsItCheckbox.checked = false;
    });
}

whatIsItClose.addEventListener("click", function () {
    whatIsItBlock.classList.remove('active');
});

//schedule popup

let body = document.querySelector("body");
let scheduleForm = document.querySelector(".form-section__form");
let schedulePopup = document.querySelector(".schedule-popup");


scheduleForm.addEventListener('submit', function (e) {
    e.preventDefault();
    schedulePopup.classList.add('active');
    body.classList.add('lock');
});

schedulePopup.addEventListener('click', function (e) {
    if (!e.target.closest('.schedule-popup__content')) {
        schedulePopup.classList.remove('active');
        body.classList.remove('lock');
    }
});

//login buttons

let scheduledLoginBlock = document.querySelector(".scheduled__login");
let scheduledHeader = document.querySelector(".page__scheduled-header");
let scheduledItems = document.querySelector(".page__scheduled-items");
let scheduledLoginBtn = document.querySelector(".scheduled__login-btn");
let loginPopup = document.querySelector(".login-popup");
let loginForm = document.querySelector(".login-form");
let editFrame = document.querySelector(".form__frame");
let saveBtn = document.getElementById("save-btn");
let scheduleBtn = document.getElementById("schedule-btn");

scheduledLoginBtn.addEventListener('click', function (e) {
    e.preventDefault();
    loginPopup.classList.add('active');
    body.classList.add('lock');
});

loginPopup.addEventListener('click', function (e) {
    if (!e.target.closest('.login-popup__content')) {
        loginPopup.classList.remove('active');
        body.classList.remove('lock');
    }
});

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    loginPopup.classList.remove('active');
    body.classList.remove('lock');
    scheduledLoginBlock.style.display = 'none';
    scheduledHeader.classList.add('active');
    scheduledItems.classList.add('active');
    editFrame.classList.add('active');
    saveBtn.classList.add('active');
    scheduleBtn.style.display = 'none';
});

// scheduled items dropdown menu

let scheduledItemBtns = document.querySelectorAll(".scheduled-item__right");

for (let i = 0; i < scheduledItemBtns.length; i++) {
    scheduledItemBtns[i].addEventListener('click', function () {
        let scheduledItemDropdown = scheduledItemBtns[i].querySelector('.scheduled-item__dropdown');
        scheduledItemDropdown.classList.add('active');
        body.addEventListener("click", function (e) {
            if (!e.target.closest('.scheduled-item__right')) {
                scheduledItemDropdown.classList.remove('active');
            }
        });
    });
}

// scheduled items reminders dropdown

let scheduledItemTop = document.querySelectorAll(".scheduled-item__top");

for (let i = 0; i < scheduledItemTop.length; i++) {
    scheduledItemTop[i].addEventListener('click', function (e) {
        if (!e.target.closest('.scheduled-item__right')) {
            let scheduledItemBlock = scheduledItemTop[i].closest('.item-block')
            let scheduledItemBottom = scheduledItemBlock.querySelector('.scheduled-item__bottom');
            let itemBlockClose = scheduledItemBlock.querySelector('.item-block__close');
            if (scheduledItemBlock.classList.contains('active')) {
                scheduledItemBlock.classList.remove('active')
                scheduledItemBottom.style.height = '0';
                itemBlockClose.style.display = 'none';
            } else {
                scheduledItemBlock.classList.add('active')
                scheduledItemBottom.style.height = scheduledItemBottom.scrollHeight + 'px';
                setTimeout(() => {
                    itemBlockClose.style.display = 'flex';
                }, 200);
                itemBlockClose.addEventListener('click', function () {
                    scheduledItemBlock.classList.remove('active')
                    scheduledItemBottom.style.height = '0';
                    itemBlockClose.style.display = 'none';
                })
            }
        }
    });
}

// scheduled items reminders remove

(function () {
    scheduledItemRemove();
}());

function scheduledItemRemove() {
    let scheduledItemRemoveBtns = document.querySelectorAll("div[data-remove='reminder-remove']");

    for (let i = 0; i < scheduledItemRemoveBtns.length; i++) {
        scheduledItemRemoveBtns[i].onclick = (e) => {
            let remindersList = e.target.closest('.reminders-list');
            let reminderItem = e.target.closest('.reminder-item');
            let scheduledItemBottom = e.target.closest('.scheduled-item__bottom');
            let newHeight = scheduledItemBottom.scrollHeight - 60;
            remindersList.removeChild(reminderItem);
            scheduledItemBottom.style.height = newHeight + 'px';
        }
    }
}

// scheduled items reminders add

let scheduledItemAdd = document.querySelectorAll("li[data-add='reminder-add']");
let scheduledItemDefault = document.getElementById("reminder-default");
let scheduledItemNumber = document.getElementById("reminder-number");


for (let i = 0; i < scheduledItemAdd.length; i++) {
    scheduledItemAdd[i].addEventListener('click', function (e) {
        let newScheduledItem = scheduledItemDefault.cloneNode(true);
        newScheduledItem.classList.remove('default');
        let remindersList = e.target.closest('.reminders-list');
        let lastScheduledItem = e.target.closest('.reminder-item');
        let scheduledItemBottom = e.target.closest('.scheduled-item__bottom');
        let newHeight = scheduledItemBottom.scrollHeight + 60;
        remindersList.insertBefore(newScheduledItem, lastScheduledItem);
        scheduledItemBottom.style.height = newHeight + 'px';
        scheduledItemRemove();
    });
}
