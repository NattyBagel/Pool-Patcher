
/**
 *  ____                _   __  __       
 * |  _ \ ___  __ _  __| | |  \/  | ___   
 * | |_) / _ \/ _` |/ _` | | |\/| |/ _ \ 
 * |  _ <  __/ (_| | (_| | | |  | |  __/
 * |_| \_\___|\__,_|\__,_| |_|  |_|\___|  
 * 
 * Welcome to Pool Patcher! A program developped to help run little macro's and tiny programs
 * to help the coworkers of Northwest Wholesale! (And because Natasha's bored waiting for customers)
 * 
 * If you're looking at this, and don't understand code, please look away at the horrors *definetly*
 * beyond your comprehension haha!
 * 
 * >>>>>> But seriously, please don't touch or modify anything if you don't know what you're doing <<<<<<
 * 
 * If you're looking help in order to create any macro's or programs, please go into "defaultPatch.js"
 * for more of a guide.
 */

/*
 *  _____       ____          _     _     _   
 * |_   _|__   |  _ \  ___   | |   (_)___| |_ 
 *   | |/ _ \  | | | |/ _ \  | |   | / __| __|
 *   | | (_) | | |_| | (_) | | |___| \__ \ |_ 
 *   |_|\___/  |____/ \___/  |_____|_|___/\__|
 * 
 * EXPANDED FEATURES LIST
 *  [✓] Refined HTML
 *  [✓] Fancy Numbers
 *  - Groups -> While Selecting, adding a tab in `patchList` puts it under the latest non-link group
 *      - Recursive group creation would be a meathod to create it
 *  - Info Display Type
 *      [✓] Print
 * 			[✓] Regular Print
 *          [✓] List Print
 *      - Table
 *  - Text Typing
 *      [✓] Coloured Text (yeah thats hard :sob:)
 *          [color=red]Hello![/color]
 *      [✓] Bold Text
 *          [b]Bold Text![/b]
 *      [✓] Italics Text
 *          [u]Italics Text![/u]
 *      [✓] Underlined Text
 *          [u]Underlined Text![/u]
 *      [✓] Text Size
 *          [size=200]HUGE TEXT![/size]
 *      [✓] url
 *          [url=https://www.google.com/]Visit Google[/url]
 *      [✓] img
 *          [img]https://www.phpbb.com/theme/images/logos/blue/160x52.png[/img]
 *      [] tooltip
 *          has to be custom built
 * 		- Placeholder BBCode Processing
 * 			- Overlay div on the bottom of Text Area, and check if its full or empty to render
 * 	- Restart Patch
 * 	[✓] Page Wipe
 *  - Clicking on the history reveals the previous commands (all saved)
 */

const patchList = [] // Contains all Patches

/**
 * Runs and Manages the Selection Panel
 */
class SelectionContent {

	static selectionContent

	constructor() {
		if (SelectionContent.selectionContent != null) {
			throw new Error("Selection Content Field has already been created! Why is a second one being made?")
		}
		SelectionContent.selectionContent = document.getElementById("selection")
	}

	/**
	 * Adds a selectable Patch to the side of the screen, ready to run
	 * @param {Patch} patch The patch to add to the Selection Content
	 */
	static addPatch(patch) {
		const buttonDiv = document.createElement('button')
		buttonDiv.classList.add("withHover")

		// For the Following Line, this is required which is... very wierd lol
		buttonDiv.onclick = function () { patch.runPatch() }

		//Name
		const nameDiv = document.createElement('patch')
		nameDiv.appendChild(Text.toHTML(`• ${patch.name} - by ${patch.author}`))

		// Description
		const descDiv = document.createElement('patch')
		descDiv.appendChild(Text.toHTML(`[colour=${descColour}]${patch.description}[/colour]`))
		descDiv.classList.add("description")

		// Appending
		buttonDiv.appendChild(nameDiv)
		buttonDiv.appendChild(descDiv)
		SelectionContent.selectionContent.appendChild(buttonDiv)
	}
}

