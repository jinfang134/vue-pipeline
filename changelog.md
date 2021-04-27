# Changelog Vue 3



Files: 

/index.js => New (maybe incomplete) way to use a plugin in Vue 3. I only tested it on localhost.

/.eslintrc.js => Switching to Vue 3 (and using standard eslint because it was more comfortable for me personally). 

```json
extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
```

/src/components

service.js and line.js=> minor changes. Removal of `var` and change to `const` or `let` as appropriate, removal of unused variables in jsdoc and change of == to === (type checking in addition to the value).

*.vue => structurally there are no changes. Only the format has been changed from Vue 2 to Vue 3 respecting everything that existed before.



/demo/

main.js and App.vue=> change to Vue 3.



In package.json several dependencies were changed but I still have to adjust some things. If I can I will review this weekend the tests.
