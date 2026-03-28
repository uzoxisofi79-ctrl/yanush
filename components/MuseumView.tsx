
import React, { useState } from 'react';
import { ArrowLeft, Target, Zap, ShieldAlert, User, Info, Sparkles, Activity } from 'lucide-react';

interface Exhibit {
    id: string;
    title: string;
    accentuation: string;
    shortDescription: string;
    fullDescription: string;
    image: string;
    profile: {
        psychotype: string;
        coreTraits: string;
        riskZone: string;
        teacherTip: string;
        intensity: number;
    };
    quote: string;
    isPremium: boolean;
}

const EXHIBITS: Exhibit[] = [
    {
        id: 'acc_hyperthymic',
        title: 'Вечный двигатель',
        accentuation: 'Гипертимный',
        shortDescription: 'Энергия через край: болтливый, фамильярный, не признаёт авторитетов. Скука — главный враг.',
        fullDescription: 'Гипертимный подросток — сгусток энергии, которой некуда деться. Он шумный, общительный, легко завязывает контакты, но так же легко теряет интерес. Учитель для него — не авторитет, а ещё один человек, которого можно подколоть. Не выносит однообразия и давления. Замечания воспринимает как повод для шутки, а не как сигнал остановиться. При этом незлобив: конфликты возникают не от злости, а от переполняющего куража.',
        image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=800&q=80',
        quote: '«А чего сразу я? Я вообще молчал... почти.»',
        profile: {
            psychotype: 'Гипертимный',
            coreTraits: 'Активность, болтливость, фамильярность, нетерпеливость',
            riskZone: 'Демонстративное нарушение дисциплины, неумение остановиться',
            teacherTip: 'Не давить авторитетом — переключайте энергию в конструктивное русло',
            intensity: 4,
        },
        isPremium: false,
    },
    {
        id: 'acc_cycloid',
        title: 'Маятник',
        accentuation: 'Циклоидный',
        shortDescription: 'Вчера — душа компании, сегодня — не прикасайтесь. Смена фаз без видимых причин.',
        fullDescription: 'Циклоидный подросток живёт в ритме внутренних приливов и отливов. В фазе подъёма он общителен, бодр, легко справляется с нагрузкой. В субдепрессивной фазе — вялый, раздражительный, ему трудно отвечать и даже просто присутствовать. Давление в «плохой» фазе может спровоцировать слёзы или полный уход в себя. Учителю важно понимать: это не лень и не каприз, а внутренний цикл, который подросток пока не умеет контролировать.',
        image: 'https://images.unsplash.com/photo-1528815197793-2412803c7344?w=800&q=80',
        quote: '«Вчера всё было нормально... а сегодня я просто не могу.»',
        profile: {
            psychotype: 'Циклоидный',
            coreTraits: 'Перепады настроения, непредсказуемость, ранимость в «нижней» фазе',
            riskZone: 'Давление в субдепрессивной фазе — слёзы, уход в себя, отказ',
            teacherTip: 'Учитывайте текущую фазу. В субдепрессии — мягче, без требований',
            intensity: 3,
        },
        isPremium: false,
    },
    {
        id: 'acc_labile',
        title: 'Оголённый нерв',
        accentuation: 'Лабильный',
        shortDescription: 'Одно слово меняет всё. Настроение скачет от восторга до отчаяния за секунды.',
        fullDescription: 'Лабильный подросток — человек-настроение. Одно ласковое слово вызывает улыбку, один косой взгляд — истерику. Он глубоко привязывается к людям, но малейшая критика ранит его до глубины души. Эмоции искренние, но непропорциональные: мелкая обида переживается как катастрофа. Учителю приходится взвешивать каждое слово — не из страха, а из понимания, что для этого ребёнка эмоциональный фон значит больше, чем содержание разговора.',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80',
        quote: '«Вы так сказали... я думала, вы меня ненавидите.»',
        profile: {
            psychotype: 'Лабильный',
            coreTraits: 'Крайняя эмоциональная подвижность, привязчивость, ранимость',
            riskZone: 'Непропорциональная реакция на критику, резкие перепады',
            teacherTip: 'Начинайте с позитива. Критику — мягко, с опорой на отношения',
            intensity: 4,
        },
        isPremium: true,
    },
    {
        id: 'acc_asthenic',
        title: 'Головная боль',
        accentuation: 'Астеноневротический',
        shortDescription: 'Вечная усталость, капризность, жалобы на здоровье. Вспышки раздражения сменяются раскаянием.',
        fullDescription: 'Астеноневротический подросток постоянно уставший, раздражительный и капризный. Его нервная система быстро истощается. Громкие звуки, яркий свет, длительная нагрузка — всё это вызывает перегрузку. Он жалуется на головную боль и недомогание, и часто это не притворство, а реальная психосоматика. Вспышки раздражения случаются неожиданно, но быстро сменяются раскаянием. Учителю важно не путать усталость с ленью.',
        image: 'https://images.unsplash.com/photo-1555437877-66a7b686377e?w=800&q=80',
        quote: '«У меня голова раскалывается... можно я просто посижу?»',
        profile: {
            psychotype: 'Астеноневротический',
            coreTraits: 'Утомляемость, ипохондричность, раздражительность, капризность',
            riskZone: 'Нервный срыв при перегрузке, уход в болезнь',
            teacherTip: 'Снижайте нагрузку, не требуйте бодрости — он действительно устал',
            intensity: 3,
        },
        isPremium: true,
    },
    {
        id: 'acc_sensitive',
        title: 'Тихая тень',
        accentuation: 'Сенситивный',
        shortDescription: 'Ранимый, тревожный, боится конфликтов. Громкий голос вызывает панику.',
        fullDescription: 'Сенситивный подросток крайне раним, тревожен и мнителен. Он боится быть смешным, боится конфликтов, боится привлекать внимание. Самооценка занижена. Громкий голос учителя вызывает у него не злость, а панику. Он хочет быть хорошим, но убеждён, что не дотягивает. Любое публичное замечание — удар, после которого он может замкнуться на недели. Учителю нужна хирургическая точность: мягко, наедине, с опорой на сильные стороны.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
        quote: '«Это не моё... я просто... пожалуйста, не звоните отцу...»',
        profile: {
            psychotype: 'Сенситивный',
            coreTraits: 'Ранимость, тревожность, мнительность, заниженная самооценка',
            riskZone: 'Уход в себя, панические реакции, страх публичности',
            teacherTip: 'Только наедине. Никакой публичной критики — она разрушительна',
            intensity: 4,
        },
        isPremium: true,
    },
    {
        id: 'acc_psychasthenic',
        title: 'Маленький старичок',
        accentuation: 'Психастенический',
        shortDescription: 'Нерешительный, педантичный, тонет в сомнениях. Говорит умно, но боится действовать.',
        fullDescription: 'Психастенический подросток — мастер самоанализа и самокопания. Он нерешителен, склонен к бесконечным рассуждениям, боится ответственности. Речь — сложная, «как у маленького старичка», но за умными словами прячется страх ошибки. Он педант: тетрадки идеальные, но контрольную может не сдать, потому что перепроверял ответы до звонка. Учителю важно не торопить его и не ставить перед необходимостью мгновенных решений.',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80',
        quote: '«Но если посмотреть с другой стороны... хотя нет, подождите...»',
        profile: {
            psychotype: 'Психастенический',
            coreTraits: 'Нерешительность, педантизм, тревожное самокопание',
            riskZone: 'Ступор при необходимости быстрого решения, уход в рефлексию',
            teacherTip: 'Дайте время на обдумывание. Чёткие рамки снижают тревогу',
            intensity: 3,
        },
        isPremium: true,
    },
    {
        id: 'acc_schizoid',
        title: 'Свой мир',
        accentuation: 'Шизоидный',
        shortDescription: 'Эмоционально закрытый, живёт в параллельной реальности. Бестактен не от злости, а от непонимания.',
        fullDescription: 'Шизоидный подросток живёт в собственном мире. Социальные нормы ему непонятны, а не безразличны. Он может сказать учителю бестактность прямо в лицо — просто констатируя факт, без намерения обидеть. Эмоционально холоден внешне, но внутренний мир богат. Мнение класса его не волнует, коллективные мероприятия — каторга. Учителю не стоит ждать от него «нормальных» реакций. Лучший подход — через его интересы, а не через эмоции.',
        image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&q=80',
        quote: '«Просто скажите, что конкретно от меня нужно. Без лишнего.»',
        profile: {
            psychotype: 'Шизоидный',
            coreTraits: 'Замкнутость, эмоциональная холодность, бестактность, богатый внутренний мир',
            riskZone: 'Полный отказ от контакта при попытке «достучаться через эмоции»',
            teacherTip: 'Логика, конкретика, уважение к личному пространству. Не давите на чувства',
            intensity: 3,
        },
        isPremium: true,
    },
    {
        id: 'acc_epileptoid',
        title: 'Пороховая бочка',
        accentuation: 'Эпилептоидный',
        shortDescription: 'Копит напряжение, потом взрывается. Любит порядок и власть. Злопамятен.',
        fullDescription: 'Эпилептоидный подросток — как сжатая пружина. Он злопамятен, вязок в аффекте, напряжён. Любит порядок, правила и власть — но только если правила в его пользу. Если учитель проявляет слабость, эпилептоид его «раздавит». Если учитель силён — подчинится, но затаит злобу. Главная опасность: внезапные вспышки агрессии, которые копились неделями. Учителю нужно быть твёрдым, но без унижения — иначе месть неизбежна.',
        image: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=800&q=80',
        quote: '«Она сама виновата. Справедливость восстановлена.»',
        profile: {
            psychotype: 'Эпилептоидный',
            coreTraits: 'Злопамятность, склонность к аффектам, властность, педантизм',
            riskZone: 'Внезапная агрессия, месть за унижение, давление на слабых',
            teacherTip: 'Твёрдость без унижения. Чёткие правила, которые действуют для всех',
            intensity: 5,
        },
        isPremium: true,
    },
    {
        id: 'acc_hysteroid',
        title: 'Центр вселенной',
        accentuation: 'Истероидный',
        shortDescription: 'Жажда внимания любой ценой. Врёт, играет на публику, устраивает сцены.',
        fullDescription: 'Истероидный подросток жаждет внимания любой ценой. Если его не хвалят — будет хулиганить, лишь бы заметили. Врёт, фантазирует, играет на публику. Может изобразить обморок, слёзы, истерику — всё ради зрителей. Кажется смелым, но внутри труслив. Главная валюта — чужое внимание. Учителю важно не попасться на провокацию и не стать зрителем спектакля, но и не игнорировать полностью — иначе истероид усилит натиск.',
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80',
        quote: '«Вы вообще понимаете, что вы сейчас сделали?! Я запишу это на видео!»',
        profile: {
            psychotype: 'Истероидный',
            coreTraits: 'Демонстративность, эгоцентризм, фантазёрство, трусость',
            riskZone: 'Публичные скандалы, ложные обвинения, демонстративные угрозы',
            teacherTip: 'Не будьте зрителем. Переводите внимание с формы на содержание',
            intensity: 4,
        },
        isPremium: true,
    },
    {
        id: 'acc_unstable',
        title: 'По течению',
        accentuation: 'Неустойчивый',
        shortDescription: 'Безвольный гедонист. Плывёт за компанией, не умеет отказывать, будущее не волнует.',
        fullDescription: 'Неустойчивый подросток — безвольный гедонист. Он хочет только развлечений и покоя. Не умеет отказывать друзьям: если класс смеётся — он смеётся, если зовут сбежать — бежит. Будущее его не волнует, планирование отсутствует. Наказания действуют, только пока длятся. Учитель для него — досадная помеха на пути к удовольствию. Главная стратегия: не нотации (бесполезны), а чёткие рамки с немедленными последствиями.',
        image: 'https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?w=800&q=80',
        quote: '«Да ладно, не парьтесь. Все так делают, и ничего.»',
        profile: {
            psychotype: 'Неустойчивый',
            coreTraits: 'Безволие, гедонизм, внушаемость, отсутствие планов',
            riskZone: 'Полная зависимость от среды, неспособность сопротивляться влиянию',
            teacherTip: 'Короткие требования, немедленные последствия. Нотации бессмысленны',
            intensity: 3,
        },
        isPremium: true,
    },
    {
        id: 'acc_conformal',
        title: 'Как все',
        accentuation: 'Конформный',
        shortDescription: '«Быть как все» — единственное правило. Своего мнения нет, говорит то, что принято.',
        fullDescription: 'Конформный подросток — зеркало своего окружения. У него нет собственного мнения: он говорит то, что принято в его группе. Если учитель давит авторитетом — он сдаст друзей. Если друзья рядом — будет хамить учителю вместе с ними. Перемена среды меняет его полностью. Это не двуличие — это отсутствие внутреннего стержня. Учителю важно понимать: конформный подросток не «предатель» и не «подстрекатель» — он заложник группового давления.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80',
        quote: '«Ну... все так говорят. Я не знаю. А как правильно?»',
        profile: {
            psychotype: 'Конформный',
            coreTraits: 'Отсутствие собственного мнения, зависимость от группы, подчиняемость',
            riskZone: 'Полная зависимость от окружения, может стать инструментом буллинга',
            teacherTip: 'Разговаривайте наедине — без группового давления он другой человек',
            intensity: 3,
        },
        isPremium: true,
    },
];

