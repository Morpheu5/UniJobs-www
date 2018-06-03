import Vue from 'vue'

let langToName = (code) => {
    switch (code) {
        case 'it':
            return 'Italiano';
        case 'en':
            return 'English';
        default:
            return `[${code.toUpperCase()}]`;
    }
};

Vue.mixin({
    filters: {
        flagify: (code) => {
            return langToName(code);
        }
    }
})