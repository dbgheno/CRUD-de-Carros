const listaVeiculos = [
    { id: 'LP1T6TEF', modelo: 'Fiesta', marca: 'Ford', ano: 1996, cor: 'Preto', preco: 6000 },
    { id: 'LP1TG0L0', modelo: 'Gol', marca: 'Volkswagen', ano: 2000, cor: 'Vermelho', preco: 10000 },
    { id: 'LP1T123X', modelo: 'Uno', marca: 'Fiat', ano: 2000, cor: 'Branco', preco: 10500 },
    { id: 'LP1TCRTE', modelo: 'Chevette', marca: 'Chevrolet', ano: 1990, cor: 'Verde', preco: 11000, manutencao: true },
    { id: 'LP1TFU5C', modelo: 'Fusca', marca: 'Volkswagen', ano: 1986, cor: 'Verde', preco: 12000, manutencao: true, vinculo: 'dbgheno' },
    { id: 'LP1T55AB', modelo: 'Saveiro', marca: 'Volkswagen', ano: 2004, cor: 'Branco', preco: 25000, vinculo: 'vianbr' },
    { id: 'LP1TPETA', modelo: 'Ka', marca: 'Ford', ano: 2015, cor: 'Roxo', preco: 39000 },
    { id: 'LP1TASCX', modelo: 'Doblo', marca: 'Fiat', ano: 2012, cor: 'Vermelho', preco: 40000, vinculo: 'dbgheno' },
    { id: 'LP1TXINO', modelo: 'Onix', marca: 'Chevrolet', ano: 2016, cor: 'Azul', preco: 48000 },
    { id: 'LP1TLKIO', modelo: 'Strada', marca: 'Fiat', ano: 2018, cor: 'Amarelo', preco: 55000 },
    { id: 'LP1TMTFS', modelo: 'Fusion', marca: 'Ford', ano: 2023, cor: 'Preto', preco: 215000 },
    { id: 'LP1T45ZS', modelo: 'Camaro', marca: 'Chevrolet', ano: 2020, cor: 'Amarelo', preco: 450000 },
]

const usersList = [
    { user: 'dbgheno', password: 'meuscarros', veiculos: ['LP1TASCX', 'LP1TFU5C'] },
    { user: 'vianbr', password: 'carrosmeus', veiculos: ['LP1T55AB'] }
]

let usuarioLogado = 'geral'

function menuInicial() {
    let opcoes = prompt(`
        Como você deseja acessar o CRUD de Carros?\n
        1 - Logar com usuário específico;
        2 - Cadastrar novo usuário;
        3 - Acesso comum;
        4 - Sair do sistema;
    `)
    if (opcoes === '') { menuInicial(); return }
    if (opcoes === null) { sairDoSistema(); return }
    else opcoes = Number(opcoes)

    switch (opcoes) {
        case 1: login(); break;
        case 2: signUp(); break;
        case 3: bemVindo(); break;
        case 4: sairDoSistema(); break;
        default: alert(`Opção inválida!`); menuInicial(); break;
    }
}
menuInicial()

function login(list = usersList) {
    const user = prompt(`Digite seu nome de usuário:`)
    if (user === '') { login(); return }
    if (user === null) { menuInicial(); return }
    if (!list.some(any => any.user === user)) { alert(`Nome de usuário não encontrado!`); login(); return }
    const foundUser = list.find(users => users.user === user)
    function userPassword() {
        const password = prompt(`Digite sua senha:`)
        if (password === '') { userPassword(); return }
        if (password === null) { alert(`Login cancelado`); menuInicial(); return }
        if (password !== foundUser.password) { alert(`Senha inválida!`); userPassword(); return }
        else { alert(`Login efetuado com sucesso!\n\nBem vindo usuário ${user}!`); usuarioLogado = foundUser.user; bemVindo(); return }
    }
    userPassword()
}

