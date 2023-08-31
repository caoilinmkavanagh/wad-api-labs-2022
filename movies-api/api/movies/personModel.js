import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const PersonSchema = new Schema({
  adult: { type: Boolean },
  id: { type: Number, required: true, unique: true },
});

PersonSchema.statics.findByPersonDBId = function (id) {
  return this.findOne({ id: id });
};

export default mongoose.model('Person', PersonSchema);


