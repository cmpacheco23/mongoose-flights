import { Meal } from "../models/meal.js"

function newMeal(req, res){
  res.render('meals/new')
}

function create(req, res){
  Meal.create(req.body)
  .then(meal =>{
    res.redirect(`/flights/${flight._id}`)
  })
}

export {
  newMeal as new,
  create,
}