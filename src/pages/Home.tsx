import Cart from "@/components/Cart";
import { FC } from "react";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  return (
    <div>
      <Cart />
    </div>
  );
};

export default Home;
