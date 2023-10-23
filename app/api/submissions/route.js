import connectMongoDB from '@/lib/mongodb'
import { users } from '@/models/users'
import { NextResponse } from 'next/server'

export async function POST(req) {
	try {
		const { user_email, slug } = await req.json()
		await connectMongoDB()
		const submissionsAPI = await users.find(
			{
				user_email: user_email,
				'problems.slug': slug,
			},
			{ _id: 0, 'problems.submissions.$': 1 }
		)
		return NextResponse.json(
			{ submissionsAPI },
			{ message: 'Submissions fetched' },
			{ status: 201 }
		)
	} catch (error) {
		console.error('Error:', error)
		return NextResponse.json({ message: 'Error fetching submissions' }, { status: 500 })
	}
}
