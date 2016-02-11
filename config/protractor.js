exports.config = {
    specs: ["../test/e2e/**/*.js"],
    onPrepare: function(){
        browser.get("http://localhost:3000").then(function(){
            browser.findElement(by.id("entrar")).click();
            browser.driver.findElement(by.id("login_field")).sendKeys("ricardo.almendro.ruiz@gmail.com");
            browser.driver.findElement(by.id("password")).sendKeys("g03r22c31");
            browser.driver.findElement(by.name("commit")).click();
        });
    }
};
