
// Make sure your Patch is initialized in PatchList.js

Patch.find()
.setName("Stabalizer Calc")
.setDesc("For when the Lab reccomends [colour=#066199]SALT ONE[/colour]")
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
	print("Make sure these levels are valid before proceeding (according to the bottle)","web")
	printList([
		"Chlorine: 1-3 (0-1 for UV sys.)",
		"pH: 7.2-7.8",
		"Alkalinity: 80-120",
		"Calcium: 200-300"
	],"dot")
	var volume = await getUserInput("Enter Pool Volume...")
	var currCYA = await getUserInput("Enter Current Stabalizer (CYA) concentration")
	if (!Text.isNum(currCYA) || !Text.isNum(volume)){
		print("Values Required were not Numbers!","error")
		return
	}
	var volume = Text.parseNum(volume)
	var currCYA = Text.parseNum(currCYA)
	function calculateStabNeeded(targetConc){
		return Math.round((targetConc - currCYA) * (volume/1000))
	}

	console.log(currCYA)
	console.log(volume)
	console.log(Math.max(currCYA,45))
	const final = `Your pool needs [colour=${resultColor}]${toFancyNumber(calculateStabNeeded(Math.max(currCYA,40)))}g[/colour] of Stabalizer`
	print(final)
	return final
})