interface Props {
    onBack: () => void;
}

const MuseumView: React.FC<Props> = ({ onBack }) => {
    const [selected, setSelected] = useState<Exhibit | null>(null);

    return (
        <div className="h-full bg-slate-950 flex flex-col font-sans text-slate-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.05),transparent)] pointer-events-none"></div>

            <header className="p-8 border-b border-white/5 flex items-center justify-between relative z-10 bg-slate-950/50 backdrop-blur-xl">
                <div className="flex items-center gap-6">
                    <button onClick={onBack} className="p-3 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-2xl border border-white/5">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-black text-white uppercase tracking-tighter italic">Галерея акцентуаций</h1>
                        <div className="flex items-center gap-2 text-[8px] text-blue-500/70 font-black tracking-[0.4em] uppercase">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></div>
                            11 психотипов по А. Е. Личко
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-8 relative z-10 no-scrollbar">
                <div className="mb-12">
                    <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.5em] mb-2">Акцентуации характера подростков</h2>
                    <p className="text-sm text-slate-600 leading-relaxed max-w-2xl mb-4">Каждая карточка — отдельный психотип с описанием, типичной цитатой и рекомендациями для педагога.</p>
                    <div className="h-px w-full bg-gradient-to-r from-blue-500/50 to-transparent"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
                    {EXHIBITS.map((ex) => (
                        <div 
                            key={ex.id} 
                            onClick={() => setSelected(ex)}
                            className="group glass rounded-[45px] overflow-hidden border-white/5 hover:border-blue-500/30 transition-all cursor-pointer bg-slate-900/40"
                        >
                            <div className="relative h-64 overflow-hidden bg-slate-900">
                                <img 
                                    src={ex.image} 
                                    alt={ex.accentuation} 
                                    className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 blur-[1px] group-hover:blur-0" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                                {ex.isPremium && (
                                    <div className="absolute top-4 right-4 px-3 py-1 bg-blue-600/80 text-white text-[8px] font-black uppercase rounded-full tracking-widest backdrop-blur-sm">
                                        Премиум
                                    </div>
                                )}
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Activity size={12} className="text-blue-500" />
                                        <span className="text-[9px] font-black text-blue-500 uppercase tracking-[0.3em]">{ex.accentuation}</span>
                                    </div>
                                    <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">{ex.title}</h3>
                                </div>
                            </div>
                            
                            <div className="p-8 space-y-6">
                                <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 italic">
                                    {ex.shortDescription}
                                </p>
                                <button className="w-full py-4 bg-white/5 text-slate-400 rounded-2xl font-black uppercase text-[9px] tracking-[0.2em] border border-white/5 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    Открыть досье
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="w-full max-w-4xl glass rounded-[60px] border-blue-500/20 overflow-hidden flex flex-col md:flex-row relative shadow-2xl max-h-[90vh]">
                        <button 
                            onClick={() => setSelected(null)}
                            className="absolute top-8 right-8 z-50 p-3 bg-black/50 text-white rounded-full hover:bg-white/10 transition-colors"
                        >
                            <CloseIcon size={20} />
                        </button>

                        <div className="w-full md:w-2/5 h-80 md:h-auto relative bg-slate-900 shrink-0">
                            <img src={selected.image} alt={selected.accentuation} className="w-full h-full object-cover grayscale opacity-60" />
                            {selected.isPremium && (
                                <div className="absolute top-6 left-6 px-3 py-1 bg-blue-600/80 text-white text-[8px] font-black uppercase rounded-full tracking-widest backdrop-blur-sm">
                                    Премиум
                                </div>
                            )}
                        </div>

                        <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col space-y-6 overflow-y-auto">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-blue-500">
                                    <Target size={16} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Досье акцентуации</span>
                                </div>
                                <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">{selected.title}</h2>
                                <p className="text-blue-400 text-sm font-bold">{selected.accentuation} тип</p>
                            </div>

                            <div className="space-y-4">
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {selected.fullDescription}
                                </p>
                                <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-3xl italic text-blue-400 text-sm">
                                    {selected.quote}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-3">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] text-slate-600 font-black uppercase tracking-widest flex items-center gap-1">
                                            <User size={12}/> Ключевые черты
                                        </span>
                                        <span className="text-xs text-white mt-1">{selected.profile.coreTraits}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[8px] text-slate-600 font-black uppercase tracking-widest flex items-center gap-1">
                                            <ShieldAlert size={12}/> Зона риска
                                        </span>
                                        <span className="text-xs text-rose-400 mt-1">{selected.profile.riskZone}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[8px] text-slate-600 font-black uppercase tracking-widest flex items-center gap-1">
                                            <Info size={12}/> Рекомендация педагогу
                                        </span>
                                        <span className="text-xs text-emerald-400 mt-1">{selected.profile.teacherTip}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[8px] text-slate-600 font-black uppercase tracking-widest flex items-center gap-1">
                                        <Zap size={12}/> Выраженность
                                    </span>
                                    <div className="flex gap-1 mt-2">
                                        {[1,2,3,4,5].map(lv => (
                                            <div key={lv} className={`h-1.5 flex-1 rounded-full ${lv <= selected.profile.intensity ? 'bg-blue-500' : 'bg-slate-800'}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const CloseIcon: React.FC<{ size?: number, className?: string }> = ({ size = 20, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export default MuseumView;
