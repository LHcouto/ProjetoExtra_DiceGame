var prompt = require("prompt-sync")();

//Perguntar quantas rodadas você quer fazer; (1,0 ponto)
//Perguntar quantos jogadores vão jogar; (1,5 pontos)
//criar um objeto pra cada jogador com nome e número tirado; (1,5 pontos)
//Guarda todos os objetos em uma lista; (2,0 pontos)
//Ordenar esses objetos, sabendo que o vencedor tirou o maior número no dado. (2,0 pontos)
//Mostrar no final qual jogador ganhou mais rodadas e foi o grande campeão. (2,0 pontos)

console.log("Bem vindo ao Dice Game");
//declarando variaveis
let nrodadas = 0;
let njogadores;
let replay;
let jogador = {
  nome: "",
  dado: "",
  cont: 0,
};
const jogadores = [];
let jogadoresResult = [];

//functions

function Jogador(nome, dado, cont) {
  this.nome = nome;
  this.dado = dado;
  this.cont = cont;
}
do {
  //validando numero de rodadas
  while (true) {
    nrodadas = +prompt(
      `Digite o número de rodadas que gostaria de jogar: `
    ).trim();
    if (isNaN(nrodadas) || nrodadas < 1) {
      console.log(`Número Inválido.`);
    } else {
      break;
    }
  }
  //validando numero de jogadores
  while (true) {
    njogadores = +prompt(`Digite quantos jogadores vão jogar: `).trim();
    if (isNaN(njogadores) || njogadores < 1) {
      console.log(`Número Inválido.`);
    } else {
      break;
    }
  }
  //adicionando jogadores ao objeto
  for (x = 0; x < njogadores; x++) {
    jogador.nome = prompt(`Digite o nome do ${x + 1}º jogador: `);
    jogador.dado = Math.ceil(Math.random() * 6);
    jogadores.push(jogador);
    jogador = new Jogador(jogador.nome, jogador.dado, 0);
  }
  console.log(`Vamos jogar os Dados...`);

  for (i = 0; i < nrodadas; i++) {
    console.log(`
----------------------------------------------------------------
                Rodada ${i + 1}`);

    for (x = 0; x < njogadores; x++) {
      console.log(`
Está na vez do ${jogadores[x].nome}...
Ele tirou: ${jogadores[x].dado}`);
    }
    jogadoresResult = [...jogadores];
    jogadoresResult.sort(function (a, b) {
      return a.dado > b.dado ? -1 : a.dado < b.dado ? 1 : 0;
    });

    if (jogadoresResult[0].dado == jogadoresResult[1]) {
      console.log("Houve empate! Rodada Anulada");
      for (x = 0; x < njogadores; x++) {
        jogadores[x].dado = Math.ceil(Math.random() * 6);
      }
      continue;
    } else {
      console.log(
        `${jogadoresResult[0].nome} ganhou a rodada tirando ${jogadoresResult[0].dado}`
      );
      jogadoresResult[0].cont++;
    }

    for (x = 0; x < njogadores; x++) {
      jogadores[x].dado = Math.ceil(Math.random() * 6);
    }
  }
  jogadoresResult.sort(function (a, b) {
    return a.cont > b.cont ? -1 : a.cont < b.cont ? 1 : 0;
  });
  console.log(
    "----------------------------------------------------------------"
  );
  console.log(
    `1º Lugar: ${jogadoresResult[0].nome} com ${jogadoresResult[0].cont} vitórias.`
  );

  console.log(
    "----------------------------------------------------------------"
  );
  do {
    console.log(`Querem jogar novamente?
    1)Sim               2)Não`);

    replay = prompt("R: ").toLowerCase();
    if (replay != "sim" && replay != "nao" && replay != 1 && replay != 2) {
      console.log(`Não entendi!`);
    }
  } while (replay != "sim" && replay != "nao" && replay != 1 && replay != 2);

  if (replay == "nao" || replay == 2) {
    console.log("Encerrando o jogo.");
    break;
  }
} while (true);
