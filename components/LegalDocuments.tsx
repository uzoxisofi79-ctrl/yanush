import React, { useState } from 'react';
import { ArrowLeft, FileText, Shield, Cookie } from 'lucide-react';

interface Props {
  onBack: () => void;
}

type DocSection = 'offer' | 'cookies' | 'privacy';

const LegalDocuments: React.FC<Props> = ({ onBack }) => {
  const [activeDoc, setActiveDoc] = useState<DocSection>('offer');

  return (
    <div className="h-full bg-slate-950 flex flex-col font-sans text-slate-300 relative overflow-hidden">
      <header className="shrink-0 p-8 border-b border-white/5 flex items-center justify-between relative z-10 bg-slate-950/50 backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="p-3 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-2xl border border-white/5">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tighter italic">Документы</h1>
            <p className="text-[8px] text-blue-500/70 font-black tracking-[0.4em] uppercase">Правовая информация</p>
          </div>
        </div>
        <div className="flex gap-1 bg-black/40 p-1.5 rounded-2xl border border-white/5">
          {[
            { key: 'offer' as DocSection, label: 'Оферта', icon: FileText },
            { key: 'cookies' as DocSection, label: 'Cookies', icon: Cookie },
            { key: 'privacy' as DocSection, label: 'Конфиденциальность', icon: Shield },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveDoc(tab.key)}
              className={`uppercase font-black tracking-widest px-4 py-2 rounded-xl transition-all text-[9px] flex items-center gap-2 ${activeDoc === tab.key ? 'text-white bg-blue-600' : 'text-slate-500'}`}
            >
              <tab.icon size={12} /> {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-8 md:p-12 relative z-10 custom-scroll">
        <div className="max-w-3xl mx-auto pb-24">
          {activeDoc === 'offer' && <OfferDocument />}
          {activeDoc === 'cookies' && <CookiesDocument />}
          {activeDoc === 'privacy' && <PrivacyDocument />}
        </div>
      </main>
    </div>
  );
};

const DocHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-lg font-black text-white uppercase tracking-tighter italic mt-10 mb-4">{children}</h2>
);

const DocSubheading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-sm font-black text-white mt-6 mb-2">{children}</h3>
);

const DocParagraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-xs text-slate-400 leading-relaxed mb-3">{children}</p>
);

