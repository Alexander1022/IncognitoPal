import { useState } from "react";

export default function NavMenu() {
    const [name, setName] = useState('');

    return (
        <nav className="flex flex-wrap text-black bg-green-200 border-gray-200 items-center justify-between mx-auto p-4">
        </nav>
    );
};
