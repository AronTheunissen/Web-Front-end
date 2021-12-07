function makeTicket() {

    let temp = document.getElementsByTagName("template")[0];
    let shoppingBasket = JSON.parse(localStorage.getItem("shoppingBasket"));
    let orders = shoppingBasket.orders;

    for(let i = 0; i < orders.length; i++) {
        let clone = temp.content.cloneNode(true);
        let newTicket = clone.querySelectorAll("div");
        let newOrder = orders[i];
        newTicket[0].textContent = newOrder.attraction;
        document.body.appendChild(newTicket[0]);
        newTicket[1].textContent = newTicket[1].textContent + parseInt(newOrder.numberAdults);
        document.body.appendChild(newTicket[1]);
        newTicket[2].textContent = newTicket[2].textContent + parseInt(newOrder.numberKids);
        document.body.appendChild(newTicket[2]);
        newButton = clone.querySelectorAll("button");
        document.body.append(newButton[0]);
    }
}

makeTicket();

let buttonCancel = document.querySelector(".cancelOrderButton");
buttonCancel.addEventListener("click", cancelButtonClicked);

function cancelButtonClicked() {
    localStorage.clear();
    window.location.href = "orderplaced.html";
}

let buttonPay = document.querySelector(".finalizepaymentbutton");
console.log(buttonPay+"henk");
buttonPay.addEventListener("click", function() {
    localStorage.clear();
    window.location.href = "orderplaced.html";
});



