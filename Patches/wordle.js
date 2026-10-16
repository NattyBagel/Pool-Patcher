
Patch.find()
.setName("Wor▚le")
.setDesc("Lets be silly, shall we?")
.setAuthor("Natasha")

/*
Input Methods (All Input Methods **NEED** an await beforehand)
	await getUserInput("PlaceholderText")

Output Methods
	print(message, messageType)
	printList(messageArray, listType)

Text Methods
	parseNum
	isNum

Table
    getCell
        clear
        write
        textContent
        addButton
        hasButton
        setColour
        getColour
        setDiv
        disableHovers
    writeGrid
    buttonGrid
    replaceCell
    disableAllButtonHover
*/



// DOUBLE YELLOW COLOURS HAVE NO CHECKS!!!!!

// 6 Letter Words : https://www.poslarchive.com/math/scrabble/lists/common-6.html
// https://github.com/mstgnz/words (other source (with wierd words))

.setExecute(async function(){
    const noColour = "rgb(120, 124, 126)"
    const unknownColour = "rgb(166, 130, 194)"
    const correctColour = "rgb(106, 170, 100)"
    const wrongPositionColour = "rgb(201, 180, 88)"
    const wordleSize = 6
    const wordleGuesses = 8

    let randWord = Math.floor(Math.random() * wordleWordsList.length)
    const word = wordleWordsList[randWord]
    //const word = "sooner" // and horror are good words to test
    console.log(word)
    var wrongLetter = new Array(wordleGuesses).fill()
    for(let i = 0 ; i < wordleGuesses ; i++){
        wrongLetter[i] = {}
        wrongLetter[i]["userWrong"] = -1
        let rando = Math.floor(Math.random() * wordleSize)
        wrongLetter[i]["trueWrong"] = rando
    }

    

    let tableContainer = new Table(3,1,"auto min-content auto")
    tableContainer.setTransparent()
    let table = new Table(wordleSize,wordleGuesses)
    table.addClass("wordle")

    // Process Buttons
    function swapColours(cellID){

        if (wrongLetter[cellID[1]]["userWrong"] != -1 && wrongLetter[cellID[1]]["userWrong"] != cellID[0]){ // Wrong Check has not been called yet
            let oldCell = table.getCell(wrongLetter[cellID[1]]["userWrong"],cellID[1])

            let oldWord = ""
            for(let i = 0; i < wordleSize ; i++){
                oldWord = oldWord + table.getCell(i,cellID[1]).textContent().toLowerCase()
            }
            oldCell.setColour(
                getLetterColour(oldCell.textContent().toLowerCase(),wrongLetter[cellID[1]]["userWrong"],cellID[1],true,oldWord)
            )
        }

        wrongLetter[cellID[1]]["userWrong"] = cellID[0]
        //console.log(wrongLetter)
        let newColour = null
        if (`${table.getCell(cellID[0],cellID[1]).getColour()}` == ""){
            table.getCell(cellID[0],cellID[1]).setColour(noColour)
        }
        switch(table.getCell(cellID[0],cellID[1]).getColour()){
            case(unknownColour):
                newColour = wrongPositionColour
                break;
            case(wrongPositionColour):
                newColour = correctColour
                break;
            case(correctColour):
                newColour = noColour
                break;
            case(noColour):
                newColour = unknownColour
                break;
        }
        table.getCell(cellID[0],cellID[1]).setColour(newColour)
    }
    tableContainer.replaceCell(1,0,table.getDiv())
    printTable(tableContainer)


    

    function printToWordle(guess){

        // Add Buttons to Grid
        let funcArray = new Array(wordleSize)
        let buttonInserted = false
        for(let i = 0 ; i < wordleSize ; i++){
            funcArray[i] = new Array(wordleGuesses).fill(null)
        }
        for(let i = 0 ; i < wordleGuesses ; i++){            
            if (`${table.getCell(0,i).textContent()}` == "" && !buttonInserted){
                for (let k = 0 ; k < wordleSize ; k++){
                    funcArray[k][i] = swapColours
                }
                buttonInserted = true
            }
        }
        table.buttonGrid(funcArray)
        table.disableAllButtonHover()

        // Add Text to Grid
        let wordInserted = false
        for(let i = 0 ; i < wordleGuesses ; i++){
            if (`${table.getCell(0,i).textContent()}` == "" && !wordInserted){
                for (let k = 0 ; k < wordleSize ; k++){
                    let cell = table.getCell(k,i)
                    let letter = guess.charAt(k)
                    cell.write(`[colour=#ffffff][b]${letter.toUpperCase()}[/b][/colour]`)
                    if (wrongLetter[i]["trueWrong"] == k){
                        wrongLetter[i]["trueWrongColour"] = generateWrongColour(getLetterColour(letter,k,i,false,guess))
                    }
                    if (guess == word){
                        cell.setColour(getLetterColour(letter,k,i,false))
                    }else{
                        cell.setColour(getLetterColour(letter,k,i,true,guess))
                    }
                    funcArray[k][i] = swapColours
                }
                wordInserted = true
            }
        }
        return null
    }

    function getLetterColour(letter,x,y,enabled,guess){
        // Makes Sure the Wrong color is displayed
        if (wrongLetter[y]["trueWrong"] == x && enabled){
            return wrongLetter[y]["trueWrongColour"]
        }
        if (letter == word.charAt(x)){
            return correctColour
        }
        if (word.includes(letter)){
            let count = word.split(letter).length-1;
            let lettersFound = 0 
            let tempGuess = guess
            for (let i = 0 ; i < wordleSize ; i++){
                if (guess.charAt(i) == word.charAt(i) && guess.charAt(i) == letter){
                    tempGuess = tempGuess.slice(0,i) + "$" + tempGuess.slice(i+1)
                    lettersFound++
                }
            }
            
            for (let i = 0 ; i < wordleSize ; i++){
                if (guess.charAt(i) == letter && wrongLetter[y]["trueWrong"] != i){
                    lettersFound++
                }
                if (lettersFound <= count  && i == x){
                    return wrongPositionColour
                }
            }
        }
        return noColour
    }

    function isValid(guess){
        return guess.length==wordleSize && (wordleLangList.includes(guess) || wordleWordsList.includes(guess))
    }

    var guess
    var numGuess = 1
    var gameResult = null
    while(numGuess <= wordleGuesses && gameResult == null){
        clear()
        print("6 Letter Wordle! However, one letter's result is hidden per guess. Good luck!")
        printTable(tableContainer)
        guess = await getUserInput(`Enter Guess Number ${numGuess}...`)
        if (isValid(guess)){
            gameResult = printToWordle(guess)
            if (guess == word){
                return `[colour=${resultColor}]Win[/colour]! (${numGuess}/${wordleGuesses} Guesses)`
            }   
            numGuess++
        }
    }
    if (gameResult == null){
        print(`The word was [colour=${correctColour}]${word}[/colour], better luck next time!`)
        return `[colour=${errorColour}]Whoops...[/colour]`
    }
    return gameResult


    function generateWrongColour(trueColour){
        // trueColour is for doing something funky for fun :3
        let randNum
        switch(trueColour){
            case(correctColour): // Green
                randNum = Math.floor(Math.random() * 5) // 3/5 Gray , 2/5 Green
                if (randNum < 3){
                    return noColour
                }
                return wrongPositionColour
                break
            case(noColour): // Gray
                randNum = Math.floor(Math.random() * 2) // 1/2 Green , 1/2 Yellow
                if (randNum < 1){
                    return wrongPositionColour
                }
                return correctColour
                break
            case(wrongPositionColour): // Yellow
                randNum = Math.floor(Math.random() * 7) // 3/7 Green , 4/7 Gray
                if (randNum < 3){
                    return correctColour
                }
                return noColour
                break
        }
    }
})

let WordleWordScript = document.createElement('script')
WordleWordScript.src = "Patches/wordleWords.js"
document.getElementById("body").appendChild(WordleWordScript)

// Six Letter Silly Wordle -> Hides 1 Character