const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {
    check,
    validationResult
} = require('express-validator');

const Homestay = require('../../models/Homestay');
const User = require('../../models/User');
var ImageRouter = express.Router();

//@route    GET api/homestay/me
//@desc     Get current homestay profile
//@access   Private
router.get('/me', auth, async (req, res) => {
    try {
        const homestay = await Homestay.findOne({
            user: req.user.id
        }).populate('user',
            ['name', 'avataar']);

        if (!homestay) {
            return res.status(400).json({
                msg: 'Homestay Do not exist'
            });
        }
        res.json(homestay);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

//@route    GET api/homestay
//@desc     Get all the homestays
//@access   Private
router.get('/', async (req, res) => {
    try {
        const homestays = await Homestay.find().populate('user',
            ['name', 'avatar']);
        res.json(homestays);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});
//@route    GET homestay/property/:property_id
//@desc     Get profile by user_id
//@access   Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const homestay = await Homestay.findOne({
            user: req.params.user_id
        }).populate('user',
            ['name', 'description']);
            console.log('homestay for matching id ', homestay);
        if (!homestay)
            return res.status(400).json({
                msg: 'There is no profile for homestay'
            });

        res.json(homestay);
    } catch (error) {
        console.error(error.message);
        if (error.kind == "ObjectId") {
            return res.status(400).json({
                msg: 'Homestay not found'
            });
        }
        res.status(500).send('Server Error');
    }
});
//@route    POST api/homestay
//@desc     Create or Update user's homestay
//@access   Private
router.post('/', [auth, [
        check('name', 'Name is required').
        not().
        isEmpty(),
        check('price', 'Price information is required').
        not().
        isEmpty(),
        check('description', 'Description is required').
        not().
        isEmpty()
    ]],
        
    async (req, res) => {
        console.log('req', req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {
            name,
            price,
            type,
            capacity,
            featured,
            description,
            aminities,
            extras,
            fileUpload
        } = req.body;

        //build homestay object by check if data is really there
        const homestayFields = {};
        homestayFields.user = req.user.id;
        if (name) homestayFields.name = name;
        if (price) homestayFields.price = price;
        if (type) homestayFields.type = type;
        if (capacity) homestayFields.capacity = capacity;
        if (featured) homestayFields.featured = featured;
        if (description) homestayFields.description = description;
        //if (product) {
        // profileFields.product = product.split(',').map(product => product.trim());
        //};
        if (aminities) homestayFields.aminities = aminities;
        if (extras) homestayFields.extras = extras;
        console.log('value of fileUpload Homestay while writing database ', fileUpload);
        if (fileUpload) {
            homestayFields.file = fileUpload;
            console.log('value of homestayFields.file ', homestayFields.file);
        }
        //add the record to the database
        try {
            let homestay = await Homestay.findOne({
                user: req.user.id
            });

            if (homestay) {
                homestay = await Homestay.findOneAndUpdate({
                    user: req.user.id
                }, {
                    $set: homestayFields
                }, {
                    new: true
                });

                return res.json(homestay);
            }
            //else create a new record
            homestay = new Homestay(homestayFields);
            homestay.markModified("homestayFields");
            await homestay.save();
            res.json(homestay);

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }

    });

module.exports = router;