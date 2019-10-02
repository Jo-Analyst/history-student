<template>
  <main class="main">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-7">
          <div
            class="alert alert-primary text-center text-black-50 font-weight-bolder mx-auto"
            v-if="isLoading && listaAlunos.length > 0"
          >
            <p>Carregado...</p>
          </div>
          <div
            class="alert alert-danger text-center text-black-50 font-weight-bolder mx-auto"
            v-if="listaAlunos.length === 0"
          >
            <p>Não há cadastro!</p>
          </div>
          <table class="mx-auto" v-show="listaAlunos.length > 0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Aluno</th>
                <th>Turma</th>
                <th>Nota</th>
                <th>Classificação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="list in listaAlunos" :key="list.id">
                <td>{{list.id}}</td>
                <td>{{list.nome}}</td>
                <td>{{list.turma}}</td>
                <td>{{parseFloat(list.nota).toFixed(2)}}</td>
                <td>{{list.classificacao}}</td>
                <td>
                  <i
                    class="fa fa-pencil mr-2 text-warning"
                    aria-hidden="true"
                    @click="editar(list)"
                  ></i>
                  <i class="fa fa-trash text-danger" aria-hidden="true" @click="excluir(list.id)"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-lg-5">
          <form class="form border p-3 rounded mt-4 mt-lg-0" autocomplete="off">
            <div class="d-search w-100 mx-auto mb-3">
              <input
                type="text"
                class="inp-search form-control"
                @input="pesquisar"
                v-model="search"
                placeholder="Search"
              />
              <span>
                <i class="fa fa-search text-warning" aria-hidden="true" @click="pesquisar"></i>
              </span>
            </div>
            <label for="txtAluno">Aluno:</label>
            <input
              type="text"
              placeholder="Aluno..."
              v-model="aluno.nome"
              id="txtAluno"
              class="form-control mb-2"
            />
            <label for="selTurma">Turma:</label>
            <select id="selTurma" class="form-control mb-2 text-dark" v-model="aluno.turma">
              <option value disabled selected>Selecione a turma</option>
              <option :value="list" v-for="list in listaTurma" :key="list">{{list}}</option>
            </select>
            <label for="txtNota">Nota:</label>
            <input
              type="text"
              id="txtNota"
              class="form-control mb-2"
              @change="classificarAluno"
              v-model="aluno.nota"
            />
            <button class="btn btn-outline-success" @click.prevent="salvar()">Salvar</button>
            <button class="btn btn-outline-danger ml-2" @click.prevent="clear">Cancelar</button>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { http } from "../api/api";
export default {
  name: "Main",
  data() {
    return {
      isLoading: true,
      search: "",
      listaAlunos: [],
      listaTurma: [],
      aluno: {
        id: "",
        nome: "",
        turma: "",
        nota: "",
        classificacao: ""
      }
    };
  },
  mounted() {
    this.listarAlunos();
    this.listarTurma();
  },
  methods: {
    pesquisar() {
      http.pesquisar(this.search).then(resp => (this.listaAlunos = resp.data));
    },
    listarAlunos() {
      http.listaAluno().then(resp => (this.listaAlunos = resp.data));
    },
    listarAlunos() {
      http.listaAluno().then(resp => {
        this.listaAlunos = resp.data;
        this.isLoading = false;
      });
    },
    listarTurma() {
      http.listaTurma().then(resp => (this.listaTurma = resp.data));
    },
    salvar() {
      if(this.aluno.nome === "" || this.aluno.turma === "" || this.aluno.nota === "") return
      const req = this.aluno.id ? http.atualizar : http.salvar;
      req(this.aluno).then(() => {
        this.listarAlunos();
        this.clear();
      });
    },
    editar(aluno) {
      this.aluno = aluno;
    },
    excluir(id) {
      if (confirm("Deseja mesma excluir estes dados?"))
        http.excluir(id).then(() => {
          this.listarAlunos();
          this.clear();
        });
    },
    classificarAluno() {
      if (parseFloat(this.aluno.nota) >= 60)
        this.aluno.classificacao = "Aprovado";
      else this.aluno.classificacao = "Reprovado";
    },
    clear() {
      this.aluno = { id: "", nome: "", turma: "", nota: "", classificacao: "" };
    }
  }
};
</script>
<style>
.main {
  margin-top: 5px;
}

td,
th {
  padding: 5px 10px;
  border-bottom: 1px solid black;
  font-size: 15px;
}
.fa {
  cursor: pointer;
}

.d-search {
  width: 50%;
  border-bottom: 1px solid black;
  position: relative;
}

.inp-search,
.inp-search:focus {
  background: none;
  border: 0;
  box-shadow: none;
  width: 95%;
}

.inp-search::placeholder {
  color: black;
}

input:focus,
select:focus {
  box-shadow: 0 0 0 0 !important;
}
.fa-search {
  position: absolute;
  top: 35%;
  right: 0;
}
</style>