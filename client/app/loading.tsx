import { Logo } from "@/components/ui";

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] animate-pulse flex-col items-center justify-center gap-3 [&_div]:h-16 [&_div]:w-16">
      <Logo withName={false} />
      Loading . . .
    </div>
  );
}
