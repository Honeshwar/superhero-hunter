//fetch html element/node that we needed
const superheroListContainer=document.querySelector('#superhero-overall-container');

// console.log('after character',JSON.parse(localStorage.getItem('characterDetail')));
//get superhero from local storage as superheroDetailDetail
const superheroDetail = JSON.parse(localStorage.getItem('superheroDetailDetail'));//an obj {id,name,imgUrl,description, series,stories}


function createSuperheroContainer(superheroDetail){//${} display any variable  
    // console.log('after createSuperheroContainer',JSON.parse(localStorage.getItem('superheroDetailDetail')));
    //storing all series name in one string and separating each name with coma(,)
    const seriesItems = superheroDetail.series.items;
   
    let seriesName='';
     if(seriesItems.length>0 ){  
        for(let i=0;i<5 && i<seriesItems.length;i++){
            seriesName += seriesItems[i].name + ' , ';
           
        }
    }
      //storing all stories name in one string and separating each name with coma(,)
    const storiesItems = superheroDetail.stories.items;
    let moviesName='';
    if(storiesItems.length>0 ){
        for(let i=0;i<5 && i<storiesItems.length;i++){
            
            moviesName += storiesItems[i].name + ' , ';
        }
    }
    // adding node(superhero container) as child to  superhero List Container 
    superheroListContainer.insertAdjacentHTML('afterbegin',`
    <div id="superhero-container"  style="background-image:url('${superheroDetail.imgUrl}');">

        <div id="superhero-image-container">
        <img src="${superheroDetail.imgUrl}" alt="superheroDetail image">
        </div>    
        <div id="superhero-details-container" >
            <h1>SuperHero Detail</h1>
            <p  id="superhero-name"> <strong>Name: </strong><span> ${superheroDetail.name}</span></p>
            <p  id="superhero-description"><strong>Description: </strong><span>${superheroDetail.description}</span></p>
            <p  id="superhero-series"> <strong>Series:</strong><span>${seriesName}</span></p>
            <p  id="superhero-movies"><strong>Movies: </strong><span>${moviesName}</span></p>
            <p><medium id="">Last updated 3 mins ago</medium></p>
        
        </div>
  </div>
    `);
}
createSuperheroContainer(superheroDetail);

//structure of superhero detail obj
/*
superheroDetail = [ 
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

] 

 */