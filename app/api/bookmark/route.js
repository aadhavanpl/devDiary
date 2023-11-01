import connectMongoDB from '@/lib/mongodb'
import { users } from '@/models/users'
import { NextResponse } from 'next/server'

export async function POST(req) {
	try {
		const { status, user_email, qno, slug, title, tags, difficulty, bookmark } = await req.json()
		await connectMongoDB()

		if (status) {
			await users.updateOne(
				{ user_email: user_email, 'problems.slug': slug },
				{ $set: { 'problems.$.bookmark': bookmark } }
			)
		} else {
			if (bookmark) {
				await users.updateOne(
					{
						user_email: user_email,
						'problems.slug': { $ne: slug },
					},
					{
						$push: {
							problems: {
								qno: qno,
								title: title,
								tags: tags,
								slug: slug,
								difficulty: difficulty,
								bookmark: bookmark,
								submissions: [],
							},
						},
					}
				)
			} else {
				await users.updateOne(
					{ user_email: user_email },
					{
						$pull: {
							problems: {
								slug: slug,
								submissions: { $size: 0 },
							},
						},
					}
				)
			}
		}

		return NextResponse.json({ message: 'Bookmarked' }, { status: 201 })
	} catch (error) {
		console.error('Error:', error)
		return NextResponse.json({ message: 'Error Bookmarking' }, { status: 500 })
	}
}
