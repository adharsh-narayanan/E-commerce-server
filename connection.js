const mongoose = require('mongoose')
const connectionString = process.env.DATABASE 
mongoose.connect(connectionString).then(()=>{
    console.log('mongoDB connected successfully');
}).catch((error)=>{
    console.log(`connection failed due to ${error}`);
})