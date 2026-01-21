import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Camera, Save, ShieldCheck, Eye,  EyeOff, CheckCircle2,AlertCircle,Sparkles,Pencil,ArrowLeft,X             } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { userApi } from '@/api/User.api';

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const un = JSON.parse(localStorage.getItem("user"));

  const save = async()=>{
    try{
        const res = await userApi.updateProfile({
            full_name: userInfo.fullName,
            email: userInfo.email,
            phone: userInfo.phone,
            })
        }
        catch(error)
        {
            console.error(error);
            alert("thay đổi thất bại");
        }
    if(passwordForm.currentPassword){
    try{
        const res = await userApi.changePassword({
            old_password:passwordForm.currentPassword,
            new_password:passwordForm.newPassword,
            })
        }
        catch(error)
        {
            console.error(error);
            alert("thay đổi thất bại");
        }  
    }
  }

  const [userInfo, setUserInfo] = useState({
    fullName: un.full_name,
    email: un.email,
    phone: un.phone,
    avatar: ''
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });


  const [showPass, setShowPass] = useState({
    current: false,
    new: false,
    confirm: false
  });


  const [status, setStatus] = useState<{type: 'success' | 'error' | null, message: string}>({ type: null, message: '' });
  const [isLoading, setIsLoading] = useState(false);


  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };


  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };


  const toggleShowPass = (field: 'current' | 'new' | 'confirm') => {
    setShowPass(prev => ({ ...prev, [field]: !prev[field] }));
  };


  const handleCancel = () => {
    setIsEditing(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setStatus({ type: null, message: '' });
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: '' });


    if (passwordForm.newPassword && passwordForm.newPassword !== passwordForm.confirmPassword) {
      setIsLoading(false);
      setStatus({ type: 'error', message: 'Mật khẩu mới không khớp!' });
      return;
    }

    save();

    setTimeout(() => {
      setIsLoading(false);
      setStatus({ type: 'success', message: 'Cập nhật thông tin thành công!' });

      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setIsEditing(false); 
    }, 1500);
  };

  return (
    <Layout>
    <div className="min-h-screen relative font-sans flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      

      <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-sky-50 to-white z-0"></div>
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000"></div>


      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        
        .glass-panel {
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
        }

        .glass-input {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: inset 0 2px 4px 0 rgba(31, 38, 135, 0.02);
          transition: all 0.3s ease;
        }
        .glass-input:focus {
          background: rgba(255, 255, 255, 0.8);
          border-color: rgba(14, 165, 233, 0.5); /* sky-500 with opacity */
          box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.1);
        }
        /* Style cho trạng thái chỉ xem (Disabled) */
        .glass-input:disabled {
          background: transparent;
          border-color: transparent;
          box-shadow: none;
          cursor: default;
          color: #334155;
          padding-left: 0.5rem; /* Giảm padding một chút để trông gọn hơn */
        }
      `}</style>
      

      <div className="glass-panel max-w-5xl w-full rounded-3xl overflow-hidden flex flex-col md:flex-row relative z-10 transition-all duration-300">
        

        <div className="md:w-1/3 bg-gradient-to-br from-sky-500/90 to-blue-600/90 backdrop-blur-md p-8 text-white flex flex-col items-center justify-center md:justify-start text-center relative overflow-hidden">

          <div className="absolute top-10 right-10 text-white/20"><Sparkles size={48} /></div>
          <div className="absolute bottom-10 left-10 text-white/10"><Sparkles size={32} /></div>


          <div className="relative group mb-6 z-10">
            <div className="w-32 h-32 rounded-full border-4 border-white/40 shadow-xl overflow-hidden relative bg-sky-300/50 backdrop-blur-sm">
              <img 
                src={userInfo.avatar} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>

            {isEditing && (
                <button className="absolute bottom-1 right-1 bg-white/90 text-sky-600 p-2 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 animate-fade-in" title="Đổi ảnh đại diện">
                <Camera size={18} />
                </button>
            )}
          </div>

          <h2 className="text-2xl font-bold mb-1 tracking-tight">{userInfo.fullName}</h2>
          <p className="text-sky-100 text-sm mb-8 font-medium bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm inline-block">Thành viên thân thiết</p>
          
          <div className="w-full border-t border-white/20 pt-6 mt-2 text-left hidden md:block space-y-4">
            <h3 className="uppercase text-xs font-bold tracking-widest text-sky-200/80 mb-2 pl-1">Tổng quan</h3>
            
            <div className="group flex items-center gap-3 text-sm p-3 rounded-xl hover:bg-white/10 transition-colors cursor-default">
              <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors"><ShieldCheck size={18} /></div>
              <span className="font-medium">Tài khoản đã xác thực</span>
            </div>
            
            <div className="group flex items-center gap-3 text-sm p-3 rounded-xl hover:bg-white/10 transition-colors cursor-default">
              <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors"><User size={18} /></div>
              <span className="font-medium">Tham gia: 20/05/2023</span>
            </div>
          </div>
        </div>

        <div className="md:w-2/3 p-6 md:p-10 relative">
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">

                {!isEditing && (
                    <button 
                        onClick={() => window.history.back()} 
                        className="p-2 rounded-full hover:bg-sky-100 text-slate-500 hover:text-sky-600 transition-colors group"
                        title="Quay lại"
                    >
                        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                )}
                
                <div className="relative">
                    <h1 className="text-2xl font-bold text-slate-800 relative z-10">Cài đặt tài khoản</h1>
                    <div className="absolute bottom-0 left-0 w-1/2 h-2 bg-sky-200/50 -z-0 rounded-full"></div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {status.message && (
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium animate-fade-in shadow-sm backdrop-blur-md border hidden sm:flex
                    ${status.type === 'success' 
                    ? 'bg-green-50/80 border-green-200 text-green-700' 
                    : 'bg-red-50/80 border-red-200 text-red-700'}`}>
                    {status.type === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                    {status.message}
                </div>
                )}
                
                {!isEditing && (
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="p-2.5 rounded-full bg-white border border-sky-100 text-sky-600 shadow-sm hover:bg-sky-50 hover:shadow-md transition-all active:scale-95"
                        title="Chỉnh sửa thông tin"
                    >
                        <Pencil size={18} />
                    </button>
                )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="space-y-5">
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-sky-100/50">
                <div className={`p-1.5 rounded-lg transition-colors ${isEditing ? 'bg-sky-100 text-sky-600' : 'bg-slate-100 text-slate-500'}`}>
                    <User size={18} />
                </div>
                <h3 className="font-semibold text-slate-700">Thông tin cá nhân</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="col-span-2 md:col-span-2">
                  <label className="block text-sm font-medium text-slate-600 mb-1.5 ml-1">Họ và tên</label>
                  <input
                    type="text"
                    name="fullName"
                    disabled={!isEditing}
                    value={userInfo.fullName}
                    onChange={handleInfoChange}
                    className="glass-input w-full px-4 py-2.5 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none transition-all duration-300"
                    placeholder="Nhập họ tên của bạn"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5 ml-1">Email</label>
                  <div className="relative group">
                    <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${isEditing ? 'text-slate-400 group-hover:text-sky-500' : 'text-slate-300'}`} size={18} />
                    <input
                      type="email"
                      name="email"
                      disabled={!isEditing}
                      value={userInfo.email}
                      onChange={handleInfoChange}
                      className={`glass-input w-full py-2.5 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none transition-all duration-300
                        ${isEditing ? 'pl-10 pr-4' : 'pl-10 px-0'}`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5 ml-1">Số điện thoại</label>
                  <div className="relative group">
                    <Phone className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${isEditing ? 'text-slate-400 group-hover:text-sky-500' : 'text-slate-300'}`} size={18} />
                    <input
                      type="tel"
                      name="phone"
                      disabled={!isEditing}
                      value={userInfo.phone}
                      onChange={handleInfoChange}
                      className={`glass-input w-full py-2.5 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none transition-all duration-300
                        ${isEditing ? 'pl-10 pr-4' : 'pl-10 px-0'}`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={`space-y-5 pt-2 transition-all duration-500 ease-in-out overflow-hidden ${isEditing ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-sky-100/50">
                 <div className="p-1.5 bg-sky-100 rounded-lg text-sky-600">
                    <Lock size={18} />
                 </div>
                <h3 className="font-semibold text-slate-700">Đổi mật khẩu</h3>
              </div>

              <div className="grid grid-cols-1 gap-4 max-w-lg">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5 ml-1">Mật khẩu hiện tại</label>
                  <div className="relative group">
                    <input
                      type={showPass.current ? "text" : "password"}
                      name="currentPassword"
                      disabled={!isEditing}
                      value={passwordForm.currentPassword}
                      onChange={handlePassChange}
                      placeholder="••••••••"
                      className="glass-input w-full px-4 py-2.5 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => toggleShowPass('current')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-500 transition-colors p-1"
                    >
                      {showPass.current ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1.5 ml-1">Mật khẩu mới</label>
                    <div className="relative group">
                      <input
                        type={showPass.new ? "text" : "password"}
                        name="newPassword"
                        disabled={!isEditing}
                        value={passwordForm.newPassword}
                        onChange={handlePassChange}
                        placeholder="••••••••"
                        className="glass-input w-full px-4 py-2.5 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => toggleShowPass('new')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-500 transition-colors p-1"
                      >
                        {showPass.new ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1.5 ml-1">Nhập lại mật khẩu</label>
                    <div className="relative group">
                      <input
                        type={showPass.confirm ? "text" : "password"}
                        name="confirmPassword"
                        disabled={!isEditing}
                        value={passwordForm.confirmPassword}
                        onChange={handlePassChange}
                        placeholder="••••••••"
                        className={`glass-input w-full px-4 py-2.5 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none transition-all duration-300
                          ${passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword ? 'border-red-300/80 ring-2 ring-red-100/50' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => toggleShowPass('confirm')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-500 transition-colors p-1"
                      >
                        {showPass.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {isEditing && (
                <div className="pt-6 flex items-center justify-end gap-4 border-t border-sky-100/50 animate-fade-in-up">
                <button
                    type="button"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-slate-600 font-medium hover:bg-white/50 hover:text-slate-800 transition-all duration-300"
                    onClick={handleCancel}
                >
                    <X size={18} />
                    <span>Hủy bỏ</span>
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="group flex items-center gap-2 px-8 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-sky-600 text-white font-semibold shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {isLoading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Đang lưu...</span>
                    </>
                    ) : (
                    <>
                        <Save size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                        <span>Lưu thay đổi</span>
                    </>
                    )}
                </button>
                </div>
            )}

            {!isEditing && (
               <div className="text-center text-slate-400 text-sm mt-8 italic">
                  Nhấn vào nút bút chì ở trên để chỉnh sửa thông tin
               </div>
            )}

          </form>
        </div>
      </div>
    </div></Layout>
  );
}