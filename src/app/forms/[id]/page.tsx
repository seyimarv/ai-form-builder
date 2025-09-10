import { db } from "@/lib/db";
import { forms } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { FormPreview } from "@/components/form-preview";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PublicFormPageProps {
  params: {
    id: string;
  };
}

export default async function PublicFormPage({ params }: PublicFormPageProps) {
  // Get the specific form (only if published)
  const form = await db
    .select()
    .from(forms)
    .where(eq(forms.id, params.id))
    .limit(1);

  if (!form[0] || !form[0].isPublished) {
    return notFound();
  }

  const formData = form[0];
  const formSchema = formData.schema as any;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <span className="text-white font-semibold text-xs">F</span>
            </div>
            <span className="font-medium">FormCraft</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{formData.name}</h1>
          {formData.description && (
            <p className="text-gray-600">{formData.description}</p>
          )}
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <FormPreview schema={formSchema} />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            Powered by{" "}
            <Link href="/" className="text-black hover:underline font-medium">
              FormCraft
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
