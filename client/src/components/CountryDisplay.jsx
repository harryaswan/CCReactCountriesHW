var React = require('react');
var PropTypes = React.PropTypes;
var BorderCountryDisplay = require('./BorderCountryDisplay.jsx');

var CountryDisplay = React.createClass({

    render: function() {

        var name = "Not selected";
        var population = "N/A";
        var borders = [];

        var dataBits = [];

        var borderHeader = <h4> No Borders </h4>
        if (this.props.country) {
            name = this.props.country.name;
            population = this.props.country.population;

            if (this.props.borders.length > 0) {
                // borders.push(<p>Borders:</p>);
                borderHeader = <h4> Borders are </h4>
                for (var bCountry of this.props.borders) {
                    borders.push(<BorderCountryDisplay key={bCountry.alpha3Code} country={bCountry} />);
                }
            }

            for (var key of Object.keys(this.props.country)) {
                dataBits.push(<p key={key}>{key}: {JSON.stringify(this.props.country[key])}</p>);
            }
        }


        return (
            <div>
                <div className="countryInfo">
                    <p><b>Name:</b> {name}</p>
                    <p><b>Population:</b> {population}</p>
                    {borderHeader}
                    {borders}
                </div>

                <div className="dataDump">
                    <b>All Data:</b>
                    { dataBits }
                </div>
            </div>
        );
    }

});

module.exports = CountryDisplay;
