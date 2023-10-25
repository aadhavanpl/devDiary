import connectMongoDB from '@/lib/mongodb'
import { users } from '@/models/users'
import { NextResponse } from 'next/server'

export async function POST(req) {
	try {
		const { user_email, user_name } = await req.json()
		await connectMongoDB()
		const updatedUser = await users.findOneAndUpdate(
			{ user_email: user_email },
			{ $set: { user_name: user_name } },
			{
				projection: { _id: 0, user_name: 1, user_photo: 1, user_email: 1 },
				returnOriginal: false, // This ensures that the updated document is returned
			}
		)
		return NextResponse.json({ updatedUser }, { message: 'User name updated' }, { status: 200 })
	} catch (error) {
		console.error('Error:', error)
		return NextResponse.json({ message: 'Error updating users name' }, { status: 500 })
	}
}
