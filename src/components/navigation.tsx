import { cn } from "@/lib/utils";
import { FC } from "react";
import { Link } from "react-router-dom";

const Navigation: FC<React.HTMLAttributes<HTMLElement>> = ({
  className,
  ...props
}) => {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
        Dashboard
      </Link>
      <Link to="/orders" className="text-sm font-medium transition-colors text-muted-foreground hover:text-primary">
        Orders
      </Link>
      <Link to="/products" className="text-sm font-medium transition-colors text-muted-foreground hover:text-primary">
        Products
      </Link>
      <Link to="/expenses" className="text-sm font-medium transition-colors text-muted-foreground hover:text-primary">
        Expenses
      </Link>
    </nav>
  );
};

export default Navigation;
