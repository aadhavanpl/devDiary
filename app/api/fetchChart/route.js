//Dashboard chart values

// dashboard stat card
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
					user_email: 'user2@example.com',
				},
			},
			{
				$unwind: '$problems',
			},
			{
				$unwind: '$problems.submissions',
			},
			{
				$project: {
					date: { $dateFromString: { dateString: '$problems.submissions.date' } },
					qno: '$problems.qno',
				},
			},
			{
				$group: {
					_id: {
						date: {
							$dateFromParts: {
								year: { $year: '$date' },
								month: { $month: '$date' },
								day: { $dayOfMonth: '$date' },
							},
						},
					},
					countQuestions: { $addToSet: '$qno' },
				},
			},
			{
				$project: {
					date: { $dateToString: { format: '%Y/%m/%d', date: '$_id.date' } },
					countQuestions: { $size: '$countQuestions' },
				},
			},
			{
				$sort: {
					date: 1,
				},
			},
			{
				$project: {
					_id: 0,
					date: 1,
					countQuestions: 1,
				},
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