function signUp(list = usersList) {
    const user = prompt(`Escolha um nome de usuário`)
    if (user === '') { signUp(); return }
    if (list.some(any => any.user === user)) { alert(`Nome de usuário já utilizado!`); signUp(); return }
    if (user === null) { menuInicial(); return }
    function newPassword() {
        const password = prompt(`Escolha uma senha:`)
        if (password === '') { newPassword(); return }
        if (password === null) { alert(`Cadastro cancelado`); menuInicial(); return }
        else { list.push({ user: user, password: password, veiculos: [] }); alert(`Usuário ${user} cadastrado com sucesso!`); menuInicial() }
    }
    newPassword()
}

function sairDoSistema(list = listaVeiculos) {
    const sair = confirm(`Você tem certeza que deseja sair do sistema?`)
    if (sair) {
        const veiculos = list.reduce((accumulator, veiculo) => {
            const veiculoString = `ID: ${veiculo.id.slice(0, 4)}-${veiculo.id.slice(4, 8)} | Modelo: ${veiculo.modelo} | Marca: ${veiculo.marca} | Ano: ${veiculo.ano} | Cor: ${veiculo.cor} | Preço: R$ ${(veiculo.preco.toLocaleString('pt-BR'))}<br>`
            return accumulator + veiculoString
        }, '')
        document.write(veiculos)
    } else {
        menuLogin()
    }
}

function bemVindo() {
    let opcao = prompt(`
        Bem vindo ao sistema de CRUD de veículos!
        No momento o sistema tem ${listaVeiculos.length} carros cadastrados.\n
        Escolha uma das opções para interagir com o sistema:
        1  - Cadastrar veículo;
        2  - Listar todos os veículos;
        3  - Filtrar veículos por marcas;
        4  - Atualizar veículo;
        5  - Remover veículo;
        6  - Sair para o menu inicial;
        7  - Filtrar por faixa de preço;
        8  - Encontrar o carro mais caro;
        9  - Mostrar carros por marca;
        10 - Mostrar média de preços;
        11 - Listar modelos por ordem alfabética;
        12 - Mostrar quantidade de carros por cor;
        13 - Busca avançada;
        14 - Veículos em manutenção;
        15 - Veículos vinculados;
    `);
    if (opcao === '') { bemVindo(); return }
    if (opcao === null) { menuLogin(); return }
    else opcao = Number(opcao)

    switch (opcao) {
        case 1: novoVeiculo(); break;
        case 2: listarVeiculos(); break;
        case 3: filtrarPorMarca(); break;
        case 4: atualizarVeiculo(); break;
        case 5: removerVeiculo(); break;
        case 6: menuLogin(); break;
        case 7: filtrarPrecos(); break;
        case 8: carroMaisCaro(); break;
        case 9: carrosPorMarca(); break;
        case 10: mediaPrecos(); break;
        case 11: ordemAlfabetica(); break;
        case 12: carrosPorCor(); break;
        case 13: buscaEspecifica(); break;
        case 14: manutencaoCarro(); break;
        case 15: desvincular(); break;
        default: alert(`Opção inválida!`); bemVindo(); break;
    }
}

// Opção 1
function novoVeiculo() {
    let modelo = '', marca = '', ano = '', cor = '', preco = '', veiculo = {}
    while (modelo === '') modelo = prompt(`Digite o modelo do veículo:`)
    if (modelo === null) { veiculo = null; bemVindo() } else {
        while (marca === '') marca = prompt(`Digite a marca do veículo:`)
        if (marca === null) { veiculo = null; bemVindo() } else {
            while (ano === '') ano = prompt(`Digite o Ano do veículo:`)
            if (ano === null) { veiculo = null; bemVindo() } else {
                while (cor === '') cor = prompt(`Digite a cor do veículo:`)
                if (cor === null) { veiculo = null; bemVindo() } else {
                    while (preco === '') preco = prompt(`Digite o preço do veículo`)
                    if (preco === null) { veiculo = null; bemVindo() } else {
                        veiculo = {
                            id: Date.now().toString(36).toUpperCase(), // o .toString(36) transforma o sistema decimal do número em um sistema hexatrigesimal, em que a contagem a partir do 9 utiliza as letras iniciando pelo 'a' valendo 10 até o 'z' valendo 35. Cada casa hexatrigesimal suporta 36 unidades ao invés de apenas 10.
                            modelo: modelo,
                            marca: marca,
                            ano: isNaN(parseFloat(ano)) ? 0 : parseFloat(ano),
                            cor: cor,
                            preco: isNaN(parseFloat(preco)) ? 0 : parseFloat(preco),
                        }
                        if (usuarioLogado !== 'geral') veiculo.vinculo = usuarioLogado
                        listaVeiculos.push(veiculo)
                        listaVeiculos.sort((a, b) => a.preco - b.preco) // método sort utilizado para ordenar os objetos do array baseado no preço, do menor ao maior. Toda vez que um novo veículo é adicionado ele entra em comparação com os demais e se posiciona ordenadamente de acordo com os preços já listados.
                        alert(`Veículo ${veiculo.modelo} cadastrado com sucesso!`)
                        bemVindo()
                    }
                }
            }
        }
    }
}

