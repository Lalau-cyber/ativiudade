const express = require('express');
const app = express();

app.use(express.json());

// atividade 1 --GET    
const filmes = [
    {id: 1, titulo: "Interestelar", genero: "Ficção científica"},
    {id: 2, titulo: "Rambo 1", genero: "Ação"},
    {id: 3, titulo: "Diário de uma paixão", genero: "romance"}
]

const clientes = [
    { id: 1, nome: "João Silva", email: "joao@email.com" }
];

app.get('/filmes', (req, res) => {
    res.status(200).json(filmes);
});
//atividade 2 --filtro por genero -QUERY PARAMS

app.get('/filmes/genero', (req, res) => {
    const {nome} = req.query;

    if (!nome){
        return res.status(400).json({mensagem : "Insira um gênero"})
    }

    const filmesFiltrados = filmes.filter(f => 
            f.genero.toLowerCase() === nome.toLowerCase()
        );
    res.json(filmesFiltrados);

})

//extra lista os clientes
app.get('/clientes', (req, res) => {
    res.status(200).json(clientes);
});
// Atividade 3 e 4 -- cadastro de clientes POST
app.post('/clientes', (req, res) => {
    console.log("Dados recebidos no terminal:", req.body);

    try {
        const {nome, email } = req.body;

        if (!nome || !email) {
            return res.status(400).json({ mensagem: "Nome e email são obrigatórios" });
        }

        const emailExiste = clientes.find(c => c.email === email);
        if (emailExiste) {
            return res.status(400).json({ mensagem: "Este email já está cadastrado" });
        }
        const novoCliente = {
            id: clientes.length + 1,
            nome,
            email
        };
        clientes.push(novoCliente);
        res.status(201).json(novoCliente);

    } catch (error) {
        console.error("ERRO DETALHADO:", error);
        res.status(500).json({ mensagem: "Erro interno no servidor", detalhes: error.message });
    }
});

// --- ATIVIDADE 05: Busca de Cliente por ID ---
app.get('/clientes/:id', (req, res) => {
    const { id } = req.params;

    const cliente = clientes.find(c => c.id === parseInt(id));

    if (!cliente) {
        return res.status(404).json({ mensagem: "Cliente não encontrado" });
    }

    res.json(cliente);
}); // <--- AQUI ESTAVA O ERRO: Faltava fechar corretamente antes.

// Inicialização do servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));