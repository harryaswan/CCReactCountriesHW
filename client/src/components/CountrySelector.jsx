var React = require('react');

var CountrySelector = React.createClass({

    render: function() {
        // var countries = this.props.data.map(function(country) {
        //     return React.createElement('option', null, country.name);
        // });
        return (
            // React.createElement('select', null, countries)
            <select onChange={this.props.oncountrychange}>
                {this.props.data.map(function(country) {
                    return <option key={country.alpha2Code}>{country.name}</option>
                })}
            </select>
        );
    },
    handleChange: function(e) {
        console.log('e', e.target.selectedIndex);
    }

});

module.exports = CountrySelector;
