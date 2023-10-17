import connectMongoDB from '@/lib/mongodb'
import { users } from '@/models/users'
import { NextResponse } from 'next/server'

export async function POST(req) {
	try {
		const { user_email, qno, bookmark } = await req.json()
		await connectMongoDB()
		await users.updateOne(
			{ user_email: user_email, 'problems.qno': qno },
			{ $set: { 'problems.$.bookmark': bookmark } }
		)
		return NextResponse.json({ message: 'Bookmarked' }, { status: 201 })
	} catch (error) {
		console.error('Error:', error)
		return NextResponse.json({ message: 'Error Bookmarking' }, { status: 500 })
	}
}
