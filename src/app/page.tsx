import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">F</span>
                </div>
                <span className="text-xl font-semibold text-gray-900">FormCraft</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              {userId ? (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <UserButton afterSignOutUrl="/" />
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/sign-up">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-6xl">
              Build forms that work
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Create professional forms in minutes, not hours. Just describe what you need 
              and get a working form instantly.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link href={userId ? "/dashboard" : "/sign-up"}>
                  {userId ? "Go to Dashboard" : "Start Building"}
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#features">Learn more</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need to build forms
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Professional form building made simple
              </p>
            </div>
            
            <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-md bg-black text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Lightning Fast</h3>
                <p className="mt-2 text-base text-gray-600">
                  Get working forms in under 60 seconds. No setup, no learning curve.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-md bg-black text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Secure & Reliable</h3>
                <p className="mt-2 text-base text-gray-600">
                  Enterprise-grade security with reliable data collection and storage.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-md bg-black text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Smart Analytics</h3>
                <p className="mt-2 text-base text-gray-600">
                  Track responses and get insights to improve your forms over time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Join thousands of users who build better forms faster.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href={userId ? "/dashboard" : "/sign-up"}>
                  {userId ? "Go to Dashboard" : "Create Your First Form"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                <span className="text-white font-semibold text-xs">F</span>
              </div>
              <span className="text-sm text-gray-600">FormCraft</span>
            </div>
            <p className="text-sm text-gray-600">
              © 2025 FormCraft. Built with care.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
