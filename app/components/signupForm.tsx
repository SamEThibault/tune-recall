'use client'

import { useActionState } from 'react'
import { signup } from '../actions/auth'
import styles from './signupForm.module.css'

export function SignupForm() {
    const [state, action, pending] = useActionState(signup, undefined)

    return (
        <form action={action} className={styles.formContainer}>
            <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Name</label>
                <input 
                    id="name" 
                    name="name" 
                    placeholder="Your name" 
                    className={styles.input}
                />
                {state?.errors?.name && <p className={styles.error}>{state.errors.name}</p>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input 
                    id="email" 
                    name="email" 
                    placeholder="you@example.com" 
                    className={styles.input}
                    type="email"
                />
                {state?.errors?.email && <p className={styles.error}>{state.errors.email}</p>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>Password</label>
                <input 
                    id="password" 
                    name="password" 
                    placeholder="••••••••" 
                    className={styles.input}
                    type="password"
                />
                {state?.errors?.password && <p className={styles.error}>{state.errors.password}</p>}
            </div>

            <button disabled={pending} type="submit" className={styles.button}>
                {pending ? 'Creating account...' : 'Sign up'}
            </button>
        </form>
    )
}
