import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { BarChart3, Users, Clock } from 'lucide-react';

export default function NexusCRMLanding() {
    const navigate = useNavigate();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);

        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-[#1e293b] from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden relative">
            <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .motion-element { opacity: 0; animation-fill-mode: forwards; }
        .motion-element.animate { animation-duration: 0.8s; animation-timing-function: ease-out; }
        .animate-delay-100 { animation-delay: 0.1s; }
        .animate-delay-200 { animation-delay: 0.2s; }
        .animate-delay-300 { animation-delay: 0.3s; }
        .animate-delay-400 { animation-delay: 0.4s; }
        .animate-delay-500 { animation-delay: 0.5s; }
        .animate-delay-600 { animation-delay: 0.6s; }
        .animate-delay-800 { animation-delay: 0.8s; }
        .animate-delay-1000 { animation-delay: 1s; }
        .animate-delay-1200 { animation-delay: 1.2s; }
        .animate-delay-1400 { animation-delay: 1.4s; }
        .animate-delay-1600 { animation-delay: 1.6s; }
        .animate-delay-1800 { animation-delay: 1.8s; }
        .animate-delay-2000 { animation-delay: 2s; }
      `}</style>

            {/* Mouse Trail Blur */}
            <div
                className="hidden lg:block fixed w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-500 -z-10"
                style={{
                    left: mousePosition.x - 192,
                    top: mousePosition.y - 192,
                    backgroundColor: "rgba(8, 10, 12, 0.2)", // #080A0C with 20% opacity
                }}
            />

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            {/* Main Section */}
            <main className="flex flex-col justify-center items-center text-center px-8 lg:px-16 relative z-10 min-h-[calc(100vh-120px)] bg-[#1e293b] rounded-b-3xl shadow-inner shadow-slate-800">
                <div className="w-full max-w-6xl mb-24">
                    <div className={`motion-element ${isVisible ? 'animate' : ''} mb-12 animate-delay-500`} style={{ animationName: 'fadeInUp' }}>
                        <h2 className={`motion-element ${isVisible ? 'animate' : ''} text-5xl lg:text-7xl font-bold mb-8 leading-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-delay-600`}
                            style={{ animationName: 'fadeInScale' }}>
                            Transform Your Customer Relations
                        </h2>
                    </div>

                    <p className={`motion-element ${isVisible ? 'animate' : ''} text-xl lg:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-4xl mx-auto animate-delay-800`}
                        style={{ animationName: 'fadeInUp' }}>
                        Streamline your business relationships with our <span className="text-cyan-400 font-medium">intelligent CRM platform</span>. Boost productivity, increase sales, and deliver <span className="text-blue-400 font-medium">exceptional customer experiences</span>.
                    </p>

                    <div className={`motion-element ${isVisible ? 'animate' : ''} flex flex-col sm:flex-row gap-6 items-center justify-center animate-delay-1000`} style={{ animationName: 'fadeInUp' }}>
                        <button
                            onClick={() => navigate("/Signup")}
                            className={`motion-element ${isVisible ? 'animate' : ''} bg-[#4caf50] hover:bg-[#43a047] px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg animate-delay-1200`}
                            style={{ animationName: 'slideInLeft' }}
                        >
                            Join Now
                        </button>
                        <button
                            className={`motion-element ${isVisible ? 'animate' : ''} border border-slate-600 hover:border-blue-500 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:bg-blue-500/10 animate-delay-1400`}
                            style={{ animationName: 'slideInRight' }}
                        >
                            Watch Demo
                        </button>
                    </div>
                </div>
                {/* Feature Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24 w-full max-w-7xl">
                    {[
                        {
                            Icon: BarChart3,
                            title: "Advanced Analytics",
                            text: "Get deep insights into your customer relationships with powerful analytics tools.",
                            delay: "1600"
                        },
                        {
                            Icon: Users,
                            title: "Team Collaboration",
                            text: "Work seamlessly with your team to manage customer relationships effectively.",
                            delay: "1800"
                        },
                        {
                            Icon: Clock,
                            title: "Automation",
                            text: "Save time with intelligent automation features for routine tasks.",
                            delay: "2000"
                        }
                    ].map(({ Icon, title, text, delay }, idx) => (
                        <div
                            key={idx}
                            className={`motion-element ${isVisible ? 'animate' : ''} animate-delay-${delay} transform transition duration-300 hover:scale-[1.02]`}
                            style={{ animationName: 'fadeInUp' }}
                        >
                            <div className="bg-[#1e293b] border border-[#080a0c] rounded-2xl p-8 shadow-md hover:shadow-blue-500/10 transition duration-300 ease-in-out text-center">
                                <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Icon className="w-8 h-8 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
                                <p className="text-slate-400 text-base">{text}</p>
                            </div>
                        </div>


                    ))}
                    <br />

                </div>
            </main>

            {/* Background Elements */}
            {/* Unified Background Wrapper */}
            <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
                {/* Soft Colored Blurs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-full blur-3xl"></div>
                <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-gradient-to-r from-emerald-600/10 to-cyan-600/10 rounded-full blur-2xl"></div>

                {/* Grid Overlay */}
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)`,
                    backgroundSize: '80px 80px'
                }} />
            </div>



        </div>
    );
}
