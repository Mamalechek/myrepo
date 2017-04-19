module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import"
    ],
    "env": {
        "es6": true,
    	"browser": true,
    	"commonjs": true
    },
    "rules": {
        "func-names": ["error", "as-needed"],
        "indent": [2, 4],
        "quotes": [2, "single", {"avoidEscape": true, "allowTemplateLiterals": true}],
        "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
        "max-len": ["error", 80]
  }
};
