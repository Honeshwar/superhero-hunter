// console.log("index.js that hsh value",hashValue,PRIVATE_KEY,PUBLIC_KEY,TIMESTAMP);
//fetch all element that we need
const searchBox = document.querySelector('#search-container form input');
const searchBtn = document.querySelector('#search-container form button');
const superheroListContainer = document.getElementById('superhero-list-container');
///this all fetch after add html element / node using js after api call
let superheroContainers = null;
let charactersName = null;
let charactersImage = null; 
let favoriteBtn = null; 
let characterDetail = null; 
//  console.log(favoriteBtn);

function fetchElement(){
    superheroContainers = document.getElementsByClassName('superhero-container');
    charactersName = document.getElementsByClassName('superhero-name-container');
    charactersImage = document.querySelectorAll('.superhero-image-container img');
    favoriteBtn = document.querySelectorAll('.add-to-favorite i');
    characterDetail = document.querySelectorAll('.superhero-detail-link a');
    //adding listener to all add to favorite buttons
    for(let i=0;i<favoriteBtn.length;i++){
    favoriteBtn[i].addEventListener('click',function(event){
        console.log("add to favoriteBtn",favoriteCharacters);
        favoriteBtn[i].setAttribute('class','fa-solid fa-star');
        favoriteBtn[i].style.color='red';
      
        // const characterName = charactersName[i].textContent; console.log(characterName);
        // const imgSrc = charactersImage[i].getAttribute("src");
        const favoriteCharacterData=JSON.parse(superheroContainers[i].getAttribute("value"));//value=as string obj store ='{"id":"987",}'
        let presentInFavoriteCharacters=null;
        if(favoriteCharacters!==null){//first time get from local storage in below api call function it return "null"
            console.log(favoriteCharacters.filter((e)=>e.id===favoriteCharacterData.id));
            presentInFavoriteCharacters = favoriteCharacters.filter((e)=>e.id===favoriteCharacterData.id);
         
        }else{
            favoriteCharacters=[];
        }
           if(!presentInFavoriteCharacters || presentInFavoriteCharacters.length===0){//character null ho ga or character arrray empty ho gay toh crete new obbj and add to character favorites//empty array associated with true an obj
            favoriteCharacterData.addToFavorite=true;console.log(  favoriteCharacterData);
            favoriteCharacters.unshift(favoriteCharacterData);//character = an obj entire character detail in this obj
                //    {
                //        superheroData:character,
                //         favoriteCharacterData.addToFavorite:true
                //     }
                //     );
                // storeFavoriteCharactersInLocalStorage(favoriteCharacters);
                window.localStorage.setItem("favorites",JSON.stringify(favoriteCharacters));
                console.log("favorites",JSON.parse(localStorage.getItem("favorites")));
               
            }
    });
}
}
 let favoriteCharacters = [ 
    //  {
    // id:"34",
    // image:"url",
    // name:"hulk",
    // addToFavorite:false
    // }
];
let clickOnCharacters = [ 
    //  {
    // id:"34",
    // image:"url",
    // name:"hulk",
    // addToFavorite:false
    // }
];

// function addToFavoriteOrNot(allFavorite){
//      const favorites = JSON.parse(localStorage.getItem('favorites'));//string obj covert to json obj form
//      console.log("favorite array from local storage" ,favorites);
//     if(favorites){
//         for(let i=0;i<superheroContainers.length;i++){
//           if(favorites[i].characterId !== null){
//             const characterId=superheroContainers[i].getAttribute("value")
//             const favoriteCharacter=favorites.filter((el)=>el.characterId===characterId);
            
//             if(favoriteCharacter[0]){
//              console.log("addToFavoriteOrNot",favoriteCharacter);
//              favoriteBtn[i].setAttribute('class','fa-solid fa-star');
//              favoriteBtn[i].style.color='red';
//             }
//           }
//         }
//     }
// }
// addToFavoriteOrNot();
// for(a of JSON.parse( localStorage.getItem("favorites"))){
//     console.log(a);}

//search box and search button add event listener
    searchBox.addEventListener('keyup',function(event){
        input=searchBox.value;//event.target.value;
        console.log(event.target.value,'search box',input);//,input,`inner text ${searchBox.getAttribute(value)}`);//UNTIL I click submit, value in input not assign to value , not in payload present
        if(input){console.log("api call happening");
         callApiToGetCharacters(input);
        }
       
        
        });

    searchBtn.addEventListener('click',function(event){
        event.preventDefault();
        input=searchBox.value;
        console.log('search button',input);
        callApiToGetCharacterByExactName(input);
    
    });

