'use client'
import { useEffect, useState, useContext, createContext } from 'react'
import { fetchUser } from './fetchUserDetails'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { FirebaseApp } from '../../firebase.config'
import { useRouter } from 'next/navigation'

const GlobalContext = createContext()

export function GlobalContextWrapper({ children }) {
	const [user, setUser] = useState(null)

	const firebaseAuth = getAuth(FirebaseApp)
	const provider = new GoogleAuthProvider()
	const router = useRouter()

	useEffect(() => {
		const tempUser = fetchUser()
		setUser(tempUser)
	}, [])

	/* sign in */
	async function signIn() {
		const { user } = await signInWithPopup(firebaseAuth, provider)

		/* send user data to backend (will insert ONLY if the user does not exist) */
		const data = { user_email: user.email, user_name: user.displayName, user_photo: user.photoURL }
		fetch('http://localhost:3000/api/addUser', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		})

		/* fetch user from backend */
		const res = await fetch('http://localhost:3000/api/getUser', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				user_email: user.email,
			}),
		})
		const userFromBackend = await res.json()
		setUser(userFromBackend.tempUsers)
		localStorage.setItem('user', JSON.stringify(userFromBackend.tempUsers))
		router.push('/')
	}

	/* sign out */
	function signOut() {
		localStorage.clear()
		sessionStorage.clear()
		window.location.replace('http://localhost:3000')
	}

	async function updateUserName(user_email, userName) {
		const res = await fetch('http://localhost:3000/api/updateUserName', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				user_email: user_email,
				user_name: userName,
			}),
		})

		const userFromBackend = await res.json()
		setUser(userFromBackend.updatedUser)
		localStorage.setItem('user', JSON.stringify(userFromBackend.updatedUser))
	}

	return (
		<GlobalContext.Provider
			value={{
				user,
				signIn,
				signOut,
				updateUserName,
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}

export function useGlobalContext() {
	return useContext(GlobalContext)
}
