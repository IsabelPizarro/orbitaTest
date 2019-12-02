import React from "react";



const Cities = props => {
  const { city, handleInputFavs, i} = props;
  

    return (
      <div >
          <div className="containerList">
          
    
          <ul className="ulList">
    <li className="citiesList list-group-item"   key={city.name} id={city.id}> <input type="checkbox" value={city.chineseName}  className="checkboxes" key={i} id={city.name} onChange={handleInputFavs}/> <h6>{city.name}</h6><h5>{city.chineseName}</h5> </li>
            </ul>
            </div>
            
            </div>
          

    );
  };
  
  export default Cities;
