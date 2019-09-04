const express = require('express');
const authRouter = express.Router(); 
//  we are using router because we are sending this file to index.js 
// middleware => hence we need to send it through router

// here / is /api/auth coming from index .js
// if we use /my then url becomes /api/auth/my

// @type    -   GET
// @route   -   /api/auth
// @desc    -   testing for route
// @access  -   PUBLIC
authRouter.get('/',(req,res)=>{
    res.json({test : 'Auth is success'});
})

module.exports  = authRouter;