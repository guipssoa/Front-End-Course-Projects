const palettes = ['palette1', 'palette2', 'palette3', 'palette4'];

function generateColors() {
  const chars = '0123456789ABCDEF';
  let color = '#';
  for (let index = 1; index < 7; index += 1) {
    color += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return color;
}

let selectedColor = 'rgb(0, 0, 0';

function deselectAll() {
  palettes.forEach((paletteId) => {
    document.getElementById(paletteId).classList.remove('selected');
  });
}

function selectColor(palette) {
  deselectAll();
  palette.classList.add('selected');
  selectedColor = palette.style.backgroundColor;
}

function selectPixel(pixel) {
  pixel.style.backgroundColor = selectedColor;
}

document.getElementById('button-random-color').addEventListener('click', () => {
  document.getElementById('palette2').style.backgroundColor = generateColors();
  document.getElementById('palette3').style.backgroundColor = generateColors();
  document.getElementById('palette4').style.backgroundColor = generateColors();
  document.getElementById('palette1').style.backgroundColor = 'rgb(0, 0, 0';

  localStorage.setItem('colorPalette', document.getElementById('palette1').style.backgroundColor);
  localStorage.setItem('colorPalette2', document.getElementById('palette2').style.backgroundColor);
  localStorage.setItem('colorPalette3', document.getElementById('palette3').style.backgroundColor);
  localStorage.setItem('colorPalette4', document.getElementById('palette4').style.backgroundColor);
});

window.onload = function reload() {
  if (localStorage.key('colorPalette') === null) {
  localStorage.setItem('colorPalette', document.getElementById('palette1').style.backgroundColor);
  localStorage.setItem('colorPalette2', document.getElementById('palette2').style.backgroundColor);
  localStorage.setItem('colorPalette3', document.getElementById('palette3').style.backgroundColor);
  localStorage.setItem('colorPalette4', document.getElementById('palette4').style.backgroundColor);
  }
  document.getElementById('palette1').style.backgroundColor = (localStorage.getItem('colorPalette'));
  document.getElementById('palette2').style.backgroundColor = (localStorage.getItem('colorPalette2'));
  document.getElementById('palette3').style.backgroundColor = (localStorage.getItem('colorPalette3'));
  document.getElementById('palette4').style.backgroundColor = (localStorage.getItem('colorPalette4'));
};

function clearBoard() {
  const pixels = document.getElementsByClassName('pixel');
  for (pixel of pixels) {
    pixel.style.backgroundColor = 'rgb(255, 255 ,255)';
}
}
