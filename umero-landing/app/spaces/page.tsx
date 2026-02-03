export const dynamic = "force-dynamic";

import { Suspense } from "react";
import SpacesClient from "./SpacesClient";

export default function SpacesPage() {
  return (
    <Suspense fallback={<div className="pt-40 text-center">Loading spaces…</div>}>
      <SpacesClient />
    </Suspense>
  );
}
