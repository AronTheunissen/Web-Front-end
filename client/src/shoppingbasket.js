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
        newTicket[3].textContent = newTicket[3].textContent + parseInt(newOrder.price);
        document.body.appendChild(newTicket[3]);
        newButton = clone.querySelectorAll("button");
        document.body.append(newButton[0]);
        newButton[0].addEventListener("click", ()=>cancelButtonClicked(i))
    }
}

makeTicket();

function cancelButtonClicked(i) {
    let sb = JSON.parse(localStorage.getItem("shoppingBasket"));
    console.log(sb.orders[i]);
    sb.orders.splice(i,1);
    localStorage.setItem("shoppingBasket",JSON.stringify(sb));
    window.location.href = "shoppingbasket.html";
}

let buttonPay = document.querySelector(".finalizepaymentbutton");
buttonPay.addEventListener("click", function() {
    finalizePayment();
    localStorage.clear();
    window.location.href = "orderplaced.html";
});

async function finalizePayment() {
    if (localStorage.getItem("shoppingBasket")) {
            const completeOrder = JSON.parse(localStorage.getItem("shoppingBasket"));
            const response = await fetch('/api/placeorder', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(completeOrder)
            });
            localStorage.removeItem("shoppingBasket");
            location.replace("orderplaced.html")
    }
}




