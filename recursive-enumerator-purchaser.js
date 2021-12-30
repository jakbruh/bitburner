var completedServers = []
var denylist = ["n00dles", "foodnstuff", "zero", "neo-net", "phantasy", "sigma-cosmetics", "joesguns", "hong-fang-tea", "nectar-net", "max-hardware", "harakiri-sushi", "CSEC", "silver-helix", "omega-net", "avmnite-02", "iron-gym", "netlink", "rothman-uni", "johnson-ortho", "the-hub", "catalyst", "I.I.I.I", "catalyst-hack-0"]
while (true) {
	availableServers = scan("home")
	availableServers.forEach(function (server, index) {
		if (standardPreHackChecks(server)) {
			makePurchase(server, index)
			markCompleted(server)
			

		}
	recursiveScan(server)
	})
	
}

function markCompleted(server) {
	print("-----", server, " marked as complete------")
	completedServers.indexOf(server) === -1 ? completedServers.push(server) : print("Skipping: ", server)
}

function recursiveScan(server) {
	if (server) {
		availableServers = scan(server)
			availableServers.forEach(function (server, index) {
				if (standardPreHackChecks(server)) {
					makePurchase(server, index)
					markCompleted(server)
					recursiveScan(server)
				}
				
			})
		
	}
}

function makePurchase(server, i) {
	var ram = 1024;
	while (getServerMoneyAvailable("home") < getPurchasedServerCost(ram)) {
		print("Waiting for enough money")
	}
	print("We have enough money!")
	if (getHackingLevel() >= getServerRequiredHackingLevel(server)) {
		var hostname = purchaseServer(server + "-ram-" + String(ram), ram);
		genericHack(server)
		scp("hack-joes.script", hostname);
		exec("hack-joes.script", hostname, 425, server);
	} else {
		print("But we aren't high enough level :(")
	}


}

function genericHack(server) {
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
	nuke(server)
	sleep(2000)
}

function standardPreHackChecks(server) {
	return (server != "home" && !server.includes("pserv") && !completedServers.includes(server) && !server.includes("ram") && denylist.indexOf(server) === -1 ) ? true : false
}