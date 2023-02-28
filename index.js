//fetch all element that we need from html page
const searchBox = document.querySelector('#search-container form input');
const searchBtn = document.querySelector('#search-container form button');
const superheroListContainer = document.getElementById('superhero-list-container');
///this all element fetch after add html element / node to dom using js (after api call)
//initially we don't know the value so we initialize to all with null(nothing)
let superheroContainers = null;
let charactersName = null;
let charactersImage = null; 
let favoriteBtn = null; 
let characterDetail = null; 

//this function is called after api call happen completely(req-res)
function fetchElement(){
    superheroContainers = document.getElementsByClassName('superhero-container');
    charactersName = document.getElementsByClassName('superhero-name-container');
    charactersImage = document.querySelectorAll('.superhero-image-container img');
    favoriteBtn = document.querySelectorAll('.add-to-favorite i');
    characterDetail = document.querySelectorAll('.superhero-detail-link a');
    
    //adding  event listener to all add to favorite buttons
    for(let i=0;i<favoriteBtn.length;i++){
    favoriteBtn[i].addEventListener('click',function(){
        // console.log("add to favoriteBtn",favoriteCharacters);
        //on click favorite button(star) will become red
        favoriteBtn[i].setAttribute('class','fa-solid fa-star');
        favoriteBtn[i].style.color='red';
      //getting all data from superhero container(where set all data in value attribute)
        const favoriteCharacterData=JSON.parse(superheroContainers[i].getAttribute("value"));//value=as string obj store ='{"id":"987",}'
        let presentInFavoriteCharacters=null;//above finded superhero is present in local storage in favorites
        if(favoriteCharacters!==null){//first time get from local storage in below api call function it return "null"
            // console.log(favoriteCharacters.filter((e)=>e.id===favoriteCharacterData.id));
            presentInFavoriteCharacters = favoriteCharacters.filter((e)=>e.id===favoriteCharacterData.id);
         
        }else{//when favorite characters array is null(that we get from local storage)
            favoriteCharacters=[];
        }
        //adding an superhero to favorite cahracter array than to local storage
           if(!presentInFavoriteCharacters || presentInFavoriteCharacters.length===0){//character null ho ga or character arrray empty ho gay toh crete new obbj and add to character favorites//empty array associated with true an obj
            favoriteCharacterData.addToFavorite=true;console.log(  favoriteCharacterData);
            favoriteCharacters.unshift(favoriteCharacterData);//character = an obj entire character detail in this obj
              
            window.localStorage.setItem("favorites",JSON.stringify(favoriteCharacters));
            // console.log("favorites",JSON.parse(localStorage.getItem("favorites")));
               
            }
    });
}
}

//an array where on ram store all favorite superhero as obj inside it
 let favoriteCharacters = [ 
    //  {
    // id:"34",
    // imgUrl:"url",
    // name:"hulk",
    // description:"",
    // series:,
    // stories:.
    // addToFavorite:false
    // }
];


// Adding event listener to search box (onKeyPress)
    searchBox.addEventListener('keyup',function(event){
        input=searchBox.value;//event.target.value;
        console.log(event.target.value,'search box',input);//,input,`inner text ${searchBox.getAttribute(value)}`);//UNTIL I click submit, value in input not assign to value , not in payload present
        if(input){console.log("api call happening");
       getSuperherosNameStartsWith(input);
        }
       
        
        });
// Adding event listener to  search button(onclick)
    searchBtn.addEventListener('click',function(event){
        event.preventDefault();
        input=searchBox.value;
        console.log('search button',input);
        getSuperherosByExactName(input);
    
    });


//html file find in open onclick,global not nested 
//create an function that call on onClick attribute of an element, to set all data of an superhero to local storage so we can use it in superheroDetails.html page
 function setCharacterToLocalStorageOfCharacterDetail(id){
            // console.log("setCharacterToLocalStorageOfCharacterDetail");
            //remove each time before any click we will remove item from local storage,at once we can show on superhero detail
            localStorage.removeItem('superheroDetailDetail');

            //finding superhero Containers that having value attribute having id = our parameter id
            let superheroData=null;
            for(let i=0;i<superheroContainers.length;i++){
                //   console.log("setCharacterToLocalStorageOfsuperheroDetailDetail",JSON.parse(superheroContainers[i].getAttribute("value")));
              if(JSON.parse(superheroContainers[i].getAttribute('value')).id==id){
                  superheroData=superheroContainers[i].getAttribute('value');//already in string form
              }
              }
            // const character=su.filter(element=>element.id == id);//datatype different so not use ===,!==
            localStorage.setItem('superheroDetailDetail',superheroData);//ifnexist already than update this key value,key always an string as an value  so convert json formate data into string
            // console.log('after setCharacterToLocalStorageOfsuperheroDetailDetail',JSON.parse(localStorage.getItem('superheroDetailDetail')));
            location.href=`./superheroDetail.html?characterId=${id}`;//location load this url in browser
        
}