/**
 * Runs and Manages the Display Panel
 */
class DisplayContent {

	static displayContent
	static logo
	static printBox

	constructor() {
		if (DisplayContent.displayContent != null || DisplayContent.logo != null || DisplayContent.printBox != null) {
			throw new Error("Display Field has already been created! Why is a second one being made?")
		}
		DisplayContent.displayContent = document.getElementById("display")
		DisplayContent.logo = document.getElementById("logo")
		DisplayContent.printBox = document.getElementById("printBox")
		DisplayContent.createLogo()
	}

	/**
	 * Sets the logo of the Display Content, just to be easily modifiable
	 */
	static createLogo() {
		const logoString = ` ____             _   ____       _       _               
|  _ \\ ___   ___ | | |  _ \\ __ _| |_ ___| |__   ___ _ __®
| |_) / _ \\ / _ \\| | | |_) / _\` | __/ __| '_ \\ / _ \\ '__|
|  __/ (_) | (_) | | |  __/ (_| | || (__| | | |  __/ |   
|_|   \\___/ \\___/|_| |_|   \\__,_|\\__\\___|_| |_|\\___|_|   
`
		DisplayContent.logo.appendChild(Text.toHTML(logoString))
		document.getElementById("version").appendChild(Text.toHTML(`[b][colour=#f542e0]FREE TRIAL VERSION[/colour][/b]`))
		document.getElementById("author").appendChild(Text.toHTML("⋙ Created By Natasha Lamoureux ⋘"))
	}

	/**
	 * Prints a message to the the printBox
	 * @param {String} message The message to print
	 */
	static print(message) {
		var div = Text.toHTML(message)
		div.classList.add("defaultPrint")
		DisplayContent.printBox.appendChild(div)
	}

	/**
	 * Prints a single line from a list to the printbox
	 * @param {String} message The message to print
	 * @param {Int} max The Maximum number of list items
	 * @param {Int} curr The current number the list is at
	 */
	static printList(message, max, curr) {
		var div = Text.toHTML(message)
		if (curr == 1) {
			div.classList.add("listPrintTop")
		} else if (curr == max) {
			div.classList.add("listPrintBottom")
		} else {
			div.classList.add("listPrint")
		}
		DisplayContent.printBox.appendChild(div)
	}

	/**
	 * Prints a System Message to the printBox
	 * @param {String} message the message to print
	 */
	static printSys(message) {
		DisplayContent.print(`> ${message}`)
	}

	/**
	 * Prints a User Message to the printBox
	 * @param {String} message the message to print
	 */
	static printUser(message) {
		DisplayContent.print(`${message}`)
	}

	/**
	 * Prints an Error message to the printBox
	 * @param {String} message the message to print
	 */
	static printError(message) {
		DisplayContent.print(`[colour=${errorColour}]> ${message}[/colour]`)
	}

	/**
	 * Prints a startup message to the printBox
	 * @param {String} message the message to print
	 */
	static printStart(message) {
		DisplayContent.print(`[colour=${startColour}]> ${message}[/colour]`)
	}

	/**
	 * Prints a Table to the Printbox
	 * @param table the Table Object
	 */
	static printTable(table){
		DisplayContent.printBox.appendChild(table.getDiv())
	}

	/**
	 * Prints a Selection Box to the Print Area
	 * @param selection The Selection Object
	 */
	static printSelection(selection){
		DisplayContent.printBox.appendChild(selection.getDiv())
	}

	/**
	 * Getter for the printBox
	 * @returns {Div} The PrintBox
	 */
	static get printBox() {
		return DisplayContent.printBox
	}

	/**
	 * Getter for the logo
	 * @returns {Div} The Logo 
	 */
	static get logo() {
		return DisplayContent.logo
	}

	/**
	 * Getter for the display Content
	 * @returns {Div} The Display Content Panel
	 */
	static get displayContent() {
		return DisplayContent.displayContent
	}

