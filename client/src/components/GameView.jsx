var React = require('react');
var GameInput = require("./GameInput.jsx");


var GameView = React.createClass({

    render: function() {

        var name = "Loading...";
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
                    for (bcIndex in this.props.borders) {
                        bordersString += this.props.borders[bcIndex];
                        bordersString += (bcIndex < (this.props.borders.length - 2)) ? ", " : " and ";
                    }
                    question = "What country borders all of these countries: " + bordersString;
                    answer = this.props.country.name;
                    break;
                case 3:
                    question = "3What is the capital of " + this.props.country.name;
                    answer = this.props.country.capital;
                    break;
                case 4:
                    question = "4What is the capital of " + this.props.country.name;
                    answer = this.props.country.capital;
                    break;



            }
        }

        return (
            <div>
                <p>CountryName: {name}</p>
                <p>GameMode: {this.props.gameMode}</p>
                <br></br>
                <p>Question: {question}</p>
                <p>Answer: {answer}</p>
                <GameInput onSubmit={this.handleAnswerSubmit} />
            </div>
        );
    },
    handleAnswerSubmit: function(answerText) {
        this.props.finishRound(this.state.answer === answerText);
    }

});

module.exports = GameView;
