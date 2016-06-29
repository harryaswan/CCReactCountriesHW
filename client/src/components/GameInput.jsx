var React = require('react');
var PropTypes = React.PropTypes;

var GameInput = React.createClass({

    getInitialState: function() {
        return {
            answerText: null
        };
    },

    render: function() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" onChange={this.handleTextChange} value={this.state.answerText}/>
                <input type="submit" value="Guess!" />
            </form>
        );
    },
    handleTextChange: function(e) {
        this.setState({answerText: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var answerVal = false;
        if (this.state.answerText) {
            answerVal = this.state.answerText.toLowerCase() === this.props.answer.toLowerCase();
        }
        this.setState({answerText: null});
        if (!answerVal) {
            alert("The correct answer was: " + this.props.answer);
        }
        this.props.onsubmit(answerVal);
    }

});

module.exports = GameInput;
