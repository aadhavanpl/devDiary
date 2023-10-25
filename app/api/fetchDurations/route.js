//For time spent stat card

import connectMongoDB from '@/lib/mongodb'
import { users } from '@/models/users'
import { NextResponse } from 'next/server'

export async function POST(req) {
	try {
		const { user_email } = await req.json()
		await connectMongoDB()
		const tempUsers = await users.aggregate([
			{
				$match: { user_email: user_email },
			},
			{
				$unwind: '$problems',
			},
			{
				$unwind: '$problems.submissions',
			},
			{
				$group: {
					_id: null,
					durations: { $push: '$problems.submissions.duration' },
				},
			},
			{
				$project: { _id: 0, durations: 1 },
			},
		])
		return NextResponse.json({ tempUsers }, { message: 'Durations fetched' }, { status: 200 })
	} catch (error) {
		console.error('Error:', error)
		return NextResponse.json({ message: 'Error fetching durations' }, { status: 500 })
	}
}
