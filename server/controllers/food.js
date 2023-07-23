const {foodModel,foodCategoryModel} =require("../model/foodModel");

const getFoodData=async(req,res)=>{
    try{
    const foodData= await foodModel.find({});
    console.log(foodData);
    res.status(200).send({status: 'success',data:{foodData}})}
    catch(err){
        console.log(err);
        res.status(500).send({status: 'fail',message:"interanl server error"})
    }
}


const getFoodCategory = async(req, res)=>{
    try{
        const foodCategory=await foodCategoryModel.find({});
        console.log(foodCategory);
        res.status(200).send({status: 'success',data:{foodCategory}})

    }catch(err){
        console.log(err);
        res.status(500).send({status: 'fail',message:"internal server error"});


    }
}

module.exports={getFoodData,getFoodCategory}