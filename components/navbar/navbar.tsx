"use client"

import { FC, useEffect, useState } from "react";
import Container from "../container";
import Logo from "./logo";
import MenuItem from "./menu-item";
import Search from './search'
import { SafeUser } from "@/@types";
import Categories from "../category/categories";

interface NavbarProps {
  currentUser: SafeUser | null
}

const Navbar: FC<NavbarProps> = ({ currentUser }) => {

  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])
  
  if (!hasMounted) {
    return null
  }

    return (
      <div className="w-full fixed bg-white z-50">
        <div className="py-2">
          <Container>
            <div className="flex items-center justify-between">
              <Logo />
              <Search />
              <MenuItem currentUser={currentUser} />
            </div>
          </Container>
        </div>
        <Categories />
      </div>
    );
}
 
export default Navbar;