
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Live Password Validation
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!hasUppercase) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }

    if (!hasLowercase) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }

    if (!hasMinLength) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: photoURL.trim() || undefined,
      });

      if (error) {
        setError(error.message || "Unable to create your account.");
        return;
      }

      setSuccess(
        "Account created successfully! Redirecting to homepage..."
      );

      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1200);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background px-4 py-12 text-foreground">
      <div className="mx-auto grid min-h-[75vh] max-w-6xl items-center gap-12 lg:grid-cols-2">

        {/* Left Content */}
        <section className="hidden lg:block">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Join Our Community
          </p>

          <h1 className="max-w-lg text-5xl font-bold leading-tight">
            Be Part of Something Meaningful.
          </h1>

          <p className="mt-6 max-w-md leading-8 text-muted-foreground">
            Connect with people who care, discover volunteering
            opportunities, and turn small acts of kindness into
            lasting impact.
          </p>

          <div className="mt-10 border-l-2 border-primary pl-5">
            <p className="text-lg font-semibold">Rupshora</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Small Acts, Greater Impact.
            </p>
          </div>
        </section>

        {/* Register Form */}
        <section className="mx-auto w-full max-w-md">
          <div className="rounded-3xl border border-border bg-card p-7 shadow-sm sm:p-9">

            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-primary"
            >
              Rupshora.
            </Link>

            <div className="mb-7 mt-7">
              <h2 className="text-3xl font-bold">
                Create Account
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Join Rupshora and start making a difference.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">

              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  autoComplete="name"
                  required
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                />
              </div>

              {/* Profile Photo */}
              <div>
                <label
                  htmlFor="photoURL"
                  className="mb-2 block text-sm font-medium"
                >
                  Profile Photo URL
                  <span className="ml-1 text-muted-foreground">
                    (Optional)
                  </span>
                </label>

                <input
                  id="photoURL"
                  type="url"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    required
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-20 text-sm outline-none transition-colors focus:border-primary"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-primary"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {/* Password Requirements */}
                <div className="mt-3 space-y-2">

                  <p
                    className={`flex items-center gap-2 text-xs transition-colors ${
                      hasUppercase
                        ? "font-medium text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    <span>{hasUppercase ? "✓" : "○"}</span>
                    At least one uppercase letter (A-Z)
                  </p>

                  <p
                    className={`flex items-center gap-2 text-xs transition-colors ${
                      hasLowercase
                        ? "font-medium text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    <span>{hasLowercase ? "✓" : "○"}</span>
                    At least one lowercase letter (a-z)
                  </p>

                  <p
                    className={`flex items-center gap-2 text-xs transition-colors ${
                      hasMinLength
                        ? "font-medium text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    <span>{hasMinLength ? "✓" : "○"}</span>
                    Minimum 6 characters length
                  </p>

                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium"
                >
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  required
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600"
                >
                  {error}
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div
                  role="status"
                  className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary"
                >
                  {success}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-primary px-4 py-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

            </form>

            {/* Login Link */}
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-primary hover:underline"
              >
                Sign In
              </Link>
            </p>

          </div>
        </section>

      </div>
    </main>
  );
}
