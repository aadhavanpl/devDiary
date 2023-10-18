import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema(
	{
		user_email: String,
		user_name: String,
		user_photo: String,
		problems: [
			{
				qno: Number,
				title: String,
				tags: [String],
				slug: String,
				difficulty: String,
				bookmark: Number,
				submissions: [
					{
						date: String,
						duration: String,
						note: String,
						code: String,
						language: String,
					},
				],
			},
		],
	},
	{ collection: 'users' }
)

export const users = mongoose.models.users || mongoose.model('users', userSchema)
