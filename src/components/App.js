import  { Component } from 'react';
import React from "react";

// import {Service} from "./Services/Service";
import Cities from "./Cities";
import FavoritesCities from "./FavoritesCities";
import "../App.css";
import InfiniteScroll from "react-infinite-scroll-component";



const citiesData = "./Services/cities-of-china.json";
// let cities=[];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
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
 this.fetchMoreData=this.fetchMoreData.bind(this);
    
    }

    componentDidMount() {
      debugger;
      this.getCities();
      
    }
   
    
  
    getCities() {
      fetch(citiesData)
        .then(response => response.json())
        .then(data => {
          // debugger;
         
       
         
          
          this.setState({cities:data.cities})
           
        });
       
    }



    fetchMoreData = () => {
      if (this.state.cities.length >= 600) {
        this.setState({ hasMore: false });
        return;
      }
      setTimeout(() => {
        const newLenght= this.state.number+20;
        this.setState({
         
          number: newLenght
        });
      }, 600);
    };

    handleFilter(event){
    
      
     const lookFor=event.currentTarget.value;
     this.setState({
       value:lookFor
       
     })

    }


    
    handleInputFavs (event){
    
        let target=event.target;
      //  console.log(target);
     if ( target.type === 'checkbox' ? target.checked : target.value){
      let englishandchinese={
        cityChineseName:event.target.value,
        cityEnglishName:event.target.id,
        
      }
      this.state.favoritesCities.push(englishandchinese);
//otra funcion
this.setState( {
          
  favoritesCities: this.state.favoritesCities

});

     }
     else {
      
       this.handleClearFav(event);
       
  
           
    }
  }

    handleClearFav(event){
      
      const todelete=event.target.id;// 0 ,1 ,2

      //otra funcion
      this.state.favoritesCities.splice(todelete,1);
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
     const  {cities,favoritesCities,number} =this.state;
     console.log(number);
     const citiesPag=cities.filter((n,i)=>[i]<number);

      const loader = <div className="loader">Loading ...</div>;
     

   
    return (
      <div className="App">
        <div className="App-header">
    
          <h2>Welcome to Cities of china</h2>
          <input type="text" onChange={this.handleFilter}></input>
          </div>
          <button type="button" className="btn btn-link all" onClick={this.selectAll}>Seleccionar Todo</button>
          <button type="button" className="btn btn-link nothing"onClick={this.selectNothing}>Clear</button>
          <div className="containerBothList">
          <div className="containerMainList">
    <p>{citiesPag.length}</p>
    <InfiniteScroll
          dataLength={cities.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
          
        
          >
  
          {citiesPag.filter(nameCity=>nameCity.name.includes(this.state.value))
        
           
          .map((city,i)=>(
            (city === "") ? {loader}  :
            
          
          
            <Cities  city={city} handleInputFavs={this.handleInputFavs} i={i}/>
            
           
        ))}
        </InfiniteScroll>
        
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
