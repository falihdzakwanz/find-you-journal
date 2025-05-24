import { motion } from "framer-motion";

export default function HighlightCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="p-5 bg-white border rounded-lg border-primary/20"
    >
      <div className="flex items-center mb-3">
        <div className="p-2 mr-3 rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-dark-brown">{title}</h3>
      </div>
      <p className="text-dark-brown/70">{description}</p>
    </motion.div>
  );
}
