Array.from(document.getElementsByName(input)).forEach((e,i)=>{
    e.addEventListener('keyup', (el)=>{
        if(e.value.length > 0) {
            document.getElementsByClassName('bi')[i].style.transform= "rotate(180deg)";

        } else
        document.getElementsByClassName('bi')[i].style.transform= "rotate(0deg)";
    })
})

let menu_bx = document.getElementById('menu_bx')