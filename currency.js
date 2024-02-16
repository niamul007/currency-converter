let BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
let dropdowns=document.querySelectorAll(".dropdwon select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
let loader= document.querySelector(".loader");




  
for (select of dropdowns){
    for(currCode in countryCode){
        let newOption = document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if (select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }else if( select.name==="to" && currCode==="BDT"){
            newOption.selected="selected";
        }
        select.append(newOption);

    }
    select.addEventListener("change",(evt)=>{
        upadateFlag(evt.target);
    })
}

const upadateFlag=(element)=>{
    let currCode = element.value;
    let ConOFCode = countryCode[currCode];
    let newSrc=`https://flagsapi.com/${ConOFCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src=newSrc;
}



btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    let finalAmount = amtVal * rate;
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
})