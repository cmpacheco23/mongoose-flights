import mongoose from "mongoose";

const Schema = mongoose.Schema

const ticketSchema = new Schema({
  seat: {type: String, match: /[A-F][1-9]\d?/},
  price: {type: Number, min: 0}
}, {
  timestamps: true
})

const flightSchema = new Schema({
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
  tickets: [ticketSchema],
  meals: [{type: Schema.Types.ObjectId, 
  ref: 'Meal' }]
}
)


const Flight = mongoose.model('Flight', flightSchema)

export{
  Flight
}