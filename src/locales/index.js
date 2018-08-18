
import counterpart from 'counterpart';
/* import en from './en.json';
import it from './it.json';

counterpart.registerTranslations(en.code, en);
counterpart.registerTranslations(it.code, it);

counterpart.setLocale(en.code); */

export default function setUpTranslation(lang) {
    let langName = lang,
        json = require(`./${langName}.json`);
    counterpart.setLocale(langName);
    counterpart.registerTranslations(langName, json);
}

/* export default [
    {
        active: true,
        available: true,
        code: en.code,
        icon: '',
        name: 'languages.en.name'
    },
    {
        active: false,
        available: true,
        code: it.code,
        icon: '',
        name: 'languages.it.name'
    }
]; */