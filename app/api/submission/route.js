import connectMongoDB from '@/lib/mongodb'
import { users } from '@/models/users'
import { NextResponse } from 'next/server'

export async function POST(req) {
	try {
		const { user_email, slug, id } = await req.json()
		await connectMongoDB()
		const submissionAPI = await users.aggregate([
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
					_id: 0,
					problems: {
						qno: '$problems.qno',
						title: '$problems.title',
						tags: '$problems.tags',
						slug: '$problems.slug',
						difficulty: '$problems.difficulty',
						bookmark: '$problems.bookmark',
						submissions: {
							$filter: {
								input: '$problems.submissions',
								as: 'submission',
								cond: {
									$and: [{ $eq: ['$$submission._id', id] }],
								},
							},
						},
					},
				},
			},
		])
		return NextResponse.json({ submissionAPI }, { message: 'Submission fetched' }, { status: 201 })
	} catch (error) {
		console.error('Error:', error)
		return NextResponse.json({ message: 'Error adding submission' }, { status: 500 })
	}
}
