const listaVeiculos = [
    { id: 'LP1T6TEF', modelo: 'Fiesta', marca: 'Ford', ano: 1986, cor: 'Preto', preco: 6000 },
    { id: 'LP1TG0L0', modelo: 'Gol', marca: 'Volkswagen', ano: 2000, cor: 'Vermelho', preco: 10000 },
    { id: 'LP1T123X', modelo: 'Uno', marca: 'Fiat', ano: 2000, cor: 'Branco', preco: 10500 },
    { id: 'LP1TCRTE', modelo: 'Chevette', marca: 'Chevrolet', ano: 1990, cor: 'Verde', preco: 11000 },
    { id: 'LP1TFU5C', modelo: 'Fusca', marca: 'Volkswagen', ano: 1986, cor: 'Verde', preco: 12000 },
    { id: 'LP1T55AB', modelo: 'Saveiro', marca: 'Volkswagen', ano: 2004, cor: 'Branco', preco: 25000 },
    { id: 'LP1TPETA', modelo: 'Ka', marca: 'Ford', ano: 2015, cor: 'Roxo', preco: 39000 },
    { id: 'LP1TASCX', modelo: 'Doblo', marca: 'Fiat', ano: 2012, cor: 'Vermelho', preco: 40000 },
    { id: 'LP1TXINO', modelo: 'Onix', marca: 'Chevrolet', ano: 2016, cor: 'Azul', preco: 48000 },
    { id: 'LP1TLKIO', modelo: 'Strada', marca: 'Fiat', ano: 2018, cor: 'Amarelo', preco: 55000 },
    { id: 'LP1TMTFS', modelo: 'Fusion', marca: 'Ford', ano: 2023, cor: 'Preto', preco: 215000 },
    { id: 'LP1T45ZS', modelo: 'Camaro', marca: 'Chevrolet', ano: 2020, cor: 'Amarelo', preco: 450000 },
]

function bemVindo() {
    const opcao = prompt(`
        Bem vindo ao sistema de CRUD de veículos!
        No momento o sistema tem ${listaVeiculos.length} carros cadastrados.\n
        Escolha uma das opções para interagir com o sistema:
        1  - Cadastrar veículo;
        2  - Listar todos os veículos;
        3  - Filtrar veículos por marcas;
        4  - Atualizar veículo;
        5  - Remover veículo;
        6  - Sair do sistema;
        7  - Filtrar por faixa de preço;
        8  - Encontrar o carro mais caro;
        9  - Mostrar carros por marca;
        10 - Mostrar média de preços;
        11 - Listar modelos por ordem alfabética;
        12 - Mostrar quantidade de carros por cor;
        13 - Busca avançada;
    `);
    opcao === '' ? bemVindo() : opcao === null ? sairDoSistema() : qualOpcao(Number(opcao))
}

function qualOpcao(opcao) {
    switch (opcao) {
        case 1: novoVeiculo(); break;
        case 2: listarVeiculos(); break;
        case 3: filtrarPorMarca(); break;
        case 4: atualizarVeiculo(); break;
        case 5: removerVeiculo(); break;
        case 6: sairDoSistema(); break;
        case 7: filtrarPrecos(); break;
        case 8: carroMaisCaro(); break;
        case 9: carrosPorMarca(); break;
        case 10: mediaPrecos(); break;
        case 11: ordemAlfabetica(); break;
        case 12: carrosPorCor(); break;
        case 13: buscaEspecifica(); break;
        default: alert(`Opção inválida!`); bemVindo(); break;
    }
}
bemVindo();

// Opção 1
function novoVeiculo() {
    const veiculo = {
        id: Date.now().toString(36).toUpperCase(), // o .toString
        modelo: prompt(`Digite o modelo do veículo:`),
        marca: prompt(`Digite a marca do veículo:`),
        ano: Number(prompt(`Digite o Ano do veículo:`)),
        cor: prompt(`Digite a cor do veículo:`),
        preco: Number(prompt(`Digite o preço do veículo`))
    }
    listaVeiculos.push(veiculo)
    listaVeiculos.sort((a, b) => a.preco - b.preco) // método sort utilizado para ordenar os objetos do array baseado no preço, do menor ao maior. Toda vez que um novo veículo é adicionado ele entra em comparação com os demais e se posiciona ordenadamente de acordo com os preços já listados.
    alert(`Veículo ${veiculo.modelo} cadastrado com sucesso!`)
    bemVindo()
}

