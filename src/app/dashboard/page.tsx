import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { forms } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { PlusIcon, EyeIcon, SettingsIcon } from "lucide-react";

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();
  
  // Get user's forms
  const userForms = userId ? await db
    .select()
    .from(forms)
    .where(eq(forms.userId, userId))
    .orderBy(desc(forms.createdAt))
    .limit(6) : [];

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.firstName || "there"}
        </h1>
        <p className="text-gray-600">
          Create and manage your forms in one place.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="hover:shadow-sm transition-shadow cursor-pointer border border-gray-200">
          <Link href="/dashboard/create">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-black rounded flex items-center justify-center">
                  <PlusIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Create New Form</CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Start building a form
                  </CardDescription>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>
        
        <Card className="hover:shadow-sm transition-shadow cursor-pointer border border-gray-200">
          <Link href="/dashboard/forms">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                  <EyeIcon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">View All Forms</CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Manage existing forms
                  </CardDescription>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>

      {/* Recent Forms */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Forms</h2>
          {userForms.length > 0 && (
            <Button variant="ghost" asChild>
              <Link href="/dashboard/forms">View all</Link>
            </Button>
          )}
        </div>
        
        {userForms.length === 0 ? (
          <div className="text-center py-12 border border-gray-200 rounded-lg bg-gray-50">
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
              <PlusIcon className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-600 mb-4">No forms created yet</p>
            <Button asChild>
              <Link href="/dashboard/create">Create your first form</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userForms.map((form) => (
              <Card key={form.id} className="hover:shadow-sm transition-shadow border border-gray-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium text-gray-900">{form.name}</CardTitle>
                    <Badge variant={form.isPublished ? "default" : "secondary"} className="text-xs">
                      {form.isPublished ? "Live" : "Draft"}
                    </Badge>
                  </div>
                  {form.description && (
                    <CardDescription className="text-sm text-gray-600 line-clamp-2">
                      {form.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {new Date(form.createdAt).toLocaleDateString()}
                    </span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/forms/${form.id}`}>View</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
