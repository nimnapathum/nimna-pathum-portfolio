import LoadingComponent from "@/app/components/LoadingComponent";

// Add an artificial delay so the app/loading.tsx UI is visible for 5 seconds
export default async function Home() {
  // 5000 ms delay
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return (
    <div>
      <LoadingComponent />
    </div>
  );
}
