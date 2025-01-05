import express from "express";
import User from "../models/user.model.js";

export const addUsers = async (req, res) => {
  try {
    console.log("Received user data:", req.body);
    const { name, email, age, address } = req.body;
    console.log(name);
    if (!name || !email || !age || !address) {
      return res.status(400).send("All fields are required!");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const user = new User({
      name,
      email,
      age,
      address,
    });

    await user.save();

    res.status(201).json({ message: "User added successfully!", user: user });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ message: "No users found!" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.params.userId; // Retrieve email from the form field
    console.log(userId);
    const user = await User.findById(userId); // Use findOne to search by email

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          age: req.body.age,
          address: req.body.address,
        },
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found!" });
    }
    res
      .status(200)
      .json({ message: "User updated successfully!", user: updatedUser });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json(error);
  }
};
