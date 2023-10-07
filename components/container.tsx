import { FC } from "react";

interface ContainerProps {
    children : React.ReactNode
}

const Container: FC<ContainerProps> = ({ children }) => {
    
    return ( 
        <div className="
          max-w-[2520px]
          mx-auto
          lg:px-5
          xl:px-7
          px-2
          py-3
          shadow-sm
        ">
            {children}
        </div>
     );
}
 
export default Container;