const OfferDocument: React.FC = () => (
  <div>
    <h1 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-2">Публичная оферта</h1>
    <p className="text-[9px] text-slate-600 uppercase tracking-widest mb-8">на предоставление доступа к интерактивному тренажёру «ЯНУШ»</p>

    <DocHeading>1. Общие положения</DocHeading>
    <DocParagraph>
      1.1. Настоящий документ является публичной офертой (далее — «Оферта») и содержит условия предоставления доступа к интерактивному тренажёру педагогических диалогов «ЯНУШ» (далее — «Сервис»).
    </DocParagraph>
    <DocParagraph>
      1.2. Сервис предназначен для тренировки навыков педагогического общения с подростками посредством текстового диалога с ИИ-моделью.
    </DocParagraph>
    <DocParagraph>
      1.3. Акцепт настоящей Оферты производится путём регистрации учётной записи на сайте yanush-sim.ru и/или оплаты подписки.
    </DocParagraph>
    <DocParagraph>
      1.4. Оферта считается акцептованной с момента совершения любого из действий, указанных в п. 1.3.
    </DocParagraph>

    <DocHeading>2. Предмет Оферты</DocHeading>
    <DocParagraph>
      2.1. Исполнитель предоставляет Пользователю доступ к функциональным возможностям Сервиса в соответствии с выбранным тарифным планом.
    </DocParagraph>
    <DocParagraph>
      2.2. Тарифные планы:
    </DocParagraph>
    <DocParagraph>
      — Базовый (бесплатный): доступ к 2 акцентуациям, базовым сценариям и общей обратной связи.
    </DocParagraph>
    <DocParagraph>
      — Премиум (990 ₽/мес): полный доступ ко всем 11 акцентуациям, расширенным сценариям, экспертной и совещательной комиссиям, архиву сессий.
    </DocParagraph>
    <DocParagraph>
      — Годовой (9 000 ₽/год): условия Премиум-тарифа с оплатой за 12 месяцев (750 ₽/мес).
    </DocParagraph>

    <DocHeading>3. Условия использования</DocHeading>
    <DocParagraph>
      3.1. Пользователь обязуется использовать Сервис исключительно в образовательных и тренировочных целях.
    </DocParagraph>
    <DocParagraph>
      3.2. Сервис использует модели генеративного ИИ. Ответы ИИ-подростка являются имитацией поведения и не представляют собой медицинскую, психологическую или юридическую консультацию.
    </DocParagraph>
    <DocParagraph>
      3.3. Исполнитель не несёт ответственности за педагогические решения, принятые Пользователем на основании опыта работы с Сервисом.
    </DocParagraph>
    <DocParagraph>
      3.4. Пользователь несёт ответственность за сохранность данных своей учётной записи.
    </DocParagraph>

    <DocHeading>4. Оплата и возврат</DocHeading>
    <DocParagraph>
      4.1. Оплата производится в рублях Российской Федерации через защищённый платёжный шлюз.
    </DocParagraph>
    <DocParagraph>
      4.2. Подписка активируется автоматически после подтверждения платежа.
    </DocParagraph>
    <DocParagraph>
      4.3. Возврат средств возможен в течение 14 дней с момента оплаты при условии, что Пользователь не совершил более 3 тренировочных сессий в рамках оплаченного периода. Для возврата направьте запрос на support@yanush-sim.ru.
    </DocParagraph>
    <DocParagraph>
      4.4. Промокоды применяются однократно и не суммируются с другими скидками.
    </DocParagraph>

    <DocHeading>5. Интеллектуальная собственность</DocHeading>
    <DocParagraph>
      5.1. Все материалы Сервиса (тексты, дизайн, программный код, базы данных акцентуаций и сценариев) являются объектами интеллектуальной собственности Исполнителя.
    </DocParagraph>
    <DocParagraph>
      5.2. Пользователь вправе сохранять и распечатывать результаты собственных сессий для личного использования.
    </DocParagraph>

    <DocHeading>6. Ответственность</DocHeading>
    <DocParagraph>
      6.1. Сервис предоставляется «как есть». Исполнитель не гарантирует бесперебойную работу Сервиса.
    </DocParagraph>
    <DocParagraph>
      6.2. Исполнитель не несёт ответственности за убытки, возникшие в результате использования или невозможности использования Сервиса.
    </DocParagraph>

    <DocHeading>7. Срок действия и изменения</DocHeading>
    <DocParagraph>
      7.1. Оферта действует с момента публикации и до её отзыва Исполнителем.
    </DocParagraph>
    <DocParagraph>
      7.2. Исполнитель вправе вносить изменения в условия Оферты. Изменения вступают в силу с момента публикации на сайте.
    </DocParagraph>
    <DocParagraph>
      7.3. Продолжение использования Сервиса после изменения условий означает согласие с новыми условиями.
    </DocParagraph>

    <DocHeading>8. Контактная информация</DocHeading>
    <DocParagraph>
      По вопросам, связанным с настоящей Офертой, обращайтесь: support@yanush-sim.ru
    </DocParagraph>
  </div>
);

const CookiesDocument: React.FC = () => (
  <div>
    <h1 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-2">Согласие на использование cookies</h1>
    <p className="text-[9px] text-slate-600 uppercase tracking-widest mb-8">Политика использования файлов cookie на сайте yanush-sim.ru</p>

    <DocHeading>1. Что такое cookies</DocHeading>
    <DocParagraph>
      Файлы cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве при посещении сайта. Они позволяют сайту запоминать ваши настройки и предпочтения.
    </DocParagraph>

    <DocHeading>2. Какие cookies мы используем</DocHeading>
    <DocSubheading>2.1. Необходимые cookies</DocSubheading>
    <DocParagraph>
      Обеспечивают базовую работу сайта: авторизацию, сохранение текущей сессии, восстановление диалога при обновлении страницы. Без них Сервис не сможет функционировать корректно.
    </DocParagraph>
    <DocSubheading>2.2. Функциональные cookies</DocSubheading>
    <DocParagraph>
      Сохраняют ваши настройки (имя педагога, предпочтительные параметры ученика), чтобы вам не приходилось вводить их заново при каждом визите.
    </DocParagraph>
    <DocSubheading>2.3. Аналитические cookies</DocSubheading>
    <DocParagraph>
      Собирают обезличенную информацию о том, как пользователи взаимодействуют с Сервисом: какие страницы посещают, сколько времени проводят на сайте. Это помогает улучшать работу тренажёра.
    </DocParagraph>

    <DocHeading>3. Хранение данных</DocHeading>
    <DocParagraph>
      Данные авторизации и сессий хранятся в локальном хранилище вашего браузера (localStorage). Эти данные не передаются на сервер и доступны только на вашем устройстве.
    </DocParagraph>

    <DocHeading>4. Управление cookies</DocHeading>
    <DocParagraph>
      Вы можете управлять файлами cookie через настройки вашего браузера: удалять их, блокировать или настраивать уведомления об их установке. Обратите внимание: отключение необходимых cookies приведёт к некорректной работе Сервиса.
    </DocParagraph>

    <DocHeading>5. Согласие</DocHeading>
    <DocParagraph>
      Продолжая использовать сайт yanush-sim.ru, вы подтверждаете согласие с настоящей политикой использования файлов cookie.
    </DocParagraph>
  </div>
);

