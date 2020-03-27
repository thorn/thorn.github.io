class BingoCell {
  constructor(value, marked = false) {
    this.value = value;
    this.marked = marked;
  }

  toggleMark() {
    this.marked = !this.marked;
  }
}

export default BingoCell;
