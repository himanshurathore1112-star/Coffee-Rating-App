async function loadCoffees() {
    const response = await fetch("/coffees");
    const coffees = await response.json();

    const coffeeList = document.getElementById("coffeeList");
    coffeeList.innerHTML = "";

    coffees.forEach(coffee => {
        coffeeList.innerHTML += `
            <div>
                <h3>${coffee.name}</h3>
                <p>Votes: ${coffee.votes}</p>
                <button onclick="vote(${coffee.id})">
                    Vote
                </button>
            </div>
            <hr>
        `;
    });
}

async function vote(id) {
    await fetch(`/vote/${id}`, {
        method: "POST"
    });

    loadCoffees();
}

loadCoffees();