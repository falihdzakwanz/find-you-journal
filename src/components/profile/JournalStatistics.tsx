import { motion } from "framer-motion";
import { BarChart2, CalendarDays, PenSquare } from "lucide-react";
import StatItem from "./StatItem";
import { JournalStats } from "@/types/entry.type";

export default function JournalStatistics({ stats }: { stats: JournalStats }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="p-6 mb-12 bg-white rounded-lg shadow-sm"
    >
      <h2 className="flex items-center mb-6 text-xl font-bold md:text-2xl text-dark-brown">
        <BarChart2 className="mr-2" /> Journal Statistics
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h3 className="flex items-center mb-4 text-lg font-semibold text-primary">
            <CalendarDays className="mr-2" /> Activity Patterns
          </h3>
          <ul className="space-y-3">
            <StatItem
              label="Most Active Day"
              value={stats?.mostActiveDay || "-"}
            />
            <StatItem
              label="Longest Entry"
              value={`${stats?.longestEntry || 0} words`}
            />
            <StatItem
              label="Entries This Month"
              value={Math.floor((stats?.totalEntries || 0) / 3)}
            />
          </ul>
        </div>

        <div>
          <h3 className="flex items-center mb-4 text-lg font-semibold text-primary">
            <PenSquare className="mr-2" /> Writing Categories
          </h3>
          <ul className="space-y-3">
            {stats?.categories ? (
              Object.entries(stats.categories).map(([category, count]) => (
                <StatItem key={category} label={category} value={count} />
              ))
            ) : (
              <li>No category data available</li>
            )}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
