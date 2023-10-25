//Fetching problems details with slug for problem slug page

//Get user info for global context

import connectMongoDB from '@/lib/mongodb'
import { users } from '@/models/users'
import { NextResponse } from 'next/server'

export async function POST(req) {
	try {
		const { user_email, slug } = await req.json()
		await connectMongoDB()
		const userProblems = await users.aggregate([
			{
				$match: {
					user_email: user_email,
				},
			},
			{
				$project: {
					_id: 0,
					user_email: 1,
					user_name: 1,
					user_photo: 1,
					problems: {
						$arrayElemAt: [
							{
								$filter: {
									input: '$problems',
									as: 'problem',
									cond: { $eq: ['$$problem.slug', slug] },
								},
							},
							0,
						],
					},
				},
			},
		])
		return NextResponse.json(
			{ userProblems },
			{ message: 'User problem details fetched' },
			{ status: 200 }
		)
	} catch (error) {
		console.error('Error:', error)
		return NextResponse.json({ message: 'Error fetching user problem details' }, { status: 500 })
	}
}
