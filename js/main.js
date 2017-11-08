var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(document).ready(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase(){
var frase = $(".frase").text();
var numPalavras = frase.split(" ").length;
var tamanhoFrase = $("#tamanho-frase");
tamanhoFrase.text(numPalavras);
}

function inicializaContadores(){
campo.on("input", function(){
    var conteudo = campo.val();
    var qtdePalavras = conteudo.split(/\S+/).length - 1;
    $("#contador-palavras").text(qtdePalavras);
    var qtdeCaracteres = conteudo.length;
    $("#contador-caracteres").text(qtdeCaracteres);
});
}

function inicializaCronometro(){
var tempoRestante = $("#tempo-digitacao").text();
campo.one("focus", function(){
    var cronometroID = setInterval(function(){
        tempoRestante--;
        $("#tempo-digitacao").text(tempoRestante);
       if(tempoRestante < 1){
            clearInterval(cronometroID);
            finalizaJogo();
       }
    }, 1000);
});
}

function finalizaJogo(){
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    campo.toggleClass("border-disabled");
    inserePlacar();
}

function inicializaMarcadores(){
var frase = $(".frase").text();
campo.on("input", function(){
    var digitado = campo.val();
    var comparavel = frase.substr(0,digitado.length);
    if (digitado == comparavel) {
        campo.addClass("campo-correto");
        campo.removeClass("campo-errado");
    } else{
        campo.addClass("campo-errado");
        campo.removeClass("campo-correto");
    }
});
}

function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Rinaldi";
    var numPalavras = $("#contador-palavras").text();
    var linha = novaLinha(usuario,numPalavras);
    linha.find(".botao-remover").click(removeLinha);
    corpoTabela.prepend(linha);
};

function novaLinha(usuario, palavras){
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");
    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");
    link.append(icone);
    colunaRemover.append(link);
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);
    return linha;
}

function removeLinha(){
    event.preventDefault();
    $(this).parent().parent().remove();
}

function reiniciaJogo(){
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.removeClass("campo-correto");
    campo.removeClass("campo-errado");
}