import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, ArrowRight, Github, Chrome, Twitter, Globe, LogOut } from 'lucide-react';
import { authApi } from '@/api/auth.api';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
// --- TEXT DICTIONARY (Từ điển ngôn ngữ) ---
const translations = {
  vi: {
    createAccount: "Tạo tài khoản",
    socialText: "Đăng ký bằng mạng xã hội hoặc email",
    orRegister: "hoặc đăng ký bằng email",
    namePlaceholder: "Họ và tên",
    emailPlaceholder: "Email",
    passPlaceholder: "Mật khẩu",
    btnRegister: "Đăng Ký",
    mobileHaveAccount: "Đã có tài khoản?",
    mobileLoginLink: "Đăng nhập",
    
    loginTitle: "Đăng nhập",
    loginSubtitle: "Chào mừng bạn quay trở lại!",
    orLogin: "hoặc đăng nhập bằng tài khoản",
    forgotPass: "Quên mật khẩu?",
    btnLogin: "Đăng Nhập",
    mobileNoAccount: "Chưa có tài khoản?",
    mobileRegisterLink: "Đăng ký",

    overlayHello: "Chào bạn mới!",
    overlayRegisterText: "Nhập thông tin cá nhân của bạn và bắt đầu hành trình tuyệt vời cùng chúng tôi.",
    overlayBtnLogin: "Đăng Nhập",
    
    overlayWelcome: "Chào mừng trở lại!",
    overlayLoginText: "Để giữ kết nối với chúng tôi, vui lòng đăng nhập bằng thông tin cá nhân của bạn.",
    overlayBtnRegister: "Đăng Ký Ngay",
    
    // Home translations
    welcomeHome: "Chào mừng đến trang chủ!",
    loggedInAs: "Bạn đang đăng nhập với token:",
    btnLogout: "Đăng xuất"
  },
  en: {
    createAccount: "Create Account",
    socialText: "Use social networks or email",
    orRegister: "or use your email for registration",
    namePlaceholder: "Name",
    emailPlaceholder: "Email",
    passPlaceholder: "Password",
    btnRegister: "Sign Up",
    mobileHaveAccount: "Already have an account?",
    mobileLoginLink: "Log In",

    loginTitle: "Sign In",
    loginSubtitle: "Welcome back!",
    orLogin: "or use your account",
    forgotPass: "Forgot your password?",
    btnLogin: "Sign In",
    mobileNoAccount: "Don't have an account?",
    mobileRegisterLink: "Sign Up",

    overlayHello: "Hello, Friend!",
    overlayRegisterText: "Enter your personal details and start journey with us.",
    overlayBtnLogin: "Sign In",

    overlayWelcome: "Welcome Back!",
    overlayLoginText: "To keep connected with us please login with your personal info.",
    overlayBtnRegister: "Sign Up Now",

    welcomeHome: "Welcome to Home Page!",
    loggedInAs: "You are logged in with token:",
    btnLogout: "Log Out"
  }
};

type LangType = 'vi' | 'en';

const SocialButton = ({ icon: Icon }: { icon: any }) => (
  <button className="h-10 w-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-300 text-gray-600 hover:text-indigo-600 hover:border-indigo-300">
    <Icon size={18} />
  </button>
);

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: any;
}

const InputField = ({ icon: Icon, ...props }: InputFieldProps) => (
  <div className="bg-gray-100/50 w-full mb-3 flex items-center px-4 py-3 rounded-xl border border-transparent focus-within:bg-white focus-within:border-indigo-300 focus-within:shadow-md transition-all duration-300 ease-in-out">
    <Icon className="text-gray-400 mr-3" size={18} />
    <input
      className="bg-transparent border-none outline-none text-sm font-medium text-gray-700 w-full placeholder-gray-400"
      {...props}
    />
  </div>
);

