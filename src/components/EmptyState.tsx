import { motion } from "framer-motion";

export default function EmptyState() {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center text-primary"
    >
      Tidak ada entri pada periode ini.
    </motion.p>
  );
}
