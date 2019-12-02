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
      allCities: [],
      hasMore: true,
      number:20,
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
//  this.fetchMoreData=this.fetchMoreData.bind(this);
 this.changeNumber=this.changeNumber.bind(this);
    
    }

    componentDidMount() {
      this.getCities(); 
    }
   
    
    getCities() {
      fetch(citiesData)
        .then(response => response.json())
        .then(data => {
          this.setState({allCities:data.cities})    
        });
       
    }

    // fetchMoreData = () => {
    //   if (this.state.allCities.length >= 600) {
    //     this.setState({ hasMore: false });
    //     return;
    //   }


    // setTimeout(() => {
    //     const newLenght= this.state.number+20;
    //     this.setState({
         
    //       number: newLenght
    //     });
    //   }, 600);
    // };

    handleFilter(event){
     const lookFor=event.currentTarget.value;
     this.setState({
       value:lookFor  
     })

    }
changeNumber(){
  console.log(this.state.number+20);
  console.log("hola");
  this.setState({number:this.state.number+20})
}

    
    handleInputFavs (event){
     let target=event.target;
     if ( target.type === 'checkbox' ? target.checked : target.value){
      let englishandchinese={
        cityChineseName:event.target.value,
        cityEnglishName:event.target.id,  
      }

      this.state.favoritesCities.push(englishandchinese);

        this.setState( { 
            favoritesCities: this.state.favoritesCities
          });

     }
     else {
       this.handleClearFav(event);
    }
  }

    handleClearFav(event){
      debugger;
      
      const todelete=event.target.id;// 0 ,1 ,2
      console.log(todelete.index);

      //otra funcion
      this.state.favoritesCities.splice(todelete,1);//aqui hay fallo borrar por otra cosa porque l indice cambia
      this.setState( {
          
        favoritesCities: this.state.favoritesCities
      
    });
    console.log(event.target.id);
    const descheck=document.getElementById(event.target.className);
    console.log(descheck);
    descheck.checked=0
  
     }
    
      selectAll (){
 
   const todos= document.querySelectorAll(".checkboxes");

      for (let i = 0; i < todos.length; i++) {
            if(todos[i] === "checkbox");
              todos[i].checked=1
           
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
       selectNothing(event){
        const todos= document.querySelectorAll(".checkboxes");

  
  
        for (let i = 0; i < todos.length; i++) {
              if(todos[i] === "checkbox");
                todos[i].checked=0}
                this.setState( {
                  
                  favoritesCities: []
                
                });

       }
  



  render() {
     const  {allCities,favoritesCities,number} =this.state;
     console.log(number);
     const citiesPag=allCities.filter((n,i)=>[i]<number);

      const loader = <div className="loader">Loading ...</div>;
     

   
    return (
      <div className="App">
        <div className="App-header">
    
          <h2>Welcome to Cities of china</h2>
          <input type="text" onChange={this.handleFilter}></input>
          </div>
          <button type="button" className="btn btn-link all" onClick={this.selectAll}>Seleccionar Todo</button>
          <button type="button" className="btn btn-link nothing"onClick={this.selectNothing}>Clear</button>
          <button type="button" className="btn btn-link all" onClick={this.changeNumber}>+</button>
          <div className="containerBothList">
          <div className="containerMainList">
    <p>{citiesPag.length}</p>
  
  
          {citiesPag.filter(nameCity=>nameCity.name.includes(this.state.value))
        
           
          .map((city,i)=>(
            (city === "") ? {loader}  :
            
          
          
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
