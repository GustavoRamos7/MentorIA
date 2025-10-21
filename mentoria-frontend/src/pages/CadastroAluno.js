import React, { useState, useEffect } from 'react';
import '../styles/home.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CadastroAluno() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    data_nascimento: '',
    celular: '',
    consentimento: false
  });

  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [erroNome, setErroNome] = useState(false);

  useEffect(() => {
    document.body.classList.add('login-body');
    return () => {
      document.body.classList.remove('login-body');
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validação de nome completo
    const nomeCompletoValido = /^[A-Za-zÀ-ÿ]{2,}(?: [A-Za-zÀ-ÿ]{2,})+$/.test(form.nome.trim());
    if (!nomeCompletoValido) {
      setErroNome(true);
      toast.error('Insira seu nome completo (nome e sobrenome).');
      return;
    } else {
      setErroNome(false);
    }

    if (!form.nome || !form.email || !form.senha || !form.consentimento) {
      toast.warn('Preencha todos os campos obrigatórios.');
      return;
    }

    // ✅ Verificação de idade mínima e validade da data
    const nascimento = new Date(form.data_nascimento);
    const hoje = new Date();

    if (isNaN(nascimento.getTime())) {
      toast.error('Insira uma data de nascimento válida.');
      return;
    }

    if (nascimento > hoje) {
      toast.error('A data de nascimento não pode ser futura.');
      return;
    }

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    const dia = hoje.getDate() - nascimento.getDate();
    if (mes < 0 || (mes === 0 && dia < 0)) {
      idade--;
    }

    if (idade < 15) {
      toast.error('Você precisa ter pelo menos 15 anos para se cadastrar.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/cadastro/aluno', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.status === 201) {
        toast.success('Cadastro realizado com sucesso!');
        setTimeout(() => navigate('/login'), 1500);
      } else if (res.status === 409) {
        toast.error('E-mail já cadastrado. Tente outro.');
      } else {
        toast.error(data.error || 'Erro ao cadastrar. Tente novamente.');
      }
    } catch (err) {
      console.error('❌ Erro no envio:', err);
      toast.error('Erro de conexão com o servidor.');
    }
  };

  return (
    <div className="cadastro-section">
      <h2>📝 Cadastro de Aluno</h2>
      <form onSubmit={handleSubmit} className="cadastro-form">
        <label>Nome:</label>
        <input
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Nome completo"
        />
        {erroNome && (
          <p className="erro-nome">⚠️ Digite seu nome completo</p>
        )}

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <label>Senha:</label>
        <div className="senha-wrapper">
          <input
            type={senhaVisivel ? 'text' : 'password'}
            name="senha"
            value={form.senha}
            onChange={handleChange}
          />
          <span
            className="senha-toggle"
            onClick={() => setSenhaVisivel(!senhaVisivel)}
          >
            {senhaVisivel ? '🙈' : '👁️'}
          </span>
        </div>

        <label>Data de Nascimento:</label>
        <input
          type="date"
          name="data_nascimento"
          value={form.data_nascimento}
          onChange={handleChange}
        />

        <label htmlFor="celular">Celular:</label>
        <div className="input-tech-wrapper">
          <input
            type="tel"
            name="celular"
            id="celular"
            value={form.celular}
            onChange={handleChange}
            placeholder="(99) 99999-9999"
            className="input-tech"
          />
          <span className="input-icon">📡</span>
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            name="consentimento"
            checked={form.consentimento}
            onChange={handleChange}
          />
          <label htmlFor="consentimento">Aceito os termos da mentoria</label>
        </div>

        <button type="submit">Cadastrar</button>
      </form>

      <div className="sub-opcao" onClick={() => navigate('/login')}>
        <p>
          Já sou aluno. <span className="link-text">Fazer login</span>
        </p>
      </div>
    </div>
  );
}
