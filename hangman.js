const fs = require('fs')
const _ = require('lodash')
const prompt = require('prompt-sync')()

//First load up the dictionary and turn it into an array
var textLoad = fs.readFileSync("./dictionary.txt").toString('utf-8')
var dict = textLoad.split('\n')

console.log("Dictionary Loaded. Have fun!")

//While the user does not want to quit:
var quit = false
while(!quit)
{
    //Select a random word and make it the hangman phrase
    var target = _.sample(dict)
    var hint = _.repeat('_',target.length)
    var finished = false
    var failsLeft = 6
    while(!finished && failsLeft)
    {
        console.log(hint)
        var input = _.lowerCase(prompt('Enter a character: '))
        while(input.length != 1 || !(/[a-zA-Z]/).test(input))
        {
            input = _.lowerCase(prompt("Please enter just one character from the english alphabet: "))
        }
        if(_.includes(target,input))
        {
            //If the the letter is present in the target word, make the hint display the correct guesses
            hint = target.split('').map((char, i) => char === input ? input : hint[i]).join('')
        }
        else
        {
            failsLeft--
            console.log(`Incorrect! ${failsLeft} lives left.`)
        }
        finished = hint === target
    }
    if(hint === target)
        console.log(`Congradulations! The word was ${target}!`)
    else
        console.log(`Sorry, you lose. The word was ${target}.`)
    var verify = _.lowerCase(prompt("Play Again? (Y/N)"))
    while(verify.length != 1 || !(/[ynYN]/).test(verify))
    {
        verify = _.lowerCase(prompt("Please enter just Y or N: "))
    }
    if(_.lowerCase(verify) === 'n' )
        quit = true
}