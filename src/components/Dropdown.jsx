import React, { Component } from "react";


export default class Dropdown extends Component {
    

        constructor(props) {
            super(props);
            this.state = {
                sports : [],
                players : [],
                selectedSport:'--Choose a Sport--',
                selectedPlayer:''
            };
            this.changeSport = this.changeSport.bind(this);
        }
      
        componentDidMount() {

            fetch("http://localhost:8000/get-data")
            .then(function(response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            }).then((data)=> {
        
                this.setState({
                    sports:data
                })
            }).catch(function(error) {
                console.log(error);
            });
        }
      
        changeSport(event) {
            
            this.setState({
                selectedSport: event.target.value
            });
            this.setState({
                players : this.state.sports.find(p => p.sport === event.target.value).players
            });
        }

        
        render(){
            console.log(this.state.sports)
            console.log(this.state.players)
            return (
                <div id="container">
                    <h2>Dependent Dropdown using React</h2>
        
                    <div>
                        <label>Select Sport:</label>
                        <select placeholder="Sport" value={this.state.selectedSport} onChange={this.changeSport}>
                            <option>--Choose a Sport--</option>
                            <option>
                            {this.state.sports.map((s,_id)=>{
                               return <option key={s._id}>{s.sport}</option>}
                            )}
                            </option>
                        </select>
                    </div>
    
                    <div>
                        <label>Players: </label>
                        <select placeholder="Players" value={this.state.selectedPlayer}>
                            <option>--Players--</option>
                            {this.state.players.map((e) => {
                                return <option>{e}</option>;
                            })}
                        </select>
                    </div>
                    
                </div>
            )
        }
}

