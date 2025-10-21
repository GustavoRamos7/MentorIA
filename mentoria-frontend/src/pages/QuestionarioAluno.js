import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { callGenAI } from '../utils/genai';
import React, { useEffect, useState } from 'react';
import '../styles/questionario.css';
import Select from 'react-select';
import {useNavigate } from 'react-router-dom';

export default function QuestionarioAluno() {

  const navigate = useNavigate();

  const sair = () => {
    navigate('/');
  };

  const location = useLocation();
  const alunoId = location.state?.alunoId;

  const [preferencias, setPreferencias] = useState([]);
  const [interesses, setInteresses] = useState([]);
  const [metas, setMetas] = useState('');
  const [nivel, setNivel] = useState('');
  const [trilhasSugeridas, setTrilhasSugeridas] = useState([]);
  const [perfilIA, setPerfilIA] = useState('');

  useEffect(() => {
    document.body.classList.add('login-body');
    return () => {
      document.body.classList.remove('login-body');
    };
  }, []);

  const opcoesEstilo = [
    { value: 'Visual', label: 'Visual' },
    { value: 'Auditivo', label: 'Auditivo' },
    { value: 'Cinestésico', label: 'Cinestésico' }
  ];

  const opcoesInteresse = [
    { value: 'Tecnologia', label: 'Tecnologia' },
    { value: 'Matemática', label: 'Matemática' },
    { value: 'Artes', label: 'Artes' },
    { value: 'Comunicação', label: 'Comunicação' },
    { value: 'Gestão', label: 'Gestão' },
    { value: 'Saúde', label: 'Saúde' }
  ];

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: '#111',
      border: 'none',
      boxShadow: '0 0 10px rgba(0, 255, 255, 0.1)',
      color: '#fff',
      fontFamily: 'Orbitron, sans-serif'
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: '#111',
      color: '#fff'
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: '#00ffe7',
      color: '#000'
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: '#000',
      fontWeight: 'bold'
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? '#00ffe7' : '#111',
      color: state.isFocused ? '#000' : '#fff',
      cursor: 'pointer'
    }),
    placeholder: (base) => ({
      ...base,
      color: '#888'
    })
  };

  const buscarTrilhas = async () => {
    try {
      const res = await axios.post('http://localhost:3001/trilhas/sugeridas', {
        interesses
      });
      setTrilhasSugeridas(res.data.trilhas);
    } catch (err) {
      toast.error('Erro ao buscar trilhas');
    }
  };

  const atribuirTrilha = async (trilhaId) => {
    try {
      await axios.post('http://localhost:3001/trilhas/atribuir', {
        alunoId,
        trilhaId
      });
      toast.success('Trilha atribuída com sucesso!');
    } catch (err) {
      toast.error('Erro ao atribuir trilha');
    }
  };

  const salvarPerfil = async () => {
    try {
      await axios.post('http://localhost:3001/perfil', {
        alunoId,
        preferencias,
        interesses,
        metas,
        nivel
      });
      toast.success('Perfil salvo no banco!');
    } catch (err) {
      toast.error('Erro ao salvar perfil no banco');
    }
  };

  const gerarPerfilIA = async () => {
    const prompt = `
Sou um aluno com o seguinte perfil:
- Estilo de aprendizagem: ${preferencias.join(', ')}
- Interesses: ${interesses.join(', ')}
- Metas profissionais: ${metas}
- Nível de carreira: ${nivel}

Gere um perfil vocacional detalhado, incluindo:
1. Aptidões principais
2. Estilo de trabalho ideal
3. Áreas profissionais sugeridas
4. Recomendações de estudo e ferramentas
5. Possíveis desafios e como superá-los
`;

    toast.info('Gerando perfil com IA...');
    const resposta = await callGenAI(prompt);

    if (resposta?.output) {
      setPerfilIA(resposta.output);
      toast.success('Perfil gerado com sucesso!');
      await salvarPerfil();
      await buscarTrilhas();
    } else {
      toast.error('Erro ao gerar perfil.');
    }
  };

  return (
    <div className="cadastro-section">
      <button type="button" onClick={sair} className="botao-sair">
       ⬅ Sair para Home
      </button>
      <h2>🧠 Questionário Vocacional</h2>
      <form className="cadastro-form">
        <label>Estilos de Aprendizagem:</label>
        <Select
          isMulti
          options={opcoesEstilo}
          value={opcoesEstilo.filter(opt => preferencias.includes(opt.value))}
          onChange={selected => setPreferencias(selected.map(opt => opt.value))}
          placeholder="Selecione os estilos de aprendizagem"
          styles={customStyles}
          className="select-estilo"
        />
        <small className="campo-dica">Você pode selecionar mais de um estilo</small>

        <label>Interesses:</label>
        <Select
          isMulti
          options={opcoesInteresse}
          value={opcoesInteresse.filter(opt => interesses.includes(opt.value))}
          onChange={selected => setInteresses(selected.map(opt => opt.value))}
          placeholder="Selecione seus interesses profissionais"
          styles={customStyles}
          className="select-estilo"
        />
        <small className="campo-dica">Você pode selecionar múltiplos interesses</small>

        <label>Metas Profissionais:</label>
        <textarea value={metas} onChange={e => setMetas(e.target.value)} />

        <label>Nível de Carreira:</label>
        <select value={nivel} onChange={e => setNivel(e.target.value)}>
          <option value="">Selecione</option>
          <option value="Iniciante">Iniciante</option>
          <option value="Intermediário">Intermediário</option>
          <option value="Avançado">Avançado</option>
        </select>

        <button type="button" onClick={buscarTrilhas}>
          Buscar Trilhas Sugeridas
        </button>
        <button type="button" onClick={gerarPerfilIA}>
          Gerar Perfil com IA
        </button>
      </form>

      {perfilIA && (
        <div className="perfil-ia">
          <h3>🔹 Perfil Vocacional Gerado</h3>
          <pre>{perfilIA}</pre>
        </div>
      )}

      {trilhasSugeridas.map(trilha => (
        <div key={trilha.id} className="trilha-card">
          <h4>{trilha.titulo}</h4>
          <p>{trilha.descricao}</p>
          <button onClick={() => atribuirTrilha(trilha.id)}>Atribuir</button>
        </div>
      ))}
    </div>
  );
}
