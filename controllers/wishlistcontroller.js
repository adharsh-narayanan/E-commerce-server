const wishes = require("../model/wishlistsModel");
//add to wishlist
exports.addtowishlist=async(req,res)=>{
    const userid=req.payload
    console.log(userid);

   const{id,title,price,description,category,image,rating}=req.body

   try {
    const existingProduct=await wishes.findOne({id,userid})
    if(existingProduct){
       res.status(406).json('product is already exists in your wishlist')
    }else{
        const newProduct=await new wishes({
            id,title,price,description,category,image,rating,userid            
        })

        await newProduct.save()
        res.status(200).json(newProduct)
    }
    
   } catch (error) {
    res.status(401).json(`req failed due to ${error}`)
}

}

//to get wishlists

exports.getfromwishlists=async(req,res)=>{
    const userid=req.payload

    try {
        const products=await wishes.find({userid})
        res.status(200).json(products)
        
    } catch (error) {
        res.status(401).json(`req failed due to ${error}`)
    }

}

//to delete from wislist

exports.removeFromWishlist=async(req,res)=>{
    const {id}=req.params
    try {
        const removeItem=await wishes.findByIdAndDelete({_id:id})
        res.status(200).json(removeItem)
        
    } catch (error) {
        res.status(401).json(`req failed due to ${error}`)
    }
}