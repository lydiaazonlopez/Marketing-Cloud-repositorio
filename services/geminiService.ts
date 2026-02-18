
import { GoogleGenAI, Type } from "@google/genai";
import { ExerciseType, GradingResult } from "../types";

export const gradeExercise = async (
  type: ExerciseType,
  content: string, // Base64 for images, raw string for code
  isImage: boolean = false,
  expectedContent?: string
): Promise<GradingResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = "gemini-3-flash-preview";
  
  let prompt = "";
  const brevityRules = `
    REGLAS DE FEEDBACK:
    1. Si la puntuación es superior al 90%, el feedback debe ser extremadamente corto (máximo 2 líneas).
    2. Si la puntuación es inferior al 90%, proporciona las correcciones o pistas necesarias en líneas separadas (una fila por cada punto), de forma muy resumida y directa.
    3. PROHIBIDO USAR NEGRITAS en el texto.
    4. Muestra solo las mejoras imprescindibles.
  `;

  if (type === 'DATA_EXTENSION') {
    prompt = `Evalúa esta captura de Data Extension en SFMC. Verifica nombres, tipos de datos y PK. Proporciona puntuación 0-10 y feedback. ${brevityRules}`;
  } else if (type === 'EMAIL') {
    prompt = `Compara este código HTML de email con la referencia. Calcula precisión 0-100%. ${brevityRules} 
    REFERENCIA: ${expectedContent}`;
  } else if (type === 'JOURNEY') {
    prompt = `Evalúa esta captura de Journey Builder. Analiza nodos, esperas y splits. Calcula precisión 0-100% comparando con la lógica solicitada. ${brevityRules}
    LÓGICA SOLICITADA: ${expectedContent}`;
  } else if (type === 'SQL') {
    prompt = `Evalúa esta consulta SQL para SFMC. Verifica sintaxis y lógica. Proporciona puntuación 0-10. ${brevityRules}`;
  } else if (type === 'REPORTING') {
    prompt = `Evalúa este ejercicio de Reporting (métricas o SQL de Data Views). Proporciona puntuación 0-10. ${brevityRules}`;
  } else if (type === 'LANDING') {
    prompt = `Compara este código de Landing Page con la referencia. Calcula precisión 0-100%. ${brevityRules}
    REFERENCIA: ${expectedContent}`;
  }

  const parts: any[] = [{ text: prompt }];
  if (isImage) {
    parts.push({
      inlineData: {
        mimeType: "image/png",
        data: content.split(',')[1] || content,
      },
    });
  } else {
    parts.push({ text: `Contenido del usuario:\n\n${content}` });
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER, description: "Puntuación numérica" },
            feedback: { type: Type.STRING, description: "Feedback en filas separadas, sin negritas, muy breve" },
          },
          required: ["score", "feedback"],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    return {
      score: result.score ?? 0,
      feedback: result.feedback ?? "Lo siento, no pude procesar la evaluación.",
    };
  } catch (error) {
    console.error("Gemini Grading Error:", error);
    return {
      score: 0,
      feedback: "Error al conectar con el servicio de evaluación.",
    };
  }
};
