
import { GoogleGenAI, Type } from "@google/genai";
import { Message, MessageRole, GlobalSettings, AnalysisResult, TeacherProfile } from "../types";
import { DEFAULT_SETTINGS } from "../constants";

const getSettings = (): GlobalSettings => {
  const stored = localStorage.getItem('global_settings');
  return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
};

export const sendMessageToGemini = async (
  history: Message[], 
  systemPrompt: string, 
  lastUserMessage: string
): Promise<{ text: string, thought: string, trust: number, stress: number, world_event: string | null, conflict_resolved: boolean, game_over?: boolean, violation_reason?: string }> => {
  const settings = getSettings();
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const contents = history.filter(m => m.role !== MessageRole.SYSTEM).map(msg => ({
    role: msg.role === MessageRole.USER ? "user" : "model",
    parts: [{
      text: msg.role === MessageRole.USER ? msg.content : JSON.stringify({
        thought: msg.state?.thought,
        verbal_response: msg.content,
        trust: msg.state?.trust,
        stress: msg.state?.stress
      })
    }]
  }));
  contents.push({ role: "user", parts: [{ text: lastUserMessage }] });

  const strictLocalizationInstruction = `
    [ЯЗЫКОВОЙ КОНТРОЛЬ: СТРОГО КИРИЛЛИЦА]
    - ЗАПРЕЩЕНО ИСПОЛЬЗОВАТЬ ЛАТИНСКИЕ СИМВОЛЫ И АББРЕВИАТУРЫ (Cv, Ref, Character, v., etc.).
    - ВСЕ ПОЛЯ ДОЛЖНЫ БЫТЬ ЗАПОЛНЕНЫ НА ЧИСТОМ РУССКОМ ЯЗЫКЕ.
    - ЕСЛИ В КОНТЕКСТЕ ЕСТЬ АНГЛИЙСКИЕ ИМЕНА — ЗАМЕНИ ИХ НА РУССКИЕ ЭКВИВАЛЕНТЫ.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents,
      config: {
        systemInstruction: systemPrompt + "\n" + strictLocalizationInstruction,
        temperature: settings.chat_temperature,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            thought: { type: Type.STRING },
            verbal_response: { type: Type.STRING },
            trust: { type: Type.NUMBER },
            stress: { type: Type.NUMBER },
            world_event: { type: Type.STRING },
            conflict_resolved: { type: Type.BOOLEAN },
            game_over: { type: Type.BOOLEAN },
            violation_reason: { type: Type.STRING }
          },
          required: ["thought", "verbal_response", "trust", "stress"]
        }
      }
    });

    const json = JSON.parse(response.text || "{}");
    return {
      text: json.verbal_response || "...", 
      thought: json.thought || "Без мыслей.",
      trust: typeof json.trust === 'number' ? json.trust : 50,
      stress: typeof json.stress === 'number' ? json.stress : 50,
      world_event: json.world_event || null,
      conflict_resolved: !!json.conflict_resolved,
      game_over: !!json.game_over,
      violation_reason: json.violation_reason
    };
  } catch (error) {
    return { text: `(...Связь прервана...)`, thought: "Критический сбой API.", trust: 50, stress: 50, world_event: null, conflict_resolved: false };
  }
};

export const analyzeChatSession = async (
  history: Message[], 
  scenarioName: string,
  endReason: string
): Promise<AnalysisResult> => {
  const settings = getSettings();
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const transcript = history.filter(m => m.role !== MessageRole.SYSTEM).map(m => `${m.role === MessageRole.USER ? 'УЧИТЕЛЬ' : 'УЧЕНИК'}: ${m.content}`).join('\n');
  
  const prompt = `Проведи педагогический и идеологический анализ сеанса. 
    Акцентуация ученика: ${scenarioName}. 
    Причина конца: ${endReason}.
    
    [ЯЗЫКОВОЙ КОНТРОЛЬ: СТРОГО КИРИЛЛИЦА]
    - ЗАПРЕЩЕНО ИСПОЛЬЗОВАТЬ ЛАТИНСКИЕ СИМВОЛЫ (Cv, Ref, Character, и т.д.).
    - ВСЕ ВЕРДИКТЫ ДОЛЖНЫ БЫТЬ НА РУССКОМ ЯЗЫКЕ.
    
    Транскрипт диалога:
    ${transcript}
    
    Выдай JSON: overall_score (0-100), summary, commission (массив {role, name, verdict, score}).`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        temperature: settings.analysis_temperature,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overall_score: { type: Type.NUMBER },
            summary: { type: Type.STRING },
            commission: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  role: { type: Type.STRING },
                  name: { type: Type.STRING },
                  verdict: { type: Type.STRING },
                  score: { type: Type.NUMBER }
                },
                required: ["role", "name", "verdict", "score"]
              }
            }
          },
          required: ["overall_score", "summary", "commission"]
        }
      }
    });
    const json = JSON.parse(response.text || "{}");
    return {
        overall_score: json.overall_score || 0,
        summary: json.summary || "Анализ завершен.",
        commission: json.commission || [],
        timestamp: Date.now()
    };
  } catch (error) {
    return { overall_score: 0, summary: "Ошибка анализа", commission: [], timestamp: Date.now() };
  }
};

export const generateGhostResponse = async (history: Message[], scenarioContext: string, teacher: TeacherProfile): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const transcript = history.filter(m => m.role !== MessageRole.SYSTEM).slice(-6).map(m => `${m.role === MessageRole.USER ? 'УЧИТЕЛЬ' : 'УЧЕНИК'}: ${m.content}`).join('\n');
    const prompt = `Ситуация: ${scenarioContext}\n\nДиалог:\n${transcript}\n\nНапиши идеальную реплику от лица учителя. Строго на русском. Без латиницы.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: { type: Type.OBJECT, properties: { advice: { type: Type.STRING } }, required: ["advice"] }
            }
        });
        const json = JSON.parse(response.text || "{}");
        return json.advice || "*задумался*";
    } catch { return "*совет недоступен*"; }
};
