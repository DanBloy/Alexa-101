'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Derby Geek';

/**
 * Array containing Derby facts.
 */
var FACTS = [
    "Television comedy 'The League of Gentlemen' is filmed in Hadfield, a small village near Glossop in North Derbyshire.",
    "Former Rams goalkeeper, Peter Shilton, holds the record for most international appearances for England.",
    "Famous philosopher, Herbert Chapman, was born in Exeter Street in Derby city centre in 1820."
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function() {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function() {
        this.emit('GetFact');
    },
    'GetFact': function() {
        // Get a random nottngham fact from the Derby facts list
        var factIndex = Math.floor(Math.random() * FACTS.length);
        var randomFact = FACTS[factIndex];

        // Create speech output
        var speechOutput = "Here's your fact: " + randomFact;

        this.emit(':tell', speechOutput)
    },
    'AMAZON.HelpIntent': function() {
        var speechOutput = "You can say tell me a Derby fact, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', 'Goodbye!');
    }
};
