import { ViewMode } from "@/types/viewMode.type";

type Props = {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
};

export default function ViewModeSelector({ viewMode, setViewMode }: Props) {
  return (
    <select
      value={viewMode}
      onChange={(e) => setViewMode(e.target.value as ViewMode)}
      className="p-2 border rounded"
    >
      <option value="daily">Harian</option>
      <option value="weekly">Mingguan</option>
      <option value="monthly">Bulanan</option>
    </select>
  );
}
