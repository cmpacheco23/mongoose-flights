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
  },
  flightNo: {
    type: Number, 
    min: 10,
    max: 9999,
  },
  departs: {
    type: Date,
    required: true,
    default: function(){
      const OneYearFromNow = new Date()
      OneYearFromNow.setFullYear(OneYearFromNow.getFullYear()+1)
      return OneYearFromNow
    }
  },
})


const Flight = mongoose.model('Flight', flightSchema)

export{
  Flight
}