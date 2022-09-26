let dotedProgress = document.getElementById("dotedProgress");
let ordered = document.getElementById("ordered");
let pickup = document.getElementById("pickup");
let shipped = document.getElementById("shipped");
let deliverd = document.getElementById("deliverd");
let trangleProgressBar = document.getElementById("trangleProgressBar");
let orderStatus = 3;

switch(orderStatus){
    case 1:
        dotedProgress.style.width = "0%";
        trangleProgressBar.style.width = "5.3%";
        break;

    case 2:
        dotedProgress.style.width = "33%";
        ordered.classList.add("greendit");
        trangleProgressBar.style.width = "37%";
        break;

    case 3:
        dotedProgress.style.width = "65%";
        ordered.classList.add("greendit");
        pickup.classList.add("greendit");
        trangleProgressBar.style.width = "68.4%";
        break;

    case 4:
        dotedProgress.style.width = "97%"
        ordered.classList.add("greendit");
        pickup.classList.add("greendit");
        shipped.classList.add("greendit");
        trangleProgressBar.style.width = "100%";
        break;

    default :
        dotedProgress.style.display = "none"
        trangleProgressBar.style.width = "0%";
        break;

}