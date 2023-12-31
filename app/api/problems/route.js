import connectMongoDB from '@/lib/mongodb'
import { problems } from '@/models/problems'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		await connectMongoDB()
		const problemsAPI = await problems.find({}, { _id: 0 })
		return NextResponse.json({ problemsAPI }, { message: 'Problems fetched' }, { status: 200 })
	} catch (error) {
		console.error('Error:', error)
		return NextResponse.json({ message: 'Error fetching problems' }, { status: 500 })
	}
}
