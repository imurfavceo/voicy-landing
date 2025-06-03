"use client"

import { useState, FormEvent, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import IntlPhoneInput from "@/components/IntlPhoneInput"

interface FormData {
  email: string;
  phone: string;
}

interface ApiResponse {
  success?: boolean;
  message?: string;
  error?: string;
}

export default function WaitlistForm() {
  const [formData, setFormData] = useState<FormData>({ email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = useCallback((field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(null);
  }, [error]);

  const handlePhoneChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, phone: value }));
    if (error) setError(null);
  }, [error]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (loading || !formData.email.trim() || !formData.phone.trim()) return;
    
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data: ApiResponse = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
        setFormData({ email: "", phone: "" });
      } else {
        setError(data.error || "An unexpected error occurred");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, [formData, loading]);

  const resetForm = useCallback(() => {
    setSuccess(false);
    setError(null);
  }, []);

  if (success) {
    return (
      <div className="text-center space-y-3 p-4 sm:p-0">
        <div className="text-4xl sm:text-5xl mb-2">🎉</div>
        <p className="text-base sm:text-lg font-medium text-gray-900">Welcome to the waitlist!</p>
        <p className="text-sm text-gray-600">
          We&apos;ll notify you as soon as Voicy is ready.
        </p>
        <Button 
          variant="outline" 
          size="sm"
          onClick={resetForm}
          className="mt-4 text-xs sm:text-sm"
        >
          Add another email
        </Button>
      </div>
    );
  }

  const isFormValid = formData.email.trim() && formData.phone.trim();

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full" noValidate>
      <div className="space-y-3">
        <Input
          type="email"
          placeholder="your.email@example.com"
          value={formData.email}
          onChange={handleInputChange("email")}
          required
          disabled={loading}
          className="h-11 sm:h-12 text-sm sm:text-base"
          aria-label="Email address"
        />
        <IntlPhoneInput 
          value={formData.phone} 
          onChange={handlePhoneChange} 
        />
      </div>
      
      <Button 
        type="submit"
        disabled={loading || !isFormValid} 
        className="w-full h-11 sm:h-12 text-sm sm:text-base font-medium"
        aria-describedby={error ? "form-error" : undefined}
      >
        {loading ? "Joining..." : "Join the early-access list"}
      </Button>
      
      {error && (
        <div 
          id="form-error"
          className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200"
          role="alert"
        >
          {error}
        </div>
      )}
      
      <p className="text-xs text-gray-500 text-center leading-relaxed">
        We&apos;ll only use your info to notify you about Voicy updates.
      </p>
    </form>
  );
} 