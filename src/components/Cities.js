import React from "react";



const Cities = props => {
  const { city, handleInputFavs, i} = props;
  

    return (
      <div >
          <div className="containerList">
    
          <ul className="ulList">
    <li className="citiesList"   key={city.name} id={city.id}> <input type="checkbox" value={city.name}  className="checkboxes" key={i} id={city.name} onChange={handleInputFavs}/> {city.name} {city.chineseName}</li>
            </ul>
            </div>
            <div  className="containerfavs">
                <ul>

                </ul>
                

            </div>
            </div>
          

    );
  };
  
  export default Cities;
