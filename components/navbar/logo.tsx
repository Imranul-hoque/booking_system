"use client"

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {

    const router = useRouter();

    return ( 
        <Image
            onClick={() => router.push('/')}
            width={"100"}
            height={"100"}
            src={"/logo.png"}
            alt='logo'
            className="hidden md:block object-contain cursor-pointer"
        />
     );
}
 
export default Logo;