import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#060b12] px-4 text-zinc-100">
      <div className="w-full max-w-md space-y-4 rounded-2xl border border-white/10 bg-zinc-950/75 p-6 text-center">
        <p className="text-xs tracking-[0.16em] text-cyan-200/80 uppercase">404</p>
        <h1 className="font-heading text-2xl font-semibold text-white">Project not found</h1>
        <p className="text-sm text-zinc-300">
          Link project tidak ditemukan atau slug sudah berubah. Kembali ke portfolio untuk memilih
          aset lain.
        </p>
        <Link href="/#portfolio" className={buttonVariants({ className: "w-full" })}>
          <ArrowLeft className="size-4" />
          Back to Portfolio
        </Link>
      </div>
    </main>
  );
}
