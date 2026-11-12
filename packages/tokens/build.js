import StyleDictionary from 'style-dictionary';
import base from './style-dictionary.config.js'; // keep only hooks + the typescript format here

const themes = { light: ':root', dark: '[data-theme="dark"]' };

// 1) primitives, once
await new StyleDictionary({
    ...base,
    source: ['src/primitive.json'],
    platforms: {
        css: {
            transformGroup: 'css',
            buildPath: 'dist/',
            files: [{ destination: 'tokens.css', format: 'css/variables' }],
        },
    },
}).buildAllPlatforms();

// 2) one build per theme
for (const [name, selector] of Object.entries(themes)) {
    await new StyleDictionary({
        ...base,
        include: ['src/primitive.json'], // resolvable, but not emitted
        source: [`src/themes/${name}.json`], // emitted
        platforms: {
            css: {
                transformGroup: 'css',
                buildPath: 'dist/',
                files: [
                    {
                        destination: `theme-${name}.css`,
                        format: 'css/variables',
                        filter: (token) => token.isSource, // drop the primitives
                        options: { selector, outputReferences: true },
                    },
                ],
            },
        },
    }).buildAllPlatforms();
}
