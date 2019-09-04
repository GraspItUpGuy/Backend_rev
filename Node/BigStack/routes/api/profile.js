const express = require('express');
const profileRouter = express.Router(); 
//  we are using router because we are sending this file to index.js 
// middleware => hence we need to send it through router

// here / is /api/auth coming from index .js
// if we use /my then url becomes /api/auth/my

// @type    -   GET
// @route   -   /api/profile
// @desc    -   testing for route
// @access  -   PUBLIC
profileRouter.get('/',(req,res)=>{
    res.json({profile : 'profile is success'});
})

module.exports  = profileRouter;