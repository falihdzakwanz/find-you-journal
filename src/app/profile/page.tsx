"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import useJournalStats from "@/hooks/useJournalStats";
import ProfileSkeleton from "@/components/skeletonLoading/ProfileSkeleton";
import ProfileHeader from "@/components/profile/ProfileHeader";
import StatsGrid from "@/components/profile/StatsGrid";
import JournalStatistics from "@/components/profile/JournalStatistics";
import HighlightsSection from "@/components/profile/HighlightsSection";
import ErrorMessage from "@/components/profile/ErrorMessage";

export default function ProfilePage() {
  const { stats, loading, error } = useJournalStats();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    const toastId = toast.loading("Deleting your account...");
    
    try {
      const res = await fetch("/api/account", {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Account deletion failed");

      toast.success("Account deleted successfully", { id: toastId });
      await signOut({ callbackUrl: "/" });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Deletion failed";
      toast.error(errorMessage, { id: toastId });
      setIsDeleting(false);
    }
  };

  if (loading) return <ProfileSkeleton />;

  return (
    <div className="container px-4 py-8 mx-auto">
      {error && <ErrorMessage message={error} />}

      <ProfileHeader 
        onDeleteConfirm={handleDeleteAccount} 
        isDeleting={isDeleting} 
      />

      {stats && (
        <>
          <StatsGrid stats={stats} />
          <JournalStatistics stats={stats} />
          <HighlightsSection stats={stats} />
        </>
      )}
    </div>
  );
}