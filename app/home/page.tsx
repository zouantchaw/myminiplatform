import { InlineSnippet } from "@/components/form/domain-configuration";
import { Workflow } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-10 bg-black">
      <Workflow className="mx-auto w-16 h-16" size={64} />
      <h1 className="text-white">
        Edit this page on{" "}
        <InlineSnippet className="ml-2 bg-blue-900 text-blue-100">
          app/home/page.tsx
        </InlineSnippet>
      </h1>
    </div>
  );
}
