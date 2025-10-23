import { callGenAI } from '../utils/genai.mjs';

export default async function gerarConteudoSugerido({ titulo, estilo_aprendizagem, interesses, nivel_carreira }) {
  const prompt = `
Sou um aluno que vai iniciar a trilha "${titulo}".
Meu estilo de aprendizagem é: ${estilo_aprendizagem}.
Meus interesses são: ${interesses}.
Meu nível de carreira é: ${nivel_carreira}.

Gere um conteúdo sugerido com até 6 blocos, cada um com:
- "tipo": Aula, Desafio, Dica, Curiosidade ou Ferramenta
- "titulo": um título curto, criativo e envolvente
- "texto": explicação com até 3 frases, incluindo contexto, benefício e como aplicar
- "link": URL real ou simulada para ferramenta, site, vídeo ou recurso interativo

Preferências:
- Evite PDFs ou materiais estáticos
- Prefira experiências práticas, ferramentas digitais, interações online, desafios criativos ou recursos visuais
- Use exemplos reais como Canva, Notion, GitHub, Trello, Figma, YouTube, Unsplash, etc.
- Adapte o conteúdo ao estilo de aprendizagem e interesses do aluno
- Varie os tipos de conteúdo para manter o engajamento

⚠️ IMPORTANTE: Retorne a resposta como um array JSON **válido**, sem explicações, sem texto extra, sem Markdown. Apenas o array JSON puro.

Exemplo:
[
  {
    "tipo": "Ferramenta",
    "titulo": "Crie mapas mentais com estilo",
    "texto": "Use o MindMeister para organizar ideias visualmente. Ideal para quem aprende por associação.",
    "link": "https://www.mindmeister.com"
  },
  {
    "tipo": "Desafio",
    "titulo": "Construa um mini projeto",
    "texto": "Escolha uma ferramenta como Figma ou Trello e crie um protótipo funcional. Compartilhe com colegas.",
    "link": "https://www.figma.com"
  }
]
`;

  const resposta = await callGenAI(prompt);

  try {
    // 🔧 Remove blocos de Markdown como ```json e ```
    const textoLimpo = resposta.output
      .replace(/^```json/, '')
      .replace(/^```/, '')
      .replace(/```$/, '')
      .trim();

    const json = JSON.parse(textoLimpo);
    return Array.isArray(json) ? json : [];
  } catch (err) {
    console.error('Erro ao interpretar resposta da IA:', err);
    return [];
  }
}
