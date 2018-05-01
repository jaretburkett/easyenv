const fs = require('fs');
class EasyEnv{
    constructor(opts){
        if(!(opts.envPath)){
            throw ('No envPath passed');
        }
        this._envPath = opts.envPath;
        this._defaultEnvPath = opts.defaultEnvPath || null;
        this._defaultValues = opts.defaultValues || null;

        this.isEnv = false;
        this.raw = {
            mainEnv: '',
            defaultEnv: ''
        };
        this.envLines = {
            mainEnv: [],
            defaultEnv: []
        };
        this.parsed = {};

        this._parseEnv();
    }

    _processEnvFile(envPath, fileType){
        this.raw[fileType] = fs.readFileSync(envPath, 'utf8');
        this.envLines[fileType] = this.raw[fileType].split('\n');
        for(let i = 0; i < this.envLines[fileType].length; i++){
            // remove head and trailing whitespace
            this.envLines[fileType][i].trim();

            // process line
            if(
                this.envLines[fileType][i].startsWith('#') ||
                this.envLines[fileType][i].startsWith('//') ||
                this.envLines[fileType][i].length === 0
            ){
                // comment line or blank, remove it
                this.envLines[fileType].splice(i, 1);
            } else {
                // parse it
                let parsedArr = this.envLines[fileType][i].split('=');
                // remove heading and trailing whitespace
                parsedArr[0].trim();
                parsedArr[1].trim();
                this.parsed[parsedArr[0]] = parsedArr[1];
            }
        }
    }

    _parseEnv() {
        // get defaults passed first, if we have some
        if (this._defaultValues) {
            // just put default values in processed
            this.parsed = this._defaultValues;
        }
        // get defaults from default env file next, if there is one.
        // any values here will override default values
        if (this._defaultEnvPath) {
            // if the file exists
            if (fs.existsSync(this._defaultEnvPath)) {
                this._processEnvFile(this._defaultEnvPath, 'defaultEnv');
            } else {
                // passed defaultEnvPath but the file is not there, throw an error
                throw(`defaultEnvPath "${this._defaultEnvPath}" does not exist`);
            }
        }

        // finally get the env path if it exists.
        // any values here will override default values
        if (fs.existsSync(this._envPath)) {
            // first read and process the env file
            this.isEnv = true;
            this._processEnvFile(this._envPath, 'mainEnv');
        }
    }
}

module.exports = EasyEnv;