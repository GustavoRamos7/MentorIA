import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import db from '../db.mjs';

export async function registrarUsuario({ tabela, camposObrigatorios, dados, camposInsert }) {
  for (const campo of camposObrigatorios) {
    if (!dados[campo]) {
      throw { status: 400, error: 'Campos obrigatórios não preenchidos.' };
    }
  }

  const [existe] = await db.query(`SELECT * FROM ${tabela} WHERE email = ?`, [dados.email]);
  if (existe.length > 0) {
    throw { status: 409, error: `${tabela === 'aluno' ? 'Aluno' : 'Usuário'} já cadastrado.` };
  }

  const senha_hash = await bcrypt.hash(dados.senha, 10);
  const id = uuidv4();

  const valores = camposInsert.map(campo => campo === 'senha_hash' ? senha_hash : campo === `${tabela}_id` ? id : dados[campo]);

  await db.query(`
    INSERT INTO ${tabela} (${camposInsert.join(', ')})
    VALUES (${camposInsert.map(() => '?').join(', ')})
  `, valores);

  return { id };
}
