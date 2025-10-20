import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/genai', async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=' + process.env.GENAI_API_KEY,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
                role: "user",
                parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();
    console.log('🔍 Resposta da Gemini:', JSON.stringify(data, null, 2));

    const output = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Resposta não encontrada';
    res.json({ output });

  } catch (error) {
    console.error('Erro na rota /api/genai:', error);
    res.status(500).json({ error: 'Erro ao chamar a API GenAI' });
  }
});

export default router;
