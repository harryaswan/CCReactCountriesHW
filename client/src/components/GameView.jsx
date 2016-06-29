var React = require('react');
var GameInput = require("./GameInput.jsx");


var GameView = React.createClass({

    getInitialState: function() {
        return {
            qa: null
        };
    },
    render: function() {
        var qa = this.generateQA();
        return (
            <div>
                <p>Question: {qa.question}</p>
                {/*<p>Answer: {qa.answer}</p>*/}
                <GameInput onsubmit={this.handleAnswerSubmit} answer={qa.answer} />
            </div>
        );
    },
    generateQA: function() {
        var question = null;
        var answer = null;
        if (this.props.country) {
            switch (this.props.gameMode) {
                case 0:
                    question = "What is the capital of " + this.props.country.name + "?";
                    answer = this.props.country.capital;
                    break;
                case 1:
                    question = this.props.country.capital + " is the capital of what country?";
                    answer = this.props.country.name;
                    break;
                case 2:
                    var bordersString = "";
                    for (var bcIndex in this.props.borders) {
                        bordersString += this.props.borders[bcIndex].name;
                        bordersString += (bcIndex < (this.props.borders.length - 2)) ? ", " : " and ";
                    }
                    bordersString = bordersString.substring(0, bordersString.length - 5);
                    question = "What country borders all of these countries: " + bordersString + "?";
                    answer = this.props.country.name;
                    break;
                case 3:
                    question = "What is the country with the alpha code of " + this.props.country.alpha3Code + "?";
                    answer = this.props.country.name;
                    break;
                case 4:
                    question = "What is the top level domain of " + this.props.country.name +"? (Including the dot)";
                    answer = this.props.country.topLevelDomain[0];
                    break;
            }
        }

        return {question: question, answer: answer};
    },
    handleAnswerSubmit: function(answer) {
        this.props.finishRound(answer);
    }

});

module.exports = GameView;
