window.onload = getAttractions();
let numberTickets = 0;

function getAttractions() {
    fetch ('api/attractions')
    .then ((result) => result.json())
    .then ((data) => {
        let output = '';
        data.forEach(function(park){
            var template = document.getElementsByTagName("template")[0];
            var clone = template.content.cloneNode(true);
            clone.getElementById("name").innerHTML = park.name;
            clone.getElementById("description").innerHTML = park.description;
            clone.getElementById("adultPrice").innerHTML = park.adultPrice;
            clone.getElementById("kidsPrice").innerHTML = park.kidsPrice;
            clone.getElementById("minimumNumberOfAdults").innerHTML = park.minimumNumberOfAdults;
            clone.getElementById("minimumNumberOfKids").innerHTML = park.minimumNumberOfKids;
            clone.getElementById("discount").innerHTML = park.discount;
            clone.getElementById("available").innerHTML = park.available;
            document.getElementById("main").appendChild(clone)
        })
        allowClickOnOrderButton();
        allowChangeOnNumberTickets();
    })
};

function orderButtonClicked(event) {
	const attraction = event.target.parentNode.previousElementSibling.previousElementSibling.innerHTML;
	const numberAdults = event.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.value;
	const numberKids = event.target.previousElementSibling.previousElementSibling.value;
    const availableTicketNumber = parseInt(event.target.parentNode.firstElementChild.lastElementChild.lastElementChild.firstElementChild.innerText);
    const price = parseInt(event.target.previousElementSibling.lastElementChild.innerText);

	const basket = document.getElementById('shoppingbasket');
	const badge = basket.getElementsByTagName('div')[0];
	badge.innerHTML = Number(badge.innerHTML) + 1;
	let adults = parseInt(numberAdults);
	let kids = parseInt(numberKids);

    if((adults > 0 || kids > 0) && ((adults + kids) <= availableTicketNumber)) {
        saveOrderInShoppingBasket(attraction, numberAdults, numberKids, price);
        event.target.parentNode.firstElementChild.lastElementChild.lastElementChild.firstElementChild.innerText = (availableTicketNumber - kids - adults);
        console.log("Placed order!");
    }
    else {
        console.log("Could not place order: invalid number of tickets");
    }
}

function saveOrderInShoppingBasket(attraction, numberAdults, numberKids, price) {
    var localStorageContent = {"orders":[]};
    console.log(price);
    if(localStorage.getItem("shoppingBasket") != null) {
        localStorageContent = JSON.parse(localStorage.getItem("shoppingBasket"));
    }

    const currentOrder = {
        attraction: attraction,
        numberAdults: numberAdults,
        numberKids: numberKids,
        price: price,

    };
    console.log(price);
    localStorageContent.orders.push(currentOrder);

    const objectJSON = JSON.stringify(localStorageContent);
    localStorage.setItem("shoppingBasket", objectJSON);
    console.log(objectJSON);
}
function allowClickOnOrderButton() {
    const orderButtons = document.querySelectorAll('.orderbutton');
    for (let i = 0; i < orderButtons.length; i++) {
        orderButtons[i].addEventListener("click", orderButtonClicked);
    }
}

function allowChangeOnNumberTickets() {
    var ticketChangesKids = document.querySelectorAll('.numberofkids');
    var ticketChangesAdults = document.querySelectorAll('.numberofadults');
    for (let i = 0; i < ticketChangesKids.length; i++) {
        ticketChangesKids[i].addEventListener("change", ticketNumberKidsChanged);
    }
    for (let i = 0; i < ticketChangesAdults.length; i++) {
        ticketChangesAdults[i].addEventListener("change", ticketNumberAdultsChanged);
    }
}

function ticketNumberKidsChanged(event) {
    const numberAdults = event.target.previousElementSibling.previousElementSibling.value
    const numberKids = event.target.value;
    const adultPrice = parseInt(event.target.parentNode.firstElementChild.firstElementChild.lastElementChild.innerText);
    const kidsPrice = parseInt(event.target.parentNode.firstElementChild.firstElementChild.nextElementSibling.lastElementChild.innerText);
    const discount = parseInt(event.target.parentNode.firstElementChild.lastElementChild.lastElementChild.previousElementSibling.innerText);
    const discountMultiplier = ((100 - discount)/100);
    const minimumNumberOfAdults = parseInt(event.target.parentNode.firstElementChild.lastElementChild.firstElementChild.nextElementSibling.innerText);
    const minimumNumberOfKids = parseInt(event.target.parentNode.firstElementChild.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.innerText);

    if(numberAdults < minimumNumberOfAdults || numberKids < minimumNumberOfKids) {
        newPrice = ((numberAdults * adultPrice) + (numberKids * kidsPrice));
    }
    else {
        newPrice = ((numberAdults * adultPrice * discountMultiplier) + (numberKids * kidsPrice * discountMultiplier))
    }
    roundedNewPrice = (Math.round(100 * newPrice)) / 100;

    event.target.nextElementSibling.lastElementChild.innerText = roundedNewPrice;
}

function ticketNumberAdultsChanged(event) {
    const numberAdults = event.target.value;
    const numberKids = event.target.nextElementSibling.nextElementSibling.value;
    const adultPrice = parseInt(event.target.parentNode.firstElementChild.firstElementChild.lastElementChild.innerText);
    const kidsPrice = parseInt(event.target.parentNode.firstElementChild.firstElementChild.nextElementSibling.lastElementChild.innerText);
    const discount = parseInt(event.target.parentNode.firstElementChild.lastElementChild.lastElementChild.previousElementSibling.innerText);
    const discountMultiplier = ((100 - discount)/100);
    const minimumNumberOfAdults = parseInt(event.target.parentNode.firstElementChild.lastElementChild.firstElementChild.nextElementSibling.innerText);
    const minimumNumberOfKids = parseInt(event.target.parentNode.firstElementChild.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.innerText);
    console.log(numberKids, numberAdults, adultPrice, kidsPrice, discount, minimumNumberOfAdults, minimumNumberOfKids);

    if(numberAdults < minimumNumberOfAdults || numberKids < minimumNumberOfKids) {
        newPrice = ((numberAdults * adultPrice) + (numberKids * kidsPrice));
    }
    else {
        newPrice = ((numberAdults * adultPrice * discountMultiplier) + (numberKids * kidsPrice * discountMultiplier))
    }
    roundedNewPrice = (Math.round(100 * newPrice)) / 100;

    event.target.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.innerText = roundedNewPrice;
}

