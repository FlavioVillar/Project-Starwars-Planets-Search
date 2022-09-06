# Projeto Starwars Planets Search!

Projeto desenvolvido por estudante durante o curso de desenvolvimento front-end da **Trybe**
<br />

# Imagens da aplicação

<div align="center">
 <kbd>
  <img src="https://user-images.githubusercontent.com/94480963/184561078-6e407d1e-011a-4e09-90ee-a1bff633419b.gif" width="650">
 </kbd>
</div>
<br />
<hr>
<div align="center">
 <kbd>
  <img src="https://user-images.githubusercontent.com/94480963/184561135-2709a40e-adf7-467c-9f69-61e02ca425ff.png" width="650">
 </kbd>
</div>
<br />
<hr>
# Tecnologias e ferramentas usadas.

- Context API do **React** para gerenciar estado.
- React Hook useState;
- React Hook useContext;
- React Hook useEffect;
- React Hooks customizados.

---

Foram desenvolvidos uma lista com filtros de planetas do universo de Star Wars usando **Context API e Hooks** para controlar os estados globais.

---


Usando requisição para o endpoint `/planets` da API de Star Wars ([nesse link](https://swapi-trybe.herokuapp.com/api/planets/)), é preencha uma tabela com os dados retornados.

A tabela é renderizada com o componente `<Table />`. Os dados recebidos da API são salvos num campo chamado `data` do contexto e é daí que a tabela faz a leitura.

A tabela trás uma primeira linha com os headers e as demais com as informações de cada campo.

---
A tabela pode ser filtrada através de um ***texto***, inserido num _campo de texto_, exibindo somente os planetas cujos nomes incluam o texto digitado

O filtro atualiza a tabela com os planetas que se encaixam no filtro à medida que o nome é digitado, sem ter que apertar um botão para efetuar a filtragem.

---

A tabela também possui filtro para ***valores numéricos***

Ele funciona com três seletores:

- O primeiro deve abre um dropdown que permite a quem usa selecionar uma das seguintes colunas: `population`, `orbital_period`, `diameter`, `rotation_period` e `surface_water`;
- O segundo deve determina se a faixa de valor é `maior que`, `menor que` ou `igual a` o numero que virá a seguir;
- O terceiro é uma caixa de texto que só aceita números;
- O filtro é acionado por um botão `Filter` .

---

É possível adicionar múltiplos filtros numéricos, todos os filtros adicionados funcionam de forma conjunta.

Por exemplo, você pode filtrar pelos planetas que possuam _Orbital period > 400_ **e** _Diameter < 10000_.

---

É possível apagar um filtro de valor numérico ao clicar no ícone de `X` de um dos filtros e também apagar todas filtragens numéricas simultaneamente ao clicar em outro botão de `Remove all filters`
