// // Array.from(document.getElementsByName(input)).forEach((e,i)=>{
// //     e.addEventListener('keyup', (el)=>{
// //         if(e.value.length > 0) {
// //             document.getElementsByClassName('bi')[i].style.transform= "rotate(180deg)";

// //         } else
// //         document.getElementsByClassName('bi')[i].style.transform= "rotate(0deg)";
// //     })
// // })




const url = "https://service-t2zq.onrender.com/"

document.addEventListener('DOMContentLoaded',()=>{

    const BusPlaceHolder = ()=>{
        fetch(url)
        .then(res =>res.json())
        .then(content =>{
            const firstBus = content.Bus[0]

            const BusImg = document.getElementById("poster")
            const BusTitle = document.getElementById("BusTitle")
            const showingTime = document.getElementById("showtime")
            const availTicket =document.getElementById("ticketsAvailable")
            BusImg.src = firstBus.poster
            BusTitle.innerText = firstBus.title
            showingTime.innerText =`Showtime: ${firstBus.showtime}`
            availTicket.innerText =`Tickets Available: (${firstBus.capacity - firstBus.tickets_sold})`


let menu_bx = document.getElementById('menu_bx');


const Buses_node = document.querySelector("#Buses")

let loadedBuses = {}

function Fetch_all_Buses() {
    fetch("https://service-t2zq.onrender.com/")
        .then(Response => Response.json())
        .then(Buses => {
            display_all_Buses(Buses)
        })
}

function UpdateBusesTickets(Buses) {
    return fetch(`https://service-t2zq.onrender.com//${Buses.id}`, {
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
Buses.forEach(bus => {
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
    fetch(`https://service-t2zq.onrender.com/${id}`)
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
        Run_time.textContent=bus.runtime 
        Show_time.textContent=bus.showtime 
        Available_tickets.textContent=bus.capacity-bus.tickets_sold

    
        }



// function already_sold_tickets(bus){
// return bus.capacity===bus.tickets_sold

// }

async function handleBuyTicket(e) {
    e.preventDefault()
    loadedBuses+= 1
    const updatedBus = await updatebusTickets(loadedbuses)
    display_all_Buses(updatedBus)
}


function already_sold_tickets(bus){
    return bus.capacity===bus.tickets_sold
    
    }





// const url = "https://service-t2zq.onrender.com/"

// document.addEventListener('DOMContentLoaded',()=>{

//     const BusPlaceHolder = ()=>{
//         fetch(url)
//         .then(res =>res.json())
//         .then(content =>{
//             const firstBus = content.Bus[0]

//             const BusImg = document.getElementById("poster")
//             const BusTitle = document.getElementById("BusTitle")
//             // const movieDescr = document.getElementById("movieDescription")
//             // const runningTime = document.getElementById("runtime")
//             const showingTime = document.getElementById("showtime")
//             const availTicket =document.getElementById("ticketsAvailable")
//             BusImg.src = firstBus.poster
//             BusTitle.innerText = firstBus.title
//             // movieDescr.innerText = firstMovie.description
//             // runningTime.innerText =`Runtime: ${firstMovie.runtime} minutes`
//             showingTime.innerText =`Showtime: ${firstBus.showtime}`
//             availTicket.innerText =`Tickets Available: (${firstBus.capacity - firstBus.tickets_sold})`


//             const ticketBuy = document.getElementById("buyTicket")
//             let tickets = Number(firstBus.capacity - firstBus.tickets_sold)

//             ticketBuy.addEventListener('click',()=>{

//                 tickets--

//                 const ticketRemaining = tickets-1

//                 if(tickets <= 0){
//                     const frstBus = document.getElementById("1")
//                     frstBus.innerHTML=`${firstBus.title}  <span class="badge bg-danger me-1">SOLD OUT</span>`

//                     availTicket.innerHTML = `Ticketd available:  <span class="badge bg-danger">SOLD OUT</span>`
//                 }else{
//                     availTicket.innerText = `Tickets available: (${tickets})`
//                 }
//             })

//         })




//     }



//     const BusDetails = ()=>{
//         fetch(url)
//         .then(response=>response.json())
//         .then(data=>{
//             const BusData = data.films
//             console.log(BusData)
//             for(let i = 0; i < BusData.length; i++){
//                 let item = BusData[i]
//                 console.log(item)
//                 const BusList = document.createElement("li")
//                 const list = document.getElementById("showingMovie")

//                 BusList.classList.add("list-group-item", "border", "border-info", "sinema")

//                 BusList.setAttribute('id',`${item.id}`)
            
//                 BusList.innerText = item.title
//                 console.log(item.title)


//                 list.appendChild(BusList)

//                 BusList.addEventListener('click',()=>{
//                     const BusImage = document.getElementById("poster")
//                     const BusTitle = document.getElementById("BusTitle")
//                     // const runTime = document.getElementById("runtime")
//                     const showTime = document.getElementById("showtime")
//                     const availTickets =document.getElementById("ticketsAvailable")


//                     BusImage.src = item.poster
//                     BusTitle.innerText = item.title
//                     // runTime.innerHTML =`Runtime:<span>${item.runtime}</span>`
//                     showTime.innerText =`Departure ${item.showtime}`
//                     availTickets.innerText =`Tickets available: (${item.capacity - item.tickets_sold})`

//                     const ticketsBuy = document.getElementById("buyTicket")
//                     let ticket = Number(item.capacity - item.tickets_sold)

//                     ticketsBuy.addEventListener('click',()=>{

//                         const ticketRemain = ticket-1
//                         ticket --
//                         if(ticket <= 0){
//                             BusList.innerHTML =`${item.title} <span class="badge bg-danger">SOLD OUT</span>`

//                             availTickets.innerHTML = `Tickets available: <span class="badge bg-danger">SOLD OUT</span>`

//                         }else{

//                             availTickets.innerText = `Tickets available: (${ticket})`
//                         }
//                         availTickets.innerText = `Tickets available: ${ticket}`
//                         while(ticket> -1){
//                             availTickets.innerText = `Tickets available: ${ticket}`
//                             if(ticket === 0){
//                                 return availTickets.innerText = "SOLD OUT"
//                             }

//                         }




//                         if(ticket === 0){
//                             return availTickets.innerText = "SOLD OUT"
//                         }

//                         for(let i = ticket; i > -1 ; i-=1 ){

//                             const ticketRemain = i
//                             availTickets.innerText = `Tickets available: ${ticketRemain}`
//                             if(ticketRemain === 0){
//                                 availTickets.innerText = "SOLD OUT"
//                             }


//                         }


//                     })



//                 })


//             }




//         })

//     }


//     movieDetails()
//     moviePlaceHolder()

// })


// BusDetails()
// BusPlaceHolder()
