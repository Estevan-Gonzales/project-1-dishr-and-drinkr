
// gets required elements 
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;

// if user presses a key and resleases, and user data entered
inputBox.onkeyup = (e)=>{
    let userData = e.target.value;
    let emptyArray = [];
    if(userData){
        icon.onclick = ()=>{
            webLink = `https://www.google.com/search?q=${userData}`;
            linkTag.setAttribute("href", webLink);
            linkTag.click();
        }
        emptyArray = suggestions.filter((data)=>{
            //filtering array value and updating characters to lowercase and return only those words which start with user entered characters
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show auto-complete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide auto-complete box
    }
}
function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = ()=>{
        webLink = `https://www.google.com/search?q=${selectData}`;
        linkTag.setAttribute("href", webLink);
        linkTag.click();
    }
    searchWrapper.classList.remove("active");
}
function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}

$(document).ready(function() {
const states = {
    'default': "./assets/images/Screenshot_1.png",
    'hover': "./assets/images/giphy.gif"
  };
  
  let img = document.querySelector('#hover-img');
  
  img.addEventListener('mouseenter', function(e) {
    img.setAttribute('src', states.hover);
  });
  img.addEventListener('mouseleave', function(e) {
    img.setAttribute('src', states.default);
  });
});

$(document).ready(function() {
  const states1 = {
    'default1': "./assets/images/Screenshot_2.png",
    'hover1': "./assets/images/pasta-italian-food.gif"
  };
  
  let img = document.querySelector('#hover-img1');
  
  img.addEventListener('mouseenter', function(e) {
    img.setAttribute('src', states1.hover1);
  });
  img.addEventListener('mouseleave', function(e) {
    img.setAttribute('src', states1.default1);
  });
});

