class Utils {
  static shuffleArray(a) {
    const copy = [...a];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const x = copy[i];
      copy[i] = copy[j];
      copy[j] = x;
    }
    return copy;
  }

  static times(n) {
    return Array.from(Array(n)).map((_, i) => i);
  }
}

export default Utils;
