import { SignUp } from "@/components/signup";
import { signIn, signUp } from "@/utils/auth-client";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/auth")({
  component: RouteComponent,
});

function RouteComponent() {
  const handleSignIn = () => {
    signIn.email({
      email: "test@test.com",
      password: "Yuhg1BWPH6KTCVus5TK",
    });
  };

  const handleSignUp = () => {
    signUp.email({
      email: "test@test.com",
      name: "Test User",
      password: "Yuhg1BWPH6KTCVus5TK",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp />
      {/* <div className="rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-2xl font-bold">Authentication</h1>
        <button
          type="button"
          onClick={handleSignIn}
          className="rounded-sm bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          SignIn with Better Auth
        </button>

        <button
          type="button"
          onClick={handleSignUp}
          className="rounded-sm bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          SignUp with Better Auth
        </button>
      </div> */}
    </div>
  );
}