// --- MAIN APP ---
export default function App() {
  const [isSignUp, setIsSignUp] = useState(false); // false = Show Login, true = Show Register
  const [lang, setLang] = useState<LangType>('vi');
  
  // Auth States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form Data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const t = translations[lang];

  // Kiểm tra token khi load trang
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleMode = () => setIsSignUp(!isSignUp);
  const toggleLang = () => setLang(l => l === 'vi' ? 'en' : 'vi');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- API HANDLERS ---

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authApi.login({ 
        email: formData.email, 
        password: formData.password 
      });

      const data = response.data;
      const { access_token } = response.data;

      if (access_token) {
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("login", "true");
        setIsLoggedIn(true);

        alert("Login successful!");

      } else {
        alert("Login failed! No token received.");
      }
    } catch (error: any) {
      console.error("Login Error:", error);
      const message = error.response?.data?.message || "An error occurred during login.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authApi.register({ 
        full_name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      
      alert("Registration successful! Please log in.");
      toggleMode(); 

    } catch (error: any) {
      console.error("Register Error:", error);
      const message = error.response?.data?.message || "An error occurred during registration.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setFormData({ name: '', email: '', password: '' });
  };
  const nav =useNavigate();
  if (localStorage.getItem("login")=="true") {
    nav("/")
  }

  return (
    <Layout>
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] font-sans p-4 relative overflow-hidden transition-colors duration-500">
      
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/20 rounded-full blur-[100px]" />

      <button 
        onClick={toggleLang}
        className="absolute top-5 right-5 z-50 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all text-gray-600 hover:text-indigo-600"
      >
        <Globe size={16} />
        <span className="text-sm font-bold">{lang === 'vi' ? 'VI' : 'EN'}</span>
      </button>

      <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-[900px] min-h-[550px] overflow-hidden">
        
        <div className={`absolute top-0 left-0 h-full w-full md:w-1/2 flex flex-col items-center justify-center px-10 text-center transition-all duration-700 ease-in-out bg-white
          ${isSignUp ? 'md:opacity-0 md:z-0 hidden md:flex' : 'opacity-100 z-10 flex'} 
          ${isSignUp && window.innerWidth < 768 ? 'hidden' : ''}
        `}>
          <form className="w-full flex flex-col items-center" onSubmit={handleLogin}>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.loginTitle}</h1>
            <p className="text-gray-400 text-sm mb-6">{t.loginSubtitle}</p>

            <div className="flex gap-4 mb-6">
              <SocialButton icon={Chrome} />
              <SocialButton icon={Github} />
              <SocialButton icon={Twitter} />
            </div>

            <span className="text-xs text-gray-400 mb-4">{t.orLogin}</span>

            <InputField 
              name="email" 
              type="email" 
              placeholder={t.emailPlaceholder} 
              icon={Mail} 
              value={formData.email} 
              onChange={handleChange} 
              required
            />
            <InputField 
              name="password" 
              type="password" 
              placeholder={t.passPlaceholder} 
              icon={Lock} 
              value={formData.password} 
              onChange={handleChange} 
              required
            />

            <a href="#" className="text-xs text-gray-500 hover:text-indigo-600 font-medium my-4 border-b border-transparent hover:border-indigo-600 transition-all">
              {t.forgotPass}
            </a>

            <button 
              type="submit" 
              disabled={loading}
              className="bg-indigo-600 text-white font-bold py-3 px-10 rounded-xl hover:bg-indigo-700 active:scale-95 transition-all duration-300 shadow-lg shadow-indigo-200 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : <>{t.btnLogin} <ArrowRight size={18} /></>}
            </button>

             <p className="md:hidden mt-6 text-sm text-gray-600">
              {t.mobileNoAccount} <span onClick={toggleMode} className="text-indigo-600 font-bold cursor-pointer">{t.mobileRegisterLink}</span>
            </p>
          </form>
        </div>

        <div className={`absolute top-0 left-0 md:left-1/2 h-full w-full md:w-1/2 flex flex-col items-center justify-center px-10 text-center transition-all duration-700 ease-in-out bg-white
          ${!isSignUp ? 'md:opacity-0 md:z-0 hidden md:flex' : 'opacity-100 z-10 flex'}
          ${!isSignUp && window.innerWidth < 768 ? 'hidden' : ''}
        `}>
          <form className="w-full flex flex-col items-center" onSubmit={handleRegister}>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.createAccount}</h1>
            <p className="text-gray-400 text-sm mb-6">{t.socialText}</p>
            
            <div className="flex gap-4 mb-6">
              <SocialButton icon={Chrome} />
              <SocialButton icon={Github} />
              <SocialButton icon={Twitter} />
            </div>

            <span className="text-xs text-gray-400 mb-4">{t.orRegister}</span>
            
            <InputField 
              name="name" 
              type="text" 
              placeholder={t.namePlaceholder} 
              icon={User} 
              value={formData.name} 
              onChange={handleChange} 
              required={isSignUp}
            />
            <InputField 
              name="email" 
              type="email" 
              placeholder={t.emailPlaceholder} 
              icon={Mail} 
              value={formData.email} 
              onChange={handleChange} 
              required
            />
            <InputField 
              name="password" 
              type="password" 
              placeholder={t.passPlaceholder} 
              icon={Lock} 
              value={formData.password} 
              onChange={handleChange} 
              required
            />

            <button 
              type="submit" 
              disabled={loading}
              className="mt-4 bg-indigo-600 text-white font-bold py-3 px-10 rounded-xl hover:bg-indigo-700 active:scale-95 transition-all duration-300 shadow-lg shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : t.btnRegister}
            </button>
            
            <p className="md:hidden mt-6 text-sm text-gray-600">
              {t.mobileHaveAccount} <span onClick={toggleMode} className="text-indigo-600 font-bold cursor-pointer">{t.mobileLoginLink}</span>
            </p>
          </form>
        </div>

        <div 
          className={`absolute top-0 left-[50%] w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-50 hidden md:block rounded-l-[50px]
            ${isSignUp ? 'translate-x-[-100%] rounded-l-none rounded-r-[50px]' : ''}
          `}
        >
          <div 
            className={`bg-gradient-to-br from-indigo-500 to-purple-600 text-white relative h-full w-[200%] transition-transform duration-700 ease-in-out
              ${isSignUp ? 'translate-x-0' : '-translate-x-1/2'}
            `}
          >
            <div className="absolute top-0 left-0 flex flex-col items-center justify-center h-full w-1/2 px-10 text-center">
              <h1 className="text-3xl font-bold mb-4">{t.overlayWelcome}</h1>
              <p className="text-indigo-100 text-sm mb-8 leading-relaxed">{t.overlayLoginText}</p>
              <button 
                className="bg-transparent border-2 border-white text-white font-bold py-3 px-10 rounded-xl hover:bg-white hover:text-indigo-600 transition-all duration-300 active:scale-95 shadow-md"
                onClick={toggleMode}
              >
                {t.overlayBtnLogin}
              </button>
            </div>

            <div className="absolute top-0 right-0 flex flex-col items-center justify-center h-full w-1/2 px-10 text-center">
              <h1 className="text-3xl font-bold mb-4">{t.overlayHello}</h1>
              <p className="text-indigo-100 text-sm mb-8 leading-relaxed">{t.overlayRegisterText}</p>
              <button 
                className="bg-transparent border-2 border-white text-white font-bold py-3 px-10 rounded-xl hover:bg-white hover:text-indigo-600 transition-all duration-300 active:scale-95 shadow-md"
                onClick={toggleMode}
              >
                {t.overlayBtnRegister}
              </button>
            </div>
          </div>
        </div>

      </div>

      <div className="absolute bottom-4 text-gray-400 text-xs text-center w-full">
        &copy; 2024 Your Company. Designed with React & Tailwind.
      </div>
    </div></Layout>
  );
}