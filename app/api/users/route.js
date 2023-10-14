import connectMongoDB from '@/lib/mongodb'
import { users } from '@/models/users'
import { NextResponse } from 'next/server'

// export async function POST(req) {
// 	try {
// 		const { level, pages } = await req.json()
// 		await connectMongoDB()
// 		await Books.create({ level, pages })
// 		return NextResponse.json({ message: 'Book added' }, { status: 201 })
// 	} catch (error) {
// 		console.error('Error:', error)
// 		return NextResponse.json({ message: 'Error adding book' }, { status: 500 })
// 	}
// }

export async function GET() {
	try {
		await connectMongoDB()
		const userss = await users.find()
		return NextResponse.json({ userss }, { message: 'Books fetched' }, { status: 200 })
	} catch (error) {
		console.error('Error:', error)
		return NextResponse.json({ message: 'Error fetching users' }, { status: 500 })
	}
}
