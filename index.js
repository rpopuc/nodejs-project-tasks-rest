//------------------------------------------------------------- Dependências

const express = require('express')

//------------------------------------------------------------- Servidor

const server = express()
server.use(express.json())

//------------------------------------------------------------- Variáveis globais

const projects = []
let requestCount = 0;

//------------------------------------------------------------- Middlewares

// Middleware global
//   Conta a quantidade de requisições efetuadas
server.use((req, res, next) => {
    requestCount++;
    console.log(`Requests: ${requestCount}`)
    next()
})

// Middleware local
//    Verifica se há um projeto válido
//    E o define em req.project e em req.projectIndex
const checkProjectInArray = (req, res, next) => {
    const projectId = req.params.id
    const projectIndex = projects.findIndex(aProject => aProject.id === projectId)

    if (projectIndex === -1) {
        return res.status(400).json({ error: 'Project does not exist' })
    }

    req.projectIndex = projectIndex;
    req.project = projects[projectIndex];
    return next()
}

//------------------------------------------------------------- Rotas

// Inclusão de projeto
server.post('/projects', (req, res) => {
    const { id, title } = req.body

    projects.push({
        id,
        title,
        tasks: [],
    })

    return res.json(projects)
})

// Listagem de todos os projetos
server.get('/projects', (req, res) => {
    return res.json(projects)
})

// Alteração do título de um projeto
server.put('/projects/:id', checkProjectInArray, (req, res) => {
    req.project.title = req.body.title;
    return res.json(req.project)
})

// Exclusão de projeto
server.delete('/projects/:id', checkProjectInArray, (req, res) => {
    projects.splice(req.projectIndex, 1)

    return res.json({ok: true})
})

// Inclusão de tarefa no projeto
server.post('/projects/:id/tasks', checkProjectInArray, (req, res) => {
    req.project.tasks.push(req.body.title)

    return res.json(req.project)
})

//------------------------------------------------------------- Aplicação

// Inicia o servidor
server.listen(3000)