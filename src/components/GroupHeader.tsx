import { motion } from "framer-motion";

interface GroupHeaderProps {
  title: string;
  count: number;
}

export default function GroupHeader({ title, count }: GroupHeaderProps) {
  return (
    <motion.div
      className="sticky top-0 z-10 px-2 py-1 -mx-2 bg-neutral/80 backdrop-blur-sm"
      whileHover={{ scale: 1.01 }}
    >
      <h2 className="text-lg font-semibold text-primary-800">
        {title}
        <span className="ml-2 text-sm font-normal text-neutral-500">
          ({count} entri)
        </span>
      </h2>
    </motion.div>
  );
}
