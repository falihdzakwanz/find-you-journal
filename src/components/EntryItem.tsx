import { Entry } from "@/types/entry.type";

const EntryItem = ({
  entry,
  onView,
  onDelete,
}: {
  entry: Entry;
  onView: () => void;
  onDelete: () => void;
}) => {
  return (
    <li className="p-4 border rounded-lg flex flex-col sm:flex-row justify-between sm:items-center gap-2">
      <div>
        <p className="text-sm text-blue-600 italic mb-1">
          Pertanyaan: {entry.question}
        </p>
        <p className="truncate max-w-xs">{entry.answer}</p>
      </div>
      <div className="flex gap-2">
        <button onClick={onView} className="text-blue-500 hover:underline">
          Detail
        </button>
        <button onClick={onDelete} className="text-red-500 hover:underline">
          Hapus
        </button>
      </div>
    </li>
  );
}

export default EntryItem;