// Opção 2
function listarVeiculos(list = listaVeiculos) {
    let veiculos = '' // concatenação de string, a cada nova volta do for each acrescenta uma nova string
    list.forEach(veiculo => {
        veiculos += `ID: ${veiculo.id.slice(0, 4)}-${veiculo.id.slice(4, 8)} | Modelo: ${veiculo.modelo} | Marca: ${veiculo.marca} | Ano: ${veiculo.ano} | Cor: ${veiculo.cor} | Preço: R$ ${veiculo.preco.toLocaleString('pt-BR')}${veiculo.manutencao ? ` | *Veículo em manutenção` : ''}${veiculo.vinculo ? ` | *Veículo vinculado à: ${veiculo.vinculo}` : ''}\n` // .toLocaleString() transforma o número em uma string baseada em como costuma-se escrever na localidade referida, no caso ao referir 'pt-BR', ele escreve o número com pontos como separador de milhares e virgulas com no máximo 2 casa para representar valores decimais.
    })
    alert(veiculos)
    bemVindo()
}

// Opção 3
function filtrarPorMarca(list = listaVeiculos) {
    let marcas = []
    list.forEach(veiculo => !marcas.includes(veiculo.marca) ? marcas.push(veiculo.marca) : null)
    if (marcas.length > 0) {
        let numeroMarca = prompt(`Digite o número da marca a qual você deseja filtrar\nMarcas disponíveis:\n${marcas.map((m, i) => `   ${i + 1} - ${m}`).join('\n')}`); // o .map retorna um novo array com os elementos transformados pela operação inserida. Mas nesse caso o map foi utilizado apenas para iterar os elementos e expor seus respectivos índices
        if (numeroMarca === null) {
            bemVindo()
        } else if (marcas.length >= numeroMarca && numeroMarca > 0) {
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
    const identificador = prompt(`Digite o código identificador do veículo que você deseja atualizar:`)
    if (identificador === null) { bemVindo(); return } // if cancel retorna ao menu inicial
    if (identificador === '') { atualizarVeiculo(); return }
    const verificador = identificador.toUpperCase()
    const indiceVeiculo = list.findIndex(veiculo => veiculo.id === verificador)
    if (list[indiceVeiculo].vinculo && list[indiceVeiculo].vinculo !== usuarioLogado) {
        alert(`Este veículo está vinculado à: ${list[indiceVeiculo].vinculo} e você não tem permissão para atualizá-lo!`);
        atualizarVeiculo(); return
    }
    const nomeVeiculo = list[indiceVeiculo].modelo

    if (indiceVeiculo === -1) {
        alert(`Veículo não encontrado!\n Consulte a opção 2 para verificar os identificadores referentes aos veículos disponíveis.`)
        bemVindo()
    } else {
        let cor = '', preco = ''

        const novaCor = confirm(`Você deseja alterar a cor (${list[indiceVeiculo].cor}) do veículo ${nomeVeiculo}?`)
        if (novaCor) {
            while (cor === '') cor = prompt(`Qual a nova cor?`)
            if (cor !== null) {
                list[indiceVeiculo].cor = cor;
                usuarioLogado !== 'geral' ? list[indiceVeiculo].vinculo = usuarioLogado.user : null
            }
        }

        const novoPreco = confirm(`Você deseja alterar o preço (R$ ${list[indiceVeiculo].preco.toLocaleString('pt-BR')}) do veículo ${nomeVeiculo}?`)
        if (novoPreco) {
            while (preco === '' || preco < 0 || isNaN(preco)) preco = prompt(`Qual a nova preço?`)
            if (preco !== null) {
                list[indiceVeiculo].preco = isNaN(parseFloat(preco)) ? 0 : parseFloat(preco);
                usuarioLogado !== 'geral' ? list[indiceVeiculo].vinculo = usuarioLogado.user : null
            }
        }

        if (novaCor && cor || novoPreco && preco) { alert(`Veículo ${nomeVeiculo} atualizado com sucesso!`) }
        bemVindo()
    }
}

// Opção 5
function removerVeiculo(list = listaVeiculos) {
    const identificador = prompt(`Digite o código identificador do veículo que você deseja remover:`)
    if (identificador === null) { bemVindo(); return }
    if (identificador === '') { removerVeiculo(); return }
    const verificador = identificador.toUpperCase()
    const indiceVeiculo = list.findIndex(veiculo => veiculo.id === verificador)
    if (list[indiceVeiculo].vinculo && list[indiceVeiculo].vinculo !== usuarioLogado) {
        alert(`Este veículo está vinculado à: ${list[indiceVeiculo].vinculo} e você não tem permissão para removê-lo!`);
        removerVeiculo(); return
    }
    const nomeVeiculo = list[indiceVeiculo].modelo

    if (indiceVeiculo === -1) {
        alert(`Veículo não encontrado!\n Consulte a opção 2 para verificar os identificadores referentes aos veículos disponíveis.`)
        bemVindo()
    } else {
        const remover = confirm(`Você realmente deseja remover o veículo ${nomeVeiculo}?`)
        if (remover) {
            list.splice(indiceVeiculo, 1)
            alert(`Veículo ${nomeVeiculo} removido com sucesso!`)
        }
        bemVindo()
    }
}

// Opção 6
function menuLogin() {
    const sair = confirm(`Você tem certeza que deseja retornar ao menu inicial?`)
    if (sair) { usuarioLogado = 'geral'; menuInicial() }
    else bemVindo()
}

// Opção 7
function filtrarPrecos(list = listaVeiculos) {
    const precoMenor = prompt(`Qual o preço mínimo que você deseja estipular?\n(digite um número inteiro positivo)`)
    if (precoMenor === null) bemVindo()
    else {
        const precoMaior = prompt(`Qual o preço máximo que você deseja estipular?\n(digite um número inteiro positivo)`)
        if (precoMaior === null) bemVindo()
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
    alert(`O carro mais caro encontrado é o:\n\n ID: ${veiculo.id.slice(0, 4)}-${veiculo.id.slice(4, 8)} | Modelo: ${veiculo.modelo} | Marca: ${veiculo.marca} | Ano: ${veiculo.ano} | Cor: ${veiculo.cor} | Preço: R$ ${veiculo.preco.toLocaleString('pt-BR')}${veiculo.manutencao ? ` | *Veículo em manutenção` : ''}${veiculo.vinculo ? ` | *Veículo vinculado à: ${veiculo.vinculo}` : ''}`)
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
            veiculosPorMarca += `ID: ${veiculo.id.slice(0, 4)}-${veiculo.id.slice(4, 8)} | Modelo: ${veiculo.modelo} | Ano: ${veiculo.ano} | Cor: ${veiculo.cor} | Preço: R$ ${veiculo.preco.toLocaleString('pt-BR')}${veiculo.manutencao ? ` | *Veículo em manutenção` : ''}${veiculo.vinculo ? ` | *Veículo vinculado à: ${veiculo.vinculo}` : ''}\n`
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
    if (busca === null) { bemVindo(); return }
    if (busca === '') { buscaEspecifica(); return }
    const veiculosEncontrados = list.filter(veiculo => Object.values(veiculo).some(valor => String(valor).toUpperCase() === (busca.toUpperCase())))
    // Object.values(veiculo) é um meio dinâmico de se referir a cada valor das propriedades de um objeto. Nesse caso, o .filter avalia cada objeto "veiculo" do array list e verifica seus Object.values - // o .some retorna true caso algum item corresponda ao verificado por ele. Nesse caso, o Object.values verifica cada valor de cada objeto dentro do array list e através do "some" ele verifica se cada valor é igual ao valor de busca, se for, o some registra "true" e tal objeto é validado para o filter incluir no array veiculosEncontrados
    if (veiculosEncontrados.length > 0) {
        alert(`Confira a lista dos veículos encontrados pelo termo "${busca}":`)
        listarVeiculos(veiculosEncontrados)
    } else {
        alert(`Nenhum veículo foi encontrado pelo termo "${busca}"!`)
        buscaEspecifica()
    }
}

// Opção 14
function manutencaoCarro(list = listaVeiculos) {

    function listaManutencao() {
        const veiculosEmManutencao = list.filter(veiculo => veiculo.manutencao)
        alert(`Confira a lista atualizada dos veículos que se encontram em manutenção:`)
        let veiculos = ''
        veiculosEmManutencao.forEach(veiculo => {
            veiculos += `ID: ${veiculo.id.slice(0, 4)}-${veiculo.id.slice(4, 8)} | Modelo: ${veiculo.modelo} | Marca: ${veiculo.marca} | Ano: ${veiculo.ano} | Cor: ${veiculo.cor} | Preço: R$ ${veiculo.preco.toLocaleString('pt-BR')}${veiculo.manutencao ? ` | *Veículo em manutenção` : ''}${veiculo.vinculo ? ` | *Veículo vinculado à: ${veiculo.vinculo}` : ''}\n`
        })
        alert(veiculos)
    }

    const novaManutencao = confirm(`Você deseja adicionar algum veículo para manutenção?\n\nClick em "Cancel" caso queira apenas consultar os que já estão em manutenção.`)
    if (novaManutencao) {

        function adicao() {
            const identificador = prompt(`Digite o código identificador do veículo que você deseja adicionar para a manutenção:`)
            if (identificador === '') { adicao(); return } //return interrompe o restante da iteração do da função. Caso o if seja atendido, ele vai para adicao() e o return grante que o resto do código não seja executado. Se algo é atribuído ao return ele executa tal valor, se não ele só interrompe a função.
            if (identificador !== null && identificador !== '') {
                const verificador = identificador.toUpperCase()
                const indiceVeiculo = list.findIndex(veiculo => veiculo.id === verificador)
                if (list[indiceVeiculo].vinculo && list[indiceVeiculo].vinculo !== usuarioLogado) {
                    alert(`Este veículo está vinculado à: ${list[indiceVeiculo].vinculo} e você não tem permissão para adicioná-lo à manutenção!`);
                    adicao(); return
                }
                const nomeVeiculo = list[indiceVeiculo].modelo
                const confirmar = confirm(`Confirmar adição do veículo ${nomeVeiculo} para a manutenção?`)
                if (confirmar) {
                    list[indiceVeiculo].manutencao = true
                    usuarioLogado !== 'geral' ? list[indiceVeiculo].vinculo = usuarioLogado.user : null
                    alert(`Veículo ${nomeVeiculo} adicionado para a manutenção`)
                }
            }
            const maisRemocao = confirm(`Você deseja adicionar algum outro veículo para a manutenção?`)
            if (maisRemocao) adicao()
            else {
                listaManutencao()
            }
        }
        adicao()

    } else listaManutencao()

    const manutencao = confirm(`Você deseja remover algum veículo da manutenção?`)
    if (manutencao) {

        function remocao() {
            const identificador = prompt(`Digite o código identificador do veículo que você deseja remover da manutenção:`)
            if (identificador === '') { remocao(); return }
            if (identificador !== null && identificador !== '') {
                const verificador = identificador.toUpperCase()
                const indiceVeiculo = list.findIndex(veiculo => veiculo.id === verificador)
                if (list[indiceVeiculo].vinculo && list[indiceVeiculo].vinculo !== usuarioLogado) {
                    alert(`Este veículo está vinculado à: ${list[indiceVeiculo].vinculo} e você não tem permissão para removê-lo da manutenção!`);
                    remocao(); return
                }
                const nomeVeiculo = list[indiceVeiculo].modelo
                const confirmar = confirm(`Confirmar remoção do veículo ${nomeVeiculo} da manutenção?`)
                if (confirmar) {
                    delete list[indiceVeiculo].manutencao
                    usuarioLogado !== 'geral' ? list[indiceVeiculo].vinculo = usuarioLogado.user : null
                    alert(`Veículo ${nomeVeiculo} removido da manutenção`)
                }
            }
            const maisRemocao = confirm(`Você deseja remover algum outro veículo da manutenção?`)
            if (maisRemocao) remocao()
            else {
                listaManutencao()
                bemVindo()
            }
        }
        remocao()

    } else bemVindo()
}

// Opção 15
function desvincular(list = listaVeiculos) {
    if (usuarioLogado === 'geral') { alert(`Você está no acesso geral, esta opção só é válida para usuários específicos!`); bemVindo(); return }
    const veiculosDoUsuario = list.filter(veiculo => veiculo.vinculo === usuarioLogado)
    if (veiculosDoUsuario.length > 0) {
        alert(`Confira os veículos vinculados à você:`)
        let veiculos = ''
        veiculosDoUsuario.forEach(veiculo => {
            veiculos += `ID: ${veiculo.id.slice(0, 4)}-${veiculo.id.slice(4, 8)} | Modelo: ${veiculo.modelo} | Marca: ${veiculo.marca} | Ano: ${veiculo.ano} | Cor: ${veiculo.cor} | Preço: R$ ${veiculo.preco.toLocaleString('pt-BR')}${veiculo.manutencao ? ` | *Veículo em manutenção` : ''}${veiculo.vinculo ? ` | *Veículo vinculado à: ${veiculo.vinculo}` : ''}\n`
        })
        alert(veiculos)
        const removerVinculo = confirm(`Você deseja remover seu vínculo de um de seus veículos?`)
        if (removerVinculo) {
            function desvincularVeiculo() {
                const qualVeiculo = prompt(`Digite o código identificador do veículo que você deseja desvincular:`)
                if (qualVeiculo === '') { desvincularVeiculo(); return }
                if (qualVeiculo === null) { const voltarMenu = confirm(`Você deseja voltar ao menu principal?`); if (voltarMenu) { bemVindo(); return } else { desvincularVeiculo(); return } }
                const verificador = qualVeiculo.toUpperCase()
                const indiceVeiculo = list.findIndex(veiculo => veiculo.id === verificador)
                const nomeVeiculo = list[indiceVeiculo].modelo
                if (indiceVeiculo === -1) {
                    alert(`Veículo não encontrado!\nReveja os códigos identificadores dos veículos vinculados ao seu usuário.`)
                    desvincular(); return
                } else {
                    const confirmarDesvinculo = confirm(`Confirmar desvínculo do véiculo ${nomeVeiculo}?`)
                    if (confirmarDesvinculo) {
                        list[indiceVeiculo].vinculo = null
                        alert(`Veículo ${nomeVeiculo} desvinculado com sucesso!`)
                        bemVindo(); return
                    } else {
                        alert(`Veículo ${nomeVeiculo} manteve-se vinculado ao seu usuário ${usuarioLogado}.`)
                        bemVindo(); return
                    }
                }
            }
            desvincularVeiculo()
        } else { bemVindo(); return }
    } else { alert(`Você não possui nenhum veículo vinculado ao seu usuário!`); bemVindo(); return }
}



