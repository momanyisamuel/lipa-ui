
import { ModeToggle } from "./mode-toggle";
import Navigation from "./navigation";
import { Input } from "./ui/input";
import UserNav from "./user-nav";

const SiteHeader = () => {
  return (
    <>
      <div className="border-b bg-background">
        <div className="flex items-center h-16 px-4">
          <h2 className="text-lg font-semibold">LIPA</h2>
          <Navigation className="mx-6" />
          <div className="flex items-center ml-auto space-x-4">
            <div>
              <ModeToggle />
            </div>
            <div>
              <Input
                type="search"
                placeholder="Search..."
                className="md:w-[100px] lg:w-[300px]"
              />
            </div>
            <UserNav />
          </div>
        </div>
      </div>
    </>
  );
};

export default SiteHeader;