// Opção 2
function listarVeiculos(list = listaVeiculos) {
    let veiculos = '' // concatenação de string, a cada nova volta do for each acrescenta uma nova string
    list.forEach(veiculo => {
        veiculos += `ID: ${veiculo.id.slice(0, 4)}-${veiculo.id.slice(4, 8)} | Modelo: ${veiculo.modelo} | Marca: ${veiculo.marca} | Ano: ${veiculo.ano} | Cor: ${veiculo.cor} | Preço: R$ ${veiculo.preco.toLocaleString('pt-BR')}\n` // .toLocaleString() transforma o número em uma string baseada em como costuma-se escrever na localidade referida, no caso ao referir 'pt-BR', ele escreve o número com pontos como separador de milhares e virgulas com no máximo 2 casa para representar valores decimais.
    })
    alert(veiculos)
    bemVindo()
}

// Opção 3
function filtrarPorMarca(list = listaVeiculos) {
    let marcas = []
    list.forEach(veiculo => !marcas.includes(veiculo.marca) ? marcas.push(veiculo.marca) : null)
    if (marcas.length > 0) {
        let numeroMarca = prompt(`Digite o número da marca a qual você deseja filtrar\nMarcas disponíveis:\n${marcas.map((m, i) => `   ${i + 1} - ${m}`).join('\n')}`);
        if (numeroMarca === null) {
            bemVindo()
        } else if (marcas.length >= numeroMarca && numeroMarca > 1) {
            listarVeiculos(list.filter(veiculo => veiculo.marca === marcas[numeroMarca - 1]))
        } else {
            alert(`Marca não encontrada!\nDigite uma número de marca válido!`)
            filtrarPorMarca()
        }
    } else {
        alert(`Nenhuma marca registrada até o momento!`)
        bemVindo()
    }
}

// Opção 4
function atualizarVeiculo(list = listaVeiculos) {
    const identificador = prompt(`Digite o código identificador do veículo:`)
    if (identificador === null) bemVindo() // if cancel retorna ao menu inicial
    const verificador = identificador.toUpperCase()
    if (!list.some(veiculo => veiculo.id === verificador)) {
        alert(`Veículo não encontrado!\n Consulte a opção 2 para verificar os identificadores referentes aos veículos disponíveis.`)
        bemVindo()
    } else {
        const novaCor = confirm(`Você deseja alterar a cor deste veículo?`)
        if (novaCor) list.cor = prompt(`Qual a nova cor?`)
        const novoPreco = confirm(`Você deseja alterar o preço deste veículo?`)
        if (novoPreco) list.preco = Number(prompt(`Qual o novo preço?`))
        if (novaCor || novoPreco) { alert(`Veículo ${verificador} atualizado com sucesso!`) }
        bemVindo()
    }
}

// Opção 5
function removerVeiculo(list = listaVeiculos) {
    const identificador = prompt(`Digite o código identificador do veículo:`)
    if (identificador === null) bemVindo()
    const verificador = identificador.toUpperCase()
    if (!list.some(veiculo => veiculo.id === verificador)) {
        alert(`Veículo não encontrado!\n Consulte a opção 2 para verificar os identificadores referentes aos veículos disponíveis.`)
        bemVindo()
    } else {
        const remover = confirm(`Você realmente deseja remover este veículo?`)
        if (remover) {
            const idFind = list.findIndex(veiculo => veiculo.id === identificador)
            list.splice(idFind, 1)
            alert(`Veículo ${verificador} removido com sucesso!`)
        }
        bemVindo()
    }
}

// Opção 6
function sairDoSistema(list = listaVeiculos) {
    const sair = confirm(`Você tem certeza que deseja sair do sistema?`)
    if (sair) {
        const veiculos = list.reduce((accumulator, veiculo) => {
            const veiculoString = `ID: ${veiculo.id.slice(0, 4)}-${veiculo.id.slice(4, 8)} | Modelo: ${veiculo.modelo} | Marca: ${veiculo.marca} | Ano: ${veiculo.ano} | Cor: ${veiculo.cor} | Preço: R$ ${(veiculo.preco.toLocaleString('pt-BR'))}<br>`
            return accumulator + veiculoString
        }, '')
        document.write(veiculos)
    } else {
        bemVindo()
    }
}

// Opção 7
function filtrarPrecos(list = listaVeiculos) {
    const precoMenor = prompt(`Qual o preço mínimo que você deseja estipular?\n(digite um número inteiro positivo)`)
    if (precoMenor === null) { bemVindo() }
    else {
        const precoMaior = prompt(`Qual o preço máximo que você deseja estipular?\n(digite um número inteiro positivo)`)
        if (precoMaior === null) { bemVindo() }
        else {
            const faixaPrecos = list.filter(veiculo => veiculo.preco >= Number(precoMenor) && veiculo.preco <= Number(precoMaior))
            if (faixaPrecos.length === 0) {
                alert(`Nenhum veículo encontrando entre os preços indicados!\nVerifique se você digitou números válidos!`)
                bemVindo()
            } else { listarVeiculos(faixaPrecos) }
        }
    }
}

