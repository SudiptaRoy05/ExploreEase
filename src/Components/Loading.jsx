
export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-base-200">
            <div className="flex flex-col items-center gap-4">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="text-gray-700 font-medium text-lg">Loading, please wait...</p>
            </div>
        </div>
    )
}
