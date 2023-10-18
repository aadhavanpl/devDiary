import connectMongoDB from '@/lib/mongodb'
import { users } from '@/models/users'
import { NextResponse } from 'next/server'

export async function POST(req) {
	try {
		const { user_email, slug } = await req.json()
		await connectMongoDB()
		await users.updateOne(
			{
				user_email: user_email,
				'problems.slug': slug,
			},
			{
				$push: {
					'problems.$.submissions': {
						date: date,
						time: time,
						note: note,
						codes: code,
						language: language,
					},
				},
			}
		)
		return NextResponse.json({ message: 'Submission added' }, { status: 201 })
	} catch (error) {
		console.error('Error:', error)
		return NextResponse.json({ message: 'Error adding submission' }, { status: 500 })
	}
}
