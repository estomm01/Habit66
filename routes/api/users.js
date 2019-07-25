const express = require('express');
const router = require('express').Router();
const mongoose = require('mongoose');

const User = require('../../models/User')

// @route   POST apo/users
// @desc    Register user

router.post('/', (req, res) => {
  const {
    name,
    username,
    email,
    password
  } = req.body;

  user = new User({
    name,
    username,
    email,
    password,
    habits
  });

  user.save();
  res.json(user);
});

router.get('/', (req, res) => {
  User.find({}, (users) => {
    res.json(users)
  });
});

module.exports = router;
