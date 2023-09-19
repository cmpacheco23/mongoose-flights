import mongoose from "mongoose"
import { Flight } from "../models/flight.js"
import { Meal } from "../models/meal.js"

function index(req, res){
  Flight.find({})
  .then(flights => {
    // console.log('FLIGHTS FROM DATABASE:', flights)
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
  // console.log('REQ BODY before:',req.body)
  if(!req.body.departs){
    delete req.body.departs
  }
  // console.log('REQ BODY after:',req.body)
  Flight.create(req.body)
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
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
  .populate('meals')
  .then(flight => {
    Meal.find({_id: {$nin: flight.meals}})
    .then(meals => {
      res.render('flights/show', {
        title: 'Flight Details',
        flight: flight,
        meals: meals
    })
      // find the meals
      // render the meals
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
  for (let key in req.body) {
    if (req.body[key] === '') {
      delete req.body[key]
    }
  }
  req.body.departs = new Date(req.body.departs)
  
  Flight.findByIdAndUpdate(req.params.flightId, req.body, {new:true})
  .then (flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
})
}

function createTicket(req, res){
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.tickets.push(req.body)
    console.log(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(error => {
      console.log(error)
      res.redirect('/')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
})
  })
}

function deleteTicket(req, res){
  Flight.findById(req.params.flightId)
  .then(flight =>{
    flight.tickets.id(req.params.ticketId).deleteOne()
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function addToMeal(req, res){
  // find the flight by its id
  Flight.findById(req.params.flightId)
  // make a promise
  .then(flight =>{
    // push the mealId into the flight.meal array
    flight.meals.push(req.body.mealId)
    flight.save()
    //save the flight
    .then(()=> {
      // make another promise with a anon function
        // redirect to the flights/flight id
      res.redirect(`/flights/${flight._id}`)

    })
  })
}
export {
  index,
  newFlight as new,
  create,
  deleteFlight as delete,
  show,
  edit,
  update,
  createTicket,
  deleteTicket,
  addToMeal
}