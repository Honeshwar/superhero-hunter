const body = document.querySelector('body');
const loading = document.getElementById('loading');
const superheroContainer = document.querySelector('#superhero-container');
const setImgSrc = document.querySelector('#superhero-image-container img');
const characterName = document.querySelector('#superhero-name span');
const characterDescription = document.querySelector('#superhero-description span');
const characterSeriesName = document.querySelector('#superhero-series span');
const characterMoviesName = document.querySelector('#superhero-movies span');
console.log(characterName,characterDescription);

// console.log('after character',JSON.parse(localStorage.getItem('characterDetail')));
const character = JSON.parse(localStorage.getItem('characterDetail'));//an obj {id,name,imgUrl,description, series,stories}


function createSuperheroContainer(character){//${} display any variable  
    console.log('after createSuperheroContainer',JSON.parse(localStorage.getItem('characterDetail')));
    superheroListContainer=document.querySelector('#superhero-overall-container');

    const seriesItems = character.series.items;
   
    let seriesName='';
     if(seriesItems.length>0 ){  
        for(let i=0;i<5 && i<seriesItems.length;i++){
            seriesName += seriesItems[i].name + ' , ';
           
        }
    }
    const storiesItems = character.stories.items;
    let moviesName='';
    if(storiesItems.length>0 ){
        for(let i=0;i<5 && i<storiesItems.length;i++){
            
            moviesName += storiesItems[i].name + ' , ';
        }
    }
    superheroListContainer.insertAdjacentHTML('afterbegin',`
    <div id="superhero-container"  style="background-image:url('${character.imgUrl}');">

        <div id="superhero-image-container">
        <img src="${character.imgUrl}" alt="character image">
        </div>    
        <div id="superhero-details-container" >
            <h1>SuperHero Detail</h1>
            <p  id="superhero-name"> <strong>Name: </strong><span> ${character.name}</span></p>
            <p  id="superhero-description"><strong>Description: </strong><span>${character.description}</span></p>
            <p  id="superhero-series"> <strong>Series:</strong><span>${seriesName}</span></p>
            <p  id="superhero-movies"><strong>Movies: </strong><span>${moviesName}</span></p>
            <p><medium id="">Last updated 3 mins ago</medium></p>
        
        </div>
  </div>
    `);
}
createSuperheroContainer(character);

//     <div id="superhero-container">

//         <div id="superhero-image-container">
//         <img src="https://cdn.pixabay.com/animation/2023/01/25/07/54/07-54-16-78_640.png" alt="character image">
//         </div>    
//         <div id="superhero-details-container" >
//             <h1>SuperHero Detail</h1>
//             <p  id="superhero-name"> <strong>Name: </strong><span> ${character.name}</span></p>
//             <p  id="superhero-description"><strong>Description: </strong><span>${character.description}</span></p>
//             <p  id="superhero-series"> <strong>Series:</strong><span>${character.series.items[0].name}</span></p>
//             <p  id="superhero-movies"><strong>Movies: </strong><span>${character.stories.items[0].name}</span></p>
//             <p><medium id="">Last updated 3 mins ago</medium></p>
        
//         </div>
// </div>


// function callApiToGetCharacterByCharacterId(id){
//     console.log("api call id",id);
//     fetch(`http://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=0f21d3585d27145062e0abfbbb35ace0&hash=a5b1f7d008ffe2ece0c01f89a6583d22`)
//     .then((response)=>{
    
//        const data = response.json();//promise return
//        return data;
    
//     }).then((responseData)=>{
       
//         const result= responseData.data.results
//         console.log("result,",result);
//         const imgSrc=`${result[0].thumbnail.path}.${result[0].thumbnail.extension}`;
//         const name=result[0].name;
//         const description=result[0].description;
//         body.style.backgroundImage=imgSrc;
//         setImgSrc.setAttribute('src',imgSrc);
//         characterName.innerText=name;
//         characterDescription.innerText=description;
//         body.style.backgroundImage=imgSrc;

//         const seriesItems =result[0].series.items;// items array
//         const moviesItems =result[0].stories.items;// items array
//        if(seriesItems.length>0 ){
//         let seriesName='';
//         for(let i=0;i<5;i++){
//             seriesName +=seriesItems[i].name + ' , ';
           
//         }
//         characterSeriesName.innerText=seriesName;
       
//        }
//        if(moviesItems.length>0 ){
//        let moviesName='';
//         for(let i=0;i<5;i++){
           
//             moviesName +=moviesItems[i].name + ' , ';
//         }
       
//         characterMoviesName.innerText=moviesName;
//        }
//         loading.style.display='none';
//         superheroContainer.style.visibility='visible';

//         // div.innerHtml=`
//         // <div id="superhero-overall-container">
//         // <h1 style="text-align: center;">SuperHero Detail</h1>
//         // <div id="superhero-image-container">
//         // <img src="${result[0].thumbnail.path}.${result[0].thumbnail.extension}" alt="">
//         // </div>    
//         // <div id="superhero-details-container">
//         // <p id="superhero-name"> <strong>Name:</strong><span>${result[0].name}</spa></p>
//         // <p id="superhero-description"">
//         // <strong>Description: </strong><span>${result[0].description}</span></p>
//         // <p id="superhero-age""><small id="">Last updated 3 mins ago</small></p>

//         // </div>
//         // </div>
//         // `;
    
//     })
    
//     .catch((err)=>{
//         console.log(err);
//     });
// }
 
// const queryParamsString=location.search;//retun an  entire query param from url
// const urlParams = new URLSearchParams(queryParamsString)// is an class provide  functionality to get query param individually from query params string or more....
// const characterId = urlParams.get('characterId');

// // console.log('id',"id",'local storage',JSON.parse(localStorage.getItem("superheroId")))
// // const id=JSON.parse(localStorage.getItem(""))[0];//array return
// console.log(queryParamsString,urlParams,characterId);
// const result = callApiToGetCharacterByCharacterId(characterId);

//${character.series.items[0].name} ${character.stories.items[0].name}
