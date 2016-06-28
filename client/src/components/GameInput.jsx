var React = require('react');
var PropTypes = React.PropTypes;

var GameInput = React.createClass({

    render: function() {
        return (
            <form onSubmit={this.props.onsubmit}>
                <input type="text" />
            </form>
        );
    }

});

module.exports = GameInput;
