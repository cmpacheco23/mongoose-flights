import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United'],
    required: true
  },
  airport: {
    type: String,
    enum: ['AUS','DFW','DEN','LAX','SAN'],
    required: true,
    default: function() {
      return 'DEN'
    }
  },
  flightNo: {
    type: Number, 
    min: 10,
    max: 9999,
  },
  departs: {
    type: Date,
    required: true
  },
})


const Flight = mongoose.model('Flight', flightSchema)

export{
  Flight
}