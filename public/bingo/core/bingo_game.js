import Utils from './utils';
import BingoCell from './bingo_cell';

class BingoGame {
  constructor(gameData) {
    this.height = gameData.size.height;
    this.width = gameData.size.width;
    this.bingoPool = gameData.bingoPool;
    this.ultimatesPool = gameData.ultimatesPool;
    this.ultimatesSize = gameData.ultimatesSize;
    this.resetField();
    this.resetUltimates();
  }

  get neededCellsCount() {
    return this.height * this.width;
  }

  reset() {
    this.resetUltimates();
    this.resetField();
    return this;
  }

  resetUltimates() {
    this.ultimates = this.pickUltimates();
    return this;
  }

  resetField() {
    this.field = this.generateField();
    return this;
  }

  generateField() {
    const shuffledPool = Utils.shuffleArray(this.bingoPool);

    return Utils.times(this.height).map((i) => (
      Utils.times(this.width).map((j) => (
        new BingoCell(shuffledPool[i * this.width + j] || '')
      ))
    ));
  }

  get isWon() {
    return this.checkRows() || this.checkColumns() || this.checkUltimates();
  }

  checkRows() {
    return this.field.some((row) => (
      row.every((cell) => cell.marked)
    ));
  }

  checkColumns() {
    const firstRow = this.field[0] || [];

    return firstRow.some((cell, index) => (
      this.field.every((row) => row[index].marked)
    ));
  }

  checkUltimates() {
    return this.ultimates.some((cell) => cell.marked);
  }

  pickUltimates() {
    const shuffledUltimates = Utils.shuffleArray(this.ultimatesPool);
    return Utils.times(this.ultimatesSize).map(
      (i) => new BingoCell(shuffledUltimates[i]),
    );
  }
}

export default BingoGame;
