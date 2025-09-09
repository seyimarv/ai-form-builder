import { SignIn } from '@clerk/nextjs';
import { AuthLayout, clerkAppearance } from '@/components/auth-layout';

export default function Page() {
  return (
    <AuthLayout
   
    >
      <SignIn appearance={clerkAppearance} />
    </AuthLayout>
  );
}
