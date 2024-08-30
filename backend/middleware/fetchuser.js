const jwt = require('jsonwebtoken');
const JWT_SECRET = "saymynamebharat"
const fetchuser = (req , res , next)=>{

const token = req.header('auth-token');
if(!token)
    {
        res.status(401).send({error:"please authenticate using correct token"});

    }

try {

    const data = jwt.verify(token ,JWT_SECRET);
    req.user = data;
    next();

    
} catch (error) {
    console.log(error);
    res.status(401).send({error:"please authenticate using correct d token"});
}

}




module.exports = fetchuser