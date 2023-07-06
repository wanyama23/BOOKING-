// Array.from(document.getElementsByName(input)).forEach((e,i)=>{
//     e.addEventListener('keyup', (el)=>{
//         if(e.value.length > 0) {
//             document.getElementsByClassName('bi')[i].style.transform= "rotate(180deg)";

//         } else
//         document.getElementsByClassName('bi')[i].style.transform= "rotate(0deg)";
//     })
// })

// let menu_bx = document.getElementById('menu_bx');


const Buses_node = document.querySelector("#Buses")

let loadedBuses = {}

function Fetch_all_Buses() {
    fetch("http://localhost:3000/Buses")
        .then(Response => Response.json())
        .then(Buses => {
            display_all_Buses(Buses)
        })
}

function UpdateBusesTickets(Buses) {
    return fetch(`http://localhost:3000/Buses/${Buses.id}`, {
        method: "PATCH",
        headers: {
            "Content-type": "Application/json"
        },
        body: JSON.stringify(Buses)
    })
        .then(Response => Response.json())
        .then(Buses => Buses)
        
}

Fetch_all_Buses();

function display_all_Buses(Buses){
movies.forEach(bus => {
    const li=document.createElement("li")
    li.textContent=bus.title
    li.id=bus.id
    li.addEventListener("click", display_one_bus_details)
    Buses_node.appendChild(li)
});
}


function display_one_bus_details(e){
    const id=e.target.id
    fetchBusesById(id)
   }

   function fetchBusesById(id){
    fetch(`http://localhost:3000/Buses/films/${id}`)
    .then(Response => Response.json())
    .then(bus => {
        display_all_Buses(bus)
    })
}

  function display_one_bus(bus){
    loadedBuses = bus

    const busDetailsElement=document.querySelector("#bus-details")
    const title=busDetailsElement.querySelector("#title")
    const image=busDetailsElement.querySelector("#image")
    // const descr=animalDetailsElement.querySelector("#descr")
    
    //id.textContent=data.title
    title.textContent=bus.title 
    image.src=bus.poster 
    descr.textContent=bus.description
    display_available_Buses(bus)
    }

    function display_available_Buses(bus){
        const busDetailsElement=document.querySelector("#tickets")
        const Run_time=busDetailsElement.querySelector("#Run_time span")
        const Show_time=busDetailsElement.querySelector("#Show_time span")
        const Available_tickets=busDetailsElement.querySelector("#Available_tickets")

        const  Buy_tickets=busDetailsElement.querySelector("#Buy_tickets")
        const Remove=busDetailsElement.querySelector("#Remove")

        const IsSoldout = already_sold_tickets(bus)
        if(IsSoldout){
            Buy_tickets.textContent="Sold out"
            Buy_tickets.disabled=true
        }else {
            Buy_tickets.textContent="Buy ticket"
            Buy_tickets.disabled=false
        }

        Buy_tickets.addEventListener("click", handleBuyTicket)
        //id.textContent=data.title
        Run_time.textContent=bus.runtime 
        Show_time.textContent=bus.showtime 
        //Available_tickets.textContent=movie.title 
        Available_tickets.textContent=bus.capacity-bus.tickets_sold

    
        }



function already_sold_tickets(bus){
return bus.capacity===bus.tickets_sold

}

async function handleBuyTicket(e) {
    e.preventDefault()
    loadedbuses.tickets_sold += 1
    const updatedBus = await updatebusTickets(loadedbuses)
    display_available_buses(updatedBus)
}
