import React from "react"

export default class JsCalculator extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentValue: '0',
            memory: 0,
            operationID: 'default',
            inputHistory: '',
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
            exportArr.push(<Button id={NAMES_BUTTON_ID[i]} textContent={i} className={`button textContent button_theme buttonID_${i}`} key={`uniqKey_${i}`}/>)
        }
        return exportArr
    }

    symbolButtonRender(){
        const NAMES_BUTTON_ID = {'equals':'=', 'add':'+', 'subtract':'-', 'multiply':'x', 'divide':'/', 'decimal':'.', 'clear':'AC'}
        let exportArr = []
        for(let key in NAMES_BUTTON_ID){
            exportArr.push(<Button id={key} textContent={NAMES_BUTTON_ID[key]} className={`button textContent button_theme buttonID_${key}`} key={`uniqKey_${key}`}/>)
        }
        return exportArr
    }

    async numericButtonCallback(event){
        const stringValue = event.target.textContent == '='?'':event.target.textContent
        const currentValue = this.state.currentValue
        const targetID = event.target.getAttribute('id')

        if(+stringValue >= 0 && +stringValue <= 9 || stringValue == '-'){
            if(currentValue[0] == '0' && currentValue.length === 1 || stringValue == '-') {
                this.setState(function(){
                    return {
                        currentValue: stringValue
                    }
                })
                
            } else if(stringValue !== '0' || stringValue === '0' && currentValue.length !== 0) {
                await this.setState(function(prevState){
                    return {
                        currentValue: prevState['currentValue'] + stringValue
                    }
                })
            }
            console.log(`Input field: ${this.state.currentValue}`)
        }

        if(targetID === 'decimal'){
            let localCurrentValue = this.state.currentValue
            if(localCurrentValue.length === 0){
                localCurrentValue = '0.'
            } else if(localCurrentValue.indexOf('.') === -1) {
                localCurrentValue += '.' 
            }
            await this.setState(function(){
                return {
                    currentValue: localCurrentValue
                }
            })
        }

        if(['add', 'subtract', 'multiply', 'divide'].indexOf(targetID) >= 0){
           this.calculate(this.state.operationID)
           this.setState(function(){
                return {
                    operationID: targetID
                }
           })
        }

        this.setState(function(prevState){
            return {
                inputHistory: prevState['inputHistory'] + stringValue
            }
        })
        
        if(targetID == 'equals'){
            await this.calculate(this.state.operationID)
            this.setState(function(prevState){
                 return {
                     operationID: 'equals',
                     inputHistory: prevState['inputHistory'] + ` = ${!Number.isInteger(this.state.memory)?this.state.memory.toFixed(4):this.state.memory}`
                 }
            })
         }

        if(targetID == 'clear'){
            this.setState(function(){
                return {
                    currentValue: '0',
                    memory: 0,
                    operationID: 'default',
                    inputHistory: ''
                }
            })
        }
    }

    calculate(operationID) {
        console.log(`Previous operationID: ${this.state.operationID}`)
        let memory = this.state.memory
        //Баг при 2 последовательно введённых операциях (++, --, -*||/, +*||/). 
        //Без тернарки образуется баг Infinity || NaN.
        let current = this.state.currentValue ? Number(this.state.currentValue):1
        ///////
        switch(operationID){
            case 'add': 
                this.setState(function(){
                    return {
                        memory: (memory) + (current),
                        currentValue: ''
                    }
                })
                break;
            case 'subtract': 
                this.setState(function(){
                    return {
                        memory: (memory) - (current),
                        currentValue: ''
                    }
                })
                break;
            case 'multiply': 
                this.setState(function(){
                    return {
                        memory: (memory) * (current),
                        currentValue: ''
                    }
                })
                break;
            case 'divide': 
                this.setState(function(){
                    return {
                        memory: (memory) / (current),
                        currentValue: ''
                    }
                })
                break;
            case 'default': 
                this.setState(function(){
                    return {
                        memory: (current),
                        currentValue: ''
                    }
                })
                break;
            case 'equals': 
                this.setState(function(){
                    return {
                        inputHistory: !Number.isInteger(memory)?memory.toFixed(4):memory
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
                            <span className="display__text textContent display_result_theme">{this.state.inputHistory}</span>
                        </p>
                        <p className="display__field display__field_theme">
                            <span className="display__text textContent display_input_theme">{this.state.currentValue}</span>
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