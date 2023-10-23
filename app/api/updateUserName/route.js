import connectMongoDB from '@/lib/mongodb'
import { users } from '@/models/users'
import { NextResponse } from 'next/server'

export async function POST(req) {
	try {
		const { user_email, user_name } = await req.json()
		console.log(user_email, user_name)
		await connectMongoDB()
		const tempUsers = await users.updateOne(
			{ user_email: user_email },
			{ $set: { user_name: user_name } }
		)
		return NextResponse.json({ tempUsers }, { message: 'User name updated' }, { status: 200 })
	} catch (error) {
		console.error('Error:', error)
		return NextResponse.json({ message: 'Error updating users name' }, { status: 500 })
	}
}
