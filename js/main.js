const modulePath = "modules/mastertomnl-domain-unit-sheet";
const mName = "mastertomnl-domain-unit-sheet";
const preFlix = "flags.mastertomnl-domain-unit-sheet.";

class MasterTomNLDomainUnitSheet5E extends dnd5e.applications.actor.ActorSheet5eCharacter {
    get template() {
        if (!game.user.isGM && this.actor.limited) return "systems/dnd5e/templates/actors/limited-sheet.hbs";
        return `${modulePath}/template/domain-unit-sheet.html`;
    }
    
    async saveDomain(html) {
        console.log(`MasterTomNLDomainUnitSheet5E | Saving domain unit info to file for ${this.actor.name}`);
    }
    
    static get defaultOptions() {
        const options = super.defaultOptions;
        // sheet window options
        mergeObject(options, {
            classes: ["dnd5e", "sheet", "actor", "mtdus"],
            width: 650,
            height: 350
        });
        return options;
    }
    
    async getData(options) {
        const context = await super.getData(options);
        context.isGM = game.user.isGM;
        // set some default values
        if (!context.actor.flags[mName]) {
            context.actor.flags[mName] = {'atk':0,'def':10,'pow':0,'tou':10,'mor':0,'com':0,'attacks':1,'damage':1,'size':6};
        }
        return context;
    }
    
    activateListeners(html) {
        super.activateListeners(html);
        // watch the change of the import-policy-selector checkboxes
        $(html)
            .find(['input', 'select', 'textarea'].join(","))
            .on("change", (event) => {
                this.saveDomain(html);
            });
        return true;
    }
}

Hooks.once('init', async function () {
    console.log("MasterTomNLDomainUnitSheet5E | Initialized");
    Actors.registerSheet('dnd5e', MasterTomNLDomainUnitSheet5E, {
        types: ['character'],
        makeDefault: false
    });
});
