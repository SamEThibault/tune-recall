import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | TuneRecall",
  description: "Login to your TuneRecall account",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
