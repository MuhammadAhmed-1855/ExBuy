const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try{
        const token = req.header("Authorization");
        if(!token){ return res.status(500).json({msg: "Invalid Authentication. (No Token)"}); }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, buyer) => {
            if(err){ return res.status(500).json({msg: "Invalid Authentication. (Verify Problem)"}); }
            
            req.buyer = buyer;
            next();
        });

    }
    catch(err) {
        return res.status(500).json({msg: err.message});
    }
};

module.exports = auth;