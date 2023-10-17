// import mongoose, { Schema, model } from "mongoose";
const {Schema, model} = require('mongoose');

const MovieSchema = new Schema(
  {
    Titulo: {
      type: String,
      required: true,
    },
    Año: {
      type: Number,
      required: true,
    },
    Director: {
        type: String,
        required: true,
    },
    Actores: {
        type: String,
        required: true,
    },
    Reseña: {
        type: String,
        required: true,
    },
    ImgUrl: {
        type: String,
        required: true,
    },
    LinkVideo: {
        type: String,
        required: true,
    },
    Categoria:{
      type: String
    },
    User: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = model('Movie', MovieSchema);