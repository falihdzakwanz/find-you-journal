import formatDateIndo from '@/utils/formatDateIndo';
import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react'

type Entry = {
  id: string;
  answer: string;
  question: string;
  createdAt: string;
  date: string;
};  

interface Props {
    selectedEntry: Entry;
    setSelectedEntry: Dispatch<SetStateAction<Entry | null>>
}

const ModalDetail = ({ selectedEntry, setSelectedEntry }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full">
        <h2 className="text-lg font-semibold mb-2">
          {selectedEntry.question}
        </h2>
        <p className="text-sm text-blue-600 italic mb-2">
          Detail Jurnal - {formatDateIndo(selectedEntry.date)}
        </p>
        <textarea
          className="w-full p-2 rounded bg-gray-100 outline-none border-0"
          rows={6}
          value={selectedEntry.answer}
          readOnly
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={() => setSelectedEntry(null)}
          >
            Tutup
          </button>
          <Link
            className="px-4 py-2 bg-gray-800 text-white rounded"
            href={`/journal/edit/${selectedEntry.date}/${selectedEntry.id}`}
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ModalDetail