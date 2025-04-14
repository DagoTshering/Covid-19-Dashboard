import SignupForm from "./_components/signupform"

const SignupPage = () => {
  return <main className="mt-4">
    <div className="container">
      <h1 className="text-3xl font-bold tracking-tight">Sign Up</h1>
      {/* Adding Spacer */}
      <div className="h-1 bg-muted my-4"/>

      {/* Singup Form */}

      <SignupForm />

      {/* OAuth Links */}

      {/* Go to Signin Link */}
    </div>
  </main>
}

export default SignupPage