//     console.log(characterDetail);
//   for(let i=0;i<characterDetail.length;i++){
//     // characterDetail[i].addEventListener('click',function(event){
//     //     event.preventDefault();
//     // //     clickOnCharacters=[];
//         characterId=superheroContainers[i].getAttribute("value");
      
//     //     clickOnCharacters.push(characterId);
//     //    localStorage("superheroId",JSON.stringify(clickOnCharacters));
    
//     //    console.log('click container',characterId,'local storage',JSON.parse(localStorage.getItem(superheroId)));
//     //    window.location.href="http://127.0.0.1:5500/public/superheroDetail.html";//get/set,replace,assign ()
//     console.log('click detail container',characterId);
//     // location.href=`./superheroDetail.html/?characterId=${characterId}`;
//     characterDetail[i].setAttribute('href',`./superheroDetail.html?characterId=${characterId}`);

// // });
//   }
//    console.log(characterDetail);




//using localStorage /web storage store favorite character
function storeFavoriteCharactersInLocalStorage(favoriteCharacters){
   
    window.localStorage.setItem(favorites,favoriteCharacters);

}



//html file find in open onclick,global not nested
 function setCharacterToLocalStorageOfCharacterDetail(id){
            console.log("setCharacterToLocalStorageOfCharacterDetail");
            localStorage.removeItem('characterDetail');

            let superheroData=null;
            for(let i=0;i<superheroContainers.length;i++){
                  console.log("setCharacterToLocalStorageOfCharacterDetail",JSON.parse(superheroContainers[i].getAttribute("value")));
              if(JSON.parse(superheroContainers[i].getAttribute('value')).id==id){
                  superheroData=superheroContainers[i].getAttribute('value');
              }
              }
            // const character=su.filter(element=>element.id == id);//datatype different so not use ===,!==
            localStorage.setItem('characterDetail',superheroData);//ifnexist already than update this key value,key always an string as an value  so convert json formate data into string
            console.log('after setCharacterToLocalStorageOfCharacterDetail',JSON.parse(localStorage.getItem('characterDetail')));
            location.href=`./superheroDetail.html?characterId=${id}`;//location load this url in browser
        
        }

        superheroListContainer.insertAdjacentHTML('beforeend',`<h1 style="color:white;">"Search content shown here....."</h1>`);
        
 function callApiToGetCharacters(input){
      //remove all superhero container of old search
    // superheroListContainer.innerHtml='';
    // while(superheroListContainer.firstChild){
    //     superheroListContainer.removeChild(superheroListContainer.lastChild)
    // }
    // if(input ===''){
    //     superheroListContainer.insertAdjacentHTML('beforeend',`<h1 style="color:white;">"Search content shown here....."</h1>`);
    //     return;
    // }
  
//    superheroListContainer.style.visibility='hidden';
    console.log("api call input",input);
    fetch(`http://gateway.marvel.com/v1/public/characters?nameStartsWith=${input}&ts=1&apikey=0f21d3585d27145062e0abfbbb35ace0&hash=a5b1f7d008ffe2ece0c01f89a6583d22`)
    .then((response)=>{
    
       const data = response.json();
       return data;
    
    }).then((data)=>{
           //remove all superhero container of old search,on getting new superhero
            // superheroListContainer.innerHtml='';
            while(superheroListContainer.firstChild){
                superheroListContainer.removeChild(superheroListContainer.lastChild)
             }

        favoriteCharacters=JSON.parse(localStorage.getItem("favorites"));

        console.log('local storage',favoriteCharacters);
        const results = data.data.results; 
        console.log(results);
     
        //creating container superhero for all character we get from api
        for(let i=0;i<results.length;i++){
            //find is favorite or not
            let isFavorite=false;
            if(favoriteCharacters!==null&&favoriteCharacters.length>0 ){//null no fav in local storage line 143
                //filter out fav char in array
                const character =  favoriteCharacters.filter((e)=>results[i].id==e.id);//(results[i].id)sting==number(characterId),not use ===
                console.log('local storage character match',character);
                if(character[0] && character[0].id !== null  && character[0].addToFavorite===true){//null when value in superhero container not present
                   isFavorite=true;
                }
             } 
           
           
            function createSuperheroContainer(character){//${} display any variable  
                const id =character.id;
                const name =character.name;
                const imgUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;
                const description = character.description;
                const series = character.series;
                const stories = character.stories;
            //like text store,dom nodes create on condition line 204
                // a=JSON.stringify({id,name,imgUrl,description,series,stories});
                superheroListContainer.insertAdjacentHTML('beforeend',`
                <div class="superhero-container" value="">
                    <div class="superhero-image-container">
                        <img src="${imgUrl}" alt="superhero image" >
                    </div>
                    <div class="superhero-body-container">
                        <p class="superhero-name-container">${name}</p>
                        <p class="add-to-favorite">${isFavorite?`<i class="fa-solid fa-star" style="color:red"></i>` : `<i class="fa-regular fa-star" style="color:black"></i>` }Add To Favorite</p>
                    </div>
                    <div class="superhero-detail-link">
                        <a onClick='setCharacterToLocalStorageOfCharacterDetail(${id})'>Detail</a>
                    </div>     
                </div>
                `);
                //  fetchElement();
                 superheroContainers = document.getElementsByClassName('superhero-container');
                superheroContainers[i].setAttribute("value", JSON.stringify({id,name,imgUrl,description,series,stories}));
              
            }
            createSuperheroContainer(results[i]);
        }
           fetchElement();
       
           if(results.length===0){
            while(superheroListContainer.firstChild){
                superheroListContainer.removeChild(superheroListContainer.lastChild)
            }
            superheroListContainer.insertAdjacentHTML('afterbegin',`<h1 style="color:white;">"no superhero exists with " ${input} " name"</h1>`);
            return;
        }
        
        //    const id = results[i].id;
        //    const name = results[i].name;
        //    const url = `${results[i].thumbnail.path}.${results[i].thumbnail.extension}`;
    
        //    superheroContainers[i].setAttribute("value", JSON.stringify(results[i]));//so at time to adddd to favorite i can store charater using unique id(this value)
        //    charactersName[i].innerText=name;
        //    charactersImage[i].setAttribute('src',url);//url pass get from api
        //    characterDetail[i].setAttribute('href',`./superheroDetail.html?characterId=${id}`);//url pass characterId so using id get character from  API
           //if super hero already added to favorite so heart would be red
        //    if(favoriteCharacters!==null&&favoriteCharacters.length>0 ){
        //     const character =  favoriteCharacters.filter((e)=>results[i].id==e.id);//(results[i].id)sting==number(characterId),not use ===
        //     console.log('local storage character match',character);
        //         if(character[0] && character[0].characterId !== null  && character[0].addToFavorite===true){//null when value in superhero container not present
        //             favoriteBtn[i].setAttribute('class','fa-solid fa-star');
        //             favoriteBtn[i].style.color='red';
        //             console.log("in local storage",favoriteBtn);
        //         } else{
            
        //             favoriteBtn[i].setAttribute('class','fa-regular fa-star');
        //             favoriteBtn[i].style.color='black';
        //         }
        //      } 
            
        //      superheroContainers[i].style.visibility='visible';//superhero container visible , for superhero how much get from one api call
        // }
        // superheroListContainer.style.visibility='visible';// all container visible no good
    
        // a();
        //dynamic add

    })

    .catch((err)=>{
        console.log(err);
    });
}

