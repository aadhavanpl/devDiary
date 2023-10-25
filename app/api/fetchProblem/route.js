//Fetching problems details with slug for problem slug page

//Get user info for global context

import connectMongoDB from '@/lib/mongodb'
import { problems } from '@/models/problems'
import { NextResponse } from 'next/server'

export async function POST(req) {
	try {
		const { slug } = await req.json()
		await connectMongoDB()
		const tempProblems = await problems.find({ slug: slug })
		return NextResponse.json(
			{ tempProblems },
			{ message: 'Problem details fetched' },
			{ status: 200 }
		)
	} catch (error) {
		console.error('Error:', error)
		return NextResponse.json({ message: 'Error fetching problem details' }, { status: 500 })
	}
}
