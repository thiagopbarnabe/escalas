import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from './Button';
import imagemCerta from './Images/certo.png'
import imagemErrada from './Images/erro.png'

class App extends Component {
  notas = [
    {
      sustenido:{
        English:'B#',
        NeoLatin: 'Si sustenido'
      },
      nota:{
        English:'C',
        NeoLatin: 'Dó'
      }   
    }, 
    {
      sustenido: {
        English:'C#',
        NeoLatin: 'Dó Sustenido'
      },
      bemol: {
        English:'D♭',
        NeoLatin: 'Ré Bemol'
      }
    },
    {
      nota: {
        English:'D',
        NeoLatin:'Ré'
      }
    },
    {
      sustenido:{
        English:'D#',
        NeoLatin: 'Ré Sustenido'
      },
      bemol:{
        English:'E♭',
        NeoLatin: 'Mi sustenido'
      }
    },
    {
      nota:{
        English:'E',
        NeoLatin:'Mi'
      },      
      bemol:{
        English:'F♭',
        NeoLatin:'Fá Bemol'
      }
    },
    {
      sustenido:{
        English:'E#',
        NeoLatin:'Mi Sustenido'
      },
      nota:{
        English:'F',
        NeoLatin:'Fá'
      }
    },
    {
      sustenido:{
        English:'F#',
        NeoLatin: 'Fá Sustenido'
      },
      bemol:{
        English:'G♭',
        NeoLatin: 'Sol Bemol'
      }
    },
    {
      nota:{
        English:'G',
        NeoLatin: 'Sol'
      }
    },
    {
      sustenido:{
        English:'G#',
        NeoLatin: 'Sol sustenido'
      },
      bemol:{
        English:'A♭',
        NeoLatin: 'La Bemol'
      }
    },
    {
      nota:{
        English:'A',
        NeoLatin:'La'
      }
    },
    {
      sustenido:{
        English:'A#',
        NeoLatin:'La Sustenido'
      },
      bemol:{
        English:'B♭',
        NeoLatin: 'Si Bemol'
      }
    },
    {
      nota:{
        English:'B',
        NeoLatin:'Si'
      },
      bemol:{
        English:'C♭',
        NeoLatin: 'Dó Bemol'
      }
    }
  ]

    
    
    
  perguntas= [
    'o Primeiro grau maior',
    'o Segundo grau menor',
    'o Segundo grau maior',
    'o Terceiro grau menor',
    'o Terceriro grau maior',
    'a Quarta justa',
    'a Quarta aumentada',
    'a Quinta justa',
    'a Quinta aumentada',
    'a Sexta maior',
    'a Sétima menor',
    'a Sétima maior' 
  ];
  state = {
    value:'',
    randomNote:Math.floor(Math.random()*12),
    randomScale:Math.floor(Math.random()*12),
    tipo:'s',
    NameNotation: 'e',
    display: 'i',
    acertos: 0,
    erros:0,
    questionList:[],
    timeSpent:0
  }
  
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.getNoteName = this.getNoteName.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  resultado(escala, resposta){
    return (escala+resposta)%12;
  }

  handleChange(event){
    this.setState({value: event.target.value});
  }

  getNoteName(nota){
    if (this.state.tipo === 's'){
      nota=nota.nota? nota.nota: nota.sustenido;
    } else if (this.state.tipo==='b') {
      nota=nota.nota? nota.nota: nota.bemol;
    }
    
    if (this.state.NameNotation==='e'){
      return nota.English;
    } else if (this.state.NameNotation==='n'){
      return nota.NeoLatin;
    }    
  }

  onClick(a){
    const timeSpent = (Date.now() - this.state.timer)/1000;
    let repetirPergunta = false;
    if (this.resultado(this.state.randomScale, this.state.randomNote) === a){
      this.setState(state => {
        const questionList = state.questionList.concat({scale: state.randomScale, note: state.randomNote,guess: a, right: true, timeSpent: timeSpent });
        return {
          display:'c',
          questionList: questionList
        }
      })
      
    } else {
      repetirPergunta = true;
      this.setState(state => {
        const questionList = state.questionList.concat({scale: state.randomScale, note: state.randomNote, guess: a, right: false, timeSpent: timeSpent});
        return {
          display:'e',
          questionList
        }
      })
    }
    this.timer = setTimeout(()=> {
      this.start(repetirPergunta);
    }
    ,500);
    
  }

  start(repetirPergunta) {
    this.setState(state => {
      return {
        display: 'p',
        timer: Date.now(),
        randomNote: !repetirPergunta ? Math.floor(Math.random()*12) : state.randomNote,
        randomScale: ! repetirPergunta ? Math.floor(Math.random()*12) : state.randomScale 
      };
    });
  }

  stop() {
    this.setState({
      display: 'f'
    });
  }

