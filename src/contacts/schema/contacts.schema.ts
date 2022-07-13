import * as mongoose from 'mongoose';

export const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  firstname: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  creationDate: { type: Date, required: true },
  ip: { type: String, required: true },
});

module.exports(contactSchema);
