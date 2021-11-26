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

// 1. Define a schema
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true },
});

// 2. Compile model from the schema
const User = mongoose.model("Users_model", userSchema);