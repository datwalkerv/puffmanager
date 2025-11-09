export default function Process() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6">
            <div className="font-header text-2xl text-yellow">Process</div>
            <p className="text-gray-700 dark:text-gray-300 text-center max-w-2xl mb-6">
                This page will display the active project workflow and task progress.
                Editors and clients will be able to track each project phase — from
                initial upload to completion — in a Kanban-style interface.
            </p>
            <div className="border rounded-2xl p-8 shadow-md bg-white dark:bg-neutral-900 max-w-lg text-center">
                <p className="text-gray-500 dark:text-gray-400">
                    🚧 Kanban board and workflow visualization coming soon.
                </p>
            </div>
        </main>
    );
}