'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Derby Geek';

/**
 * Array containing Derby facts.
 */
var FACTS = [
    "Television comedy, The League of Gentlemen, is filmed in Hadfield, a small village near Glossop in North Derbyshire.",
    "Former Rams goalkeeper, Peter Shilton, holds the record for most international appearances for England.",
    "Famous philosopher, Herbert Chapman, was born in Exeter Street in Derby city centre in 1820."
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.dynamoDBTableName = 'DerbySkillDB';
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'NewSession': function() {
        // Check for User Data in Session Attributes
        var userName = this.attributes['userName'];
        if (userName) {
            // Welcome User Back by Name
            this.emit(':ask', `Welcome back ${userName}! it's great to see you again. To hear a fact about Derby say. Tell me a fact`);

            // Welcome a new user
        } else {
            this.emit(':ask', 'Welcome to Derby Geek. The skill that gives you information about the city of Derby. You can ask me to tell you a fact. But first, I\'d like to get to know you better. Tell me your name by saying: My name is, and then your name.', 'Tell me your name by saying: My name is, and then your name.');
        }
    },

    'NameCapture': function() {
        // Get Slot Values assign to Var
        var name = this.event.request.intent.slots.UKFirstName.value;

        // Save Name in Session Attributes
        this.attributes['userName'] = name;
        this.emit(':ask', `Great, thanks ${name}! To hear a fact about Derby ask me for Derby Facts`, `how can i help`);
    },

    'LaunchRequest': function() {
        // seeting a variable to an MP3 file and playing that back to the user
        var helloAudio = `<audio src="https://s3-eu-west-1.amazonaws.com/alexa-public-dan-bloy/hello.mp3"></audio>`;
        this.emit(':ask', `${helloAudio} to hear a Fact, say. Tell me a Fact!`);
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

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
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
