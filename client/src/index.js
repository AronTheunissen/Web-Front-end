function orderButtonClicked(event) {
	console.log("Placed order!");
	const attraction = event.target.parentNode.previousElementSibling.previousElementSibling.innerHTML;
	const numberAdults = event.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.value;
	const numberKids = event.target.previousElementSibling.previousElementSibling.value;

	const basket = document.getElementById('shoppingbasket');
	const badge = basket.getElementsByTagName('div')[0];
	badge.innerHTML = Number(badge.innerHTML) + 1;

	saveOrderInShoppingBasket(attraction, numberAdults, numberKids);
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

var orderButtons = document.querySelectorAll('.orderbutton');
for (let i = 0; i < orderButtons.length; i++) {
	orderButtons[i].addEventListener("click", orderButtonClicked);
}