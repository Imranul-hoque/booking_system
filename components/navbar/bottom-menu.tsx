import { FC } from "react";

interface BottomMenuProps {
    onClick: () => void;
    label : string
}

const BottomMenu:FC<BottomMenuProps> = ({ onClick, label }) => {
    return ( 
        <p onClick={onClick} className="font-bold text-[16px] text-neutral-400 transition-all hover:text-neutral-900 pr-4">
            {label}
        </p>
     );
}
 
export default BottomMenu;