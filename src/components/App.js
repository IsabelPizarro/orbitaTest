import  { Component } from 'react';
import React from "react";
import Header from "./Header";
import Cities from "./Cities";
import FavoritesCities from "./FavoritesCities";
import "../App.css";

const citiesData = "./Services/cities-of-china.json";


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

    handleFilter(event){
     const lookFor=event.currentTarget.value;
     this.setState({
       value:lookFor  
     })

    }

    changeNumber(){
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
     const todelete=event.target.id;// 
     this.state.favoritesCities.splice(todelete,1);//aqui hay fallo borrar por otra cosa porque l indice cambia
      this.setState( {
            favoritesCities: this.state.favoritesCities
      
    });
    const descheck=document.getElementById(event.target.className);
    console.log(descheck);
    descheck.checked=0
  
     }
    
      selectAll (event){
       const allChecks= document.querySelectorAll(".checkboxes");
        for (let i = 0; i < allChecks.length; i++) {
              if(allChecks[i] === "checkbox");
                allChecks[i].checked=1
            
                let emptyAll={
                  cityChineseName:allChecks[i].value,
                  cityEnglishName:allChecks[i].id
                }
                this.state.favoritesCities.push(emptyAll);
      
        this.setState( {
               favoritesCities: this.state.favoritesCities
        });
      }

       }
       selectNothing(){
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
      const citiesPag=allCities.filter((n,i)=>[i]<number);
      const loader = <div className="loader">Loading<div class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div></div>;

    return (
      <div className="App">
        <Header/>
        <div>
          <input type="text" onChange={this.handleFilter}></input>

          
      
          <div className="containerBothList">
          <div className="containerMainList">
    <p><span className="badge badge-primary badge-pill">{citiesPag.length}</span></p>
    <button type="button" className="btn btn-link all" onClick={this.selectAll}>Seleccionar Todo</button>
          {citiesPag.filter(nameCity=>nameCity.name.toLowerCase().includes(this.state.value.toLowerCase()))
           .map((city,i)=>(
            (city === "") ? {loader}  :
            <Cities  city={city} handleInputFavs={this.handleInputFavs} changeNumber={this.changeNumber} i={i}/> 
        ))}

            <button type="button" className="btn btn-primary" onClick={this.changeNumber}>Next Page</button>
            </div>
            
          
         <FavoritesCities  favoritesCities={favoritesCities} selectNothing={this.selectNothing} handleClearFav={this.handleClearFav}/>
         </div>
         </div>
      </div>
    )
}
}

export default App;
