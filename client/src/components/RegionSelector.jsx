var React = require('react');

var RegionSelector = React.createClass({

    render: function() {
        return (
            <select onChange={this.props.onregionchange}>
                {this.props.data.map(function(region) {
                    return <option key={region}>{region}</option>
                })}
            </select>
        );
    }

});

module.exports = RegionSelector;
