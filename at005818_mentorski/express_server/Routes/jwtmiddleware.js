const jwt = require('jsonwebtoken');

function authenticateToken (req, res) {
    const Header = req.headers['x-access-token'];
    if (Header == undefined) res.sendStatus(403);
    else{
        const bearer = Header.split(' ');
        const token = bearer[1];
        return jwt.verify(token, process.env.secretCode, (err, decoded) =>{
            if(err) return res.status(403).send({
                success: false,
                message: 'Failed to authenticate token.'
            });
        req.token = decoded;
        return decoded;                  
        }); 
    }
   
}

module.exports = authenticateToken;