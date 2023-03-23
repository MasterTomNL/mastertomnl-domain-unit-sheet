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
        /*this.actor.setFlag(mName, "commander", this.getFieldVal(html, 'commander'));
        this.actor.setFlag(mName, "size", this.getFieldVal(html, 'size'));
        this.actor.setFlag(mName, "powerdie", this.getFieldVal(html, 'powerdie'));
        this.actor.setFlag(mName, "diplomacy", this.getNumber(html, 'diplomacy'));
        this.actor.setFlag(mName, "espionage", this.getNumber(html, 'espionage'));
        this.actor.setFlag(mName, "lore", this.getNumber(html, 'lore'));
        this.actor.setFlag(mName, "operations", this.getNumber(html, 'operations'));
        this.actor.setFlag(mName, "communications", this.getNumber(html, 'communications'));
        this.actor.setFlag(mName, "resolve", this.getNumber(html, 'resolve'));
        this.actor.setFlag(mName, "resources", this.getNumber(html, 'resources'));
        */
        console.log(this.actor);
    }
    
    /*
     * get a field value from our character sheet
     */
    getFieldVal(html, name) {
        return $(html).find('[name="flags.mastertomnl-domain-unit-sheet.'+name+'"]').val();
    }
    /* return FieldVal as a Number */
    getNumber(html, name) {
        return Number(this.getFieldVal(html, name));
    }
    
    getUuid() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
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
