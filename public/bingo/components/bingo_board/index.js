// @flow
import { h, render, Component } from 'preact';
import BingoGame from '../../core/bingo_game';
import BingoCell from '../../core/bingo_cell';
import settings from './settings';

class BingoBoard extends Component {
  static pickRandomImage(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  constructor(props) {
    super(props);

    const gameData = {
      size: {
        height: settings.height,
        width: settings.width,
      },
      bingoPool: settings.bingoPool,
      ultimatesSize: settings.ultimatesSize,
      ultimatesPool: settings.ultimatesPool,
    };
    this.state = { game: new BingoGame(gameData) };

    this.handleResetButton = this.handleResetButton.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
  }

  handleResetButton() {
    const { game } = this.state;
    game.reset();
    this.setState({ game });
  }

  handleCellClick(cell) {
    const { game } = this.state;
    cell.toggleMark();
    this.setState({ game });
  }

  renderBingoBoard() {
    const { game } = this.state;
    const { width } = settings;
    const gridStyle = { gridTemplateColumns: `repeat(${width}, auto)` };
    return (
      <section class="bingo-board" style={gridStyle}>
        {game.field.map((row) => (
          row.map((cell) => {
            let classNames = 'bingo-card';
            if (cell.marked) {
              classNames += ' bingo-card-marked';
            }
            return (
              <button
                type="button"
                class={classNames}
                onClick={() => this.handleCellClick(cell)}
              >
                {cell.value}
              </button>
            );
          })
        ))}
      </section>
    );
  }

  renderUltimatesBoard() {
    const { game } = this.state;
    const ultimatesStyle = { gridTemplateColumns: `repeat(${settings.ultimatesSize}, 1fr)` };
    return (
      <section class="ultimates-board" style={ultimatesStyle}>
        {game.ultimates.map((ultimate) => {
          let classNames = 'bingo-card ultimate';
          if (ultimate.marked) {
            classNames += ' bingo-card-marked';
          };
          return (
            <button
              type="button"
              class={classNames}
              onClick={() => this.handleCellClick(ultimate)}
            >
              {ultimate.value}
            </button>
          );
        })}
      </section>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderWonImage() {
    return (
      <p class="you-won">
        {settings.youWon}
        <br />
        <img class="you-won-image" src={BingoBoard.pickRandomImage(settings.youWonImages)} alt={settings.youWonAlt} />
      </p>
    );
  }

  render() {
    const { game } = this.state;
    const { isWon } = game;
    const { title, help } = settings;

    return (
      <section class="bingo">
        <div class="bingo-title">{title}</div>
        {!isWon && <p class="bingo-help">{help}</p>}
        {isWon && this.renderWonImage()}
        {!isWon && this.renderBingoBoard()}
        {!isWon && this.renderUltimatesBoard()}
        <footer>
          <button type="button" class="reset" onClick={this.handleResetButton}>Заново</button>
        </footer>
      </section>
    );
  }
}

export default BingoBoard;
