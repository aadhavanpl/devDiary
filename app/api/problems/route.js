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

export async function POST(req) {
	try {
		const { user_email, user_name, user_photo } = await req.json()
		await connectMongoDB()
		await users.updateOne(
			{ user_email }, // Filter to find an existing document
			{ user_email, user_name, user_photo }, // Data to update or insert
			{ upsert: true }
		)
		return NextResponse.json({ message: 'User added' }, { status: 201 })
	} catch (error) {
		console.error('Error:', error)
		return NextResponse.json({ message: 'Error adding user' }, { status: 500 })
	}
}
