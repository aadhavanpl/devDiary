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
				$unwind: '$problems',
			},
			{
				$match: {
					'problems.slug': slug,
				},
			},
			{
				$project: {
					'problems.bookmark': 1,
					'problems.submissions': 1,
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
