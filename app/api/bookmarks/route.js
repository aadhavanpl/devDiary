import connectMongoDB from '@/lib/mongodb'
import { users } from '@/models/users'
import { NextResponse } from 'next/server'

export async function POST(req) {
	try {
		const { user_email } = await req.json()
		await connectMongoDB()
		const bookmarksAPI = await users.aggregate([
			{
				$match: { user_email: user_email },
			},
			{
				$unwind: '$problems',
			},
			{
				$match: { 'problems.bookmark': 1 },
			},
			{
				$project: {
					_id: 0,
					'problems.qno': 1,
					'problems.title': 1,
					'problems.tags': 1,
					'problems.slug': 1,
					'problems.difficulty': 1,
					'problems.bookmark': 1,
					'problems.submissions': 1,
				},
			},
		])

		return NextResponse.json({ bookmarksAPI }, { message: 'Fetched bookmarks' }, { status: 201 })
	} catch (error) {
		console.error('Error:', error)
		return NextResponse.json({ message: 'Error fetching bookmarks' }, { status: 500 })
	}
}