const PrivacyDocument: React.FC = () => (
  <div>
    <h1 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-2">Политика конфиденциальности</h1>
    <p className="text-[9px] text-slate-600 uppercase tracking-widest mb-8">Обработка персональных данных пользователей сайта yanush-sim.ru</p>

    <DocHeading>1. Общие положения</DocHeading>
    <DocParagraph>
      1.1. Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки и защиты персональных данных пользователей интерактивного тренажёра «ЯНУШ» (далее — «Сервис»), доступного по адресу yanush-sim.ru.
    </DocParagraph>
    <DocParagraph>
      1.2. Политика разработана в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».
    </DocParagraph>

    <DocHeading>2. Собираемые данные</DocHeading>
    <DocParagraph>
      2.1. При регистрации мы собираем: адрес электронной почты.
    </DocParagraph>
    <DocParagraph>
      2.2. При использовании Сервиса автоматически собираются: тексты диалогов с ИИ-подростком (для формирования оценки комиссии), настройки сессий (имя педагога, параметры ученика), результаты оценок.
    </DocParagraph>
    <DocParagraph>
      2.3. Пароли хранятся в виде необратимого хэша (SHA-256) и не могут быть прочитаны ни администратором, ни третьими лицами.
    </DocParagraph>

    <DocHeading>3. Цели обработки</DocHeading>
    <DocParagraph>
      3.1. Предоставление доступа к функциональным возможностям Сервиса.
    </DocParagraph>
    <DocParagraph>
      3.2. Обеспечение работы системы авторизации и подписки.
    </DocParagraph>
    <DocParagraph>
      3.3. Формирование экспертной оценки по результатам диалога.
    </DocParagraph>
    <DocParagraph>
      3.4. Улучшение качества Сервиса на основании обезличенной статистики.
    </DocParagraph>

    <DocHeading>4. Хранение данных</DocHeading>
    <DocParagraph>
      4.1. В текущей версии Сервиса данные пользователей хранятся в локальном хранилище браузера (localStorage) на устройстве пользователя.
    </DocParagraph>
    <DocParagraph>
      4.2. Тексты диалогов передаются на серверы обработки ИИ (Google Gemini API) через защищённый прокси-сервер для формирования ответов и оценок. Данные не сохраняются на стороне провайдера ИИ после обработки запроса.
    </DocParagraph>
    <DocParagraph>
      4.3. Оператор принимает организационные и технические меры для защиты данных от несанкционированного доступа.
    </DocParagraph>

    <DocHeading>5. Передача данных третьим лицам</DocHeading>
    <DocParagraph>
      5.1. Персональные данные не передаются третьим лицам, за исключением случаев, предусмотренных законодательством Российской Федерации.
    </DocParagraph>
    <DocParagraph>
      5.2. Обезличенные тексты диалогов передаются провайдеру ИИ-модели исключительно для формирования ответов в реальном времени.
    </DocParagraph>

    <DocHeading>6. Права пользователя</DocHeading>
    <DocParagraph>
      6.1. Пользователь вправе запросить удаление своих персональных данных, направив письмо на support@yanush-sim.ru.
    </DocParagraph>
    <DocParagraph>
      6.2. Пользователь может в любое время удалить данные своей учётной записи из локального хранилища браузера через настройки браузера.
    </DocParagraph>
    <DocParagraph>
      6.3. Пользователь вправе отозвать согласие на обработку персональных данных, что повлечёт невозможность использования Сервиса.
    </DocParagraph>

    <DocHeading>7. Изменение Политики</DocHeading>
    <DocParagraph>
      7.1. Оператор вправе вносить изменения в настоящую Политику. Актуальная версия размещается на сайте yanush-sim.ru.
    </DocParagraph>

    <DocHeading>8. Контактная информация</DocHeading>
    <DocParagraph>
      По вопросам обработки персональных данных: support@yanush-sim.ru
    </DocParagraph>
  </div>
);

export default LegalDocuments;
