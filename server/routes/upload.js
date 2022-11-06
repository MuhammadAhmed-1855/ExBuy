const router = require('express').Router();
const cloudinary = require('cloudinary');
const auth = require('../middleware/auth');
const fs = require('fs');

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

function ValidateFile(fileName) 
{
    var allowedExtension = ['jpeg', 'jpg'];
    var fileExtension = fileName.split('.').pop().toLowerCase();
    var isValidFile = false;

    for(var index in allowedExtension) {

        if(fileExtension === allowedExtension[index]) {
            isValidFile = true; 
            break;
        }
    }
    return isValidFile;
}

router.post('/upload', (req,res) => {
    try {
        console.log(req.files);
        if(!req.files || Object.keys(req.files).length ===0) { 
            return res.status(400).send({ msg: "No files were uploaded."});
        }

        const file = req.files.file;

        if(file.size > 1024*1024) { 
            removeTmp(file.tempFilePath);
            return res.status(400).json({msg: "Size too large."});
        }

        var flag = ValidateFile(file.name);
        if (flag===false) { 
            removeTmp(file.tempFilePath);
            return res.status(400).json({msg: "File format is incorrect."});
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "test"}, async (err, result) => {
            if (err) throw err;

            removeTmp(file.tempFilePath);
            res.json({public_id: result.public_id, url: result.url});
        });
    }
    catch(err) {
        return res.status(500).json({msg: err.message});
    }
});

router.post('/delete', (req, res) => {
    try{
        const { public_id } = req.body;
        if(!public_id) { return res.status(400).json({msg: "No image selected."}); };

        cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
            if (err) throw err;

            res.json({msg: "Image deleted successfully!"})
        });
    }
    catch(err) {
        return res.status(500).json({msg: err.message});
    }
});

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err;
    });
}

module.exports = router;