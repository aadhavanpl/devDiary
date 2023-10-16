import connectMongoDB from '@/lib/mongodb'
import { problems } from '@/models/problems'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		await connectMongoDB()
		const tempProblems = await problems.find()
		return NextResponse.json({ tempProblems }, { message: 'Problems fetched' }, { status: 200 })
	} catch (error) {
		console.error('Error:', error)
		return NextResponse.json({ message: 'Error fetching problems' }, { status: 500 })
	}
}
