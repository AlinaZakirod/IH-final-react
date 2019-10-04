const express = require("express");
const authRouter = express.Router();

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

authRouter.post("/api/signup", (req, res, next) => {
  const { fullName, email, password } = req.body;

  if (fullName == "" || email == "" || password.match(/[0-9]/) === null) {
    //send JSON file to the frontend if any of these fileds are empty or password doesn't have a number
    res.status(401).json({
      message: "All fields need to be filled and password must have a number"
    });
    return;
  }
  User.findOne({ email })
    .than(foundUser => {
      if (foundUser !== null) {
        res
          .status(401)
          .json({ message: "A user with the same email is registered" });
        return;
      }

      const bcryptSalt = 10;
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const encryptedPassword = bcrypt.hashSync(password, salt);

      User.create({ fullName, email, encryptedPassword })
        .then(userDoc => {
          // req.login(userDoc, err => {
          //   if (err) {
          //     res.status(401).json({ message: "something wrong with signup" });
          //     return;
          //   }
            userDoc.encryptedPassword = undefined;
            res.json({ userDoc });
          });
        })
        .catch(err => next(err));
      // close User.create
    })
    .catch(err => next(err));
  //end of User.find()
});

module.export = authRouter;
