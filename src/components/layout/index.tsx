import { Footer } from "../footer";
import { Header } from "../header";

interface IProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: IProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
