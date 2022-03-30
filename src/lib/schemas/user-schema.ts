import Mongoose, { Schema } from 'mongoose'

export default Mongoose.model(
    'users',
    new Schema({
        name: { required: true, type: String },
        email: { required: true, type: String },
        image: String,
        data: { toDo: [String] },
        emailVerified: Boolean,
    }),
    'users'
)
