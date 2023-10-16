import connectMongoDB from '@/lib/mongodb'
import { users } from '@/models/users'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		await connectMongoDB()
		const tempUsers = await users.find()
		return NextResponse.json({ tempUsers }, { message: 'Users fetched' }, { status: 200 })
	} catch (error) {
		console.error('Error:', error)
		return NextResponse.json({ message: 'Error fetching users' }, { status: 500 })
	}
}

export async function POST(req) {
	try {
		const { user_email, qno, code } = await req.json()
		await connectMongoDB()
		await users.updateOne(
			{
				user_email: user_email,
				'problems.qno': qno,
			},
			{
				$push: { 'problems.$.codes': code },
			}
		)
		return NextResponse.json({ message: 'User added' }, { status: 201 })
	} catch (error) {
		console.error('Error:', error)
		return NextResponse.json({ message: 'Error adding user' }, { status: 500 })
	}
}