	/**
	 * Prints a List
	 * @param {String[]} messageArray The messages to print
	 * @param {String} listType The type of message being sent
	 * - num 
	 * - dot
	 * - custom (Custom takes the First element in messageArray and makes it the list icon)
	 */
	static printFromArrayToList(messageArray, listType) {
		// Just a quick thing incase user forgets to add the author of the message
		if (listType == null) {
			listType = "dot"
		}
		let i = 1
		messageArray.forEach((message) => {
			switch (listType) {
				case "num":
					DisplayContent.printList(`${i} ${message}`, messageArray.length, i)
					break
				case "dot":
					DisplayContent.printList(`• ${message}`, messageArray.length, i)
					break
				case "custom":
					DisplayContent.printList(`${message[0]} ${message[i]}`, messageArray.length, i)
					break
			}
			i++
		})
	}

	/**
	 * Clears the printBox of all content
	 */
	static clear() {
		DisplayContent.printBox.replaceChildren()
	}

	/**
	 * Gets user input via a textbox
	 * @param {String} placeholderText the text displayed in the textbox (default "Enter text...")
	 * @returns Param(String)
	 */
	static async getUserInput(placeholderText) {
		const inputField = document.createElement("textarea")
		inputField.setAttribute("type", "text")
		inputField.id = "inputField"
		//Make sure the placeholder is visible
		if (placeholderText == null) {
			inputField.setAttribute("placeholder", `Enter text...`)
		} else {
			inputField.setAttribute("placeholder", `${placeholderText}`)
		}

		DisplayContent.printBox.appendChild(inputField)
		inputField.focus()

		return new Promise((resolve) => {

			inputField.addEventListener("keyup", (event) => {

				let input = inputField.value
				// This function needs to be redone, but its good enough for now
				if (Text.isNumber(input)) {
					//console.log(Number(input).toLocaleString())
					inputField.value = Text.parseNum(input.replaceAll(",", "")).toLocaleString()
				}

				if (event.key == "Enter") {
					inputField.remove()
					this.print(input, "user")
					if (Text.isNumber(input)) {
						resolve(input.trim().toLowerCase().replaceAll(",", ""))
					} else {
						resolve(input.trim().toLowerCase())
					}

				}
			})
		})

	}
}

/**
 * Runs and Manages the History Panel
 */
class HistoryContent {

	static historyContent

	constructor() {
		if (HistoryContent.historyContent != null) {
			throw new Error("History Content Field has already been created! Why is a second one being made?")
		}
		HistoryContent.historyContent = document.getElementById("history")
	}

	/**
	 * Gets the History Content Panel
	 * @returns {Div} The History Panel
	 */
	get historyContent() {
		return HistoryContent.historyContent
	}

	/**
	 * Logs History to the History Content Panel
	 * @param {Patch} patch The Patch That Ran
	 * @param {String} results The Results of the Patch
	 */
	static log(patch, results) {
		// Display Results on Screen
		console.log(results)
		if (results != undefined) {
			// Add Patch that copies button attributes from Selection Content
			const button = document.createElement("button")
			button.classList.add("withHover")
			HistoryContent.historyContent.appendChild(button)
			// Name
			const textDiv = document.createElement("patch")
			textDiv.appendChild(Text.toHTML(`• ${patch.getName} ↴ `))
			button.appendChild(textDiv)
			// Description
			const descDiv = document.createElement('patch')
			descDiv.appendChild(Text.toHTML(`[colour=${descColour}]${results}[/colour]`))
			descDiv.classList.add("description")
			button.appendChild(descDiv)
		}
	}
}

/**
 * Container for the Patch
 */
