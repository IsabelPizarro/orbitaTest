import React from "react";
 

const Cities = props => {
     const { city, handleInputFavs } = props;

    
    
    // console.log(city);
    return (
      <div >
          <div className="containerList">
    
          <ul className="ulList">
    <li className="citiesList"  key={city.id} id={city.id}> <input type="checkbox" value={city.name} className="checkboxes" id={city.chineseName} onClick={handleInputFavs}/> {city.name} {city.chineseName}</li>
            </ul>
            </div>
            <div  className="containerfavs">
                <ul></ul>

            </div>
            </div>
          

    );
  };
  
  export default Cities;
