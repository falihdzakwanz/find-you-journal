import { ViewMode } from "@/types/viewMode.type";

type Props = {
  viewMode: ViewMode;
  changeWeek: (dir: "prev" | "next") => void;
  changeMonth: (dir: "prev" | "next") => void;
};

export default function NavigationControls({
  viewMode,
  changeWeek,
  changeMonth,
}: Props) {
  const change = viewMode === "monthly" ? changeMonth : changeWeek;

  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={() => change("prev")}
        className="text-sm px-3 py-1 bg-primary text-white rounded"
      >
        &larr; Sebelumnya
      </button>
      <button
        onClick={() => change("next")}
        className="text-sm px-3 py-1 bg-primary text-white rounded"
      >
        Berikutnya &rarr;
      </button>
    </div>
  );
}
