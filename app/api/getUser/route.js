//Get user info for global context

import connectMongoDB from '@/lib/mongodb'
import { users } from '@/models/users'
import { NextResponse } from 'next/server'

export async function POST(req) {
	try {
		const { user_email } = await req.json()
		await connectMongoDB()
		const tempUsers = await users.findOne(
			{ user_email: user_email },
			{ user_email: 1, user_name: 1, user_photo: 1, _id: 0 }
		)
		return NextResponse.json({ tempUsers }, { message: 'Users fetched' }, { status: 200 })
	} catch (error) {
		console.error('Error:', error)
		return NextResponse.json({ message: 'Error fetching users' }, { status: 500 })
	}
}
