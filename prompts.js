module.exports = [
  {
    name: 'PresetLanguage',
    message:  'Which language do you prefer?',
    type: 'list',
    choices: [
      { name: 'Javascript', value: 'js' },
      { name: 'Typescript', value: 'ts' }
    ],
    default: 'js'
  }
];
