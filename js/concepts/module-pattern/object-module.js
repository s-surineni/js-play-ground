const myModule = {
    myProperty: 'someValue',
    // object literals can contain properties and methods.
    // e.g., we can define a further object for module configuration:
    myConfig: {
        useCaching: true,
        language: 'en',
    },
    // a very basic method
    saySomething() {
        console.log('Where is Paul Irish debugging today?');
    },
    // output a value based on the current configuration
    reportMyConfig() {
        console.log(   `Caching is: ${this.myConfig.useCaching ? 'enabled' : 'disabled'}`
        );
    },
    // override the current configuration
    updateMyConfig(newConfig) {
        if (typeof newConfig === 'object') {
            this.myConfig = newConfig;
            console.log(this.myConfig.language);
        }
    },
};

// Outputs: What is Paul Irish debugging today?
myModule.saySomething();

// Outputs: Caching is: enabled
myModule.reportMyConfig();

// Outputs: fr
myModule.updateMyConfig({
    language: 'fr',
    useCaching: false,
});

// Outputs: Caching is: disabled
myModule.reportMyConfig();