class Patch {
	constructor(dir) {
		this.dir = dir // The directory of the Patch
		this.name = null // The name of the Patch
		this.description = null // The Description of the Patch
		this.author = null // The Author of the Patch
		this.execute = null // The Execute Function to run the Patch
		this.group = null // The Group the Patch is placed in
		patchList.push(this)
		// Add Script to Webpage
		var newScript = document.createElement('script')
		newScript.src = dir
		document.getElementById("body").appendChild(newScript)
	}

	/**
	 * Gets the directory of the Patch
	 * @return {String} of the dir
	 */
	get getDir() {
		return this.dir
	}

	/**
	 * Gets the name of the Patch
	 * @return {String} name
	 */
	get getName() {
		return this.name
	}

	/**
	 * Gets the description of the Patch
	 * @return {String} description
	 */
	get getDesc() {
		return this.description
	}

	/**
	 * Gets the author of the Patch
	 * @return {String} author
	 */
	get getAuthor() {
		return this.author
	}

	/**
	 * Sets the Directory of the Patch
	 * @param {String} dir
	 * @return {Patch} this Patch
	 */
	setDir(dir) {
		if (this.dir == null) {
			this.dir = dir
			return this
		} else {
			throw new Error("Why is the directory of a patch being changed after initialization?")
		}
	}

	/**
	 * Sets the Name of the Patch
	 * @param {String} name
	 * @return {Patch} the Patch
	 */
	setName(name) {
		if (this.name == null) {
			this.name = name
			this.attemptToRender()
			return this
		} else {
			throw new Error("Why is the name of a patch being changed after initialization?")
		}

	}

	/**
	 * Sets the description of the Patch
	 * @param {String} description
	 * @return {Patch} The Patch
	 */
	setDesc(description) {
		if (this.description == null) {
			this.description = description
			this.attemptToRender()
			return this
		} else {
			throw new Error("Why is the description of a patch being changed after initialization?")
		}
	}

	/**
	 * Sets the author of the Patch
	 * @param {String} author
	 * @return {Patch} The Patch
	 */
	setAuthor(author) {
		if (this.author == null) {
			this.author = author
			this.attemptToRender()
			return this
		} else {
			throw new Error("Why is the author of a patch being changed after initialization?")
		}
	}

	/**
	 * Sets the executor function of the Patch
	 * @param {Function} executor
	 * @return {Patch} The Patch
	 */
	setExecute(func) {
		if (this.execute == null) {
			this.execute = func
			this.attemptToRender()
			return this
		} else {
			throw new Error("Why is the executor of a patch being changed after initialization?")
		}
	}

	/**
	 * Executes the Patch
	 */
	execute() {
		this.execute()
	}

	/**
	 * Runs a patch
	 */
	async runPatch() {
		DisplayContent.clear()
		DisplayContent.printStart(`Running ${this.getAuthor}'s "${this.getName}" Program!`)
		var results
		try {
			results = await this.execute()
		} catch (error) {
			console.error(error)
			print("An unexcpected error has occured. Sorry!", "error")
			results = `[colour=${errorColour}]Error[/colour]`
		}
		if (results == undefined) {
			results = `[colour=${descColour}]Blank Output...[/colour]`
		}
		HistoryContent.log(this, results)
	}

	/**
	 * Find a Patch **based on the script where this method is called**
	 * @returns {Patch} The Patch located in that file directory
	 */
	static find() {
		return patchList.find((patch) => document.currentScript.src.endsWith(patch.getDir))
	}

	/**
	 * Attempts to Render the Patch, once every value has been entered correctly
	 */
	attemptToRender() {
		if (this.isReady()) {
			this.addToSelection()
		}
	}

	/**
	 * Checks if the Patch is Ready to be sent out
	 * @returns {Boolean} If the Patch is ready to be sent out
	 */
	isReady() {
		return this.name != null &&
			this.description != null &&
			this.author != null &&
			this.execute != null
	}

	/**
	 * Adds the patch to the Selection Panel
	 */
	addToSelection() {
		if (this.group != null) {
			throw new Error("Groups have not been implemented in `Patch.addToSelection()`")
		} else {
			SelectionContent.addPatch(this)
		}
	}
}

