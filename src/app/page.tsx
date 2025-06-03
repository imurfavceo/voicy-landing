import WaitlistForm from "@/components/WaitlistForm";

const features = [
  {
    icon: "🎤",
    title: "Record Naturall",
    description: "Speak your thoughts naturally, no need to worry about formatting or structure."
  },
  {
    icon: "✨", 
    title: "AI-Powered Polish",
    description: "Our AI transforms your voice into clear, professional messages instantly."
  },
  {
    icon: "📱",
    title: "Share Anywhere", 
    description: "Copy, paste, or share your polished messages across any platform."
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 flex flex-col items-center justify-center min-h-screen">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
          <div className="mb-4 sm:mb-6">
            <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium rounded-full mb-3 sm:mb-4">
              🎙️ Coming Soon
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
            Turn any voice note into a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              perfectly-formatted message
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-2">
            Record · Transcribe · Share — in seconds
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 text-left">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="text-xl sm:text-2xl mb-2 sm:mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">{feature.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Waitlist Form */}
        <div className="w-full max-w-sm px-4 sm:px-0">
          <WaitlistForm />
        </div>

        {/* Footer */}
        <footer className="mt-12 sm:mt-16 text-center px-4">
          <p className="text-xs sm:text-sm text-gray-500">
            Join thousands of early adopters who are already on the waitlist
          </p>
        </footer>
      </div>
    </main>
  );
}
