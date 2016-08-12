# Revolve Clothing Style Guide

The style guide will provides examples and implementation details around patterns
and components. You know, a style guide.

## Developing

To develop on the style guide, run the following command:

```bash
npm i # must be done from a fresh clone, but should be done occasionally
npm start
```

Upon running this command, a new browser tab should open to the index of the
style guide.

## Building

To build out all the assets, run the following command:

```bash
npm i # if you just pulled, you should probably do an install
npm run build
```

Assets will be built within `site` and `lib`. Both are
not being tracked since they house computer generated code.

## Organization

The top level directories are as follows:

- src: houses all the pages, templates, and assets
    - assets: houses SCSS, JS, and any client side templates
    - data: houses any data used for the examples
    - docs: houses documentation represented as markdown
    - materials: houses templates or the examples expressed as HTML
    - views: houses the pages within the examples
- ui: houses assets and templates for shell of the style guide
    - assets: houses static assets for styling and interacting of the
      style guide ui
    - layouts: houses the layout the ui of the style guide, primarily includes
      templates used for rendering

This is different from the suggested fabricator structure. In contrast to the
proposed structure. The idea is to have the source (the actual building blocks
used for the style guide) and the ui (the part responsible for rendering the
style guide) to be separated so there is no confusion upon editing. This also
allows for introducing new themes or UI elements independent of the style guide.
The source (or src) contains the living/breathing style guide independent of the
UI. The reason these inner directories are containing within src is to contain
consistency across the different parts of the style guide. When opening up
assets, materials, and views, there should be a direct mapping across the inner
parts. The intention is to have an obvious convention when it comes to adding
or updates part of the style guide. This imposed structure also lends well if
components come from a separate project, as assets could either consume or
render independently.

## Future

Things that need to be completed/figured out:

- Get file watching working for templates
- See if the atomic design make sense within the context of the team
- Update layout with revolve favicon
