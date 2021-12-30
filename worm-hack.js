var completedServers = []


while (true) {
	availableServers = scan("home")
	availableServers.forEach(function (server, index) {
		if (standardPreHackChecks(server)) {
			if (!scriptRunning("hack-joes.script", server)) {
				genericHack(server)
				markCompleted(server)
				
			}
		}
		recursiveScan(server)
	})
}

function markCompleted(server) {
	print("-----", server, " marked as complete------")
	completedServers.indexOf(server) === -1 ? completedServers.push(server) : print("Skipping: ", server)
}

function standardPreHackChecks(server) {
	return (server != "home" && !server.includes("pserv") && !completedServers.includes(server)) ? true : false
}

function recursiveScan(server) {
	if (server) {
	availableServers = scan(server)
	availableServers.forEach(function (server, index) {
		if (standardPreHackChecks(server)) {
			if (!scriptRunning("hack-joes.script", server)) {
				genericHack(server)
				markCompleted(server)
			}
		recursiveScan(server)
		}
	})
	}

}

function genericHack(server) {
	if (getHackingLevel() >= getServerRequiredHackingLevel(server)) {
		if (!hasRootAccess(server)) {
			if (fileExists("brutessh.exe")) {
				brutessh(server)
			}
			if (fileExists("ftpcrack.exe")) {
				ftpcrack(server)
			}
			if (fileExists("relaysmtp.exe")) {
				relaysmtp(server)
			}
			if (fileExists("sqlinject.exe")) {
				sqlinject(server)
			}
			if (fileExists("httpworm.exe")) {
				httpworm(server)
			}
		}
		sleep(5000)
		if (!hasRootAccess(server))
			nuke(server)
		sleep(2000)
		scp("hacker.script", server)
		ram = findRamPerScript(server)
		if (ram != 0) {
			exec("hacker.script", server, ram, server)
		}
		
		files = ls(server)
		files.forEach(function(file, index) {
			if (file.includes(".txt") || file.includes(".lit") || file.includes(".txt")) {
				scp(file, server, "home")
			}
		})
	} else {
		print("Skipping ", server, ". Insufficient hacking level")
	}

}

function findRamPerScript(server) {
	var serverRam = getServerMaxRam(server)
	var serverUsedRam = getServerUsedRam(server)
	var ramNeededForHackScript = 2.6

	if (serverUsedRam != 0) {
		serverRam = serverRam - serverUsedRam
	}
	div = serverRam / ramNeededForHackScript
	possibleThreads = Math.floor(div)

	return possibleThreads


}