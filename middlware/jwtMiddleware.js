const jwt=require('jsonwebtoken')

const jwtMiddleware=(req,res,next)=>{
    console.log('inside jwt middleware');

try {

    const token=req.headers['authorization'].split(" ")[1]
    console.log(token);

    const jwtResponse=jwt.verify(token,'SecretKey')
    console.log(jwtResponse);
    req.payload=jwtResponse.userid
    next()
  
} catch (error) {
res.status(401).json(`Authentication failed due to ${error}`)
}
}

module.exports=jwtMiddleware