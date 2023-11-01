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
					problems: { $push: '$problems' },
				},
			},
			{
				$project: {
					_id: 0,
					problems: 1,
				},
			},
		])
		return NextResponse.json({ archiveAPI }, { message: 'Archive fetched' }, { status: 201 })
	} catch (error) {
		console.error('Error:', error)
		return NextResponse.json({ message: 'Error fetching archive' }, { status: 500 })
	}
}
