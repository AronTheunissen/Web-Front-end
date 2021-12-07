getAttractions();
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
            document.getElementById("main").appendChild(clone)
        })
        allowClickOnOrderButton();
    })
};

function orderButtonClicked(event) {
	console.log("Placed order!");
	const attraction = event.target.parentNode.previousElementSibling.previousElementSibling.innerHTML;
	const numberAdults = event.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.value;
	const numberKids = event.target.previousElementSibling.previousElementSibling.value;

	const basket = document.getElementById('shoppingbasket');
	const badge = basket.getElementsByTagName('div')[0];
	badge.innerHTML = Number(badge.innerHTML) + 1;

	saveOrderInShoppingBasket(attraction, numberAdults, numberKids);
	console.log(localStorage);
}

function saveOrderInShoppingBasket(attraction, numberAdults, numberKids) {
    var localStorageContent = {"orders":[]};
    if(localStorage.getItem("shoppingBasket") != null) {
        localStorageContent = JSON.parse(localStorage.getItem("shoppingBasket"));
    }

    const currentOrder = {
        attraction: attraction,
        numberAdults: numberAdults,
        numberKids: numberKids,
    };
    localStorageContent.orders.push(currentOrder);

    const objectJSON = JSON.stringify(localStorageContent);
    localStorage.setItem("shoppingBasket", objectJSON);
    console.log(objectJSON);
}
function allowClickOnOrderButton() {
    const orderButtons = document.querySelectorAll('.orderbutton');
    console.log(orderButtons);
    for (let i = 0; i < orderButtons.length; i++) {
        orderButtons[i].addEventListener("click", orderButtonClicked);
    }
}