function callApiToGetCharacterByExactName(input){
console.log("api call input",input);
fetch(`http://gateway.marvel.com/v1/public/characters?name=${input}&ts=1&apikey=0f21d3585d27145062e0abfbbb35ace0&hash=a5b1f7d008ffe2ece0c01f89a6583d22`)
.then((response)=>{

   const data = response.json();
   return data;

}).then((data)=>{
    favoriteCharacters=JSON.parse(localStorage.getItem("favorites"));
    const results = data.data.results; 
    console.log(results);
    for(let i=0;i<results.length;i++){
       const id = results[i].id;
       const name = results[i].name;
       const url = `${results[i].thumbnail.path}.${results[i].thumbnail.extension}`;

       superheroContainers[i].setAttribute("value",id);
       charactersName[i].innerText=name;
       charactersImage[i].setAttribute('src',url);

       //if super hero already added to favorite so heart would be red
        const item =  favoriteCharacters.filter((e)=>results[i].id===e.characterId); 
      if(item[0] && item[0].addToFavorite===true){
        favoriteBtn[i].setAttribute('class','fa-solid fa-star');
        favoriteBtn[i].style.color='red';
        console.log("in local storage",favoriteBtn);
       } else{
 
        favoriteBtn[i].setAttribute('class','fa-regular fa-star');
        // favoriteBtn[i].style.color='white';
        }
        superheroContainers[i].style.visibility='visible';
    }

    a();

})

.catch((err)=>{
    console.log(err);
});

}


// function a(){
//     for(let s of superheroContainers){
//         console.log(s.getAttribute('value'));
        // }
// }

