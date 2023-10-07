"use client"

import LoginModal from "@/components/modal/login-modal";
import RegisterModal from "@/components/modal/register-modal";
import RentModal from "@/components/modal/rent-modal";
import SearchModal from "@/components/modal/search-modal";
import { useEffect, useState } from "react";

const ModalProvider = () => {

    const [mounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])
    
    if (!mounted) {
        return null
    }

    return ( 
        <div>
            <RegisterModal />
            <LoginModal />
            <RentModal />
            <SearchModal />
        </div>
     );
}
 
export default ModalProvider;