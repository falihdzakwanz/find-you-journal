import { motion } from "framer-motion";

interface GroupHeaderProps {
  title: string;
  count: number;
}

export default function GroupHeader({ title, count }: GroupHeaderProps) {
  return (
    <motion.div
      className="sticky top-0 z-10 px-4 py-2 mb-3 -mx-4 border-b backdrop-blur-sm border-primary/20"
      initial={{ opacity: 0, y: -10 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
        },
      }}
      whileHover={{
        scale: 1.02,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      <div className="flex items-baseline">
        <motion.h2
          className="text-xl font-bold tracking-tight text-dark-brown lg:text-2xl"
          whileHover={{ color: "var(--color-accent)" }}
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.h2>
        <motion.span
          className="ml-3 text-sm font-medium text-primary lg:text-base"
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {count} {count === 1 ? "entry" : "entries"}
        </motion.span>
      </div>
    </motion.div>
  );
}
