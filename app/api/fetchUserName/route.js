import connectMongoDB from '@/lib/mongodb'
import { users } from '@/models/users'
import { NextResponse } from 'next/server'

export async function POST(req) {
	try {
		const { user_email } = await req.json()
		await connectMongoDB()
		const tempUsers = await users.findOne(
			{ user_email: user_email },
			{ _id: 0, user_name: 1 }
		)
		return NextResponse.json({ tempUsers }, { message: 'User Name fetched' }, { status: 200 })
	} catch (error) {
		console.error('Error:', error)
		return NextResponse.json({ message: 'Error fetching user name' }, { status: 500 })
	}
}
