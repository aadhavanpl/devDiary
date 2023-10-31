//Dashboard chart values
import connectMongoDB from '@/lib/mongodb'
import { users } from '@/models/users'
import { NextResponse } from 'next/server'

export async function POST(req) {
	try {
		const { user_email } = await req.json()
		await connectMongoDB()
		const countProblems = await users.aggregate([
			{
				$match: {
					user_email: user_email,
				},
			},
			{
				$unwind: '$problems',
			},
			{
				$unwind: '$problems.submissions',
			},
			{
				$group: {
					_id: '$problems.submissions.date',
					questionsSolved: { $sum: 1 },
				},
			},
			{
				$project: {
					_id: 0,
					date: '$_id',
					questionsSolved: 1,
				},
			},
			{
				$sort: {
					date: -1,
				},
			},
			{
				$limit: 14,
			},
		])

		return NextResponse.json(
			{ countProblems },
			{ message: 'Problem count fetched' },
			{ status: 200 }
		)
	} catch (error) {
		console.error('Error:', error)
		return NextResponse.json({ message: 'Error fetching problem counts' }, { status: 500 })
	}
}
