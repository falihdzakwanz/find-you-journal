import { motion } from "framer-motion";

export default function StatCard({
  icon,
  title,
  value,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`p-6 rounded-lg text-white ${color} shadow-md`}
    >
      <div className="flex items-center mb-2">
        <div className="p-2 mr-3 rounded-full bg-white/20">{icon}</div>
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <p className="text-xl font-bold md:text-3xl">{value}</p>
    </motion.div>
  );
}
