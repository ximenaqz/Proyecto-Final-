const express = require('express');
const bcrypt = require('bcrypt');

 function cifrarPassword(req , res , next) {
    let password = req.body.password;
    console.log(req.body);
    req.body.password = bcrypt.hashSync(password,10);
    next();
 }

 module.exports = cifrarPassword;