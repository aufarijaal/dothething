import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "../submit-button";

const signIn = async (formData: FormData) => {
  "use server";

  const supabase = createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error);
    return redirect("/auth/signin?message=" + error.message);
  }

  return redirect("/dashboard");
};

export default async function SignInPage({ searchParams }: { searchParams: { message: string } }) {
  return (
    <main className="min-h-screen w-full grid place-items-center">
      <div className="max-w-7xl mx-auto">
        <form className="card shadow-xl card-body">
          <div className="my-4 flex flex-col items-center gap-2">
            <Link href="/">
              <svg xmlns="http://www.w3.org/2000/svg" width="48 " height="48 " viewBox="0 0 24 24" className="text-primary">
                <path fill="currentColor" d="M13 9V4H6v16h12V9zm-2.06 9L7.4 14.46l1.41-1.41l2.12 2.12l4.24-4.24l1.41 1.41z" opacity="0.3" />
                <path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5zm-9.18-6.95L7.4 14.46L10.94 18l5.66-5.66l-1.41-1.41l-4.24 4.24z" />
              </svg>
            </Link>
            <h3 className="text-xl font-bold text-center">Sign In</h3>
            {searchParams?.message && <p className="text-error mt-2 text-xs text-center">{searchParams.message}</p>}
          </div>

          <label className="text-xs" htmlFor="email">
            Email
          </label>
          <input className="input input-bordered input-sm" name="email" placeholder="johndoe@mail.com" required autoFocus />

          <div className="my-1"></div>

          <label className="text-xs" htmlFor="password">
            Password
          </label>
          <input className="input input-bordered input-sm" type="password" name="password" placeholder="••••••••" required />

          <div className="flex flex-col gap-4 mt-4">
            <SubmitButton formAction={signIn} className="btn btn-primary btn-sm btn-block" pendingText="Signing In...">
              Sign In
            </SubmitButton>

            <p className="text-xs text-center">
              Don&apos;t have account yet?{" "}
              <Link href="/auth/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
