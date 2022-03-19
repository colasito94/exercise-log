// Get the mongoose object
import mongoose from 'mongoose';

// Prepare connection to MongoDB server at port 27017 and database user_db
mongoose.connect(
    'mongodb://127.0.0.1:27017/users_db',
    { useNewUrlParser: true }
)

// Connect to the database
const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

// 1. Define a Schema
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true },
});

// 2. Compile Model from the Schema
const Exercise = mongoose.model("Exercise", exerciseSchema);

// 3. Mongoose API CRUD methods
// Create
const createExercise = async (name, reps, weight, unit, date) => {
    // Call constructor to create user instance from Users_model model class
    const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
    // Call save to persist object as a document in MongoDB
    return exercise.save();
}

// Retrieve/read that retrieves the entire collection of exercises
const retrieveExercises = async () => {
    const query = Exercise.find({}); // return all documents by omitting query param or {}
    return query.exec();
}

// Update the exercise that has the specified id
const updateExercise = async (condition, update) => {
    await Exercise.findOneAndUpdate(condition, update)
    return 1
}

// Delete the exercise that has the specified id
const deleteExercise = async ( _id ) => {
    await Exercise.deleteOne( {"_id" : _id} )
    return 1
}

export { createExercise, retrieveExercises, updateExercise, deleteExercise }
