import { LoginForm } from "@/app/components/loginForm";

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-gray-600 mt-2">Sign in to your TuneRecall account</p>
      </div>
      <LoginForm></LoginForm>
    </div>
  );
}
