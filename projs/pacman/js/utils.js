function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell' + i + '-' + j;
      if (cell === GHOST) {
        cell = `<img id="g${cololrs[colorIdx]}" src="${cololrs[colorIdx++]}.png" />`;
        // console.log(cell);
      }
      if (cell === PACMAN) {
        cell = '<img id="pacman" src="pacman.png" />';
      }
      strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  if (value === PACMAN) value = `<img  id="pacman" src="pacman.png" style="transform: rotate(${gRotateDeg}deg);" />`;
  elCell.innerHTML = value;
}

function getRandomIntInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}