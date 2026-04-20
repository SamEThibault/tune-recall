'use client' //Marks a component as a Client Component (run in browser) instead of Server Component 

import { useActionState } from 'react'
import { signup } from '../../app/actions/auth'

export function LoginForm() {
    const [state, action, pending] = useActionState(signup, undefined)

    return (
        <form action={action}>
            <div>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" placeholder="Name" />
            </div>
            {state?.errors?.name && <p>{state.errors.name}</p>}
            <div>
                <label htmlFor="name">Email</label>
                <input id="email" name="email" placeholder="Email@gmail.com" />
            </div>
            {state?.errors?.email && <p>{state.errors.email}</p>}
            <div>
                <label htmlFor="name">Password</label>
                <input id="password" name="password" placeholder="Password" />
            </div>
            {state?.errors?.password && <p>{state.errors.password}</p>}
            <button disabled={pending} type="submit">
                Sign up
            </button>
        </form>
    )
}
