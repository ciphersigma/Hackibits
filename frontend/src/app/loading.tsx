export default function Loading() {
  return (
    <div className="min-h-screen pt-16 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-[#00D084] dark:border-t-[#00FF9C]"></div>
        <p className="mt-4 text-xl font-orbitron text-gray-700 dark:text-gray-300">Loading...</p>
      </div>
    </div>
  );
}
