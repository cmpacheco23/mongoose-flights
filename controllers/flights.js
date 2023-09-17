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
  console.log('REQ BODY before:',req.body)
  if(!req.body.departs){
    delete req.body.departs
  }
  console.log('REQ BODY after:',req.body)
  Flight.create(req.body)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/new')
})
}

function deleteFlight(req, res){
  Flight.findByIdAndDelete(req.params.flightId)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
})
}

function show(req, res){
  Flight.findById(req.params.flightId)
  .then(flight => {
    res.render('flights/show', {
      title: 'Flight Details',
      flight: flight,
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
})
}

function edit(req, res){
  Flight.findById(req.params.flightId)
  .then(flight => {
    res.render('flights/edit', {
      flight: flight,
      title: 'Edit Flight Information'
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
})
}
function update(req, res) {
  Flight.findByIdAndUpdate(req.params.flightId, req.body, {new:true})
  .then (flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
})
}

export {
  index,
  newFlight as new,
  create,
  deleteFlight as delete,
  show,
  edit,
  update
}