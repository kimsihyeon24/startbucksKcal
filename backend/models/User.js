import { Schema, model } from "mongoose";

const userSchema = Schema({
  id: {
    type: String,
    maxlength: 20,
    required: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: 1,
  },
  nickname: {
    type: String,
    maxlength: 10,
  },
});

const User = model("User", userSchema);

export default { User };
