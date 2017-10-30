import counterpart from 'counterpart';
import en from './en.json';
import it from './it.json';

counterpart.registerTranslations(en.code, en);
counterpart.registerTranslations(it.code, it);

counterpart.setLocale(en.code);

export default [
    {
        code: en.code,
        avaliable: true,
        active: true,
        icon: '',
        name: 'languages.en.name'
    },
    {
        code: it.code,
        avaliable: true,
        active: false,
        icon: '',
        name: 'languages.it.name'
    }
];