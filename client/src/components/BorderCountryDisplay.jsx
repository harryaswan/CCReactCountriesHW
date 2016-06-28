var React = require('react');
var PropTypes = React.PropTypes;

var BorderCountryDisplay = React.createClass({

    render: function() {
        return (
            <div key={this.props.country.alpha3Code} className="border-country">
                <p>Name: {this.props.country.name}</p>
            </div>
        );
    }

});

module.exports = BorderCountryDisplay;
