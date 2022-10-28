const Buyers = require('../models/buyerModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const buyerController = {
    regsiter: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const user = await Buyers.findOne({email});

            if(user) {return res.status(400),json({msg: "The email already exists"})}

            if(password.length < 8) {return res.status(400).json({msg: "The password should be at least 8 characters"})}

            const hash = await bcrypt.hash(password, 10);

            const newBuyer = new Buyers({
                name,
                email,
                password: hash
            })

            await newBuyer.save();

            const accessToken = createAccessToken({id: newBuyer._id});
            const refreshToken = createRefreshToken({id: newBuyer._id});

            res.cookie('refresh_Token', refreshToken, {
                httpOnly: true,
                path: '/buyer/refresh_token'
            });

            res.json({accessToken});
        }
        catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const buyer = await Buyers.findOne({ email });
            if(!buyer) { return res.status(400).json({msg: "Buyer does not exist."}); }

            const isMatch = await bcrypt.compare(password, buyer.password);
            if(!isMatch) { return res.status(400).json({msg: "Incorrect password."}); }

            const accessToken = createAccessToken({id: buyer._id});
            const refreshToken = createRefreshToken({id: buyer._id});

            res.cookie('refresh_Token', refreshToken, {
                httpOnly: true,
                path: '/buyer/refresh_token'
            });

            res.json({accessToken});
        }
        catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refresh_Token', {path: '/buyer/refresh_token'});
            return res.json({msg: "Log out succesful!"});
        }
        catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    refreshToken: (req, res) => {
        try{
            const rf_token = req.cookies.refresh_Token;
            if(!rf_token) { return res.status(400).json({msg: "Please Login or Register"}); }

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, buyer) => {
                if(err) { return res.status(400).json({msg: "Please Login or Register"}); }
                
                const accessToken = createAccessToken({id: buyer.id});

                res.json({accessToken});
            });

        }
        catch(err){
            return res.status(500).json({msg: err.message});
        }
    },
    getBuyer: async (req, res) => {
        try{
            const buyer = await Buyers.findById(req.buyer.id).select('-password');
            if(!buyer) { return res.status(400).json({msg: "Buyer does not exist"}); }

            res.json({buyer});
        }
        catch(err){
            return res.status(500).json({msg: err.message});
        }
    }, 
};

const createAccessToken = (buyer) => {
    return jwt.sign(buyer, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1d"});
};

const createRefreshToken = (buyer) => {
    return jwt.sign(buyer, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "7d"});
};

module.exports = buyerController;