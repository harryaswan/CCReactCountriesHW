var React = require('react');
var CountrySelector = require('./CountrySelector.jsx');
var RegionSelector = require('./RegionSelector.jsx');
var CountryDisplay = require('./CountryDisplay.jsx');
var GameView = require('./GameView.jsx');

var GameBox = React.createClass({

    getInitialState: function() {
        return {
            countries: [],
            currentCountry: null,
            currentCountryBorders: [],
            gameMode: 0,
            regions: [],
            score: 0
        };
    },

    componentDidMount: function() {
        var url = "https://restcountries.eu/rest/v1/all";
        var req = new XMLHttpRequest();
        req.open("GET", url);
        req.onload = function() {
            var data = JSON.parse(req.responseText);
            this.setState({countries: data});
            this.setState({currentCountry: this.grabRandomCountry(), gameMode: parseInt(Math.random() * 5)});
            this.setState({currentCountryBorders: this.getCountryBorders(data[0].borders)});
        }.bind(this);
        req.send(null);
    },

    render: function() {

        

        return (
            <div>
                <h1>🌍 Countries of The World 🌍</h1>
                <GameView gameMode={this.state.gameMode} country={this.state.currentCountry} borders={this.state.currentCountryBorders}/>
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
        console.log(this.state.countries);
        var index = parseInt((Math.random() * this.state.countries.length) + 1);
        console.log(this.state.countries[index]);
        return this.state.countries[index];
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

module.exports = GameBox;
