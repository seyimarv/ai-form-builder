interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">{children}</div>
    </div>
  );
}

// Shared Clerk appearance configuration
export const clerkAppearance = {
  elements: {
    rootBox: "w-full",
    card: "shadow-none border border-gray-200 rounded-lg bg-white px-4 py-8 w-full",
    // headerTitle: "hidden",
    // headerSubtitle: "hidden",
    socialButtonsBlockButton:
      "w-full justify-center border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium",
    socialButtonsBlockButtonText: "text-sm font-medium text-gray-700",
    dividerLine: "bg-gray-200",
    dividerText: "text-gray-500 text-sm",
    formFieldInput:
      "block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm",
    formButtonPrimary:
      "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black",
    footerActionLink: "text-black hover:text-gray-800 font-medium",
  },
};
