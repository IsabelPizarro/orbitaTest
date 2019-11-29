import React from "react";


const FavoriteCities = props => {
  // console.log(props);

   const{favoritesCities, handleClearFav}= props;
 
console.log(favoritesCities);

   return (
     <div >
     <h1>hola</h1>
     <span>Número de items{favoritesCities.length}</span>
     <ul className="ulFavoritesCities">
      
        {favoritesCities.map((cityFav, i)=>
<li ><span>{cityFav.cityEnglishName}</span>{cityFav.cityChineseName} 
         <button type="text" onClick={handleClearFav} className={cityFav} id={i}>x</button></li>)} 
        
     </ul>
     </div>
   );
 };




export default FavoriteCities;