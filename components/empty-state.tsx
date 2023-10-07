"use client";

import { useRouter } from "next/navigation";

import {Button} from "@/components/ui/button";
import Heading from "@/components/ui/header";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",
  showReset,
}) => {
  const router = useRouter();

  return (
    <div
      className="
        h-[80vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      "
    >
      <Heading center title={title} description={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
                  <Button onClick={() => router.push('/')} variant={"outline"}>
                      Remover All filters
                  </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
