const lib = require("./lib");

main();

async function main() {
  const searchRes = await lib.search("request");
  console.log("a:", searchRes.length);

  const searchRes2 = await lib.search("", ["keywords:eleventy-plugin", "not:deprecated"], 10);
  console.log("b:", searchRes2.length);

  const searchSuggestionsRes = await lib.searchSuggestions("eleventy");
  console.log("c:", searchSuggestionsRes.length);

  const packageRes = await lib.package("@11ty/eleventy");
  console.log("d:", packageRes);
}
