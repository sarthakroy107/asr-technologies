import { Skeleton } from "../ui/skeleton";

export function Loader() {
  return (
    <main className="w-full flex justify-center">
      <div className="w-full lg:w-4/5 p-6 flex flex-col gap-y-8 md:gap-y-12 justify-center items-center">
        <div className="w-full flex flex-col md:flex-row gap-5 justify-between">
          <Skeleton className="w-full md:w-80 h-28 md:h-32" />
          <Skeleton className="w-full md:w-80 h-28 md:h-32" />
          <Skeleton className="w-full md:w-80 h-28 md:h-32" />
        </div>
        <Skeleton className="w-full h-64 md:h-[28rem]" />
      </div>
    </main>
  );
}
