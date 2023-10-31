import connectMongoDB from '@/lib/mongodb'
import { users } from '@/models/users'
import { NextResponse } from 'next/server'

export async function POST(req) {
	try {
		const { user_email, slug } = await req.json()
		await connectMongoDB()
		const submissionsAPI = await users.aggregate([
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
					'problems.slug': slug,
				},
			},
			{
				$unwind: '$problems.submissions',
			},
			{
				$project: {
					_id: '$problems.submissions._id',
					date: '$problems.submissions.date',
					time: '$problems.submissions.time',
					duration: '$problems.submissions.duration',
				},
			},
		])
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
