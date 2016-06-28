var React = require('react');
var CountrySelector = require('./CountrySelector.jsx');
var RegionSelector = require('./RegionSelector.jsx');
var CountryDisplay = require('./CountryDisplay.jsx');
var GameView = require('./GameView.jsx');

var CountriesBox = React.createClass({

    getInitialState: function() {
        return {
            countries: [],
            currentCountry: null,
            currentCountryBorders: [],
            currentRegion: null,
            regions: []
            score: 0;
        };
    },

    componentDidMount: function() {
        var url = "https://restcountries.eu/rest/v1/all";
        var req = new XMLHttpRequest();
        req.open("GET", url);
        req.onload = function() {
            var data = JSON.parse(req.responseText);
            this.setState({countries: data});
            var regions = [];
            for (var country of this.state.countries) {
                if (regions.indexOf(country.region) === -1) {
                    regions.push(country.region);
                }
            }
            this.setState({regions: regions, currentRegion:regions[0]});
            this.setState({currentCountry:this.grabCountries('region', this.state.currentRegion)[0]});
            this.setState({currentCountryBorders: this.getCountryBorders(data[0].borders)});
        }.bind(this);
        req.send(null);
    },

    render: function() {

        return (
            <div>
                <h1>🌍 Countries of The World 🌍</h1>
                <GameView country={this.state.currentCountry}/>
            </div>
        );
    },

    finishRound: function(correctAnswer) {
        if (correctAnswer) {
            this.setState({score: this.state.score + 1});
        }
        this.setState({currentCountry: this.grabRandomCountry()});
    },
    grabRandomCountry: function() {
        var index = Math.random() * this.state.countries + 1;
    },

    handleRegionSelect: function(e) {
        e.preventDefault();
        var selRegion = this.state.regions[e.target.selectedIndex]
        this.setState({currentRegion: selRegion});
        this.setState({currentCountry:this.grabCountries('region', selRegion)[0]});
    },
    handleCountrySelect: function(e) {
        e.preventDefault(); // not needed in this example - but good practice to have it here if in a form, etc.
        var country = this.grabCountries('region', this.state.currentRegion)[e.target.selectedIndex];
        this.setState({currentCountry: country, currentCountryBorders: this.getCountryBorders(country.borders)});
    },
    grabCountries: function(key, val) {
        return this.state.countries.filter(function(country) {
            return country[key] === val;
        })
    },
    getCountryBorders: function(countryBorders) {

        return this.state.countries.filter(function(country) {
            if (countryBorders.indexOf(country.alpha3Code) > -1) {
                return true;
            } else {
                return false;
            }
        });

        // return countryBorders.map(function(countryCode) {
        //     for (var country of this.state.countries) {
        //         if (country.alpha3Code === countryCode) {
        //             return country;
        //         }
        //     }
        // }.bind(this));

    }

});

module.exports = CountriesBox;
