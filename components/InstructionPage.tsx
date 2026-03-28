import React from 'react';
import { ArrowLeft, Play, MessageSquare, BarChart3, Users, BookOpen, Settings } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const InstructionPage: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="h-full bg-slate-950 flex flex-col font-sans text-slate-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.05),transparent)] pointer-events-none"></div>

      <header className="shrink-0 p-8 border-b border-white/5 flex items-center gap-6 relative z-10 bg-slate-950/50 backdrop-blur-xl">
        <button onClick={onBack} className="p-3 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-2xl border border-white/5">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tighter italic">Инструкция</h1>
          <p className="text-[8px] text-blue-500/70 font-black tracking-[0.4em] uppercase">Как пользоваться тренажёром</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-8 md:p-12 relative z-10 custom-scroll">
        <div className="max-w-3xl mx-auto space-y-12 pb-24">

          <section className="space-y-4">
            <p className="text-sm text-slate-400 leading-relaxed">
              ЯНУШ — это текстовый диалог с ИИ-подростком. Ниже — пошаговое описание того, как проходит тренировка.
            </p>
          </section>

          {[
            {
              step: 1,
              icon: Settings,
              title: 'Настройте сессию',
              text: 'Укажите, как к вам обращаться (имя и отчество), выберите пол педагога, пол и возраст ученика. Психотип, инцидент и скрытый контекст подбираются автоматически — вы не знаете заранее, с кем будете говорить.',
            },
            {
              step: 2,
              icon: BookOpen,
              title: 'Прочитайте вводную',
              text: 'Перед началом диалога вы получите краткую вводную — что произошло и при каких обстоятельствах. Это та информация, которой располагает учитель в реальности. Скрытый контекст (семейные проблемы, травмы, мотивы) вам неизвестен.',
            },
            {
              step: 3,
              icon: MessageSquare,
              title: 'Ведите диалог',
              text: 'Пишите реплики от лица педагога. Подросток отвечает в реальном времени — эмоционально, с использованием сленга, иногда уклончиво или агрессивно. Вы можете использовать голосовой ввод (кнопка микрофона).',
            },
            {
              step: 4,
              icon: BarChart3,
              title: 'Следите за индикаторами',
              text: 'Доверие (0–100) и стресс (0–100) меняются в зависимости от ваших слов. Если доверие падает слишком низко или стресс зашкаливает, подросток может сбежать, замолчать или проявить агрессию — сессия завершится провалом.',
            },
            {
              step: 5,
              icon: Play,
              title: 'Завершите сессию',
              text: 'Нажмите «Стоп», когда считаете, что диалог завершён, или дождитесь, пока подросток сам прекратит разговор. После этого комиссия из 8 экспертов проанализирует ваш диалог.',
            },
            {
              step: 6,
              icon: Users,
              title: 'Изучите оценку комиссии',
              text: 'Каждый эксперт (клинический психолог, психиатр, криминолог, юрист и другие) выставляет оценку от 0 до 100 и даёт развёрнутый комментарий. Совещательная комиссия из 6 шаржированных персонажей добавляет свои «мнения» — они моделируют общественное давление и не влияют на итоговый балл.',
            },
          ].map((item) => (
            <div key={item.step} className="glass p-8 rounded-[40px] border-white/5 flex gap-6 items-start">
              <div className="shrink-0 w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center">
                <item.icon size={24} className="text-blue-500" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-[9px] text-blue-500 font-black uppercase tracking-widest">Шаг {item.step}</span>
                  <h3 className="text-sm font-black text-white">{item.title}</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}

          <section className="space-y-4">
            <h2 className="text-lg font-black text-white uppercase tracking-tighter italic">Советы</h2>
            <div className="space-y-3">
              {[
                'Не давите. Авторитарный тон может сработать с конформным подростком, но разрушит контакт с сенситивным.',
                'Слушайте внимательно. Подросток может намекать на скрытый контекст — важно не упустить эти сигналы.',
                'Не торопитесь. Паузы в диалоге — нормальная часть разговора, особенно с замкнутыми типами.',
                'Экспериментируйте. Тренажёр для этого и существует: пробуйте разные подходы, ошибайтесь, анализируйте.',
                'Используйте подсказки (в режиме администратора). Функция суфлёра подскажет, как снизить стресс и повысить доверие.',
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0"></div>
                  <span className="text-xs text-slate-400 leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-black text-white uppercase tracking-tighter italic">Экстремальные исходы</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Если вы допустите серьёзную ошибку, сессия может завершиться досрочно:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-rose-600/10 rounded-3xl border border-rose-500/20 space-y-2">
                <div className="text-rose-400 font-black text-xs uppercase">Побег</div>
                <p className="text-[10px] text-slate-500">Подросток выбегает из кабинета. Стресс достиг предела, доверие на нуле.</p>
              </div>
              <div className="p-6 bg-rose-600/10 rounded-3xl border border-rose-500/20 space-y-2">
                <div className="text-rose-400 font-black text-xs uppercase">Агрессия</div>
                <p className="text-[10px] text-slate-500">Подросток переходит к физической или вербальной агрессии. Ситуация вышла из-под контроля.</p>
              </div>
              <div className="p-6 bg-rose-600/10 rounded-3xl border border-rose-500/20 space-y-2">
                <div className="text-rose-400 font-black text-xs uppercase">Отказ</div>
                <p className="text-[10px] text-slate-500">Подросток замолкает и отказывается продолжать разговор. Контакт потерян.</p>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default InstructionPage;
