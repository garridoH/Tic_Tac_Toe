import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import styled from "styled-components";


const Grid = styled.div`
  width: 300px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const Button = styled.button`
    float: left;
    font-weight: bold;
    height: 70px;
    padding: 0;
    text-align: center;
    width: 70px;
    font-size: 50px;
`;

function Square(props) {
    return (
        <Button className="square" onClick={props.onClick} 
        style={props.winnnerLocation?{backgroundColor:'green'}:{backgroundColor:'white'}}
        >
            {props.value}
        </Button>

    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squareMatrix: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i) {
        const squares = this.state.squareMatrix.slice();
        if (calculateWinner(squares)[0] !== 'Continue' || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X': 'O';
        this.setState({ 
            squareMatrix: squares,
            xIsNext: !this.state.xIsNext,
         });
    }

    renderSquare(index, isHighlighted) {
        return <Square
            value={this.state.squareMatrix[index]}
            onClick={() => this.handleClick(index)}
            winnnerLocation={isHighlighted} />;
    }

    checkWinningSquare(winner, index) {
            return winner.some(function(el) {
                return el === index;
            });
    }

    render() {
        const winner = calculateWinner(this.state.squareMatrix);
        let status;

        switch (this.state.squareMatrix[winner[0]]) {
            case 'X':
            case 'O':
            status = 'Player ' + this.state.squareMatrix[winner[0]] + ' Wins The Game!!';
                break;
            case 'GameOver':
            status = "No Winner This Round!!";
                break;
            default:
            status = 'Next player up: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0, this.checkWinningSquare(winner, 0))}
                    {this.renderSquare(1, this.checkWinningSquare(winner, 1))}
                    {this.renderSquare(2, this.checkWinningSquare(winner, 2))}
                </div>
                <div className="board-row">
                    {this.renderSquare(3, this.checkWinningSquare(winner, 3))}
                    {this.renderSquare(4, this.checkWinningSquare(winner, 4))}
                    {this.renderSquare(5, this.checkWinningSquare(winner, 5))}
                </div>
                <div className="board-row">
                    {this.renderSquare(6, this.checkWinningSquare(winner, 6))}
                    {this.renderSquare(7, this.checkWinningSquare(winner, 7))}
                    {this.renderSquare(8, this.checkWinningSquare(winner, 8))}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {

    handleClick() {
        window.location.reload();
    }

  render() {
    return (
      <Grid className="game">
        <div className="game-board">
          <Board />
          <button onClick={() => this.handleClick()} >Restart Game</button>
        </div>
      </Grid>
    );
  }
}

function calculateWinner(squares) {
    const winningLinePermutations = [
        [0 , 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    let isWinner = false;

    for (let i=0; i < winningLinePermutations.length; i++){
        // defines the winning permutation
        const [a, b, c]= winningLinePermutations[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            isWinner = true;
            return [a, b, c];
        }
    }
    const hasNulls = squares.some(function(el) {
        return el === null;
    });

    return !hasNulls && !isWinner ? ['GameOver'] : ['Continue'];
}

ReactDOM.render(
    <Game />,
    document.getElementById("root")
 );
