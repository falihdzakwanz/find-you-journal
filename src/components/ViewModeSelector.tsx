import { ViewMode } from "@/types/viewMode.type";

type Props = {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
};

export default function ViewModeSelector({ viewMode, setViewMode }: Props) {
  return (
    <div className="relative w-full sm:w-48">
      <select
        value={viewMode}
        onChange={(e) => setViewMode(e.target.value as ViewMode)}
        className="block w-full px-3 py-2 text-base transition-colors border rounded-md cursor-pointer appearance-none bg-neutral border-neutral-300 focus:outline-none lg:px-4 lg:py-2.5 lg:text-lg"
      >
        <option value="daily" className="text-xs lg:text-base">
          Harian
        </option>
        <option value="weekly" className="text-xs lg:text-base">
          Mingguan
        </option>
        <option value="monthly" className="text-xs lg:text-base">Bulanan</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg
          className="w-5 h-5 text-neutral-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
