const jwt = require('jsonwebtoken');


function authenticateToken (req, res, next) {
    const Header = req.headers['token'];
    if (Header == undefined) res.sendStatus(403);
    else{
        const bearer = Header.split(' ');
        const token = bearer[1];
        jwt.verify(token, process.env.secretCode, (err, decoded) =>{
            if(err) return res.status(403).send({
                success: false,
                message: 'Failed to authenticate token.'
            });
        req.token = decoded;                     
        }); 
        next();
    }
   
}

module.exports = authenticateToken;