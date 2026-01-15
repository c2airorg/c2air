export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-900 pt-24 md:pt-28 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[480px] h-[480px] bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[520px] h-[520px] bg-blue-500/16 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-2/3 w-96 h-96 bg-c2air-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/3 w-[450px] h-[450px] bg-indigo-500/15 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center py-20 md:py-32">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Blog
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
            Blogs coming soon
          </p>
        </div>
      </div>
    </div>
  )
}
