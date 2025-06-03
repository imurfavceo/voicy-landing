import WaitlistForm from "@/components/WaitlistForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
              🎙️ Coming Soon
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Turn any voice note into a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              perfectly-formatted message
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Record · Transcribe · Share — in seconds
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12 text-left">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl mb-3">🎤</div>
              <h3 className="font-semibold text-gray-900 mb-2">Record Naturally</h3>
              <p className="text-gray-600 text-sm">Speak your thoughts naturally, no need to worry about formatting or structure.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl mb-3">✨</div>
              <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Polish</h3>
              <p className="text-gray-600 text-sm">Our AI transforms your voice into clear, professional messages instantly.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl mb-3">📱</div>
              <h3 className="font-semibold text-gray-900 mb-2">Share Anywhere</h3>
              <p className="text-gray-600 text-sm">Copy, paste, or share your polished messages across any platform.</p>
            </div>
          </div>
        </div>

        {/* Waitlist Form */}
        <div className="w-full max-w-md">
          <WaitlistForm />
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">
            Join thousands of early adopters who are already on the waitlist
          </p>
        </div>
      </div>
    </main>
  );
}