  render() {
    let divPerguntasStyle= {
      display:this.state.display === 'p' ? 'block' : 'none'
    };
    let imagem = this.state.display === 'c' ? imagemCerta : imagemErrada;
    let divResposta= {
      display:(this.state.display === 'c' || this.state.display === 'e') ? 'block' : 'none',
      backgroundImage:"url(" +  imagem + ")",
      backgroundSize:'contain',
      backgroundRepeat:'noRepeat',
      width:'20%',
      height:0,
      paddingTop:'20%',
      margin: '50px auto auto'
    };

    let divIniciar = {
      display: this.state.display === 'i' ? 'block' : 'none'
    }

    let divFim = {
      display: this.state.display === 'f' ? 'block' : 'none'
    }
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Escalas</h2>
        </div>
        <div style={divIniciar}>
              <br/>
              <button onClick={this.start}>
                Iniciar
              </button>
        </div>
        <div style={divFim}>
          <div>
          <table>
          <thead>
            <tr>
            <th>Escala</th>
            <th>Nota</th>
            <th>Acertou</th>
            <th>Palpite</th>
            <th>Resposta</th>            
            <th>Tempo</th>
            </tr>
          </thead>
          <tbody>
          {this.state.questionList.map((question, index) => {
            return <tr key={index}>
              <td>{this.perguntas[question.scale]}</td>
              <td>{this.getNoteName(this.notas[question.note])}</td>
              <td>{question.right ? 'sim' : 'não'}</td>
              <td>{this.getNoteName(this.notas[question.guess])}</td>
              <td>{this.getNoteName(this.notas[this.resultado(question.scale, question.note)])}</td>
              <td>{question.timeSpent}</td>
            </tr>;
          })}
          </tbody>
          </table>
          </div>
        </div>
        <div style={divResposta}></div>        
        <div style={divPerguntasStyle}>
          <p className="App-intro">
          Qual {this.perguntas[this.state.randomScale]} de {this.getNoteName(this.notas[this.state.randomNote])}?          
          </p>

            <div>
              {this.notas.map((nota,index) => {
                return <Button
                  key={index}
                  index={index}
                  onClick={this.onClick}
                  nota={this.getNoteName(nota)}
                />;
              })}
            </div>  
            <br/>
            <div>
              acertos: {this.state.questionList.reduce((acertos, question)=>{
                if(question.right){
                  return acertos+1;                
                }
                else return acertos;
                },0)}
              <br/>
              erros: {this.state.questionList.reduce((erros, question)=>{
                if(!question.right){
                  return erros+1;                
                }
                else return erros},0)}
            </div>

            <div>
              <button onClick={this.stop}>
                Parar
              </button>
            </div>
          </div>
          
          {/* <div>
          <button>C<br/>Do</button>
          <button>C#<br/>Do Sustenido</button>
          </div>
          <div>
          <button>D<br/>Re</button>
          <button>D#<br/>Re sustenido</button>
          </div>
          <div>
          <button>E<br/>Mi</button>
          </div>
          <div>
          <button>F<br/>Fa</button>
          <button>F#<br/>Fa Sustenido</button>
          </div>
          <div>
          <button>G<br/>Sol</button>
          <button>G#<br/>Sol Sustenido</button>
          </div>
          <div>
          <button>AC<br/>La</button>
          <button>A#<br/>La Sustenido</button>
          </div>
          <div>
          <button>B<br/>Si</button>
          </div> */}
        
        {/* <p>
          <div>
          <button>C<br/>Do</button>
          </div>
          <div>
          <button>D♭<br/>Ré Bemol</button>
          <button>D<br/>Re</button>
          </div>
          <div>
          <button>E♭<br/>Mi Bemol</button>
          <button>E<br/>Mi</button>
          </div>
          <div>
          <button>F<br/>Fa</button>
          </div>
          <div>
          <button>G♭<br/>Sol Bemol</button>
          <button>G<br/>Sol</button>          
          </div>
          <div>
          <button>A♭<br/>La Bemol</button>
          <button>A<br/>La</button>
          </div>
          <div>
          <button>B♭<br/>Si Bemol</button>
          <button>B<br/>Si</button>
          </div>
        </p>

        <p>
          <div>
          <button>C♭<br/>Do Bemol</button>
          <button>C<br/>Do</button>
          </div>
          <div>
          <button>D♭<br/>Ré Bemol</button>
          <button>D<br/>Re</button>
          </div>
          <div>
          <button>E♭<br/>Mi Bemol</button>
          <button>E<br/>Mi</button>
          </div>
          <div>
          <button>F<br/>Fa</button>
          </div>
          <div>
          <button>G♭<br/>Sol Bemol</button>
          <button>G<br/>Sol</button>          
          </div>
          <div>
          <button>A♭<br/>La Bemol</button>
          <button>A<br/>La</button>
          </div>
          <div>
          <button>B♭<br/>Si Bemol</button>
          </div>
        </p> */}
      </div>
    );
  }
}

export default App;
