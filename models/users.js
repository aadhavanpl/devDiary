import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
	user_email: String,
	user_name: String,
	user_photo: String,
	problems: {
		qno: Number,
		time: Number,
		codes: [String],
		bookmark: Number,
	},
})

export const users = mongoose.models.users || mongoose.model('users', userSchema)
