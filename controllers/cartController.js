const carts = require("../model/cartModel");


//to add product to cart
exports.AddToCart = async (req, res) => {
    console.log('inside cart controller');
    const userid = req.payload
    const { id, title, price, description, category, image, rating, quantity } = req.body
    try {
        const existingProduct = await carts.findOne({ id, userid })
        if (existingProduct) {
            existingProduct.quantity += 1; //increments quantity
            existingProduct.grandTotal = existingProduct.quantity * existingProduct.price; //price recalculation

            await existingProduct.save()
            res.status(200).json(existingProduct)

        } else {
            const newProduct = await new carts({
                id, title, price, description, category, image, rating, quantity, grandTotal: price, userid

            })

            await newProduct.save()
            res.status(200).json(newProduct)
        }

    } catch (error) {
        res.status(401).json(`req failed due to ${error}`)
    }
}

//to get products from cart

exports.getFromCart = async (req, res) => {
    const userid = req.payload

    try {
        const products = await carts.find({ userid })
        res.status(200).json(products)

    } catch (error) {
        res.status(401).json(`req failed due to ${error}`)
    }
}

//to delete from cart

exports.removeFromCart = async (req, res) => {
    const { id } = req.params
    console.log(id);
    try {
        await carts.deleteOne({ _id: id })
        res.status(200).json('Product Removed Succesfully')
    } catch (error) {
        res.status(401).json(`req failed due to ${error}`)
    }
}

//to empty cart

exports.emptyCart = async (req, res) => {
    const userid = req.payload
    console.log(userid);
    console.log('inside empty cart');
    try {
        await carts.deleteMany({ userid })
        res.status(200).json('cart emptied Succesfully')
    } catch (error) {
        res.status(401).json(`req failed due to ${error}`)
    }
}

//to increment product count in cart

exports.incrementCart = async (req, res) => {
    const { id } = req.params
    console.log(id);

    try {
        const selectedProduct = await carts.findOne({ _id: id })
        if (selectedProduct) {
            selectedProduct.quantity += 1
            selectedProduct.grandTotal = selectedProduct.price * selectedProduct.quantity
            await selectedProduct.save()
            res.status(200).json(selectedProduct)


        } else {
            res.status(406).json(`No Such product`)
        }

    } catch (error) {
        res.status(401).json(`req failed due to ${error}`)
    }
}

//to decrement product count in cart

exports.decrementCart = async (req, res) => {
    const { id } = req.params
    console.log(id);

    try {
        const selectedProduct = await carts.findOne({ _id: id })
        if (selectedProduct) {
            selectedProduct.quantity -= 1

            if (selectedProduct.quantity == 0) {
                await carts.deleteOne({ _id: id })
                res.status(200).json('item removed')

            } else {
                selectedProduct.grandTotal = selectedProduct.price * selectedProduct.quantity
                await selectedProduct.save()
                res.status(200).json(selectedProduct)
            }




        } else {
            res.status(406).json(`No Such product`)
        }

    } catch (error) {
        res.status(401).json(`req failed due to ${error}`)
    }
}