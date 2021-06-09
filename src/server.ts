import app from './app';

const port = process.env.PORT || 3333;

app.listen(port, () =>
  console.log(`🚀️ Server is listening on port http://localhost:${port}.`),
);

// TODO
// Criar Usuario
// Criar Sessao
// Criar Post
// Listar Todos os Posts
// Listar Todos os Posts do Usuario
// Deletar um Post
// Criar Comentario
// Listar Comentarios
// Criar e Remover Like
// Adicionar Avatar ao Usuario