/**
 * Processes Text to be printed on the screen
 */
class Text {

	/**
	 * Returns the number from the user's input
	 * @return int/float
	 * @throws Error if NaN
	 */
	static parseNum(text) {
		if (text) {
			return parseFloat(text)
		} else {
			throw new Error("Message is not a number!")
		}
	}

	/**
	 * Checks if the text is a number
	 * @deprecated
	 * @returns boolean
	 */
	static isNum(text) {
		return Text.isNumber()
	}

	/**
	 * Converts text and reads BBcode to be able to add custom formatting
	 * @param string the String to convert
	 * @returns {Div} Div containing the contents of the string
	 */
	static toHTML(string) {
		string = ""+string
		let div = document.createElement("pre")
		if (Text.hasBBCode(string)) {
			Text.parseHTMLRecursive(div, string)
		} else {
			div.appendChild(document.createTextNode(string))
		}
		return div
	}

	/**
	 * Recursively looks into a String to identify any BB codes and processes them to a Div
	 * @param {Div} parent The Parent Div
	 * @param {String} string The Current String
	 * @returns {Div} Returns the Div created based off the string
	 */
	static parseHTMLRecursive(parent, string) {
		if (Text.hasBBCode(string)) {
			const dict = Text.findBBCode(string)
			// Add the Start Cut
			parent.appendChild(document.createTextNode(dict["startCut"]))
			// Process The Center
			let splitBB = dict["startBB"].split("=")
			var div = document.createElement(splitBB[0])
			div = Text.addAttribute(div, splitBB[0], splitBB[1])
			Text.parseHTMLRecursive(div, dict["center"])
			parent.appendChild(div)
			// Add the End Cut
			parent.appendChild(document.createTextNode(dict["endCut"]))
		} else {
			parent.appendChild(document.createTextNode(string))
		}
	}

	/**
	 * Finds and adds special modifiers to specific Div Types
	 * @param {Div} div The Div trying to be modified
	 * @param {String} attribute The Type of the Div
	 * @param {String} amount The value to set a specific part of the attribute
	 * @returns {Div} The initial Div, now modified
	 */
	static addAttribute(div, attribute, amount) {
		if (amount == null) {
			return div
		}
		switch (attribute) {
			case ("colour"):
			case ("color"): // Color Attribute
				div.style.color = amount
				break
			case ("size"): // Size Attribute
				div.style.fontSize = `${amount}px`
				break
			case ("url"): // URL Attribute
				div = document.createElement("a")
				div.href = amount
				div.target = "_blank"
				break
			case ("tooltip"): //Tooltip Attribute (BROKEN)
				var tooltip = document.createElement()
				div.onmouseover = function () {
					console.log("hii")
				}
				break
			case ("img"): // Image Attribute
				div.src = amount
				break
		}
		return div
	}

	/**
	 * Returns a list of BB codes which are checked by the program
	 * @returns Array of BB codes
	 */
	static getBBCodes() {
		return [
			"b",
			"i",
			"u",
			"img",
			"color",
			"colour",
			"size",
			"url",
			"img",
			// "tooltip" //Not Completed Yet 
		]
	}

	/**
	 * Checks whether a Text Class contains any special BB characters
	 * @returns boolean if a BB is present
	 */
	static hasBBCode(string) {
		var hasBB = false
		Text.getBBCodes().forEach((code) => {
			if (string.indexOf(`[${code}`) != -1) {
				hasBB = true
			}
		})
		return hasBB
	}

