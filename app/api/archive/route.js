import connectMongoDB from '@/lib/mongodb'
import { users } from '@/models/users'
import { NextResponse } from 'next/server'

export async function POST(req) {
	try {
		const { user_email } = await req.json()
		await connectMongoDB()
		const archiveAPI = await users.find(
			{ user_email: user_email },
			{
				_id: 0,
				'problems.qno': 1,
				'problems.title': 1,
				'problems.tags': 1,
				'problems.slug': 1,
				'problems.difficulty': 1,
				'problems.bookmark': 1,
			}
		)
		return NextResponse.json({ archiveAPI }, { message: 'Archive fetched' }, { status: 201 })
	} catch (error) {
		console.error('Error:', error)
		return NextResponse.json({ message: 'Error fetching archive' }, { status: 500 })
	}
}
