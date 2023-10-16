import mongoose, { Schema } from 'mongoose'

const problemSchema = new Schema(
	{
		qno: Number,
		title: String,
		tags: [String],
		difficulty: String,
	},
	{ collection: 'problems' }
)

export const problems = mongoose.models.problems || mongoose.model('problems', problemSchema)