	/**
	 * Finds BBCode in the string and converts it into an HTML element
	 * @param string the String to extract BB code data
	 * @returns Dictionary containing cut text
	 *      - startBB : The starting BB code
	 *      - endBB : The ending BB code
	 *      - startCut : The cut off section of text at the start
	 *      - endCut : The cut off section of text at the end
	 *      - center : Between the 2 BB codes (Text Class)
	 */
	static findBBCode(string) {
		// Get the Starting BB's Index
		const startIndicies = []
		Text.getBBCodes(string).forEach((code) => { startIndicies.push(string.indexOf(`[${code}`)) })
		const startBBMin = Math.min.apply(Math, startIndicies.filter((index) => index >= 0)) // Filter out -1's
		const startBBMax = string.indexOf("]", startBBMin) + 1

		// Get the closing BB's index
		const endIndicies = []
		Text.getBBCodes(string).forEach((code) => { endIndicies.push(string.lastIndexOf(`[/${code}]`)) })
		const endBBMin = Math.max.apply(Math, endIndicies)
		const endBBMax = string.lastIndexOf("]")

		let startBB = string.substring(startBBMin + 1, startBBMax - 1)
		let endBB = string.substring(endBBMin + 1, endBBMax)
		let startBBStripped = string.substring(startBBMin + 1, startBBMax)
		let endBBStripped = string.substring(endBBMin + 2, endBBMax)
		// Check for Errors
		if (!startBBStripped.startsWith(endBBStripped)) { // 2 is to knock out the [/
			throw new Error(`BB Code in String starts but is not correctly closed!\nStarts With: ${startBB}\nEnds With: ${endBB}`)
		}
		if (endBBMax < startBBMax) {
			throw new Error(`BB Code in String is missing a closing statement!\nMissing Closing Statement to: ${startBB} `)
		}
		// Prep Results
		const resultDict = {}
		resultDict["startBB"] = startBB
		resultDict["endBB"] = endBB
		resultDict["startCut"] = string.substring(0, startBBMin)
		resultDict["endCut"] = string.substring(endBBMax + 1)
		resultDict["center"] = string.substring(startBBMax, endBBMin)
		return resultDict
	}

	/**
	 * Checks if the number is actually a number
	 * @param {String} number 
	 * @returns {Boolean} is a Number or not
	 */
	static isNumber(number) {
		if (typeof (number) == "string") {
			return number.indexOf(",,") == -1 && !isNaN(Number(number.replaceAll(",", ""))) && number != ""
		}
		return typeof (number) == "number"

	}
}

/**
 * Creates a Table to hold Cells
 */
class Table {

	/**
	 * Returns a Square Table
	 * @param {Int} xSize The Number of Columns
	 * @param {Int} ySize The Number of Rows
	 * @param {String} distribution The size of the Columns (ex: "30% 40% 30%")
	 * @returns {Div} Div containing the table
	 */
	constructor(xSize, ySize, distribution) { 
		this.xSize = xSize
		this.ySize = ySize
		this.cells = new Array(xSize)
		for (let x = 0; x < xSize; x++) {
			this.cells[x] = new Array(ySize).fill(0)
		}

		const tableDiv = document.createElement("row")
		this.div = tableDiv
		tableDiv.classList.add("table")

		if (distribution != null && distribution != "") {
			if (distribution.split(" ").length != xSize) {
				throw new Error("Parameters in the Distribution Don't Match the Xsize!")
			}
			tableDiv.style.gridTemplateColumns = distribution
		} else {
			tableDiv.style.display = "flex"
		}

		for (let x = 0; x < xSize; x++) {
			let column = document.createElement("column")
			for (let y = 0; y < ySize; y++) {
				let cell = document.createElement("cell")
				if (x == 0) cell.classList.add("left")
				if (y == 0) cell.classList.add("top")
				this.cells[x][y] = new Cell(cell,x,y)
				column.appendChild(cell)
			}
			tableDiv.appendChild(column)
		}
	}

	/**
	 * Gets the Div of the Table
	 * @returns Table Div
	 */
	getDiv(){
		return this.div
	}

	/**
	 * Gets the Cell of the Table
	 * @param x the X Cell
	 * @param y the Y Cell
	 */
	getCell(x, y) {
		return this.cells[x][y]
	}

