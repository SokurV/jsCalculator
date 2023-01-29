import React from "react"

export default class JsCalculator extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentValue: '',
            prevValue: 0,
            resultValue: 0,
            resultField: '',
            inputField: []
        }
        this.numericButtonRender = this.numericButtonRender.bind(this)
        this.symbolButtonRender = this.symbolButtonRender.bind(this)
        this.numericButtonCallback = this.numericButtonCallback.bind(this)
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
    }


    render(){
        return (
            <div className="appContainer appContainer_theme">
                <div className="calculator calculator_theme">
                    <div id="display" className="display">
                        <p className="display__field display__field_theme">
                            <span className="display__text display_result_theme">{this.state.resultField}</span>
                        </p>
                        <p className="display__field display__field_theme">
                            <span className="display__text display_input_theme">{this.state.inputField.join('')}</span>
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