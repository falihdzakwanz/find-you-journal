import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 mb-6 text-red-600 bg-red-100 rounded-lg"
    >
      <div className="flex items-center">
        <AlertTriangle className="w-5 h-5 mr-2" />
        {message}
      </div>
    </motion.div>
  );
}
