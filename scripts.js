
const uploadBtn = document.getElementById('upload-btn');
const inputUpload = document.getElementById('image-upload');

uploadBtn.addEventListener('click', () => {
    inputUpload.click();
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name })
        }

        leitor.onerror = () => {
            console.error("Erro ao ler o arquivo:", leitor.error);
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo);
    });
}

const imagemPrincipal = document.querySelector('.main-imagem'); // Pegando a imagem principal
const nomeDaImagem = document.querySelector('.container-imagem-nome p') // Pegando o nome da imagem e o parágrafo

inputUpload.addEventListener('change', async (evento) => {
    const arquivo = evento.target.files[0]; // Pega o primeiro arquivo da lista

    // Verifica se o arquivo é uma imagem
    if (arquivo) {
        try {
            const conteudoDoArquivo =  await lerConteudoDoArquivo(arquivo); // Retorna uma Promise
            imagemPrincipal.src = conteudoDoArquivo.url; // Adiciona a imagem no src
            nomeDaImagem.textContent = conteudoDoArquivo.nome; // Adiciona o nome da imagem no parágrafo
        } catch (erro) {
            console.error("Erro na leitura do arquivo");
        }
    }
})

const inputTags = document.getElementById('input-tags'); // Pegando o input de tags
const listaTags = document.getElementById('lista-tags'); // Pegando a lista de tags



listaTags.addEventListener('click', (evento) => {
    // Verifica se o elemento clicado é o ícone de fechar
    // Se for, remove a tag da lista
    if(evento.target.classList.contains('remove-tag')) {
        const tagParaRemover = evento.target.parentElement; // Pega o elemento pai do ícone de fechar (que é a tag)
        listaTags.removeChild(tagParaRemover); // Remove a tag da lista
    }
})

// Array com as possíveis tags disponíveis
const tagsDisponiveis = ["Front-End", "Full-Stack", "Back-End", "Programação", "Data Science", "DevOps", "UI/UX", "HTML", "CSS", "React", "Vue.Js", "Angular", "JavaScript", "Java", "SpringBoot", "Python", "C#", ".Net", "PhP"]; 

// Função asíncrona que verifica se a tag está disponível e condiz com a lista de tags disponíveis
async function vericaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto)); // Verifica se a tag está no array de tags disponíveis
        }, 1000); // Espera 1 segundo para simular uma requisição assíncrona
    })
} 

// Adicionando o evento de keypress no input de tags que escuta quando o usuário aperta a tecla
inputTags.addEventListener('keypress', async (evento) => {
    // Verifica se a tecla pressionada é o Enter
    if(evento.key === 'Enter') { 
        evento.preventDefault(); // Previne o comportamento padrão do Enter (que é enviar o formulário)
        const tagTexto = inputTags.value.trim(); // Pega o valor do input e remove os espaços em branco no início e no fim
        // Verifica se o valor do input não está vazio
        if(tagTexto !== '') {
            try {
                const tagExiste = await vericaTagsDisponiveis(tagTexto); // Verifica se a tag existe no array de tags disponíveis
                if(tagExiste) {
                const tagNova = document.createElement('li'); // Cria um novo elemento li
                tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`; // Adiciona o texto da tag no parágrafo e o ícone de fechar
                listaTags.appendChild(tagNova); // Adiciona a nova tag na lista de tags
                inputTags.value = ''; // Limpa o input de tags
                } else {
                    alert("Tag não encontrada!"); // Exibe um alerta para o usuário caso a tag não exista
                }
            } catch (error) {
                    console.error("Erro ao verificar a tag"); // Caso ocorra um erro, exibe no console
                    alert("Erro ao verificar a existência da tag. Verifique o console"); // Exibe um alerta para o usuário
            }
        }
    }
})


async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const deuCerto = Math.random() > 0.5; // Simula uma resposta aleatória (50% de chance de dar certo ou errado)

            if(deuCerto) {
                resolve("Projeto publicado com sucesso!"); // Se deu certo, resolve a Promise com uma mensagem de sucesso
            } else {
                reject("Erro ao publicar o projeto!"); // Se deu errado, rejeita a Promise com uma mensagem de erro
            }
        }, 2000); // Espera 2 segundos para simular uma requisição assíncrona
    })
}

const botaoPublicar = document.querySelector('.botao-publicar'); // Pegando o botão de publicar

botaoPublicar.addEventListener('click', async (evento) => {
    evento.preventDefault(); // Previne o comportamento padrão do botão (que é enviar o formulário)

    const nomeDoProjeto = document.getElementById('nome').value; // Pegando o input de nome do projeto 
    const descricaoDoProjeto = document.getElementById('descricao').value; // Pegando o input de descrição do projeto
    const tagsProjeto = Array.from(listaTags.querySelectorAll('p')).map((tag) => tag.textContent); // Pega todas as tags da lista e transforma em um array com o texto das tags

    try {
        const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto); // Chama a função de publicar projeto e espera o resultado
        console.log(resultado); // Exibe o resultado no console
        alert("Deu tudo certo! Projeto publicado!"); // Exibe um alerta para o usuário informando que deu tudo certo
    } catch (error) {
        console.log("Erro ao publicar o projeto.", error); // Caso ocorra um erro, exibe no console
        alert("Erro ao publicar o projeto. Verifique o console"); // Exibe um alerta para o usuário informando que ocorreu um erro
    }
    
})

const botaoDescartar = document.querySelector('.botao-descartar'); // Pegando o botão de descartar

botaoDescartar.addEventListener('click', (evento) => {
    evento.preventDefault();

    const formulario = document.querySelector('form'); // Pegando o formulário
    formulario.reset(); // Reseta o formulário (limpa todos os inputs e campos)

    imagemPrincipal.src = "./img/imagem1.png"; // Reseta a imagem principal para a imagem padrão
    nomeDaImagem.textContent = "image_projeto.png"; // Reseta o nome da imagem para o padrão
    console.log(listaTags); // Verifica se o elemento está sendo acessado
    listaTags.innerHTML = ""; // Limpa a lista de tags (remove todas as tags)
})