'use server' //Runs on my laptop: security reasons, more power (use client runs on the browser (quicker, and to use browser features))

import { SignupFormSchema, FormState } from "../lib/definitions";

export async function signup(state: FormState | undefined, formData: FormData) {
    const validatedFields=SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
    })

    if (!validatedFields.success) { //.success comes from when you call safeParse on a zod Schema
        return {
            // Apparently flatten is deprecited but idk what else to use
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    //Call the database to make the user once we make it
    //I think steps are :1. prep data for db, 2. Insert into db, 3. Create user session, 4. Redirect user to the audio page
    //(got these steps from the authetncation docs on next.js website)
}