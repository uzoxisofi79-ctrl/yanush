import React from 'react';
import { ArrowLeft, Brain, Users, Shield } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const MethodologyPage: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="h-full bg-slate-950 flex flex-col font-sans text-slate-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.05),transparent)] pointer-events-none"></div>

      <header className="shrink-0 p-8 border-b border-white/5 flex items-center gap-6 relative z-10 bg-slate-950/50 backdrop-blur-xl">
        <button onClick={onBack} className="p-3 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-2xl border border-white/5">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tighter italic">Методология</h1>
          <p className="text-[8px] text-blue-500/70 font-black tracking-[0.4em] uppercase">Научная основа тренажёра</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-8 md:p-12 relative z-10 custom-scroll">
        <div className="max-w-3xl mx-auto space-y-16 pb-24">

          <section className="space-y-6">
            <h2 className="text-xl font-black text-white uppercase tracking-tighter italic">Классификация акцентуаций</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              В основе тренажёра — типология акцентуаций характера подростков, разработанная советским психиатром 
              Андреем Евгеньевичем Личко (1926–1994). Личко выделил 11 типов акцентуаций — 
              это не патология, а крайние варианты нормы, при которых отдельные черты характера 
              чрезмерно усилены. У подростков акцентуации проявляются особенно ярко из-за возрастной 
              нестабильности.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Классификация Личко используется в отечественной подростковой психиатрии, школьной психологии и педагогике 
              как инструмент для понимания поведенческих особенностей и выбора оптимальной тактики общения.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-black text-white uppercase tracking-tighter italic">11 типов акцентуаций</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Гипертимный', desc: 'Избыток энергии, оптимизм, непоседливость. Не выносит монотонности и контроля.' },
                { name: 'Циклоидный', desc: 'Чередование фаз подъёма и спада. Настроение меняется циклично, без внешних причин.' },
                { name: 'Лабильный', desc: 'Крайняя подвижность настроения. Реакция на мелочи — несоразмерно бурная.' },
                { name: 'Астеноневротический', desc: 'Повышенная утомляемость, раздражительность, ипохондрия. Нервная система на пределе.' },
                { name: 'Сенситивный', desc: 'Впечатлительность, робость, чувство собственной неполноценности. Боится быть на виду.' },
                { name: 'Психастенический', desc: 'Тревожная мнительность, нерешительность, склонность к самоанализу. Педантизм как защита.' },
                { name: 'Шизоидный', desc: 'Замкнутость, эмоциональная холодность, жизнь во внутреннем мире. Социальные нормы непонятны.' },
                { name: 'Эпилептоидный', desc: 'Вязкость аффекта, злопамятность, тяга к порядку и власти. Копит напряжение, потом взрывается.' },
                { name: 'Истероидный', desc: 'Демонстративность, эгоцентризм, жажда внимания. Всегда играет на публику.' },
                { name: 'Неустойчивый', desc: 'Безволие, внушаемость, жажда развлечений. Плывёт за средой, не сопротивляясь.' },
                { name: 'Конформный', desc: 'Подчинение групповым нормам, отсутствие собственной позиции. Зеркало окружения.' },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-2">
                  <div className="text-white font-black text-xs uppercase">{item.name}</div>
                  <p className="text-[10px] text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-black text-white uppercase tracking-tighter italic">Модель диалога</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Поведение ИИ-подростка строится на нескольких уровнях:
            </p>
            <div className="space-y-4">
              <div className="glass p-6 rounded-3xl border-white/5 flex gap-4 items-start">
                <Brain size={20} className="text-blue-500 mt-1 shrink-0" />
                <div>
                  <h3 className="text-sm font-black text-white mb-1">Акцентуация</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Определяет базовый стиль реакции: как подросток воспринимает авторитет, давление, критику, похвалу. Каждый тип отвечает по-своему.</p>
                </div>
              </div>
              <div className="glass p-6 rounded-3xl border-white/5 flex gap-4 items-start">
                <Shield size={20} className="text-blue-500 mt-1 shrink-0" />
                <div>
                  <h3 className="text-sm font-black text-white mb-1">Инцидент</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Конкретная ситуация, которая привела к разговору: вейп, драка, шпаргалка, паническая атака. Задаёт контекст и начальный уровень стресса.</p>
                </div>
              </div>
              <div className="glass p-6 rounded-3xl border-white/5 flex gap-4 items-start">
                <Users size={20} className="text-blue-500 mt-1 shrink-0" />
                <div>
                  <h3 className="text-sm font-black text-white mb-1">Скрытый контекст</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Фоновая история, которую педагог не знает заранее: насилие в семье, развод, бедность, секта, влюблённость. Определяет глубинные мотивы поведения.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-black text-white uppercase tracking-tighter italic">Экспертная комиссия</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              После завершения сессии диалог анализируется комиссией из 8 специалистов. 
              Каждый оценивает диалог с позиции своей профессии:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                'Клинический психолог',
                'Психиатр',
                'Семейный психолог',
                'Криминолог',
                'Социальный педагог',
                'Медиатор',
                'Подростковый психолог',
                'Юрист',
              ].map((role, i) => (
                <div key={i} className="p-4 bg-white/5 rounded-2xl text-center">
                  <span className="text-[10px] text-slate-400 font-bold">{role}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-black text-white uppercase tracking-tighter italic">Совещательная комиссия</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Помимо экспертов, ваш диалог комментируют 6 шаржированных персонажей, которые моделируют типичное общественное давление на педагога. 
              Их оценки не влияют на итоговый балл, но позволяют увидеть ситуацию глазами людей, 
              которые судят учителя в реальной жизни — часто не разбираясь в сути дела.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { name: 'Олигарх-попечитель', desc: 'Спонсор школы. Мыслит категориями «эффективности» и «репутации учреждения».' },
                { name: 'Военрук', desc: 'Ветеран. Убеждён, что дисциплина решает всё, а «мягкотелость» губит молодёжь.' },
                { name: 'Инстаграм-психолог', desc: 'Сертификат из интернета. Раздаёт советы на языке «токсичных установок» и «внутреннего ребёнка».' },
                { name: 'Зумер-блогер', desc: 'Снимает обзоры на всё. Оценивает диалог по критерию «залетит в рекомендации или нет».' },
                { name: 'Тревожная мать', desc: 'Её ребёнок — всегда прав. Учитель — всегда виноват. Готова писать жалобу в министерство.' },
                { name: 'Чиновник из департамента', desc: 'Боится скандала. Главный критерий — «чтобы не дошло до прессы».' },
              ].map((item, i) => (
                <div key={i} className="p-5 bg-white/5 rounded-2xl border border-white/5 space-y-1">
                  <div className="text-white font-black text-[10px] uppercase">{item.name}</div>
                  <p className="text-[9px] text-slate-500 leading-relaxed italic">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black text-white uppercase tracking-tighter italic">Литература</h2>
            <div className="space-y-2 text-xs text-slate-500 leading-relaxed">
              <p>Личко А. Е. <em>Типы акцентуаций характера и психопатий у подростков.</em> М., 1999.</p>
              <p>Личко А. Е. <em>Подростковая психиатрия: руководство для врачей.</em> Л., 1985.</p>
              <p>Леонгард К. <em>Акцентуированные личности.</em> Киев, 1981.</p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default MethodologyPage;
