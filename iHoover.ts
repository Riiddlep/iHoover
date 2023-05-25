/** Fonction pour changer la direction de l'aspirateur
 *
 * @param position La position et l'orientation de l'aspirateur [x,y,"N|W|E|S"]
 * @param turn La direction dans laquelle l'aspirateur doit tourner "D|G"
 * @returns La position et l'orientation de l'aspirateur après avoir tourné [x,y,"N|W|E|S"]
 */
function direction(position: any[], turn: string) {
  const card = ["N", "E", "S", "W"];
  if (turn === "D") {
    position[2] = card[(card.indexOf(position[2]) + 1) % 4];
  } else if (turn === "G") {
    position[2] = card.reverse()[(card.indexOf(position[2]) + 1) % 4];
  }
  return position;
}

/** Fonction pour déplacer l'aspirateur selon la direction
 *
 * @param position La position et l'orientation de l'aspirateur [x,y,"N|W|E|S"]
 * @param grille  La taille de la pièce [x,y]
 * @returns La position et l'orientation de l'aspirateur après avoir avancé [x,y,"N|W|E|S"]
 */
function movement(position: any[], grille: number[]) {
  const dir: { [pos: string]: number[] } = {
    N: [0, 1],
    S: [0, -1],
    E: [1, 0],
    W: [-1, 0],
  };
  for (let i = 0; i < 2; i++) {
    if (
      grille[i] >= position[i] + dir[position[2]][i] &&
      position[i] + dir[position[2]][i] >= 0
    ) {
      position[i] += dir[position[2]][i];
    }
  }
  return position;
}

/** Fonction qui permet à l'aspirateur de suivre la série d'instructions
 *
 * @param grille La taille de la pièce [x,y]
 * @param position La position initiale de l'aspirateur et son orientation [x,y,"N|W|E|S"]
 * @param path La série d'instructions composée de "A|D|G"
 */
function vacuum(grille: number[], position: any[], path: string) {
  const mov = path.toUpperCase().split("");
  mov.map((element) => {
    if (element === "A") {
      position = movement(position, grille);
    } else {
      position = direction(position, element);
    }
  });
  console.log(position);
}

// Fonction main avec les tests
function main() {
  vacuum([10, 10], [5, 5, "N"], "DADADADAA");
  vacuum([10, 10], [0, 0, "S"], "GAAGAAAA");
  vacuum([5, 5], [5, 5, "S"], "AAAAAADAAAAA");
  vacuum([15, 5], [5, 5, "W"], "DDAAAAADAAADAADA");
  vacuum([2, 2], [0, 0, "N"], "AAADAAA");
  vacuum([10, 10], [0, 0, "N"], "AAAAAAADAD");
}

main();
