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
					user_email: user_email,
				},
			},
			{
				$unwind: '$problems',
			},
			{
				$group: {
					_id: '$problems.difficulty',
					count: { $sum: 1 },
				},
			},
			{
				$project: {
					_id: 0,
					difficulty: '$_id',
					count: 1,
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
