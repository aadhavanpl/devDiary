'use client'
import { useEffect, useState, useContext, createContext } from 'react'
import { fetchUser } from './fetchUserDetails'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { FirebaseApp } from '../../firebase.config'

const GlobalContext = createContext()

export function GlobalContextWrapper({ children }) {
	const [user, setUser] = useState(null)

	const firebaseAuth = getAuth(FirebaseApp)
	const provider = new GoogleAuthProvider()

	useEffect(() => {
		const tempUser = fetchUser()
		setUser(tempUser)
	}, [])

	/* sign in */
	async function signIn() {
		const { user } = await signInWithPopup(firebaseAuth, provider)
		const { refreshToken, providerData } = user
		localStorage.setItem('user', JSON.stringify(providerData))

		const tempUser = fetchUser()
		setUser(tempUser)

		console.log(user)

		/* send user data to backend */
		const data = { user_email: user.email, user_name: user.displayName, user_photo: user.photoURL }
		fetch('http://localhost:3000/api/addUser', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		})
	}

	/* sign out */
	function signOut() {
		localStorage.clear()
		sessionStorage.clear()
		window.location.replace('http://localhost:3000')
	}

	return (
		<GlobalContext.Provider
			value={{
				user,
				signIn,
				signOut,
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}

export function useGlobalContext() {
	return useContext(GlobalContext)
}