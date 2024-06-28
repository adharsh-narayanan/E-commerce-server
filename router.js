const express=require('express')
const router = express.Router()
const userController=require('./controllers/userController')
const productController = require('./controllers/productController')
const jwtMiddleware=require('./middlware/jwtMiddleware')
const wishlistController=require('./controllers/wishlistcontroller')
const cartController=require('./controllers/cartController')
//request to get allproducts
router.get(`/all-products`,productController.allProducts)


//request to register

router.post(`/user/register`,userController.register)

//request to login

router.post('/user/login',userController.login)

//request to add to wishlist
router.post('/user/wishlist',jwtMiddleware,wishlistController.addtowishlist)

//request to get a product

router.get('/view-product/:id',productController.getAProduct)

//request to get wishlist items

router.get('/wishlist/products',jwtMiddleware,wishlistController.getfromwishlists)

//request to remove item from wishlist

router.delete('/wishlist/remove-item/:id',jwtMiddleware,wishlistController.removeFromWishlist)


//request to add item to cart
router.post('/user/cart',jwtMiddleware,cartController.AddToCart)

//get products from cart

router.get('/cart/products',jwtMiddleware,cartController.getFromCart)

//request to delete an item from cart

router.delete('/cart/remove-item/:id',jwtMiddleware,cartController.removeFromCart)

//request to empty the cart

router.delete('/cart/empty-cart',jwtMiddleware,cartController.emptyCart)

//request to increment cart item quantity

router.get('/cart/increment/:id',jwtMiddleware,cartController.incrementCart)  //put is not used because not updating the databse instead directly incresing the numbers

//request to increment cart item quantity
router.get('/cart/decrement/:id',jwtMiddleware,cartController.decrementCart)




module.exports=router