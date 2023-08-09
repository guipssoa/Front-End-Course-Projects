// Variáveis e configuração
const loginButton = document.querySelector('#login-button');
const agreementCheck = document.getElementById('agreement');
const formSubmitButton = document.getElementById('submit-btn');
Element.prototype.on = Element.prototype.addEventListener;

// Função para validar email e senha
loginButton.on('click', () => {
  const inputEmail = document.querySelector('#login-email').value.toLowerCase();
  const inputPassword = document.querySelector('#login-password').value;
  const emailCheck = 'tryber@teste.com';
  const passwordCheck = '123456';
  const loginResult = (inputEmail === emailCheck && inputPassword === passwordCheck)
    ? window.alert('Olá, Tryber!')
    : window.alert('Email ou senha inválidos.');
  return loginResult;
});

// Função para habilitar botão "Enviar" após validação do checkbox
agreementCheck.on('change', () => {
  const submitButtonStatus = (agreementCheck.checked)
    ? formSubmitButton.disabled = false
    : formSubmitButton.disabled = true;
  return submitButtonStatus;
});

// Função para contar os caracteres e mostrar a quantidade
function countText() {
  const text = document.getElementById('text').value;
  document.getElementById('counter').innerText = ['500'] - text.length;
}
