import LoadingComponent from "@/app/components/LoadingComponent";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50">
      <LoadingComponent />
    </div>
  );
}