// Opção 8
function carroMaisCaro(list = listaVeiculos) {
    let preco = 0
    list.forEach(carro => carro.preco > preco ? preco = carro.preco : null)
    // for (let carro of list) { carro.preco > preco ? preco = carro.preco : null }
    const veiculo = list.find(carro => carro.preco === preco)
    alert(`O carro mais caro encontrado é o:\n\n ID: ${veiculo.id.slice(0, 4)}-${veiculo.id.slice(4, 8)} | Modelo: ${veiculo.modelo} | Marca: ${veiculo.marca} | Ano: ${veiculo.ano} | Cor: ${veiculo.cor} | Preço: R$ ${veiculo.preco.toLocaleString('pt-BR')}`)
    bemVindo()
}

// Opção 9
function carrosPorMarca(list = listaVeiculos) {
    const objetoMarcas = {}
    list.forEach(veiculo => {
        !objetoMarcas[veiculo.marca] ? objetoMarcas[veiculo.marca] = [] : null
        objetoMarcas[veiculo.marca].push(veiculo)
    })
    let veiculosPorMarca = ''
    for (let marca in objetoMarcas) {
        veiculosPorMarca += `Veículos da marca ${marca}:\n`
        objetoMarcas[marca].forEach(veiculo => {
            veiculosPorMarca += `ID: ${veiculo.id.slice(0, 4)}-${veiculo.id.slice(4, 8)} | Modelo: ${veiculo.modelo} | Ano: ${veiculo.ano} | Cor: ${veiculo.cor} | Preço: R$ ${veiculo.preco.toLocaleString('pt-BR')}\n`
        })
        veiculosPorMarca += '\n' // espaço adiciona entre os agrupamentos de cada marca
    }
    alert(veiculosPorMarca)
    bemVindo()
}

// Opção 10
function mediaPrecos(list = listaVeiculos) {
    let somaPrecos = 0
    list.forEach(veiculo => somaPrecos += veiculo.preco)
    alert(`A média de preço de todos os carros é R$ ${Number((somaPrecos / list.length).toFixed(2)).toLocaleString('pt-BR')}`)
    bemVindo()
}

// Opção 11
function ordemAlfabetica(list = listaVeiculos) {
    alfabetica = list.slice().sort((a, b) => a.modelo.toUpperCase() < b.modelo.toUpperCase() ? -1 : 1)
    // método sort para ordenação alfabética de valores de propriedades de elementos objetos - o slice faz uma cópia superficial do array para a variável designada (alfabetica) sem modificar o array original - o toUpperCase padroniza a ordem do sort ignorando se o item sorteado tenha sido escrito em maiúsculas ou minúscula (por padrão o sort coloca primeiro números, depois todas as maiúsculas antes das minúsculas)
    listarVeiculos(alfabetica)
}

// Opção 12
function carrosPorCor(list = listaVeiculos) {
    let cores = []
    list.forEach(veiculo => !cores.includes(veiculo.cor) ? cores.push(veiculo.cor) : null)
    let objetoCores = {}
    cores.forEach(cor => {
        const quantidadeCadaCor = list.filter(veiculo => veiculo.cor === cor)
        objetoCores[cor] = quantidadeCadaCor.length
    })
    let coresString = ''
    for (cadaCor in objetoCores) { coresString += `Existem o total de ${objetoCores[cadaCor]} veículos cadastrados na cor ${cadaCor}\n` }
    alert(coresString) // objetoCores[cadaCor] é o caminho dinâmico de onde se encontra determinado valor no objeto, portanto ele resultará na mostragem do valor da respectiva propriedade "cadaCor" de cada loop for in - já a propriedade "cadaCor" escrita solta representa a propriedade em si e não o seu valor
    bemVindo()
}

// Opção 13
function buscaEspecifica(list = listaVeiculos) {
    const busca = prompt(`Digite uma característica do carro que você deseja encontrar:`)
    if (busca === null) bemVindo()
    const veiculosEncontrados = list.filter(veiculo => Object.values(veiculo).some(valor => String(valor).toUpperCase() === (busca.toUpperCase())))
    // Object.values(veiculo) é um meio dinâmico de se referir a cada valor de cada objeto dentro do array list que está designado na função como "veiculo" - // o .some retorna true caso algum item corresponda ao verificado por ele. Nesse caso, o Object.values verifica cada valor de cada objeto dentro do array list e através do "some" ele verifica se cada valor é igual valor de busca, se for, o some registra "true" e tal objeto é validado para o filter incluir no array veiculosEncontrados
    if (veiculosEncontrados.length > 0) {
        alert(`Confira a lista dos veículos encontrados pelo termo "${busca}":`)
        listarVeiculos(veiculosEncontrados)
    } else {
        alert(`Nenhum veículo foi encontrado pelo termo "${busca}"!`)
        buscaEspecifica()
    }
}
