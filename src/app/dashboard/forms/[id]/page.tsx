import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { forms } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FormPreview } from "@/components/form-preview";
import Link from "next/link";
import { ArrowLeftIcon, ExternalLinkIcon, EditIcon, BarChartIcon } from "lucide-react";
import { notFound } from "next/navigation";

interface FormPageProps {
  params: {
    id: string;
  };
}

export default async function FormPage({ params }: FormPageProps) {
  const { userId } = await auth();
  
  if (!userId) {
    return notFound();
  }

  // Get the specific form
  const form = await db
    .select()
    .from(forms)
    .where(and(eq(forms.id, params.id), eq(forms.userId, userId)))
    .limit(1);

  if (!form[0]) {
    return notFound();
  }

  const formData = form[0];
  const formSchema = formData.schema as any;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/forms">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Forms
            </Link>
          </Button>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-gray-900">{formData.name}</h1>
              <Badge variant={formData.isPublished ? "default" : "secondary"}>
                {formData.isPublished ? "Live" : "Draft"}
              </Badge>
            </div>
            {formData.description && (
              <p className="text-gray-600 mt-1">{formData.description}</p>
            )}
          </div>
        </div>
        
        <div className="flex space-x-2">
          {formData.isPublished && (
            <Button variant="outline" asChild>
              <Link href={`/forms/${formData.id}`} target="_blank">
                <ExternalLinkIcon className="w-4 h-4 mr-2" />
                View Public
              </Link>
            </Button>
          )}
          <Button variant="outline" asChild>
            <Link href={`/dashboard/forms/${formData.id}/analytics`}>
              <BarChartIcon className="w-4 h-4 mr-2" />
              Analytics
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/dashboard/forms/${formData.id}/edit`}>
              <EditIcon className="w-4 h-4 mr-2" />
              Edit
            </Link>
          </Button>
        </div>
      </div>

      {/* Form Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-gray-900">0</div>
            <p className="text-sm text-gray-600">Total Responses</p>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-gray-900">0</div>
            <p className="text-sm text-gray-600">This Week</p>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-gray-900">
              {new Date(formData.createdAt).toLocaleDateString()}
            </div>
            <p className="text-sm text-gray-600">Created</p>
          </CardContent>
        </Card>
      </div>

      {/* Form Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>Form Preview</CardTitle>
              <CardDescription>
                This is how your form appears to users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormPreview schema={formSchema} />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>Share Form</CardTitle>
              <CardDescription>
                Share your form with others
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.isPublished ? (
                <>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Public URL</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 focus:ring-black focus:border-black sm:text-sm"
                        value={`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/forms/${formData.id}`}
                        readOnly
                      />
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 text-sm"
                        onClick={() => navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/forms/${formData.id}`)}
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href={`/forms/${formData.id}`} target="_blank">
                      Open Form
                    </Link>
                  </Button>
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>Form must be published to share</p>
                  <Button className="mt-4" asChild>
                    <Link href={`/dashboard/forms/${formData.id}/edit`}>
                      Publish Form
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
