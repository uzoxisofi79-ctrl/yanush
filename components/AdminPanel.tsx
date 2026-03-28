
import React, { useState, useEffect } from 'react';
import { ShieldAlert, ArrowLeft, Database, Terminal, Cpu, Lock, Layers, AlertTriangle, Plus, X, Save, Trash2, Activity, Activity as ActivityIcon, Info, Sliders, Target } from 'lucide-react';
import { getSessionHistory } from '../services/logService';
import { SessionLog, ContextModule } from '../types';
import { DEFAULT_ACCENTUATIONS, DEFAULT_CONTEXT_MODULES } from '../constants';

interface Props {
  onBack: () => void;
  onRestoreSession: (log: SessionLog) => void;
}

const AdminPanel: React.FC<Props> = ({ onBack, onRestoreSession }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [activeTab, setActiveTab] = useState<'stats' | 'database' | 'logs'>('database');
  const [history, setHistory] = useState<SessionLog[]>([]);
  const [modules, setModules] = useState<ContextModule[]>(DEFAULT_CONTEXT_MODULES);
  
  useEffect(() => {
    if (isAuthenticated) setHistory(getSessionHistory());
  }, [isAuthenticated]);

  const verify2FA = () => { if (twoFactorCode === '4308') setIsAuthenticated(true); };

  const previewTokens = (text: string) => {
      return text
        .replace(/{name}/g, '[ОБЪЕКТ]')
        .replace(/{name_gen}/g, '[ОБЪЕКТА]')
        .replace(/\{([^{}|]+)\|([^{}|]+)\}/g, (_, m, f) => `[${m}/${f}]`);
  };

  if (!isAuthenticated) {
    return (
      <div className="h-full bg-slate-950 flex items-center justify-center p-6 relative">
         <div className="w-full max-w-sm glass p-10 rounded-[50px] text-center space-y-8 border-red-500/30 relative z-10">
            <ShieldAlert size={64} className="mx-auto text-red-500 animate-pulse" />
            <div className="space-y-1">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">Доступ ограничен</h2>
                <p className="text-red-500/60 text-[8px] font-black uppercase tracking-[0.4em]">Введите код администратора</p>
            </div>
            <input 
              type="password" 
              placeholder="****" 
              value={twoFactorCode} 
              onChange={e => setTwoFactorCode(e.target.value)} 
              onKeyDown={e => e.key === 'Enter' && verify2FA()}
              className="w-full bg-slate-900 border border-red-500/20 rounded-[28px] p-6 text-4xl text-center font-black text-red-500 outline-none focus:border-red-500/50" 
            />
            <button onClick={verify2FA} className="w-full py-6 bg-red-600 text-white rounded-[28px] font-black uppercase tracking-[0.4em] text-xs">Подтвердить</button>
         </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-slate-950 flex flex-col font-mono text-xs text-slate-300 relative overflow-hidden">
        <header className="shrink-0 h-24 p-6 md:p-8 border-b border-white/5 bg-slate-900/80 backdrop-blur-xl flex items-center justify-between z-30">
            <div className="flex items-center gap-6">
                <button onClick={onBack} className="p-3 text-slate-500 hover:text-white bg-white/5 rounded-2xl border border-white/5 transition-all"><ArrowLeft size={18} /></button>
                <div className="font-black text-white uppercase text-xl italic tracking-tighter flex items-center gap-3">
                    <Terminal size={24} className="text-blue-500" /> Панель администратора
                </div>
            </div>
            <div className="flex gap-1 bg-black/40 p-1.5 rounded-2xl border border-white/5">
                {['stats', 'database', 'logs'].map((t) => (
                    <button 
                        key={t} 
                        onClick={() => setActiveTab(t as any)} 
                        className={`uppercase font-black tracking-widest px-4 md:px-6 py-2 md:py-3 rounded-xl transition-all ${activeTab === t ? 'text-white bg-blue-600' : 'text-slate-500'}`}
                    >
                        {t === 'stats' ? 'Статистика' : (t === 'database' ? 'База данных' : 'Архив сессий')}
                    </button>
                ))}
            </div>
        </header>

        <div className="flex-1 min-h-0 overflow-y-auto custom-scroll px-6 md:px-10 py-12 z-10">
            <div className="max-w-7xl mx-auto space-y-16 pb-24">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { label: 'Модель', val: 'GEMINI_v3', color: 'text-blue-500' },
                        { label: 'Соединение', val: 'Защищено', color: 'text-emerald-500' },
                        { label: 'Модули', val: modules.length, color: 'text-amber-500' },
                        { label: 'Доступ', val: 'Администратор', color: 'text-rose-500' }
                    ].map((s, i) => (
                        <div key={i} className="glass p-6 md:p-8 rounded-[30px] md:rounded-[40px] border-white/5 bg-slate-900/40">
                            <div className={`text-xl md:text-2xl font-black italic uppercase ${s.color}`}>{s.val}</div>
                            <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-1">{s.label}</div>
                        </div>
                    ))}
                </div>

                {activeTab === 'database' && (
                    <div className="space-y-20 animate-in fade-in duration-500">
                        <section className="space-y-8">
                            <div className="flex items-center gap-4 text-blue-500 uppercase font-black tracking-[0.3em] border-l-4 border-blue-500 pl-4">
                                <Layers size={20} /> Матрица акцентуаций по Личко
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {DEFAULT_ACCENTUATIONS.map(acc => (
                                    <div key={acc.id} className="glass p-8 rounded-[40px] border-white/5 bg-slate-900/20">
                                        <div className="text-white font-black text-xs uppercase mb-3 italic">{acc.name}</div>
                                        <div className="text-[10px] text-slate-500 italic leading-relaxed">
                                            "{acc.description_template.replace('{intensity}/5', 'MAX')}"
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="space-y-8">
                            <div className="flex items-center gap-4 text-rose-500 uppercase font-black tracking-[0.3em] border-l-4 border-rose-500 pl-4">
                                <AlertTriangle size={20} /> Модули инцидентов
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {modules.filter(m => m.category === 'incident').map(mod => (
                                    <div key={mod.id} className="glass p-8 rounded-[40px] border-white/5 bg-slate-900/20">
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="text-white font-black text-xs uppercase italic">{mod.name}</div>
                                            <div className="text-[8px] font-black text-rose-500 bg-rose-500/10 px-3 py-1 rounded-full uppercase">INIT: {mod.initial_stress}%</div>
                                        </div>
                                        <div className="text-[10px] text-slate-400 italic leading-relaxed p-4 bg-black/20 rounded-2xl">
                                            "{previewTokens(mod.teacher_briefing)}"
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

                {activeTab === 'logs' && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-rose-500 uppercase font-black tracking-[0.3em] border-l-4 border-rose-500 pl-4 mb-8">
                            Архив сессий
                        </div>
                        {history.length === 0 ? (
                            <div className="glass py-24 rounded-[40px] text-center text-slate-600 font-black uppercase tracking-widest italic border-white/5 bg-slate-900/20">Архив пуст</div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {history.map((log) => (
                                    <div key={log.id} className="glass p-6 md:p-8 rounded-[30px] md:rounded-[40px] flex items-center justify-between border-white/5 bg-slate-900/20 group">
                                        <div className="flex items-center gap-4 md:gap-6">
                                            <div className="p-3 md:p-4 bg-blue-600/10 rounded-2xl text-blue-500">
                                                <ActivityIcon size={24} />
                                            </div>
                                            <div>
                                                <div className="text-white font-black uppercase text-xs md:text-sm italic">{log.student_name}</div>
                                                <div className="text-[9px] text-slate-500 uppercase tracking-widest mt-1">{new Date(log.timestamp).toLocaleString()}</div>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => onRestoreSession(log)} 
                                            className="px-6 md:px-8 py-3 md:py-4 bg-white text-slate-950 rounded-2xl font-black uppercase text-[10px] hover:bg-blue-600 hover:text-white transition-all shadow-xl"
                                        >
                                            Восстановить
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default AdminPanel;
