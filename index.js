require('dotenv').config()

const express=require('express')

const cors=require('cors')
const router=require('./router')
require('./connection')

const GlobomartServer=express()

GlobomartServer.use(cors())

GlobomartServer.use(express.json())
GlobomartServer.use(router)

const port=4009|| process.env.port

GlobomartServer.listen(port,()=>{
    console.log(`Globomart server running at${port}`);
})
