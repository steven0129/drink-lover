var azureMobileApps = require('azure-mobile-apps');

var table = azureMobileApps.table();

table.columns = {
	"menuID":"string",	
	"content": "string"
};

table.dynamicSchema = false;

module.exports = table;