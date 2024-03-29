import React from 'react';
import { useState } from 'react';
// import { useContext } from 'react';
// import { useSearchBox, useSearchDispatch } from './searchProvider';




export default function Carousel({imgURL,filterData}){
  // const searchBox = useSearchBox();
  // const useDispatch =  useSearchDispatch();

return(
<div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel"
style={{width:"100%"}}
  >
  <div class="carousel-inner" style={{
    maxHeight:"600px" 
     
  }}>
    <div className="carousel-item active">
      <img className="d-block w-100" style={{objectFit:"contain !important",objectPosition:"center",filter:"brightness(30%)"}} src={imgURL}/>
    </div>
    <div class="carousel-item">
      <img  className="d-block w-100" style={{objectFit:"contain !important",objectPosition:"center",filter:"brightness(30%"}} src={imgURL}/>
    </div>
    <div className="carousel-item">
      <img  className="d-block w-100" style={{objectFit:"contain !important",objectPosition:"center",filter:"brightness(30%"}} src={imgURL}/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>

   
  </button>
  <div style={{
    display: "flex",
    width:"100%",
        justifyContent:"center",
        zIndex:"10",
        position:"absolute",
        bottom:"15%",
    
  }}>
    <div className='search-input-field' style={{
        width:"70%",
        
        // positon:"absolute"
    }}><input class="search-box" type="text" placeholder="Search Category" onChange={e=>filterData(e.target.value)} /></div>

    {/* <div className="search-btn"><button  >Search</button></div> */}
  </div>
</div>)}