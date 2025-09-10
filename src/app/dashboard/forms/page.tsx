import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { forms } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { PlusIcon, EyeIcon, EditIcon, TrashIcon } from "lucide-react";

export default async function FormsPage() {
  const { userId } = await auth();
  
  // Get user's forms
  const userForms = userId ? await db
    .select()
    .from(forms)
    .where(eq(forms.userId, userId))
    .orderBy(desc(forms.createdAt)) : [];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Forms</h1>
          <p className="text-gray-600">Manage all your forms in one place.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/create">
            <PlusIcon className="w-4 h-4 mr-2" />
            New Form
          </Link>
        </Button>
      </div>

      {/* Forms Grid */}
      {userForms.length === 0 ? (
        <div className="text-center py-12 border border-gray-200 rounded-lg bg-gray-50">
          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
            <PlusIcon className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No forms yet</h3>
          <p className="text-gray-600 mb-4">Create your first form to get started.</p>
          <Button asChild>
            <Link href="/dashboard/create">Create Form</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userForms.map((form) => (
            <Card key={form.id} className="hover:shadow-sm transition-shadow border border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {form.name}
                  </CardTitle>
                  <Badge variant={form.isPublished ? "default" : "secondary"} className="text-xs">
                    {form.isPublished ? "Live" : "Draft"}
                  </Badge>
                </div>
                {form.description && (
                  <CardDescription className="text-sm text-gray-600 line-clamp-2">
                    {form.description}
                  </CardDescription>
                )}
                <div className="text-xs text-gray-500">
                  Created {new Date(form.createdAt).toLocaleDateString()}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">0 responses</span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost" asChild>
                      <Link href={`/forms/${form.id}`}>
                        <EyeIcon className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button size="sm" variant="ghost" asChild>
                      <Link href={`/dashboard/forms/${form.id}`}>
                        <EditIcon className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
