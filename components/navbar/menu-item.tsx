"use client";
import { useLoginModal } from "@/hooks/use-login-modal";
import { useRegsiterModal } from "@/hooks/use-register-modal";
import { Menu } from "lucide-react";
import { FC, useState } from "react";
import BottomMenu from "./bottom-menu";
import { signOut } from 'next-auth/react';
import { SafeUser } from "@/@types";
import Avatar from "./avatar";
import { useRentModal } from "@/hooks/use-rent-modal";
import { useRouter } from "next/navigation";

interface MenuItemProps {
  currentUser: SafeUser | null;
}


const MenuItem: FC<MenuItemProps> = ({ currentUser }) => {
  
  const router = useRouter()

  const [open, setOpen] = useState<boolean>(false);
  const registerModal = useRegsiterModal();
  const loginModal = useLoginModal()
  const rentModal = useRentModal()

  return (
    <div className="relative">
      <div className="flex items-center gap-x-3">
        <div className="font-semibold hidden md:block text-neutral-500">
          Airbnb your home
        </div>
        <div
          onClick={() => setOpen((open) => !open)}
          className="flex cursor-pointer items-center gap-x-2 border p-2 border-neutral-200 rounded-full"
        >
          <Menu className="w-4 h-4" />
          <Avatar />
        </div>
      </div>
      {open && (
        <div className="bg-white border border-neutral-100 absolute top-[55px] right-0">
          <div className="w-[200px] pl-3 pr-3 rounded-md shadow-sm hover:shadow-md transition-all cursor-pointer">
            <div className="flex flex-col space-y-2 pb-3">
              {currentUser ? (
                <>
                  <BottomMenu
                    onClick={() => router.push("/trips")}
                    label={"My trips"}
                  />
                  <BottomMenu
                    onClick={() => router.push("/favorites")}
                    label={"My favourite"}
                  />
                  <BottomMenu
                    onClick={() => router.push("/reservations")}
                    label={"My Reservations"}
                  />
                  <BottomMenu onClick={() => router.push('/properties')} label={"My Properties"} />
                  <BottomMenu
                    onClick={rentModal.onOpen}
                    label={"Airbnb My Home"}
                  />

                  <hr />
                  <BottomMenu onClick={signOut} label={"Logout"} />
                </>
              ) : (
                <>
                  <BottomMenu onClick={registerModal.onOpen} label="Register" />
                  <BottomMenu onClick={loginModal.onOpen} label="Login" />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuItem;
