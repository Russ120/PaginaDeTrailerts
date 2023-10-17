
const {Schema, model} = require('mongoose');

const UserSchema = new Schema(
  {
    Usuario: { type: String, trim: true },
    Correo: { type: String, required: true, unique: true, trim: true },
    Contraseña: { type: String, required: true },
    ImgUrl:{type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-fMXEWyzl7MNd3Q15JOeyzHxasfVIHK6K_A&usqp=CAU"},
    Admin: {type: Boolean, require: true, default: true}
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


module.exports = model("User", UserSchema);