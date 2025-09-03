import { Link } from "react-router";

export const NavBar = () => {
    return (
        <div className="fixed flex w-full border-b bg-[#050718]/70 backdrop-blur-sm text-white border-b-gray-600 justify-between font-semibold tracking-wide  p-4">
            <Link to={"/"}>CRUD</Link>
            <div className="flex gap-4">
                <Link to={"/zoo"}>Zoologicos</Link>
                <Link to={"/esp"}>Especies</Link>
                <Link to={"/ani"}>Animales</Link>
            </div>
            <p>RIXON</p>
        </div>
    );
};