	/**
	 * Writes an Array of Text to fill a table
	 * @param 2D Array of Text (array[x][y])
	 */
	writeGrid(array) {
		if (array.length != this.cells.length || array[0].length != this.cells[0].length) {
			throw new Error("ERROR: Array of Strings does not match the Length of the Cell Buttons!")
		}
		for (let x = 0; x < array.length; x++) {
			for (let y = 0; y < array[x].length; y++) {
				this.cells[x][y].write(array[x][y])
			}
		}
	}

	/**
	 * Writes an Array of Functions to fill a table
	 * @param 2D Array of Functions (array[x][y])
	 */
	buttonGrid(array) {
		if (array.length != this.cells.length || array[0].length != this.cells[0].length) {
			throw new Error("ERROR: Array of Buttons does not match the Length of the Cell Buttons!")
		}
		for (let x = 0; x < array.length; x++) {
			for (let y = 0; y < array[x].length; y++) {
				if (typeof (array[x][y]) == 'function') {
					this.cells[x][y].addButton(array[x][y])
				}
			}
		}
	}
	
	/**
	 * Adds a Class to the Cell
	 * @param className the Name of the Class
	 */
	addClass(className){
		this.cells.forEach(column => {
			column.forEach(cell => {
				cell.addClass(className)
			})
		})
	}

	/**
	 * Removes a Class from the Cell
	 * @param className the class to Remove
	 */
	removeClass(className){
		this.cells.forEach(column => {
			column.forEach(cell => {
				cell.removeClass(className)
			})
		})
	}

	/**
	 * Sets the Table Borders to be Transparent
	 */
	setTransparent(){
		this.addClass("invis")
		this.removeClass("top")
		this.removeClass("left")
	}
	
	/**
	 * Replaces a Cell with a different Div
	 * @param x the X position
	 * @param y the Y position
	 * @param div The Div to replace
	 */
	replaceCell(x,y,div){
		let cell = this.getCell(x,y)
		cell.appendChild(div)
	}

	/**
	 * Disable the Button Hover Feature on all Cells in Table
	 */
	disableAllButtonHover(){
		this.cells.forEach(column => {
			column.forEach(cell => {
				if (cell.hasButton()){
					cell.disableHover()
				}
			})
		})
	}

	disableAllButtons(){
		this.cells.forEach(column => {
			column.forEach(cell => {
				if (cell.hasButton()){
					cell.disableButton()
				}
			})
		})
	}

	enableAllButtons(){
		this.cells.forEach(column => {
			column.forEach(cell => {
				if (cell.hasButton()){
					cell.enableButton()
				}
			})
		})
	}

	async awaitButtonClick(){
		return new Promise((resolve) => {
			this.resolve = resolve
		})
	}

}

/**
 * Creates Cell for a Table to hold information
 */
class Cell {

	/**Create a new Cell to hold Graph Information
	 * @param div the Div the Cell Contains
	 * @param x the X position of the Cell
	 * @param y the Y position of the Cell
	 */ 
	constructor(div,x,y) {
		this.id = [x,y]
		this.div = div
		this.button = null
		this.textBox = null
		this.checkBox = null
	}

	/**
	 * Removes any Content of the Button
	 */
	clear() {
		this.div.replaceChildren()
		this.button = null
		this.div.classList.remove("button")
		this.textBox = null
		this.checkBox = null
		this.div.style.backgroundColor = ""
	}

	/**
	 * Writes to the Cell
	 * @param str the String to Write
	 */
	write(str) {
		let strNode = Text.toHTML(str)
		if (this.button == null) {
			this.div.appendChild(strNode)
		} else {
			this.button.appendChild(strNode)
		}
	}

	/**
	 * Adds a button to the Cell
	 * @param func The function to parse once the button is clicked
	 * Function takes the id of the cell
	 */
	addButton(func) {
		this.clear() // Might Remove Later...
		this.button = document.createElement("button")
		this.button.classList.add("table")
		this.enableHover()
		this.div.appendChild(this.button)
		this.button.onclick = ()=>{
			func(this.id)
		}
		this.div.classList.add("button")
	}

