import React from "react"

export default class JsCalculator extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentValue: '',
            memory: 0,
            operationID: 'default',
        }
        this.numericButtonRender = this.numericButtonRender.bind(this)
        this.symbolButtonRender = this.symbolButtonRender.bind(this)
        this.numericButtonCallback = this.numericButtonCallback.bind(this)
        this.calculate = this.calculate.bind(this)
    }

    numericButtonRender(number = 9){
        const NAMES_BUTTON_ID = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
        let exportArr = []
        for(let i = 0; i <= number; i++){
            exportArr.push(<Button id={NAMES_BUTTON_ID[i]} textContent={i} className={`button button_theme buttonID_${i}`} key={`uniqKey_${i}`}/>)
        }
        return exportArr
    }

    symbolButtonRender(){
        const NAMES_BUTTON_ID = {'equals':'=', 'add':'+', 'subtract':'-', 'multiply':'X', 'divide':'/', 'decimal':'.', 'clear':'AC'}
        let exportArr = []
        for(let key in NAMES_BUTTON_ID){
            exportArr.push(<Button id={key} textContent={NAMES_BUTTON_ID[key]} className={`button button_theme buttonID_${key}`} key={`uniqKey_${key}`}/>)
        }
        return exportArr
    }

    numericButtonCallback(event){
        const stringValue = event.target.textContent
        if(Number(stringValue) >= 0 && Number(stringValue) <= 9){
            this.setState(function(prevState){
                return {
                    currentValue: prevState['currentValue'] + stringValue
                }
            })
        }

        const targetID = event.target.getAttribute('id')

        if(targetID == 'decimal'){
            let currentValue = this.state.currentValue
            if(currentValue.length === 0){
                currentValue = '0.'
            } else if(currentValue.indexOf('.') === -1) {
                currentValue += '.' 
            }
            this.setState(function(){
                return {
                    currentValue: currentValue
                }
            })
        }

        if(targetID == 'clear'){
            this.setState(function(){
                return {
                    currentValue: '',
                    memory: 0,
                    operationID: 'default'
                }
            })
        }

        if(targetID == 'add'){
           this.setState(function(){
                return {
                    operationID: 'add'
                }
           })
           this.calculate(this.state.operationID)
        }

        if(targetID == 'subtract'){
            this.setState(function(){
                return {
                    operationID: 'subtract'
                }
            })
            this.calculate(this.state.operationID)
        }

        if(targetID == 'multiply'){
            this.setState(function(){
                return {
                    operationID: 'multiply'
                }
            })
            this.calculate(this.state.operationID)
        }

        if(targetID == 'divide'){
            this.setState(function(){
                return {
                    operationID: 'divide'
                }
            })
            this.calculate(this.state.operationID)
        }

        if(targetID == 'equals'){
            this.setState(function(){
                return {
                    operationID: 'default'
                }
            })
            this.calculate(this.state.operationID)
        }
    }

    calculate(operationID) {
        console.log(`Previous operationID: ${this.state.operationID}`)
        let memory = this.state.memory
        let current = Number(this.state.currentValue)
        switch(operationID){
            case 'add': 
                this.setState(function(){
                    return {
                        memory: memory + current,
                        currentValue: ''
                    }
                })
                break;
            case 'subtract': 
                this.setState(function(){
                    return {
                        memory: memory - current,
                        currentValue: ''
                    }
                })
                break;
            case 'multiply': 
                this.setState(function(){
                    return {
                        memory: memory * current,
                        currentValue: ''
                    }
                })
                break;
            case 'divide': 
                this.setState(function(){
                    return {
                        memory: memory / current,
                        currentValue: ''
                    }
                })
                break;
            case 'default': 
                this.setState(function(){
                    return {
                        memory: current,
                        currentValue: ''
                    }
                })
                break;
            default: console.log('Error in switch')
        } 
    }

    render(){
        return (
            <div className="appContainer appContainer_theme">
                <div className="calculator calculator_theme">
                    <div id="display" className="display">
                        <p className="display__field display__field_theme">
                            <span className="display__text display_result_theme">{this.state.memory}</span>
                        </p>
                        <p className="display__field display__field_theme">
                            <span className="display__text display_input_theme">{this.state.currentValue}</span>
                        </p> 
                    </div>
                    <div className="buttonsContainer" onClick={this.numericButtonCallback}>
                        {this.numericButtonRender()}
                        {this.symbolButtonRender()}
                    </div>
                </div>
            </div>
        )
    }
}

class Button extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div 
                id={this.props.id} 
                className={this.props.className}
                >
                    {this.props.textContent}
            </div>
        )
    }
}