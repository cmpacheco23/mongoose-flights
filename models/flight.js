import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United']
  },
  airport: {
    type: String,
    enum: ['AUS','DFW','DEN','LAX','SAN']
  },
  flightNo: {
    type: Number, 
    min: 10,
    max: 9999,
  },
  departs: Date,
})

const Flight = mongoose.model('Flight', flightSchema)

export{
  Flight
}