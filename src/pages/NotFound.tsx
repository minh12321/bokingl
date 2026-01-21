import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import { Home, ArrowLeft } from "lucide-react";

// const NotFound = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background">
//       <div className="text-center px-4">
//         <div className="text-8xl font-bold text-primary mb-4">404</div>
//         <h1 className="text-2xl font-bold text-foreground mb-2">Page Not Found</h1>
//         <p className="text-muted-foreground mb-8 max-w-md mx-auto">
//           The page you are looking for does not exist or has been moved.
//         </p>
//         <div className="flex gap-4 justify-center">
//           <Button variant="outline" onClick={() => navigate(-1)} className="gap-2">
//             <ArrowLeft className="w-4 h-4" />
//             Go Back
//           </Button>
//           <Button onClick={() => navigate('/')} className="gap-2 gradient-primary text-primary-foreground">
//             <Home className="w-4 h-4" />
//             Home
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotFound;


import React, { useState, useEffect } from 'react';
import { Home, ArrowLeft, Cloud, Bird, Map } from 'lucide-react';

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-sky-50 via-sky-100 to-sky-200 flex items-center justify-center font-sans selection:bg-sky-200">
      
      {/* Styles cho Animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes drift {
          0% { transform: translateX(-100px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(100vw); opacity: 0; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-drift-slow { animation: drift 40s linear infinite; }
        .animate-drift-medium { animation: drift 30s linear infinite; }
        .animate-drift-fast { animation: drift 20s linear infinite; }
        
        .glass-panel {
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.8);
        }
      `}</style>

      {/* Background Elements - Những đám mây trôi */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Mây lớn mờ phía sau */}
        <div className="absolute top-20 left-0 text-white/40 animate-drift-slow" style={{ animationDelay: '0s' }}>
          <Cloud size={180} fill="currentColor" />
        </div>
        <div className="absolute top-40 left-0 text-white/30 animate-drift-slow" style={{ animationDelay: '-15s' }}>
          <Cloud size={120} fill="currentColor" />
        </div>
        
        {/* Mây nhỏ sắc nét hơn */}
        <div className="absolute bottom-32 left-0 text-sky-100/80 animate-drift-medium" style={{ animationDelay: '-5s' }}>
          <Cloud size={80} fill="currentColor" />
        </div>
        <div className="absolute top-1/3 left-0 text-sky-50/60 animate-drift-fast" style={{ animationDelay: '-10s' }}>
          <Cloud size={60} fill="currentColor" />
        </div>
        
        {/* Chim bay */}
        <div className="absolute top-24 right-[20%] text-sky-300 animate-float" style={{ transition: 'transform 0.2s ease-out', transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px)` }}>
           <Bird size={32} strokeWidth={1.5} />
        </div>
        <div className="absolute top-32 right-[15%] text-sky-300 animate-float-delayed" style={{ transition: 'transform 0.2s ease-out', transform: `translate(${mousePosition.x * -0.8}px, ${mousePosition.y * -0.8}px)` }}>
           <Bird size={24} strokeWidth={1.5} />
        </div>
      </div>

      {/* Main Content Container */}
      <div 
        className="relative z-10 glass-panel p-8 md:p-12 rounded-3xl shadow-[0_8px_32px_rgba(56,189,248,0.15)] max-w-lg w-full mx-4 text-center transform transition-transform duration-100 ease-out"
        style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
      >
        {/* Số 404 lớn */}
        <div className="relative">
          <h1 className="text-[10rem] leading-none font-bold text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-sky-600 select-none animate-float">
            404
          </h1>
          {/* Icon đám mây che số 0 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-lg animate-float-delayed">
             <Cloud size={100} fill="white" stroke="none" />
             <div className="absolute inset-0 flex items-center justify-center pt-2">
                <span className="text-sky-300 font-bold text-2xl">?</span>
             </div>
          </div>
        </div>

        {/* Thông báo lỗi */}
        <h2 className="text-2xl md:text-3xl font-bold text-sky-900 mt-2 mb-4">
          Oops! Bạn bị lạc đường rồi
        </h2>
        
        <p className="text-sky-700/80 mb-8 text-base md:text-lg">
          Trang bạn đang tìm kiếm dường như đã trôi theo những đám mây. Hãy quay lại để tìm lối ra nhé.
        </p>

        {/* Các nút điều hướng */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-sky-600 font-semibold shadow-sm hover:shadow-md hover:bg-sky-50 transition-all duration-300 border border-sky-100 w-full sm:w-auto justify-center"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Quay lại</span>
          </button>

          <button 
            onClick={() => navigate('/')}
            className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 text-white font-semibold shadow-lg shadow-sky-500/30 hover:bg-sky-600 hover:shadow-sky-600/40 hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <Home size={20} />
            <span>Về trang chủ</span>
          </button>
        </div>

        {/* Decorative elements at bottom of card */}
        <div className="mt-8 pt-6 border-t border-sky-100 flex justify-center gap-6 text-sky-300">
           <Map size={24} className="hover:text-sky-400 transition-colors cursor-help" />
           <div className="w-1.5 h-1.5 rounded-full bg-sky-200 self-center"></div>
           <Cloud size={24} className="hover:text-sky-400 transition-colors" />
           <div className="w-1.5 h-1.5 rounded-full bg-sky-200 self-center"></div>
           <Bird size={24} className="hover:text-sky-400 transition-colors" />
        </div>
      </div>
      
      {/* Footer text */}
      <div className="absolute bottom-6 text-sky-900/40 text-sm font-medium">
        Error Code: 404 • Page Not Found
      </div>
    </div>
  );
}