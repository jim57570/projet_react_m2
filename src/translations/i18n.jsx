import i18next from 'i18next';

i18next.init({
    lng: 'fr', // if you're using a language detector, do not define the lng option
    debug: true,
    resources: {
      en: {
        translation: require('../../assets/translations/en.json')
      },
      fr: {
        translation: require('../../assets/translations/fr.json')
      }
    }
  });