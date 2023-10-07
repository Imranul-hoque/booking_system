import { FC } from "react";

interface HeaderProps {
    title: string;
    description: string;
    center?: boolean
}

const Header:FC<HeaderProps> = ({ title, description, center }) => {
    return <div className={`flex flex-col space-y-2 ${center && "text-center"}`}>
        <h2 className="font-semibold text-2xl">
            {title}
        </h2>
        <p className="text-neutral-400 font-semibold">
            {description}
        </p>
  </div>;
};

export default Header;
