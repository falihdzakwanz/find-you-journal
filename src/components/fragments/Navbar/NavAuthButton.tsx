import Image from "next/image";
import { User } from "lucide-react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";

interface NavAuthButtonProps {
  isLoggedIn: boolean;
  session: Session | null;
  toggleProfile?: () => void;
}

export default function NavAuthButton({
  isLoggedIn,
  session,
  toggleProfile,
}: NavAuthButtonProps) {
  if (isLoggedIn) {
    return (
      <button
        onClick={toggleProfile}
        className="flex items-center max-w-fit cursor-pointer"
      >
        {session?.user?.image ? (
          <Image
            src={session.user.image}
            alt="Profile"
            width={28}
            height={28}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <User size={20} />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="flex items-center gap-2 px-3 py-1 text-lg bg-white rounded-md hover:underline lg:text-xl max-w-fit text-primary"
    >
      <Image
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        width={20}
        height={20}
        className="w-5 h-5"
      />
      Login
    </button>
  );
}
