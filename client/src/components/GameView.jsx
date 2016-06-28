var React = require('react');

var GameView = React.createClass({

    render: function() {

        var name = "Loading...";
        var question = null;
        var answer = null;

        if (this.props.country) {

            switch (this.props.gameMode) {
                case 0:
                    question = "What is the capital of " + this.props.country.name;
                    answer = this.props.country.capital;
                    break;
                case 1:
                    question = "1What is the capital of " + this.props.country.name;
                    answer = this.props.country.capital;
                    break;
                case 2:
                    question = "2What is the capital of " + this.props.country.name;
                    answer = this.props.country.capital;
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

            </div>
        );
    }

});

module.exports = GameView;
