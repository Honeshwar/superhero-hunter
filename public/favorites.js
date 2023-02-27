// localStorage.clear();
let favorites=null;
if(typeof(Storage)!=='undefined'){//tell whether browser support local storage /feature/facility
    console.log(' Window Storage',Storage)
    console.log('supported local storage',JSON.parse(localStorage.getItem('favorites')));
    favorites=JSON.parse(localStorage.getItem('favorites'));//[{{},key},......]
    // favorites=favorites.map(e=>e);//edit array by taking inly  not add to favo key
}else{
    console.log('not supporting local storage');
}
    window.Storage//This Web Storage API interface provides access to a particular domain's session or local storage. It allows, for example, the addition, modification, or deletion of stored data items.

const superheroListContainer = document.getElementById('superhero-list-container');
let superheroContainers = null;
let detailContainers = null;
    function fetchElement(){
        superheroContainers = document.getElementsByClassName('superhero-container');
        detailContainers = document.querySelectorAll('.superhero-detail-and-remove-link a');
    }

if(favorites !== null){
    for(let i=0;i<favorites.length;i++){
        if(favorites[i].id !== null) { 
            createSuperheroContainer(favorites[i]);
        }
    }
    fetchElement();
    
}

function removeCharacter(id){
    console.log("add event listener removeButtons",id);
    // const superheroContainers = document.getElementsByClassName('superhero-container');
    console.log(superheroContainers);//remove from dom nodes
          let characterNode=null;
          for(let i=0;i<superheroContainers.length;i++){
            if(superheroContainers[i].getAttribute('value')==id){
                characterNode=superheroContainers[i];
            }
            }
    //   const characterNode= (superheroContainers.filter(el=>el.getAttribute('value')==id))[0];
      characterNode.parentNode.removeChild(characterNode);//character node parent node return than child of parent remove
//remove from local storage
      favorites=favorites.filter(element=>element.id != id);//datatype different so not use ===,!==
      localStorage.setItem('favorites',JSON.stringify(favorites));//ifnexist already than update this key value,key always an string as an value  so convert json formate data into string
      console.log('after remove',JSON.parse(localStorage.getItem('favorites')));
}

function setCharacterToLocalStorageOfCharacterDetail(id){
    console.log("setCharacterToLocalStorageOfCharacterDetail");
    localStorage.removeItem('characterDetail');
    const character=favorites.filter(element=>element.id == id);//datatype different so not use ===,!==
    localStorage.setItem('characterDetail',JSON.stringify(character[0]));//ifnexist already than update this key value,key always an string as an value  so convert json formate data into string
    console.log('after setCharacterToLocalStorageOfCharacterDetail',JSON.parse(localStorage.getItem('characterDetail')));
    location.href=`./superheroDetail.html?characterId=${id}`;//location load this url in browser

}

function createSuperheroContainer(character){//${} display any variable  

    superheroListContainer.insertAdjacentHTML('beforeend',`
        <div class="superhero-container" value="${character.id}">
            <div class="superhero-image-container">
                <img src="${character.imgUrl}" alt="superhero character image" >
            </div>
            <div class="superhero-body-container">
                <p class="superhero-name-container">${character.name}</p>
                <div class="superhero-detail-and-remove-link">
                    <p class="remove-from-favorites" onClick="removeCharacter(${character.id})"><i class="fas fa-remove"></i>  Remove </p>
                    <a onClick="setCharacterToLocalStorageOfCharacterDetail(${character.id})">Detail</a>
                </div> 
            
            </div>
        </div> 
    `);
}