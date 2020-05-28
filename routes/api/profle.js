const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {
    check,
    validationResult
} = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
var ImageRouter = express.Router();

//@route    GET api/profile/me
//@desc     Get current user's profile
//@access   Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        }).populate('user',
            ['name', 'avataar']);

        if (!profile) {
            return res.status(400).json({
                msg: 'User Do not exist'
            });
        }
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

//@route    GET api/profile
//@desc     Get all the profiles
//@access   Private
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user',
            ['name', 'avatar']);
        res.json(profiles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});
//@route    GET api/profile/user/:user_id
//@desc     Get profile by user_id
//@access   Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.params.user_id
        }).populate('user',
            ['name', 'avataar']);
        if (!profile)
            return res.status(400).json({
                msg: 'There is no profile for users'
            });

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        if (error.kind == "ObjectId") {
            return res.status(400).json({
                msg: 'Profile not found'
            });
        }
        res.status(500).send('Server Error');
    }
});
//@route    POST api/profile
//@desc     Create or Update user's profile
//@access   Private
router.post('/', [auth, [
        check('address', 'Address is required').
        not().
        isEmpty(),
        check('product', 'Product information is required').
        not().
        isEmpty(),
        check('productcat', 'Product category is required').
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
            company,
            location,
            phone,
            address,
            email,
            product,
            productcat,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin,
            fileUpload
        } = req.body;

        //build profile object by check if data is really there
        const profileFields = {};
        profileFields.user = req.user.id;
        if (company) profileFields.company = company;
        if (location) profileFields.location = location;
        if (phone) profileFields.phone = phone;
        if (address) profileFields.address = address;
        if (email) profileFields.email = email;
        //if (product) {
        // profileFields.product = product.split(',').map(product => product.trim());
        //};
        if (product) profileFields.product = product;
        if (productcat) profileFields.productcat = productcat;
        console.log('value of fileUpload while writing database ', fileUpload);
        if (fileUpload) {
            profileFields.file = fileUpload;
            console.log('value of profileFields.file ', profileFields.file);
        }

        // Build social Object

        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;

        //add the record to the database
        try {
            let profile = await Profile.findOne({
                user: req.user.id
            });

            if (profile) {
                profile = await Profile.findOneAndUpdate({
                    user: req.user.id
                }, {
                    $set: profileFields
                }, {
                    new: true
                });

                return res.json(profile);
            }
            //else create a new record
            profile = new Profile(profileFields);
            profile.markModified("profileFields");
            await profile.save();
            res.json(profile);

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }


    });


module.exports = router;