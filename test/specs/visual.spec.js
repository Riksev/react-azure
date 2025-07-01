describe("My React App", () => {
  it("should look correct", async () => {
    await browser.url("http://localhost:3000/");
    await browser.sauceVisualCheck("Home Page", {
      fullPage: true,
    });
  });
});
