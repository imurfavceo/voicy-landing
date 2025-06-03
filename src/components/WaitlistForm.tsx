"use client"

import { useState, FormEvent } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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

  const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
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
  }

  if (success) {
    return (
      <div className="text-center space-y-2">
        <p className="text-lg">🎉 Welcome to the waitlist!</p>
        <p className="text-sm text-muted-foreground">
          We&apos;ll notify you as soon as Voicy is ready.
        </p>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setSuccess(false)}
          className="mt-4"
        >
          Add another email
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="your.email@example.com"
          value={formData.email}
          onChange={handleInputChange("email")}
          required
          disabled={loading}
          className="h-12"
        />
        <Input
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={formData.phone}
          onChange={handleInputChange("phone")}
          required
          disabled={loading}
          className="h-12"
        />
      </div>
      
      <Button 
        type="submit"
        disabled={loading || !formData.email.trim() || !formData.phone.trim()} 
        className="w-full h-12"
      >
        {loading ? "Joining..." : "Join the early-access list"}
      </Button>
      
      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
          {error}
        </div>
      )}
      
      <p className="text-xs text-muted-foreground text-center">
        We&apos;ll only use your info to notify you about Voicy updates.
      </p>
    </form>
  );
} 