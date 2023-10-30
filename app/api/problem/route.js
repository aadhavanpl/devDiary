import connectMongoDB from '@/lib/mongodb'
import { users } from '@/models/users'
import { NextResponse } from 'next/server'

export async function POST(req) {
	try {
		const { user_email, qno, title, tags, slug, difficulty, date, duration, note, code, language } =
			await req.json()
		await connectMongoDB()

		const res = await users.find(
			{
				user_email: user_email,
				problems: {
					$elemMatch: {
						slug: slug,
					},
				},
			},
			{
				'problems.$': 1,
			}
		)
		if (res.length) {
			await users.updateOne(
				{ user_email: user_email, 'problems.slug': slug },
				{
					$push: {
						'problems.$.submissions': {
							date: date,
							duration: duration,
							note: note,
							code: code,
							language: language,
						},
					},
				}
			)
		} else {
			await users.updateOne(
				{ user_email: user_email },
				{
					$push: {
						problems: {
							qno: qno,
							title: title,
							tags: tags,
							slug: slug,
							difficulty: difficulty,
							bookmark: 0,
							submissions: [
								{
									date: date,
									duration: duration,
									note: note,
									code: code,
									language: language,
								},
							],
						},
					},
				}
			)
		}
		return NextResponse.json({ message: 'Submission added' }, { status: 201 })
	} catch (error) {
		console.error('Error:', error)
		return NextResponse.json({ message: 'Error adding submission' }, { status: 500 })
	}
}
