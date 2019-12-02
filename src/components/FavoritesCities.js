import React from "react";


const FavoriteCities = props => {
  // console.log(props);

   const{favoritesCities, handleClearFav,selectNothing}= props;
 
//  console.log(favoritesCities);

   return (
     <div >
     {/* <h1>hola</h1> */}
     <div>
     <span className="badge badge-primary badge-pill">{favoritesCities.length}</span>
     <button type="button" className="btn btn-link nothing"onClick={selectNothing}>Clear</button>
     </div>
     <ul className="ulFavoritesCities">
      
        {favoritesCities.map((cityFav, i)=>
<li kei={i} className="list-group-item" id={cityFav.cityChineseName}><h6>{cityFav.cityEnglishName}</h6><h5>{cityFav.cityChineseName}</h5>
         <button type="text" onClick={handleClearFav} className={cityFav.cityEnglishName} id={i}>x</button></li>)} 
        
     </ul>
     </div>
   );
 };




export default FavoriteCities;