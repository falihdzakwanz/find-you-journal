import { motion } from "framer-motion";

export default function EmptyState() {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center text-primary md:text-lg lg:text-xl"
    >
      No entries for this period.
    </motion.p>
  );
}