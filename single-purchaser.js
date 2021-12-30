// How much RAM each purchased server will have. In this case, it'll
// be 8GB.
var ram = 8192;

// Iterator we'll use for our loop
var i = 0;

// Continuously try to purchase servers until we've reached the maximum
// amount of servers
    // Check if we have enough money to purchase a server

while (i <= 10) {
    
    if (getServerMoneyAvailable("home") > getPurchasedServerCost(ram)) {
        var hostname = purchaseServer("catalyst-hack-" + i, ram);
        scp("hack-catalyst.script", hostname);
        exec("hack-catalyst.script", hostname, 3410);
        i++
        
    }
}
