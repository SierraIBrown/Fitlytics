import Link from "next/link";
import PageContainer from "../components/PageContainer";

export default function HomePage(){
  return (
    <PageContainer title="Welcome to Fitlytics">
      <div className="space-y-4">
        <p className="max-w-2xl text-gray-700">
          Track workouts, review progress, and build better training habits.
        </p>
        <div className="flex gap-4">
          <Link href="/dashboard" className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800">
            Go to Dashboard
          </Link>
          <Link href="/log" className="rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-100">
            Log Workout
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}