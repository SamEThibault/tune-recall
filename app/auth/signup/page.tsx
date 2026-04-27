import { SignupForm } from "@/app/components/signupForm";

export default function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">Create an account</h1>
                    <p className="text-gray-600 mt-2">Join TuneRecall and start recording</p>
                </div>
                <SignupForm />
            </div>
        </div>
    );
}