/*
Original Idea was to have a JSON file with all of the files inside, since 
reading files on the filesystem through default javascript is kinda impossible (afaik)
for security reasons of course. Using this system, it presents a way to bypass it
pretty easily.
*/

/*
 ____       _       _               
|  _ \ __ _| |_ ___| |__   ___  ___ 
| |_) / _` | __/ __| '_ \ / _ \/ __|
|  __/ (_| | || (__| | | |  __/\__ \
|_|   \__,_|\__\___|_| |_|\___||___/
List of all the Patches applied to the program
*/

new Patch("Patches/saltCalculator.js")
new Patch("Patches/CYAcalc.js")
new Patch("Patches/wordle.js")
new Patch("Patches/linerPricer.js")