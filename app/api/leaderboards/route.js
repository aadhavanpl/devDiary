import connectMongoDB from '@/lib/mongodb'
import { users } from '@/models/users'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		await connectMongoDB()
		const leaderboardsAPI = await users.aggregate([
			{
				$project: { _id: 0, user_email: 1, user_name: 1, problems: { $size: '$problems.codes' } },
			},
			{ $sort: { codesCount: -1 } },
		])
		return NextResponse.json(
			{ leaderboardsAPI },
			{ message: 'Leaderboards fetched' },
			{ status: 200 }
		)
	} catch (error) {
		console.error('Error:', error)
		return NextResponse.json({ message: 'Error fetching leaderboards' }, { status: 500 })
	}
}
