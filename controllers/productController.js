const products = require('../model/projectsModel')

exports.allProducts=async(req,res)=>{
console.log('inside  products controller');
try {
    const allproducts = await products.find()
    res.status(200).json(allproducts)
} catch (error) {
    res.status(401).json(error)
}
}

//to get a product

exports.getAProduct=async(req,res)=>{
    const {id} = req.params
    console.log(id);
    try {
        const product= await products.findOne({id})
        res.status(200).json(product)
        
    } catch (error) {
        res.status(401).json(error)
    }
}