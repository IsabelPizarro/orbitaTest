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
      favoritesCities:[],
      defaultChecked:false
      
     };
this.getCities=this.getCities.bind(this);

this.handleFilter=this.handleFilter.bind(this);
this.handleInputFavs=this.handleInputFavs.bind(this);
this.handleClearFav=this.handleClearFav.bind(this);
 this.selectAll=this.selectAll.bind(this);
// this.selectNothing=this.selectNothing.bind(this);
// this.renderfavsInRight=this.renderfavsInRight.bind(this);s
    
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
       let target=event.target;
     if ( target.type === 'checkbox' ? target.checked : target.value){
      let englishandchinese={
        cityChineseName:event.target.id,
        cityEnglishName:event.target.value
      }
      this.state.favoritesCities.push(englishandchinese);
//otra funcion
this.setState( {
          
  favoritesCities: this.state.favoritesCities

});

     }
     else {
       this.handleClearFav(event)
       //y quitar el checked
     }
  

 

 
    
      
        
    }
    handleClearFav(event){
      console.log(event.target.id);
      const todelete=event.target.id;
      //otra funcion
      this.state.favoritesCities.splice(todelete,1);
      this.setState( {
          
        favoritesCities: this.state.favoritesCities
      
    });


    }
    
    
      selectAll (){
    //   // this.setState( {
       
          
    //   //   defaultChecked: true
      
    // });
   const todos= document.querySelectorAll(".checkboxes");

  
  
      for (let i = 0; i < todos.length; i++) {
            if(todos[i] === "checkbox");
              todos[i].checked=1
              console.log(todos[i].id);
              ///pinatr aquiiii
              let ese={
                cityChineseName:todos[i].id,
                cityEnglishName:todos[i].value
              }
              this.state.favoritesCities.push(ese);
        //otra funcion
        this.setState( {
                  
          favoritesCities: this.state.favoritesCities
        
        });
      }

       }
      // selectNothing(event){
        //igualat favoties a 00
      //   this.setState( {
          
      //     defaultChecked: false
        
      // });

      // }
  



  render() {
     const  {cities,favoritesCities} =this.state;

    
     

   
    return (
      <div className="App">
        <div className="App-header">
    
          <h2>Welcome to Cities of china</h2>
          <input type="text" onChange={this.handleFilter}></input>
          </div>
          <button type="button" className="btn btn-link all" onClick={this.selectAll}>Seleccionar Todo</button>
          <button type="button" className="btn btn-link nothing"onClick={this.selectNothing}>Deselecionar todo</button>
          <div className="containerBothList">
          <div className="containerMainList">
  
          {cities.filter(nameCity=>nameCity.name.includes(this.state.value))
          .map((city,i)=>(
            
          
          
            <Cities  city={city} handleInputFavs={this.handleInputFavs} i={i}/>
            
           
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
