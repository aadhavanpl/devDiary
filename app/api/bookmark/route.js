import connectMongoDB from '@/lib/mongodb'
import { users } from '@/models/users'
import { NextResponse } from 'next/server'

export async function POST(req) {
	try {
		const { user_email, qno, bookmark } = await req.json()
		await connectMongoDB()

		/* check if user has done the problem
			yes
				set incomming bookmark
			no
				if incoming bookmark is 1
					add blank problem record in user with bookmark to 1
				else
					remove problem record from user
		*/

		await users
			.find(
				{
					user_email: user_email,
					problems: {
						$elemMatch: {
							qno: qno,
						},
					},
				},
				{
					'problems.$': 1,
				}
			)
			.then((res) => {
				console.log(res)
			})

		// return NextResponse.json({ message: 'Bookmarked' }, { status: 201 })
	} catch (error) {
		console.error('Error:', error)
		return NextResponse.json({ message: 'Error Bookmarking' }, { status: 500 })
	}
}
