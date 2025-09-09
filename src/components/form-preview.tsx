"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FormField {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

interface FormSchema {
  name: string;
  description: string;
  fields: FormField[];
}

interface FormPreviewProps {
  schema: FormSchema;
}

export function FormPreview({ schema }: FormPreviewProps) {
  const renderField = (field: FormField) => {
    const baseProps = {
      key: field.id,
      placeholder: field.placeholder,
      required: field.required,
    };

    switch (field.type) {
      case "text":
      case "email":
      case "tel":
      case "url":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <Input type={field.type} {...baseProps} />
          </div>
        );

      case "textarea":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <Textarea {...baseProps} />
          </div>
        );

      case "select":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required={field.required}
            >
              <option value="">Select an option</option>
              {field.options?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );

      case "radio":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="space-y-2">
              {field.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`${field.id}-${index}`}
                    name={field.id}
                    value={option}
                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    required={field.required}
                  />
                  <label
                    htmlFor={`${field.id}-${index}`}
                    className="text-sm text-gray-700 dark:text-gray-300"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case "checkbox":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="space-y-2">
              {field.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`${field.id}-${index}`}
                    name={field.id}
                    value={option}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={`${field.id}-${index}`}
                    className="text-sm text-gray-700 dark:text-gray-300"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case "rating":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="w-8 h-8 text-gray-300 hover:text-yellow-400 focus:text-yellow-400"
                >
                  ⭐
                </button>
              ))}
            </div>
          </div>
        );

      case "file":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                </div>
                <input type="file" className="hidden" required={field.required} />
              </label>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <Input {...baseProps} />
          </div>
        );
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{schema.name}</CardTitle>
          <Badge variant="outline">Preview</Badge>
        </div>
        {schema.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {schema.description}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          {schema.fields.map(renderField)}
          <div className="pt-4 border-t">
            <Button type="submit" className="w-full">
              Submit Form
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
