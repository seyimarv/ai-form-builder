import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">F</span>
                </div>
                <span className="text-xl font-semibold text-gray-900">FormCraft</span>
              </Link>
              
              <nav className="hidden md:flex space-x-6">
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/create"
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  Create
                </Link>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <Button asChild>
                <Link href="/dashboard/create">New Form</Link>
              </Button>
              
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8",
                  },
                }}
                afterSignOutUrl="/"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
