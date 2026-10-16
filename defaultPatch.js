
// Make sure your Patch is initialized in PatchList.js

Patch.find()
.setName("Patch Name")
.setDesc("Patch Description")
.setAuthor("Patch Author")

/*
Input Methods (All Input Methods **NEED** an await beforehand)
	await getUserInput("PlaceholderText")

Output Methods
	print(message, messageType)
	printList(messageArray, listType)

Text Methods (String as param)
	parseNum
	isNum
*/

.setExecute(async function(){
	const input = await getUserInput("placeholder")
	console.log(Text.isNum(input))
})