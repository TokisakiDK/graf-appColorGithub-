const rRange = document.getElementById('rRange'),
      gRange = document.getElementById('gRange'),
      bRange = document.getElementById('bRange'),
      rVal = document.getElementById('rVal'),
      gVal = document.getElementById('gVal'),
      bVal = document.getElementById('bVal'),
      hexInput = document.getElementById('hexInput'),
      colorPicker = document.getElementById('colorPicker'),
      visualizador = document.getElementById('visualizador'),
      hexBadge = document.getElementById('hex-badge');

const toHex = (n) => parseInt(n).toString(16).padStart(2, '0').toUpperCase();

function update(r, g, b, source) {
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));

    const hex = `${toHex(r)}${toHex(g)}${toHex(b)}`;
    
    // Actualizar etiquetas de texto
    rVal.textContent = r; gVal.textContent = g; bVal.textContent = b;
    
    // Actualizar controles
    if(source !== 'range') {
        rRange.value = r; gRange.value = g; bRange.value = b;
    }
    if(source !== 'hex') hexInput.value = hex;
    if(source !== 'picker') colorPicker.value = `#${hex}`;

    // Actualizar Visual
    visualizador.style.backgroundColor = `#${hex}`;
    hexBadge.textContent = `#${hex}`;
    
    // Brillo para contraste de texto
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    hexBadge.style.color = brightness > 125 ? 'rgba(0,0,0,0.8)' : 'white';
    hexBadge.style.backgroundColor = brightness > 125 ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.3)';
}

// Eventos
[rRange, gRange, bRange].forEach(el => {
    el.addEventListener('input', () => update(rRange.value, gRange.value, bRange.value, 'range'));
});

colorPicker.addEventListener('input', (e) => {
    const hex = e.target.value;
    update(parseInt(hex.slice(1,3), 16), parseInt(hex.slice(3,5), 16), parseInt(hex.slice(5,7), 16), 'picker');
});

hexInput.addEventListener('input', (e) => {
    let val = e.target.value;
    if (val.length === 3 || val.length === 6) {
        if(val.length === 3) val = val[0]+val[0]+val[1]+val[1]+val[2]+val[2];
        update(parseInt(val.slice(0,2), 16), parseInt(val.slice(2,4), 16), parseInt(val.slice(4,6), 16), 'hex');
    }
});

update(127, 127, 127);