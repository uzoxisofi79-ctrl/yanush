import React from 'react';
import { ArrowLeft, Activity, Users, Brain, Shield, Target, BarChart3 } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const AboutPage: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="h-full bg-slate-950 flex flex-col font-sans text-slate-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.05),transparent)] pointer-events-none"></div>

      <header className="shrink-0 p-8 border-b border-white/5 flex items-center gap-6 relative z-10 bg-slate-950/50 backdrop-blur-xl">
        <button onClick={onBack} className="p-3 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-2xl border border-white/5">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tighter italic">О тренажёре</h1>
          <p className="text-[8px] text-blue-500/70 font-black tracking-[0.4em] uppercase">Что такое ЯНУШ и зачем он нужен</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-8 md:p-12 relative z-10 custom-scroll">
        <div className="max-w-3xl mx-auto space-y-16 pb-24">

          <section className="space-y-6">
            <h2 className="text-xl font-black text-white uppercase tracking-tighter italic">Что это такое</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              ЯНУШ — интерактивный тренажёр, в котором вы ведёте текстовый диалог с ИИ-подростком. 
              Каждая сессия — это случайная комбинация психотипа, инцидента и скрытого контекста. 
              Вы не знаете заранее, с кем имеете дело: система подбирает одну из 11 акцентуаций по классификации А. Е. Личко, 
              накладывает на неё ситуацию (от вейпа на перемене до панической атаки) и скрытый фон (развод родителей, буллинг, 
              влюблённость в учителя). Ваша задача — найти подход.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-black text-white uppercase tracking-tighter italic">Как это работает</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Brain, title: 'Адаптивный ИИ-подросток', text: 'Модель выстраивает поведение на основе психотипа, ситуации и ваших реплик. Подросток реагирует эмоционально, использует сленг, может замкнуться, заплакать или уйти.' },
                { icon: BarChart3, title: 'Доверие и стресс в реальном времени', text: 'Два индикатора (0–100) показывают, насколько подросток вам доверяет и насколько он напряжён. Критические значения ведут к провалу: побег, агрессия, отказ от разговора.' },
                { icon: Users, title: 'Экспертная комиссия', text: '8 специалистов — от клинического психолога до юриста — оценивают ваш диалог по завершении сессии. Каждый даёт оценку от 0 до 100 и развёрнутый комментарий.' },
                { icon: Shield, title: 'Совещательная комиссия', text: '6 шаржированных персонажей моделируют общественное давление: олигарх-попечитель, военрук, тревожная мать, чиновник. Их мнения не влияют на итоговую оценку, но заставляют задуматься.' },
                { icon: Target, title: 'Глобальные события', text: 'Случайные внешние вмешательства во время сессии: в класс заходит завуч, звонит родитель, одноклассник подслушивает. Вы учитесь действовать в условиях хаоса.' },
                { icon: Activity, title: 'Галерея акцентуаций', text: 'Досье на каждый из 11 психотипов: описание, ключевые черты, зоны риска, рекомендации педагогу. Доступна без регистрации.' },
              ].map((item, i) => (
                <div key={i} className="glass p-8 rounded-[40px] border-white/5 space-y-3">
                  <div className="flex items-center gap-3">
                    <item.icon size={20} className="text-blue-500" />
                    <h3 className="text-sm font-black text-white uppercase">{item.title}</h3>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-black text-white uppercase tracking-tighter italic">Для кого</h2>
            <div className="space-y-3">
              {[
                'Учителя-предметники и классные руководители',
                'Школьные психологи и социальные педагоги',
                'Студенты педагогических вузов и колледжей',
                'Родители подростков, которые хотят лучше понимать своих детей',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0"></div>
                  <span className="text-sm text-slate-400">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-black text-white uppercase tracking-tighter italic">Зачем тренировать диалоги</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              В педагогическом вузе учат теории, но не дают попрактиковаться в сложных разговорах. 
              Первый опыт — сразу с настоящим ребёнком. ЯНУШ позволяет отработать трудные ситуации 
              в безопасной среде, где ошибка не навредит никому. Вы учитесь считывать психотип, 
              управлять уровнем стресса, не провоцировать конфликт и находить выход — раз за разом, 
              с разными подростками и контекстами.
            </p>
          </section>

          <section className="glass p-8 rounded-[40px] border-blue-500/20 space-y-4">
            <h2 className="text-lg font-black text-white uppercase tracking-tighter italic">Тарифы</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-2">
                <div className="text-white font-black text-sm">Базовый</div>
                <div className="text-blue-500 font-black text-2xl">Бесплатно</div>
                <p className="text-[10px] text-slate-500">2 психотипа, базовые сценарии, общая обратная связь</p>
              </div>
              <div className="p-6 bg-blue-600/10 rounded-3xl border border-blue-500/20 space-y-2">
                <div className="text-white font-black text-sm">Премиум</div>
                <div className="text-white font-black text-2xl">990 ₽/мес</div>
                <p className="text-[10px] text-slate-500">Все 11 акцентуаций, все сценарии, полная оценка комиссии</p>
              </div>
              <div className="p-6 bg-emerald-600/10 rounded-3xl border border-emerald-500/20 space-y-2 relative">
                <div className="absolute -top-2 right-4 px-2 py-0.5 bg-emerald-500 text-white text-[7px] font-black uppercase rounded-full">−25%</div>
                <div className="text-white font-black text-sm">Годовой</div>
                <div className="text-white font-black text-2xl">9 000 ₽/год</div>
                <p className="text-[10px] text-slate-500">750 ₽/мес при оплате за год. То же, что Премиум.</p>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default AboutPage;
