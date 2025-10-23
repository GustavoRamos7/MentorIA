import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Rotas que terão a navbar compacta
  const compactRoutes = ['/login', '/cadastro', '/questionario', '/gestor/login'];
  const isCompact = compactRoutes.some(route => location.pathname.startsWith(route));

  // Reduz a navbar levemente apenas para a home
  const isHome = location.pathname === '/';
  const navbarHeightStyle = isHome ? { height: '65px' } : {};

  // Verifica se há usuário logado
  const alunoId = localStorage.getItem('alunoId');
  const gestorId = localStorage.getItem('gestorId');

  // Função de logout
  const handleLogout = () => {
    if (alunoId) {
      localStorage.removeItem('alunoId');
      navigate('/login');
    } else if (gestorId) {
      localStorage.removeItem('gestorId');
      navigate('/gestor/login');
    }
  };

  return (
    <nav
      className={`navbar-top navbar-geral ${isCompact ? 'compact' : 'custom-small'}`}
      style={navbarHeightStyle}
    >
      <div className="logo" onClick={() => navigate('/')}>🤖 MentorIA</div>

      <ul className="nav-links">
        <li onClick={() => navigate('/')}>Início</li>
        <li onClick={() => navigate('/cadastro')}>Cadastro aluno</li>
        <li onClick={() => navigate('/login')}>Login aluno</li>
        <li onClick={() => navigate('/gestor/login')}>Área do Gestor</li>
        <li onClick={() => navigate('/trilhas')}>Trilhas</li>

        {/* Só mostra "Perfil Aluno" se estiver logado como aluno */}
        {alunoId && (
          <li onClick={() => navigate('/inicio')}>Perfil Aluno</li>
        )}

        {/* Botão de logout se estiver logado como aluno ou gestor */}
        {(alunoId || gestorId) && (
          <li onClick={handleLogout} className="logout-button">Sair</li>
        )}
      </ul>
    </nav>
  );
}
