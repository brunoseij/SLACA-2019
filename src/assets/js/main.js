
// Ver mais / Ver menos
(function($){
	const paragrafos = $('#resumo p:not(:first-child)')
	paragrafos.css('display', 'none')
	const primeiroParagrafo = $('#resumo p:first-child')
	const ultimoParagrafo =$('#resumo p:last-child')
	ultimoParagrafo.addClass('iln')
	primeiroParagrafo.append($('<span>').html('..')).css('display', 'inline')
	
	const botao = $('<button id="toggle-text">')
	botao.html('Ver mais').css({ 
		"border": "none", 
		"background-color": "inherit", 
		"color": "#ED7839", 
		"cursor": "pointer" 
	})
	$('#resumo .conteudo').append(botao)
	
	botao.hover((e) => botao.toggleClass('hover'))
	botao.click((e) => {
		$('#resumo p>span').toggle(0)
		paragrafos.each((i, paragrafo) => {
			$(paragrafo).toggle(0)
		})
		botao.html() == 'Ver menos' ? botao.html('Ver mais') : botao.html('Ver menos')
	})
	
	// Menu lateral
	$('#menu a').hover(mouseDentro, mouseFora)
	function mouseDentro() {
		if (!$(this).hasClass('ativo')) {
			$(this).animate({ "padding-left": `+=${5}` }, 50)
			$(this).css('background-color', '#FDF1EB')
		}
	}
	
	function mouseFora() {
		if (!$(this).hasClass('ativo')) {
			$(this).animate({ "padding-left": `+=${-5}` }, 50)
			$(this).css('background-color', '#FFF')
		}
	}
	
	// Discussao
	$('.novo-topico').click((e) => {
		$('#form').css('display', 'block')
		$('#intro-discussao').css('display', 'none')
		$('#topico-criado').css('display', 'none')
	})

	let idPergunta = 0
	const getId = () => {
		idPergunta += 1
		return idPergunta
	}

	$('#enviar').click(e => {
		const assunto = $('input').val()
		const conteudo = $('textarea').val()

		if (conteudo && assunto) {
			new Topico(assunto, conteudo, getId())

			$('#topico-criado').css('display', 'block')
			$('#form').css('display', 'none')
			$('input').val('')
			$('textarea').val('')
			$('.erro').css('display', 'none')
		} else {
			const erroAssunto = $('input').prev()
			const erroConteudo = $('#wrapper-conteudo').prev()

			!assunto ? erroAssunto.css('display', 'block') : erroAssunto.css('display', 'none')
			!conteudo ? erroConteudo.css('display', 'block') : erroConteudo.css('display', 'none')
		}
	})

	$('.topico .resposta').css('display', 'none')
	
	function Topico(assunto, conteudo, id){
		const topico = $('<div class="topico">')
		let likes = 0

		const addLike = (e) => {
			likes += 1
			contadorLike.html(`${likes} like`)
			$(e.target).one('click', removerLike).addClass('clicado')
		}
		const removerLike = (e) => {
			likes -= 1
			contadorLike.html(`${likes} likes`)
			$(e.target).one('click', addLike).removeClass('clicado')
		}

		const divPergunta = $(`<div id="${id}">`).addClass('pergunta')
		const elemAssunto = $('<h3>').addClass('assunto').html(assunto)
		const elemAutorPergunta = $('<h4>').addClass('autor').html('Você')
		const elemConteudo = $('<p>').addClass('pergunta-conteudo').html(conteudo)

		elemAssunto.hover(addHover)
		elemAssunto.click(toggleRes)

		const amei = $('<button type="button" aria-label="Amei">').append('<img src="assets/imgs/coracao.svg">').addClass('botao-like').one('click', addLike)

		const contadorLike = $('<span>').html(`${likes} likes`)
		const contadorResposta = $('<span>').html(`0 respostas`)

		const info = $('<button type="button" aria-label="Informações" class="botao-info">').append('<img src="assets/imgs/info.svg" alt="Info">')

		divPergunta.append(elemAssunto, elemAutorPergunta, elemConteudo)
		divPergunta.append($('<div>').addClass('comentario-botoes').append(info, amei, contadorLike, contadorResposta))
		topico.append(divPergunta)
		topico.insertAfter($('#topico-criado'))

		const addResposta = (e, nome = 'Você') => {
			const id = $(e.target).attr('pergunta')
			const resposta = $(`textarea[pergunta="${id}"]`).val()

			const divResposta = $(`<div pergunta="${id}">`).addClass('resposta')
			const resp = $('<p>').addClass('pergunta-conteudo')
			const autorResposta = $('<h4>').addClass('autor')
			autorResposta.html(nome)
			resp.html(resposta)
			divResposta.append(autorResposta, resp)
			divResposta.insertAfter($(`#${id}`))
			contadorResposta.html(`${$(`#${id}`).siblings().length - 1} respostas`)
			$(`textarea[pergunta="${id}"]`).val('')
		}

		// Resposta
		const ta = $(`<textarea pergunta="${id}">`)
		const botaoResponder = $(`<button pergunta="${id}">`).addClass("botao-discussao responder").html('Enviar Resposta')
		const wrapperBotao = $('<div>').addClass('wrapper-botao')
		wrapperBotao.append($('<div class="espacador">'), botaoResponder)
		
		topico.append($('<div>').addClass('resposta caixa-comentario').append(ta, wrapperBotao))
		$('.topico .resposta').css('display', 'none')
		$(`.responder[pergunta="${id}"]`).click(addResposta)
	}

	const addLike = (e) => {
		$('#like1').next().html(`1 like`)
		$('#like1').one('click', removerLike).addClass('clicado')
	}
	const removerLike = (e) => {
		$('#like1').next().html(`0 likes`)
		$('#like1').one('click', addLike).removeClass('clicado')
	}
	$('#like1').one('click', addLike)
	const addHover = (e) => $(e.target).toggleClass('hover')
	const toggleRes = (e) => $(e.target).parents('.topico').children('.resposta').toggle(30)
	
	$('.assunto').hover(addHover)
	$('.assunto').click(toggleRes)

	// Controle janela
	$('#toggle-menu').click((e) => {
		$('#menu').toggle(100)
	})
	$(window).resize((e) => {
		if($(window).width()>=1090){
			$('#menu').show(100)
		} else{
			$('#menu').hide(100)
		}
	})
})(jQuery)
