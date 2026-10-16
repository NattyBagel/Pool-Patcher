
// Make sure your Patch is initialized in PatchList.js

Patch.find()
.setName("Salt Calculator")
.setDesc("Calculates the amount of Salt required to reach a Concentration")
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
*/

.setExecute(async function(){
	var volume = await getUserInput("Enter Pool Volume...")
	var currSalt = await getUserInput("Enter CURRENT Salt concentration")
	var targetSalt = await getUserInput("Enter TARGET Salt concentration")
	if (!Text.isNum(currSalt) || !Text.isNum(volume) || !Text.isNum(targetSalt)){
		print("Values Required were not Numbers!","error")
		return
	}
	var volume = Text.parseNum(volume)
	var currSalt = Text.parseNum(currSalt)
	var targetSalt = Text.parseNum(targetSalt)
	function calculateSaltNeeded(){
		return Math.round((targetSalt - currSalt) * (volume/1000))
	}
	const calculatedSalt = (calculateSaltNeeded(Math.max(currSalt,40))/1000).toFixed(0)
	const final = `Your pool needs [colour=${resultColor}]${toFancyNumber(calculatedSalt)}Kg[/colour] of Salt. (~${toFancyNumber(Math.round(calculatedSalt/20))} Bags)`
	print(final)
	return final
})




