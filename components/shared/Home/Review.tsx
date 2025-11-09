export default function Review() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6">
            <div className="font-header text-2xl text-yellow">Project Review</div>
            <p className="text-gray-700 dark:text-gray-300 text-center max-w-2xl mb-6">
                The review section will allow clients and editors to finalize projects.
                Here, users can leave feedback, request revisions, and approve
                completed work before delivery.
            </p>
            <div className="border rounded-2xl p-8 shadow-md bg-white dark:bg-neutral-900 max-w-lg text-center">
                <p className="text-gray-500 dark:text-gray-400">
                    📝 Review and feedback tools coming soon.
                </p>
            </div>
        </main>
    );
}