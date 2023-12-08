import { Component } from '@angular/core';

@Component({
  selector: 'app-juego-example',
  templateUrl: './juego-example.component.html',
  styleUrls: ['./juego-example.component.scss']
})
export class JuegoExampleComponent {
  palabraSecreta = 'javascript';
  letrasAdivinadas: string[] = new Array(this.palabraSecreta.length).fill('_');
  imagenesHangman = [
    '../../../../assets/Ahorcado/0.png',
    '../../../../assets/Ahorcado/1.png',
    '../../../../assets/Ahorcado/2.png',
    '../../../../assets/Ahorcado/3.png',
    '../../../../assets/Ahorcado/4.png',
    '../../../../assets/Ahorcado/5.png',
    '../../../../assets/Ahorcado/6.png',
    '../../../../assets/Ahorcado/7.png',
  ];
  intentos = 0;
  letra = '';
  message = '';

  guessLetter() {
    if (this.letra.length !== 1 || !/^[a-z]$/.test(this.letra)) {
      this.message = 'Ingresa una letra válida.';
      return;
    }

    if (this.palabraSecreta.includes(this.letra)) {
      for (let i = 0; i < this.palabraSecreta.length; i++) {
        if (this.palabraSecreta[i] === this.letra) {
          this.letrasAdivinadas[i] = this.letra;
        }
      }
    } else {
      this.intentos++;
    }

    this.message = '';

    if (this.letrasAdivinadas.join('') === this.palabraSecreta) {
      this.message = '¡Felicidades! Has adivinado la palabra.';
    } else if (this.intentos >= this.imagenesHangman.length - 1) {
      this.message = '¡Perdiste! La palabra era: ' + this.palabraSecreta;
    }

    this.letra = '';
  }

  mostrarHangman() {
    return this.imagenesHangman[this.intentos];
  }
  resetGame() {
    this.letrasAdivinadas = new Array(this.palabraSecreta.length).fill('_');
    this.intentos = 0;
    this.letra = '';
    this.message = '';
  }
}