// call API to getting superhero by Name Starts With  and ( getting 20 superhero in one API call)    
 function getSuperherosNameStartsWith(input){
    // console.log("api call input",input);
    fetch(`http://gateway.marvel.com/v1/public/characters?nameStartsWith=${input}&ts=1&apikey=0f21d3585d27145062e0abfbbb35ace0&hash=a5b1f7d008ffe2ece0c01f89a6583d22`)
    .then((response)=>{

       const data = response.json();
       return data;
    
    }).then((data)=>{

        //remove all superhero container of old search,on getting new superhero from api request
        // superheroListContainer.innerHtml='';
        while(superheroListContainer.firstChild){
            superheroListContainer.removeChild(superheroListContainer.lastChild)
            }
        favoriteCharacters=JSON.parse(localStorage.getItem("favorites"));
        // setting  array an local storage favorites array,so use it for mark favorite always with red star
        favoriteCharacters=JSON.parse(localStorage.getItem("favorites"));

        // console.log('local storage',favoriteCharacters);
        const results = data.data.results; 
        // console.log(results);
     
        //creating container  for superhero, for all superhero we get from API request
        for(let i=0;i<results.length;i++){
           
            //finding current superhero(results[i]) is already in our favorite or not
            let isFavorite=false;
            if(favoriteCharacters!==null&&favoriteCharacters.length>0 ){//null no fav in local storage line 143
                //finding or  filtering  out from favoriteCharacters array, is  that current superhero(results[i]) is  present in  this array or not  
                const character =  favoriteCharacters.filter((e)=>results[i].id==e.id);//(results[i].id)sting==number(characterId),not use ===
                // console.log('local storage character match',character);
                // if current superhero is present in array, that id not null or is favorite is true than we do isFavorite - true
                if(character[0] && character[0].id !== null  && character[0].addToFavorite===true){//null when value in superhero container not present
                   isFavorite=true;
                }
             } 
           
           
            function createSuperheroContainer(character){//${} display any variable  
                //getting all data that we needed to display in html page
                const id =character.id;
                const name =character.name;
                const imgUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;
                const description = character.description;
                const series = character.series;
                const stories = character.stories;
          
                //adding html to superhero List Container
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
                //fetch element and setting value  attribute  an superhero entire data that we need in all 3 pages
                superheroContainers = document.getElementsByClassName('superhero-container');
                superheroContainers[i].setAttribute("value", JSON.stringify({id,name,imgUrl,description,series,stories}));
              
            }
            //call the function for each superhero
            createSuperheroContainer(results[i]);
        }
        //fetch elements/nodes that added by js to dom and also add event listener to some of them
           fetchElement();
       
        //    if response .data.results array is empty so remove all node from dom and add an text to  superheroListContainer
           if(results.length===0){
            while(superheroListContainer.firstChild){
                superheroListContainer.removeChild(superheroListContainer.lastChild)
            }
            superheroListContainer.insertAdjacentHTML('afterbegin',`<h1 style="color:white;">"no superhero exists with " ${input} " name"</h1>`);
            return;
        }
        //console value attribute
        // a();

    })

    .catch((err)=>{
        console.log(err);
    });
}

// call API to getting superhero by exact name (only one superhero getting in this function)
function getSuperherosByExactName(input){
    // console.log("api call input",input);
fetch(`http://gateway.marvel.com/v1/public/characters?name=${input}&ts=1&apikey=0f21d3585d27145062e0abfbbb35ace0&hash=a5b1f7d008ffe2ece0c01f89a6583d22`)
.then((response)=>{

   const data = response.json();
   return data;

}).then((data)=>{

    favoriteCharacters=JSON.parse(localStorage.getItem("favorites"));
    const results = data.data.results; 
    console.log(results);//only one element inside this resulting array,i=0
   
      //    if response .data.results array is empty so remove all node from dom and add an text to  superheroListContainer
      if(results.length===0){
        while(superheroListContainer.firstChild){
            superheroListContainer.removeChild(superheroListContainer.lastChild)
        }
        superheroListContainer.insertAdjacentHTML('afterbegin',`<h1 style="color:white;">"no superhero exists with " ${input} " name"</h1>`);
        return;
    }
        //finding current superhero(results[i]) is already in our favorite or not
        let isFavorite=false;
        if(favoriteCharacters!==null&&favoriteCharacters.length>0 ){//null no fav in local storage line 143
            //finding or  filtering  out from favoriteCharacters array, is  that current superhero(results[i]) is  present in  this array or not  
            const character =  favoriteCharacters.filter((e)=>results[0].id==e.id);//(results[0].id)sting==number(characterId),not use ===
            // console.log('local storage character match',character);
            // if current superhero is present in array, that id not null or is favorite is true than we do isFavorite - true
            if(character[0] && character[0].id !== null  && character[0].addToFavorite===true){//null when value in superhero container not present
               isFavorite=true;
            }
         } 
       
       
        function createSuperheroContainer(character){//${} display any variable  
            //getting all data that we needed to display in html page
            const id =character.id;
            const name =character.name;
            const imgUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;
            const description = character.description;
            const series = character.series;
            const stories = character.stories;
      
            //adding html to superhero List Container
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
            //fetch element and setting value  attribute  an superhero entire data that we need in all 3 pages
            superheroContainers = document.getElementsByClassName('superhero-container');
            superheroContainers[0].setAttribute("value", JSON.stringify({id,name,imgUrl,description,series,stories}));
          
        }
        //call the function for each superhero
        createSuperheroContainer(results[0]);
    
    //fetch elements/nodes that added by js to dom and also add event listener to some of them
       fetchElement();
   
  

    a();

})

.catch((err)=>{
    console.log(err);
});

}

//to read data
function a(){
    for(let s of superheroContainers){
        console.log(s.getAttribute('value'));
        }
}

