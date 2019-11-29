import  { Component } from 'react';
import React from "react";

// import {Service} from "./Services/Service";
import Cities from "./Cities";
import FavoritesCities from "./FavoritesCities";
import "../App.css";


const citiesData = "./Services/cities-of-china.json";
// let cities=[];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      city: [],
      value:"",
      favoritesCities:[]
      
     };
this.getCities=this.getCities.bind(this);

this.handleFilter=this.handleFilter.bind(this);
this.handleInputFavs=this.handleInputFavs.bind(this);
this.handleClearFav=this.handleClearFav.bind(this);
this.selectAll=this.selectAll.bind(this);
this.selectNothing=this.selectNothing.bind(this);
    
    }

    componentDidMount() {
      this.getCities();
      
    }

  
    getCities() {
      fetch(citiesData)
        .then(response => response.json())
        .then(data => {
          this.setState({cities:data.cities})
          
        
           
        });
    }
    handleFilter(event){
      
     const lookFor=event.currentTarget.value;
     this.setState({
       value:lookFor
       
     })

    }


    
    handleInputFavs (event){
//estatus cambiar a true
      let englishandchinese={
        cityChineseName:event.target.id,
        cityEnglishName:event.target.value
      }
      this.state.favoritesCities.push(englishandchinese);

       this.setState( {
          
            favoritesCities: this.state.favoritesCities
          
        });
      
        
    }
    handleClearFav(event){
      console.log(event.target.id);
      const todelete=event.target.id;
      this.state.favoritesCities.splice(todelete,1);
      this.setState( {
          
        favoritesCities: this.state.favoritesCities
      
    });


    }
    
    
     selectAll (event){
       console.log(event.target.checked);
       const checkboxes=document.querySelectorAll(".checkboxes");
       console.log(checkboxes);

     
      for (let i = 0; i < checkboxes.length; i++) {
            if(checkboxes[i] === "checkbox");
              checkboxes[i].checked=1
              //satus true
      }

      }
      selectNothing(event){
        const checkboxes=document.querySelectorAll(".checkboxes");
        for (let i = 0; i < checkboxes.length; i++) {
              if(checkboxes[i] === "checkbox");
                checkboxes[i].checked=0
        }

      }
  



  render() {
     const  {cities,favoritesCities} =this.state;

    
     

   
    return (
      <div className="App">
        <div className="App-header">
    
          <h2>Welcome to Cities of china</h2>
          <input type="text" onChange={this.handleFilter}></input>
          </div>
          <button type="button" class="btn btn-link all" onClick={this.selectAll}>Seleccionar Todo</button>
          <button type="button" class="btn btn-link nothing"onClick={this.selectNothing}>Deselecionar todo</button>
          <div className="containerBothList">
          <div className="containerMainList">
  
          {cities.filter(nameCity=>nameCity.name.includes(this.state.value))
          .map(city=>(
            
          
          
            <Cities  city={city} handleInputFavs={this.handleInputFavs}/>
            
           
        ))}
        
         </div>
         <div>
        
        
         <FavoritesCities  favoritesCities={favoritesCities} handleClearFav={this.handleClearFav}/>
         
         </div>
         </div>
      </div>
    )
}
}

export default App;
