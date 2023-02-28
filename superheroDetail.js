//fetch html element/node that we needed
const navigationAndSuperheroDetailContainer = document.getElementById('superhero-detail-and-navigation-container');

//get superhero from local storage as superheroDetail
const superheroDetail = JSON.parse(localStorage.getItem('superheroDetail'));


//function to add html to an  navigation And Superhero Detail Container
function createSuperheroContainer(superheroDetail){
    //getting seriesItems and stories item from superhero detail
    const seriesItems = superheroDetail.series.items;
    const storiesItems = superheroDetail.stories.items;

    //storing all series name in one string and separating each name with coma(,)
    let seriesName='';
     if(seriesItems.length>0 ){  
        for(let i=0;i<5 && i<seriesItems.length;i++){//getting only 5 series name(i<5)
            seriesName += seriesItems[i].name + ' , ';
           
        }
    }

    //storing all stories name in one string and separating each name with coma(,)
    let moviesName='';
    if(storiesItems.length>0 ){
        for(let i=0;i<5 && i<storiesItems.length;i++){//getting only 5 stories name(i<5)
            
            moviesName += storiesItems[i].name + ' , ';
        }
    }

    // adding html as child to   navigation And Superhero Detail Container
    navigationAndSuperheroDetailContainer.insertAdjacentHTML('afterbegin',`
        <!-- superhero container-->
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
        <!-- navigation container-->
        <div id="navigation-container">
            <a href="./index.html"> <i class=" fas fa-home"></i> Go To Home </a> 
            <a href="./favorites.html"><i class="fa-solid fa-star"></i> Favorite</a>
        </div>
    `);
}
//calling function with superhero detail to add html to an  navigation And Superhero Detail Container
createSuperheroContainer(superheroDetail);



//structure of superhero detail obj
/*superheroDetail = {
        id:"34",
        imgUrl:"url",
        name:"hulk",
        description:"",
        series:,
        stories:.
        addToFavorite:false
    }
 
    */