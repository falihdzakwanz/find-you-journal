"use client";

import { signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  BookOpen,
  PenSquare,
  BarChart2,
  Award,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import ProfileSkeleton from "@/components/Skeleton/ProfileSkeleton";
import StatCard from "@/components/profile/StatCard";
import StatItem from "@/components/profile/StatItem";
import HighlightCard from "@/components/profile/HighlightCard";

type JournalStats = {
  totalEntries: number;
  streak: number;
  avgEntriesPerWeek: number;
  mostActiveDay: string;
  longestEntry: number;
  categories: Record<string, number>;
};

export default function ProfilePage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<JournalStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/journal/stats");
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <ProfileSkeleton />;

  const handleDeleteAccount = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your account? This cannot be undone."
      )
    )
      return;

    setIsDeleting(true);
    try {
      const res = await fetch("/api/account", {
        method: "DELETE",
      });
      console.log(res);
      if (!res.ok) throw new Error("Account deletion failed");

      await signOut({ callbackUrl: "/" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Deletion failed");
      setIsDeleting(false);
    }
  };

  // Generate dynamic highlights based on stats
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

    // Fallback if no highlights
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
    <div className="container px-4 py-8 mx-auto">
      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 mb-6 text-red-600 bg-red-100 rounded-lg"
        >
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            {error}
          </div>
        </motion.div>
      )}
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center mb-12 text-center"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative w-32 h-32 mb-4 overflow-hidden rounded-full bg-primary/10"
        >
          {session && (
            <Image
              src={session?.user?.image || ""}
              alt="Profile"
              className="object-cover w-full h-full"
              width={20}
              height={20}
            />
          )}
        </motion.div>
        <h1 className="text-3xl font-bold text-dark-brown">
          {session?.user?.name}
        </h1>
        <p className="text-primary/80">{session?.user?.email}</p>

        {/* Delete Account Button */}
        <motion.button
          onClick={handleDeleteAccount}
          disabled={isDeleting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 mt-6 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 disabled:opacity-50"
        >
          {isDeleting ? "Deleting..." : "Delete Account"}
        </motion.button>
      </motion.div>

      {/* Quick Stats */}
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

      {/* Detailed Statistics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="p-6 mb-12 bg-white rounded-lg shadow-sm"
      >
        <h2 className="flex items-center mb-6 text-2xl font-bold text-dark-brown">
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

      {/* Recent Highlights */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="flex items-center mb-6 text-2xl font-bold text-dark-brown">
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
    </div>
  );
}
