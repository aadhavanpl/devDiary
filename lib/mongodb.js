import mongoose from 'mongoose'

export default async function connectMongoDB() {
	try {
		await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI)
		console.log('Connected to MongoDb')
	} catch (e) {
		console.log(e)
	}
}
