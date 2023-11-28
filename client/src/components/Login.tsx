import Footer from "./Footer";

export default function Login() {
    return (
        <div className="bg-green-100">
                <div className="min-h-screen flex items-center justify-center">
                    <div className="bg-white p-8 rounded-xl shadow-2xl">
                        <h1 className="text-xl font-semibold mb-4 text-center">🔏</h1>
                        <p className="text-gray-600 mb-6">Please sign in.</p>
                        
                        <div className="mb-4">
                            <input type="text" placeholder="Username" className="name-input w-full px-4 py-2 border rounded-xl text-gray-700 focus:border-green-100 shadow-sm" />    
                            <input type="password" placeholder="Password" className="password-input w-full mt-4 px-4 py-2 border rounded-xl text-gray-700 focus:border-green-100 shadow-sm" />
                        </div>

                        <button className="w-full bg-white text-black px-4 py-2 rounded-xl hover:bg-green-100 focus:outline-none shadow-sm">Sign In</button>
                    </div>
                </div>
                <Footer />
            </div>
    );
}