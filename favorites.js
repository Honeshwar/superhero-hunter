// localStorage.clear();
//favorites is an array that store all superhero that are added to favorite , get that array from local storage
let favorites=null;
//tell whether browser support local storage /feature/facility and get favorites array from local storage
if(typeof(Storage)!=='undefined'){
    console.log(' Window Storage',Storage)
    console.log('supported local storage',JSON.parse(localStorage.getItem('favorites')));
    favorites=JSON.parse(localStorage.getItem('favorites'));//[{{},key},......]
}else{
    console.log('not supporting local storage');
}
    // window.Storage//This Web Storage API interface provides access to a particular domain's session or local storage. It allows, for example, the addition, modification, or deletion of stored data items.

//fetch html elements that we needed/require
const superheroListContainer = document.getElementById('superhero-list-container');
let superheroContainers = null;
let detailContainers = null;

function fetchElement(){
    superheroContainers = document.getElementsByClassName('superhero-container');
    detailContainers = document.querySelectorAll('.superhero-detail-and-remove-link a');
}

//when local storage not having favorites as key it return null,So for that we set an check
//iterate all favorite and make container /code and add to DOM
if(favorites !== null){
    for(let i=0;i<favorites.length;i++){
        if(favorites[i].id !== null) { //any how id is not define
            createSuperheroContainer(favorites[i]);//calling function to create superhero container and passing arguments single superhero entire data
        }
    }
    fetchElement();///fetch html elements that we just created by  createSuperheroContainer() function
    
}

function removeCharacter(id){
    // console.log("add event listener removeButtons",id);
    const superheroContainers = document.getElementsByClassName('superhero-container');
    console.log(superheroContainers);//remove from dom 
    //remove that superhero container that id match with given parameter "id"
    let characterNode=null;
    for(let i=0;i<superheroContainers.length;i++){
        if(superheroContainers[i].getAttribute('value')==id){
            characterNode=superheroContainers[i];
        }
    }
    //access parent and remove child
    characterNode.parentNode.removeChild(characterNode);//character node parent node return than child of parent remove
    //remove superhero from local storage in favorite(obj)
    favorites=favorites.filter(element=>element.id != id);//datatype different so not use ===,!==
    localStorage.setItem('favorites',JSON.stringify(favorites));
     console.log('after remove',JSON.parse(localStorage.getItem('favorites')));
}//if exist already than it will update this key value,key always an string as an value  so convert json formate data into string

//creating function set superhero to local storage  as key characterDetail,so use that data in superheroDetail.html
function setCharacterToLocalStorageOfCharacterDetail(id){
    console.log("setCharacterToLocalStorageOfCharacterDetail");
    //only one characterDetail store ,because onclick we set and when new click happen we remove it and store new superhero data
    localStorage.removeItem('characterDetail');
    const character=favorites.filter(element=>element.id == id);//getting superhero from favorite by if
    localStorage.setItem('characterDetail',JSON.stringify(character[0]));
    // console.log('after setCharacterToLocalStorageOfCharacterDetail',JSON.parse(localStorage.getItem('characterDetail')));
    location.href=`./superheroDetail.html?characterId=${id}`;// load this url in browser

}

//this is an function to create Superhero Container/node in DOM and here pass superhero data
function createSuperheroContainer(superheroData){//${} display any variable  

    superheroListContainer.insertAdjacentHTML('beforeend',`
        <div class="superhero-container" value="${superheroData.id}">
            <div class="superhero-image-container">
                <img src="${superheroData.imgUrl}" alt="superhero character image" >
            </div>
            <div class="superhero-body-container">
                <p class="superhero-name-container">${superheroData.name}</p>
                <div class="superhero-detail-and-remove-link">
                    <p class="remove-from-favorites" onClick="removeCharacter(${superheroData.id})"><i class="fas fa-remove"></i>  Remove </p>
                    <a onClick="setCharacterToLocalStorageOfCharacterDetail(${superheroData.id})">Detail</a>
                </div> 
            
            </div>
        </div> 
    `);
}

//structure of favorite array

/*favorites = [ 
      {
        id:"34",
        imgUrl:"url",
        name:"hulk",
        description:"",
        series:,
        stories:.
        addToFavorite:false
    },
    {
        id:"34",
        imgUrl:"url",
        name:"hulk",
        description:"",
        series:,
        stories:.
        addToFavorite:false
    },

    ...

] */