	disableButton() {
		if (this.hasButton()){
			this.button.setAttribute("disabled",true)
			this.disableHover()
		}
	}

	enableButton() {
		if (this.hasButton()){
			this.button.removeAttribute("disabled")
			this.enableHover()
		}
	}

	/**
	 * Returns the Text of the Button
	 * @return Text String
	 */
	textContent(){
		if (this.hasButton()){
			return this.button.textContent
		}else{
			return this.div.textContent
		}
	}

	/**
	 * Checks if the Cell has a button
	 * @return boolean
	 */
	hasButton(){
		return this.button != null
	}

	/**
	 * Disables the hover of the Cell
	 */
	disableHover(){
		this.button.classList.remove("withHover")
	}

	enableHover(){
		this.button.classList.add("withHover")
	}

	/**
	 * Sets the Background Colour of the cell
	 * @param colour The Colour
	 */
	setColour(colour){
		this.div.style.backgroundColor = colour
	}

	/**
	 * Gets the current Colour of the Cell
	 * @returns Color in the format of "rgb(0, 0, 0)"
	 */
	getColour(){
		return this.div.style.backgroundColor
	}

	/**
	 * Appends a Div to the Cell
	 * @param newDiv the Div to append
	 */
	appendChild(newDiv){
		this.clear()
		this.div.appendChild(newDiv)
	}

	addClass(className){
		this.div.classList.add(className)
	}

	removeClass(className){
		this.div.classList.remove(className)
	}
}

/**
 *  __  __       _         __  __      _   _               _     
 * |  \/  | __ _(_)_ __   |  \/  | ___| |_| |__   ___   __| |___ 
 * | |\/| |/ _` | | '_ \  | |\/| |/ _ \ __| '_ \ / _ \ / _` / __|
 * | |  | | (_| | | | | | | |  | |  __/ |_| | | | (_) | (_| \__ \
 * |_|  |_|\__,_|_|_| |_| |_|  |_|\___|\__|_| |_|\___/ \__,_|___/
 */

/**
 * Prints a message to the page
 * @param message The message to print
 * @param messageType The type of message being sent
 */
function print(message, messageType) {
	switch (messageType) {
		case ("error"):
			DisplayContent.printError(message)
			return
		case ("user"):
			DisplayContent.printUser(message)
			return
		case ("system"):
		case ("sys"):
			DisplayContent.printSys(message)
			return
	}
	DisplayContent.printSys(message)
}

/**
 * Prints a List
 * @param messageArray The messages to print
 * @param messageType The type of message being sent
 */
function printList(messageArray, listType) {
	DisplayContent.printFromArrayToList(messageArray, listType)
}

/**
 * Prints a Table
 * @param table the Table to print
 */
function printTable(table){
	DisplayContent.printTable(table)
}

/**
 * Prints a Selection Object to the printBox
 * @param selection The Selection Oject
 */
function printSelection(){
	DisplayContent.printSelection(selection)
}

/**
 * Gets User Input
 * @param placeholder The placeholder message
 * @returns Text
 */
async function getUserInput(placeholderText) {
	return await DisplayContent.getUserInput(placeholderText)
}

/**
 * Formats a String into a Number with commas every 3 digits
 * @param {String} string The String to Format
 */
function toFancyNumber(string) {
	if (Text.isNumber(string)) {
		if (typeof (string) == "string") {
			string = string.replaceAll(",", "")
		}
		return Number(string).toLocaleString()
	}
	return string
}

/**
 * Clears the displayed 
 */
function clear(){
	DisplayContent.clear()
}

// Colours
const errorColour = "#fa5173"
const descColour = "#7a7b8c"
const startColour = "#1477da"
const resultColor = "#2bcf41"

// Menu UI
new SelectionContent
new DisplayContent
new HistoryContent