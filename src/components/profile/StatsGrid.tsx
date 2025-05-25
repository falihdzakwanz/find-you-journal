import { motion } from "framer-motion";
import StatCard from "./StatCard";
import { BookOpen, Award, BarChart2 } from "lucide-react";
import { JournalStats } from "@/types/entry.type";

export default function StatsGrid({ stats }: { stats: JournalStats }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3"
    >
      <StatCard
        icon={<BookOpen className="w-6 h-6" />}
        title="Total Entries"
        value={stats?.totalEntries || 0}
        color="bg-primary/90"
      />
      <StatCard
        icon={<Award className="w-6 h-6" />}
        title="Current Streak"
        value={`${stats?.streak || 0} days`}
        color="bg-accent/90"
      />
      <StatCard
        icon={<BarChart2 className="w-6 h-6" />}
        title="Avg/Week"
        value={stats?.avgEntriesPerWeek?.toFixed(1) || 0}
        color="bg-dark-brown/90"
      />
    </motion.div>
  );
}
