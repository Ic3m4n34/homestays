const express = require("express");
const router = express.Router();
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@route    Post api/search/"searchTerm"
//@desc     search the product range
//@access   Public

router.get("/search/:searchTerm", async (req, res) => {
  try {
    const search = await Profile.find(
        { "$text" : { "$search" : req.params.searchTerm }}).populate('user',
        ['name', 'avatar']);; 
     
      if (!search)
      return res.status(400).json({
        msg: "There is no product for matching search"
      });
    res.json(search);
  } catch (error) {
    console.error(error.message);
    console.log(error.response.data);
    if (error.kind == "ObjectId") {
      return res.status(400).json({
        msg: "product not found"
      });
    }
    res.status(500).send("Server Error");
  }
});
module.exports = router;
