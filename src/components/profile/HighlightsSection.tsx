import { motion } from "framer-motion";
import { Award, BarChart2, Clock, PenSquare } from "lucide-react";
import HighlightCard from "./HighlightCard";
import { JournalStats } from "@/types/entry.type";

export default function HighlightsSection({ stats }: { stats: JournalStats }) {
  const getHighlights = () => {
    if (!stats) return [];

    const highlights = [];

    if (stats.streak >= 3) {
      highlights.push({
        title: `${stats.streak} Day Streak!`,
        description: `You've written for ${stats.streak} days in a row`,
        icon: <Clock className="w-5 h-5" />,
      });
    }

    if (stats.longestEntry > 50) {
      highlights.push({
        title: "Long Entry!",
        description: `Your longest entry has ${stats.longestEntry} words`,
        icon: <PenSquare className="w-5 h-5" />,
      });
    }

    if (stats.avgEntriesPerWeek >= 3) {
      highlights.push({
        title: "Consistent Writer",
        description: `You average ${stats.avgEntriesPerWeek} entries per week`,
        icon: <BarChart2 className="w-5 h-5" />,
      });
    }

    if (highlights.length === 0) {
      highlights.push({
        title: "Getting Started",
        description: "Keep writing to unlock achievements",
        icon: <Award className="w-5 h-5" />,
      });
    }

    return highlights;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <h2 className="flex items-center mb-6 text-xl font-bold md:text-2xl text-dark-brown">
        <Award className="mr-2" /> Your Highlights
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {getHighlights().map((highlight, index) => (
          <HighlightCard
            key={index}
            title={highlight.title}
            description={highlight.description}
            icon={highlight.icon}
          />
        ))}
      </div>
    </motion.div>
  );
}
