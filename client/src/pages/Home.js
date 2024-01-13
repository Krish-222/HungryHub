import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Card from '../components/Card'

import { ToastContainer, toast } from 'react-toastify'

import "react-toastify/dist/ReactToastify.css"


import axios from "axios"

import Carousel from '../components/Carousel'
// import { useSearchBox } from '../components/searchProvider'






function Home() {
  // const [search, setSearch] = useState("");
  let [foodData, setFoodData] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  // const searchBox=useSearchBox();
  const [imgURL,setImgURL]=useState("");



  const fetchData = async () => {
    var { data } = await axios.get("https://hungry-hub-nu.vercel.app/api/v1/food/fooddata");
    console.log("food", data.data.foodData);
    setFoodData(data.data.foodData);
    var { data } = await axios.get("https://hungry-hub-nu.vercel.app/api/v1/food/foodcategory");
    console.log("foodcategory", data.data.foodCategory);
    setFoodCategory(data.data.foodCategory);

    // console.log(data.foodData);
  };

  useEffect(() => {
    
    fetchData();
    const fetchFoodImages=async()=>{
      try{
         const api="https://www.themealdb.com/api/json/v1/1/random.php"
         const response=await axios.get(api);
         console.log(response);
         const imgURL=response.data.meals[0].strMealThumb;
         console.log("image url is: ", imgURL);
         setImgURL(imgURL);
      }
      catch(err){
        console.log(err);

      }
    }
    fetchFoodImages();
  }, []);

  const filterData=(val)=>{
    if(val==="") {fetchData();return;}
    // fetchD();
     const filteredItems=foodData.filter((item,index)=>{
        return item.CategoryName.toLowerCase().match(val.toLowerCase());
     })
     const filteredCategory=foodCategory.filter((item,index)=>{
      return item.CategoryName.toLowerCase().match(val.toLowerCase());
     })
     setFoodData(filteredItems);
     setFoodCategory(filteredCategory);
  }


  // console.log(foodData);
  return (
    <div style={{backgroundColor:"black"}}>
      {/* <Navbar/> */}

      <Header />
      <Carousel imgURL={imgURL} filterData={filterData}/>
      {/* style={{ display: "flex", width: "100vw", flexWrap: "wrap", justifyContent: "center" }} */}
      {/* <RandomImages/> */}
      <div>
        {foodCategory.length!==0 ? foodCategory.map((item, index) => (
          <>
            <h2 style={{
              paddingLeft:"10%",
              marginTop:"20px"
            }}>{item.CategoryName}</h2>
            <hr></hr>
            <div 
              style={
                { display: "flex", width: "100vw", flexWrap: "wrap", justifyContent: "center" }
                    }
            >
            { foodData.length!=0 ? foodData.filter((data, index) => (
              data.CategoryName === item.CategoryName
            )).map((data, index) => (
               
              <Card name={data.name} options={data.options} img={data.img} id={data._id}  />

            )):""}
            </div>
          </>
        )
        ):""}
      </div>
    </div>
  )
}

export default Home
