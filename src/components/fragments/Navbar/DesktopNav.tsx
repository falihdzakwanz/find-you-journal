import { AnimatePresence } from "framer-motion";
import NavLinks from "./NavLinks";
import NavAuthButton from "./NavAuthButton";
import ProfileDropdown from "./ProfileDropdown";
import { Session } from "next-auth";

interface DesktopNavProps {
  isLoggedIn: boolean;
  isProfileOpen: boolean;
  toggleProfile: () => void;
  session: Session | null;
}

export default function DesktopNav({
  isLoggedIn,
  isProfileOpen,
  toggleProfile,
  session,
}: DesktopNavProps) {
  return (
    <div className="hidden mt-4 lg:flex lg:space-x-10 lg:mt-0">
      <NavLinks />
      <div className="relative">
        <NavAuthButton
          isLoggedIn={isLoggedIn}
          session={session}
          toggleProfile={toggleProfile}
        />
        <AnimatePresence>
          {isProfileOpen && isLoggedIn && (
            <ProfileDropdown toggleProfile={toggleProfile} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
