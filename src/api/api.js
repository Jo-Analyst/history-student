import axios from "axios"
export const api = axios.create({
    baseURL: "http://localhost:3001/"
})

export const http = {
    listaTurma: () => api.get("turma"),
    listaAluno: () => api.get("aluno"),
    salvar: (aluno) => api.post("aluno", aluno),
    atualizar:(aluno) => api.put("aluno/" + aluno.id, aluno),
    excluir: (id) => api.delete("aluno/"+ id),
    pesquisar: (aluno)=> api.get("aluno?q=" + aluno)
}