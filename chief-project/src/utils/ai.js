import { InferenceClient } from "@huggingface/inference";

const hf = new InferenceClient(import.meta.env.VITE_HF_ACCESS_TOKEN);

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients and suggests a recipe.
Format your response in markdown.
`;

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ");

    try {
        const response = await hf.chatCompletion({
            model: "meta-llama/Llama-3.1-8B-Instruct:cerebras",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                {
                    role: "user",
                    content: `I have ${ingredientsString}. Please give me a recipe.`
                }
            ],
            max_tokens: 400
        });

        return response.choices?.[0]?.message?.content || "Пустой ответ";
    } catch (err) {
        console.error("FULL ERROR:", err);
        return `Ошибка Hugging Face: ${err?.message || "unknown error"}`;
    }
}