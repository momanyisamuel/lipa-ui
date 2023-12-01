import { FC, PropsWithChildren } from "react";
import SiteHeader from "./site-header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface MainLayoutProps {
}

const MainLayout: FC<MainLayoutProps> = ({ children } : PropsWithChildren) => {
  return (
    <>
      <SiteHeader />
      <ToastContainer
      position="top-center"
      theme="colored"
       />
      {children}
    </>
  );
};

export default MainLayout;
