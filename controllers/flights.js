import { Flight } from "../models/flight.js"

function index(req, res){
  Flight.find({})
  .then(flights => {
    console.log('FLIGHTS FROM DATABASE:', flights)
    res.render('flights/index',{
      flights: flights,
      title: 'All Flights'
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
})
}

function newFlight(req, res){
  res.render('flights/new')
}

function create(req, res){
  Flight.create(req.body)
  .then(flights => {
    res.redirect('/flights')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/new')
})
}

export {
  index,
  newFlight as new,
  create
}