import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema(
	{
		user_email: String,
		user_name: String,
		user_photo: String,
		problems: [
			{
				qno: Number,
				date: String,
				time: String,
				notes: [String],
				codes: [String],
				bookmark: Number,
			},
		],
	},
	{ collection: 'users' }
)

export const users = mongoose.models.users || mongoose.model('users', userSchema)
