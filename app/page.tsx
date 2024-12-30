import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold text-slate-600">
          🔐 Auth
        </h1>
        <p className="text-3xl font-normal text-slate-700">Advance authentication </p>
      </div>

      <Link href={"/sign-in"}>
        <Button className="mt-10" variant={"secondary"} size={"lg"}>Sign In</Button>
      </Link>
    </div>
  );
}
