var React = require('react');
var CountrySelector = require('./CountrySelector.jsx');
var RegionSelector = require('./RegionSelector.jsx');
var CountryDisplay = require('./CountryDisplay.jsx');
var GameView = require('./GameView.jsx');

var GameBox = React.createClass({

    getInitialState: function() {
        return {
            countries: null,
            currentCountry: null,
            currentCountryBorders: [],
            gameMode: 0,
            score: 0,
            scoreDrawn: false
        };
    },

    componentDidMount: function() {
        var url = "https://restcountries.eu/rest/v1/all";
        var req = new XMLHttpRequest();
        req.open("GET", url);
        req.onload = function() {
            console.log("retieved data");
            var data = JSON.parse(req.responseText);
            var country = this.grabRandomCountry(data);
            this.setState({countries: data, currentCountry: country, gameMode: parseInt(Math.random() * 5), currentCountryBorders: this.getCountryBorders(country.borders, data)});
        }.bind(this);
        req.send(null);
        console.log("asking for data....");
    },

    render: function() {

        var score;
        if (!this.state.scoreDrawn) {
            score = (<p className='correct'>Score: <span className='scoreNumber'>{this.state.score}</span></p>);
            this.state.scoreDrawn = true;
        } else {
            score = (<p>Score: <span className='scoreNumber'>{this.state.score}</span></p>);
        }


        return (
            <div>
                <h1>🌍 Countries of The World 🌍</h1>
                {score}
                <GameView gameMode={this.state.gameMode} country={this.state.currentCountry} borders={this.state.currentCountryBorders} finishRound={this.finishRound}/>
            </div>
        );
    },

    finishRound: function(correctAnswer) {
        console.log('ca', correctAnswer);
        if (correctAnswer) {
            this.setState({score: this.state.score + 1, scoreDrawn:false});
        }
        var country = this.grabRandomCountry();
        this.setState({currentCountry: country, currentCountryBorders: this.getCountryBorders(country.borders), gameMode: parseInt(Math.random() * 5)});
    },
    grabRandomCountry: function(data) {
        var countryData = data;
        if (!countryData) {
            countryData = this.state.countries;
        }
        var index = parseInt((Math.random() * countryData.length) + 1);
        return countryData[index];
    },

    getCountryBorders: function(countryBorders, data) {

        var countriesData = data;
        if (!countriesData) {
            countriesData = this.state.countries;
        }

        return countriesData.filter(function(country) {
            if (countryBorders.indexOf(country.alpha3Code) > -1) {
                return true;
            } else {
                return false;
            }
        });
        console.log(countryBorders);

        // return countryBorders.map(function(countryCode) {
        //     for (var country of countriesData) {
        //         if (country.alpha3Code === countryCode) {
        //             return country;
        //         }
        //     }
        // }.bind(this));

    }

});

module.exports = GameBox;
