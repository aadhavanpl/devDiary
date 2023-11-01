import connectMongoDB from '@/lib/mongodb'
import { users } from '@/models/users'
import { NextResponse } from 'next/server'

export async function POST(req) {
	try {
		const { user_email } = await req.json()
		await connectMongoDB()
		const archiveAPI = await users.aggregate([
			{
				$match: {
					user_email: user_email,
				},
			},
			{
				$unwind: '$problems',
			},
			{
				$match: {
					'problems.submissions': { $not: { $size: 0 } },
				},
			},
			{
				$group: {
					_id: null,
					qno: { $addToSet: '$problems.qno' },
				},
			},
			{
				$project: {
					_id: 0,
					qno: 1,
				},
			},
		])
		return NextResponse.json(
			{ archiveAPI },
			{ message: 'Question numbers fetched' },
			{ status: 201 }
		)
	} catch (error) {
		console.error('Error:', error)
		return NextResponse.json({ message: 'Error fetching question numbers' }, { status: 500 })
	}
}
