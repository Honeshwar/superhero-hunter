
//no need of api call get all thing from local storage
const superheroListContainer = document.getElementById('superhero-list-container');

// function  fetchElement(){
//     const superheroContainers = document.getElementsByClassName('superhero-container');
//     const removeButtons = document.querySelectorAll('.remove-from-favorites');

//     console.log(removeButtons);
//     //when remove container  place container change but i stay same that first time tha so remove i=0,than i=last error(i=last=2last but i=last),on click using in func old i(block scope with let
//     //solve simply use attribute onClick="func()" on html element)
//     for(let i=0;i<removeButtons.length;i++){//ket block scope, each i stoe
//         removeButtons[i].addEventListener('click',function(event){
//             console.log("add event listener removeButtons",removeButtons,'sc',superheroContainers);

//         //remove character from favorites in  local Storage
//         const characterId=superheroContainers[i].getAttribute('value');
//         favorites=favorites.filter(element=>element.id != characterId);//datatype different so not use ===,!==
//         localStorage.setItem('favorites',JSON.stringify(favorites));//ifnexist already than update this key value,key always an string as an value  so convert json formate data into string
//         console.log(JSON.parse(localStorage.getItem('favorites')));
        
//         const character=superheroContainers[i];
//         character.parentNode.removeChild(character);//character node parent node return than child of parent remove
//      });
//     }
// }
function removeCharacter(id){
    console.log("add event listener removeButtons",id);
    const superheroContainers = document.getElementsByClassName('superhero-container');
   

    
         console.log(superheroContainers);//remove from dom nodes
          let characterNode=null;
          for(let i=0;i<superheroContainers.length;i++){
            if(superheroContainers[i].getAttribute('value')==id){
                characterNode=superheroContainers[i];
            }
            }
    //   const characterNode= (superheroContainers.filter(el=>el.getAttribute('value')==id))[0];
      characterNode.parentNode.removeChild(characterNode);//character node parent node return than child of parent remove
//remove fromlocal storage
      favorites=favorites.filter(element=>element.id != id);//datatype different so not use ===,!==
      localStorage.setItem('favorites',JSON.stringify(favorites));//ifnexist already than update this key value,key always an string as an value  so convert json formate data into string
      console.log('after remove',JSON.parse(localStorage.getItem('favorites')));
}

let favorites=null;
if(typeof(Storage)!=='undefined'){//tell whether browser support local storage /feature/facility
    console.log(' Window Storage',Storage)
console.log('supported local storage',JSON.parse(localStorage.getItem('favorites')));
favorites=JSON.parse(localStorage.getItem('favorites'));
}else{
    console.log('not supporting local storage');
}
window.Storage//This Web Storage API interface provides access to a particular domain's session or local storage. It allows, for example, the addition, modification, or deletion of stored data items.
//
// console.log(JSON.parse(favorites[0].characterId));
// localStorage.clear();
// console.log(JSON.parse(localStorage.getItem('favorites')));

if(favorites !== null){
    for(let i=0;i<favorites.length;i++){
        if(favorites[i].characterId !== null) { 
            createSuperheroContainer(favorites[i]);
        }
    }
    // fetchElement();
}

function createSuperheroContainer(character){//${} display any variable  

    superheroListContainer.insertAdjacentHTML('beforeend',`
    <div class="superhero-container" value="${character.id}">
    <div class="superhero-image-container">
        <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="superhero character image" >
    </div>
    <div class="superhero-body-container">
        <p class="superhero-name-container">${character.name}</p>
        <div class="superhero-detail-and-remove-link">
            <p class="remove-from-favorites" onClick="removeCharacter(${character.id})"><i class="fas fa-remove"></i>  Remove </p>
            <a href="./superheroDetail.html?characterId=${character.id}">Detail</a>
        </div> 
    
    </div>
    
</div>
        `
        );
    
        // superheroListContainer.append(div);//(`
    //     <div class="superhero-container" value="${character.characterId}">
    //         <div class="superhero-image-container">
    //             <img src="${character.imgSrc}" alt="superhero character image" >
    //         </div>
    //         <div class="superhero-body-container">
    //             <p class="superhero-name-container">${character.name}</p>
    //             <div class="superhero-detail-and-remove-link">
    //             <p class="remove-from-favorites"><i class="fas fa-remove"></i>  Remove </p>
    //             <a href="./superheroDetail.html?characterId=${character.characterId}">Detail</a>
    //             </div> 
            
    //         </div>
            
    //  </div>
    //     `);
}


// let c=0;
// function callApiToGetCharacterByCharacterId(id){
//     console.log("api call id",id);
//     fetch(`http://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=0f21d3585d27145062e0abfbbb35ace0&hash=a5b1f7d008ffe2ece0c01f89a6583d22`)
//     .then((response)=>{
    
//        const data = response.json();//promise return
//        return data;
    
//     }).then((responseData)=>{
//         const result = responseData.data.results; //return an array with single element
//         console.log(result);
//         // for(let i=0;i<results.length;i++){
//             //entire results array having an elemnt /character inside (by id app call)
//            const id = resultd[c].id;
//            const name = resultd[c].name;
//            const url = `${resultd[c].thumbnail.path}.${resultd[c].thumbnail.extension}`;
    
//            superheroContainers[c].setAttribute("value",id);//so at time to adddd to favorite i can store charater using unique id(this value)
//            charactersName[c].innerText=name;
//            charactersImage[c].setAttribute('src',url);//url pass get from api
//            characterDetail[c].setAttribute('href',`./superheroDetail.html?characterId=${id}`);//url pass characterId so using id get character from  API
         
         
//              superheroContainers[c].style.visibility='visible';
//              c++;
//         // }
//         // superheroListContainers.style.visibility='visible';
    

//     })
    
//     .catch((err)=>{
//         console.log(err);
//     });
// }
 