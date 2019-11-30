import React from "react";



const Cities = props => {
  const { city, handleInputFavs, i} = props;
  
  // const changeChecked=(ev)=>{
  //   const checked= ev.currentTarget.checked;
  //   handleInputFavs(checked);
  // }
    
    
    // console.log(city);
    return (
      <div >
          <div className="containerList">
    
          <ul className="ulList">
    <li className="citiesList"  key={i} id={city.id}> <input type="checkbox" value={city.name}  className="checkboxes" key={i} id={city.chineseName} onChange={handleInputFavs}/> {city.name} {city.chineseName}</li>
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
