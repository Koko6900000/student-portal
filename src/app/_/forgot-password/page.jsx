"use client";
import React from "react";

function MainComponent() {
  const [method, setMethod] = useState("email");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    code: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/send-reset-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method,
          [method]: formData[method],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send verification code");
      }

      setStep(2);
    } catch (err) {
      setError("Failed to send verification code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (formData.code.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }
    setStep(3);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method,
          [method]: formData[method],
          code: formData.code,
          newPassword: formData.newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to reset password");
      }

      setStep(4);
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold font-roboto text-gray-900">
          Reset Password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {step === 1 && (
            <form onSubmit={handleSendCode}>
              <div className="mb-6">
                <div className="flex gap-4 mb-4">
                  <button
                    type="button"
                    onClick={() => setMethod("email")}
                    className={`flex-1 py-2 px-4 rounded-lg font-roboto ${
                      method === "email"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod("mobile")}
                    className={`flex-1 py-2 px-4 rounded-lg font-roboto ${
                      method === "mobile"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    Mobile
                  </button>
                </div>

                {method === "email" ? (
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-roboto"
                    required
                  />
                ) : (
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Enter your mobile number"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-roboto"
                    required
                  />
                )}
              </div>

              {error && (
                <p className="text-red-500 text-sm mb-4 font-roboto">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 font-roboto"
              >
                {loading ? "Sending..." : "Send Verification Code"}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyCode}>
              <div className="mb-6">
                <input
                  type="text"
                  name="code"
                  placeholder="Enter 6-digit code"
                  value={formData.code}
                  onChange={handleInputChange}
                  maxLength="6"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg font-roboto"
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm mb-4 font-roboto">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 font-roboto"
              >
                Verify Code
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword}>
              <div className="space-y-4">
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New password"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg font-roboto"
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg font-roboto"
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm my-4 font-roboto">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 mt-6 font-roboto"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}

          {step === 4 && (
            <div className="text-center">
              <i className="fa-solid fa-circle-check text-green-500 text-5xl mb-4"></i>
              <h3 className="text-xl font-bold mb-2 font-roboto">
                Password Reset Successful
              </h3>
              <p className="text-gray-600 mb-6 font-roboto">
                Your password has been reset successfully.
              </p>
              <a
                href="/account/signin"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 font-roboto"
              >
                Sign In
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainComponent;