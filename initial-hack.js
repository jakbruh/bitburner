
var ram = 8192;
var i = 0;

while (i <= 24) {
    
    if (getServerMoneyAvailable("home") > getPurchasedServerCost(ram)) {
        var hostname = purchaseServer("catalyst-hack-" + i, ram);
        scp("hack-catalyst.script", hostname);
        exec("hack-catalyst.script", hostname, 3410);
        i++
        
    }
}
