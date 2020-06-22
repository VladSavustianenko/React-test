import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      elements: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      renderElem: null,
      correct: null,
      movePoints: [],
      restart: false
    }
    this.restart = this.restart.bind(this)
  }

  fieldRend() {
    this.state.renderElem = Math.floor(Math.random() * 9)
    return(
      this.state.elements.map(elem =>
        <div id={'elem' + elem} key={elem} onClick={() => this.result(elem)}>
          {elem === this.state.renderElem ? <span>*</span> : null}
        </div>
      )
    )
  }

  moveRend() {
    var current = this.state.renderElem
    var i = 0
    while(i < 10) {
      var renderMove = Math.floor(Math.random() * 4)
      if(renderMove === 0 && current >= 3) {
        this.state.movePoints.push('up')
        current-=3
        i++
      }
      if(renderMove === 1 && (current !== 2 && current !== 5 && current !== 8)) {
        this.state.movePoints.push('right')
        current+=1
        i++
      }
      if(renderMove === 2 && current <= 5) {
        this.state.movePoints.push('down')
        current+=3
        i++
      }
      if(renderMove === 3 && (current !== 0 && current !== 3 && current !== 6)) {
        this.state.movePoints.push('left')
        current-=1
        i++
      }
    }
    this.state.correct = current
  }

  result(elem) {
    if(!this.state.restart) {
      if(elem === this.state.correct) {
          document.getElementById('elem' + elem).style.backgroundColor = 'green'
      }
      else {
        document.getElementById('elem' + elem).style.backgroundColor = 'red'
        document.getElementById('elem' + this.state.correct).style.backgroundColor = 'green'
      }
      this.state.restart = true
    }
  }

  restart() {
    this.setState({
      renderElem: null,
      movePoints: [],
      restart: false
    })
    this.state.elements.map(elem => document.getElementById('elem' + elem).style.backgroundColor = 'purple')
  }

  render() {
    if(!this.state.renderElem) {
      return (
          <div>
              <div id="field">
                  {this.fieldRend()}
              </div>
              <div>
                  {this.moveRend()}
                  {this.state.movePoints.map(elem => <span className="points">{elem} </span>)}
              </div>
              <button onClick={this.restart}>Restart</button>
          </div>
      )
    }
  }
}

export default App;
