import { Link } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle";

const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white p-4 shadow-md dark:bg-blue-900">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">📈 Stock Dashboard</h1>
                <div className="flex space-x-4">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/about" className="hover:underline">About</Link>
                    <DarkModeToggle /> {/* 🌙 Dark Mode Toggle */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
