import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Card from '../components/Card'

import { ToastContainer, toast } from 'react-toastify'

import "react-toastify/dist/ReactToastify.css"


import axios from "axios"

import Carousel from '../components/Carousel'





function Home() {


  const [search, setSearch] = useState("");



  const [foodData, setFoodData] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      var { data } = await axios.get("http://localhost:5000/api/v1/food/fooddata");

      console.log("food", data.data.foodData);
      // console.log()

      setFoodData(data.data.foodData);

      var { data } = await axios.get("http://localhost:5000/api/v1/food/foodcategory");
      console.log("foodcategory", data.data.foodCategory);
      setFoodCategory(data.data.foodCategory);

      // console.log(data.foodData);
    };
    fetchData();
  }, []);


  // console.log(foodData);
  return (
    <div >
      {/* <Navbar/> */}

      <Header />
      <Carousel />
      {/* style={{ display: "flex", width: "100vw", flexWrap: "wrap", justifyContent: "center" }} */}
      {/* <RandomImages/> */}
      <div >
        {foodCategory!=[] ?foodCategory.map((item, index) => (
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
            {foodData!==[]? foodData.filter((data, index) => (
              data.CategoryName === item.CategoryName
            )).map((data, index) => (
               
              <Card name={data.name} options={data.options} img={data.img} id={data.id} />

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