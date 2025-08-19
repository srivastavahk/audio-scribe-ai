import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { Button } from "./ui/Button";
// import SearchBar from './SearchBar'; // SearchBar component would go here

const Header = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/signin");
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
          NotesApp
        </h1>
        <div className="flex items-center gap-4">
          {/* <SearchBar onSearch={onSearch} onClear={onClear} /> */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSignOut}
            aria-label="Sign Out"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
