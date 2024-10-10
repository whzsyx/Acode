# Acode - Code Editor for Android

<p align="center">
  <img src='res/logo_1.png' width='250'>
</p>

[![](https://img.shields.io/endpoint?label=Acode&style=flat-square&url=https%3A%2F%2Fmogyo.ro%2Fquart-apis%2Ftgmembercount%3Fchat_id%3Dfoxdebug_acode)](https://t.me/foxdebug_acode) [![](https://dcbadge.vercel.app/api/server/vVxVWYUAWD?style=flat)](https://discord.gg/vVxVWYUAWD)

## • Overview

Welcome to Acode Editor - a powerful and versatile code editing tool designed specifically for Android devices. Whether you're working on HTML, CSS, JavaScript, or other programming languages, Acode empowers you to code on-the-go with confidence.

## • Features

- Edit and create websites, and instantly preview them in a browser.
- Seamlessly modify source files for various languages like Python, Java, JavaScript, and more.
- Built-in javascript console
- Enjoy multi-language editing support with easy management tools.
- Enjoy a large collections of community plugins to enhance your coding experience.

## • Installation

You can get Acode Editor from popular platforms:

[<img src="https://play.google.com/intl/en_us/badges/images/generic/en-play-badge.png" alt="Get it on Google Play" height="60">](https://play.google.com/store/apps/details?id=com.foxdebug.acodefree) [<img src="https://fdroid.gitlab.io/artwork/badge/get-it-on.png" alt="Get it on F-Droid" height="60"/>](https://www.f-droid.org/packages/com.foxdebug.acode/)

## • Project Structure

<pre>
Acode/
|
|- src/   - Core code and language files
|
|- www/   - Public documents, compiled files, and HTML templates
|
|- utils/ - CLI tools for building, string manipulation, and more
</pre>

## • Multi-language Support

Enhance Acode's capabilities by adding new languages easily. Just create a file with the language code (e.g., en-us for English) in [`src/lang/`](https://github.com/deadlyjack/Acode/tree/main/src/lang) and include it in [`src/lib/lang.js`](https://github.com/deadlyjack/Acode/blob/main/src/lib/lang.js). Manage strings across languages effortlessly using utility commands:

```shell
yarn lang add
yarn lang remove
yarn lang search
yarn lang update
```

## • Building the Application

To build the APK, ensure you have Node.js, NPM, and Apache Cordova installed on your device. Use Cordova CLI to build the application.

1. Initial setup (required only once):

```shell
yarn setup
```

2. Build the project:

```shell
yarn build <platform (android)> <free|paid> <p|prod|d|dev>
```

## • Contributing

Acode Editor is an open-source project, and we welcome contributions from the community. To contribute, follow these steps:

1. Fork the repository.
2. Make your changes and commit them.
3. Push your changes to your fork.
4. Create a pull request and Wait for review.

Please ensure that your code is clean, well-formatted, and follows the project's coding standards. Acode uses [Biomejs](https://biomejs.dev/) for formatting and linting. You can use following commands to lints/format your code locally:
```shell
yarn lint # for linting
yarn format # for formatting
yarn spellcheck # for spellchecking
```
Also, ensure that your code is well-documented and includes comments where necessary.

> [!Note]
> You can use any package manager like npm or yarn or pnpm or bun.
> You can use your editor specific Biomejs plugin for auto-formatting and linting based on Acode's configs.

## • Developing a Plugin for Acode

For comprehensive documentation on creating plugins for Acode Editor, visit the [repository](https://github.com/deadlyjack/acode-plugin).

For plugin development information, refer to: [Acode Plugin Documentation](https://acode.app/plugin-docs)

> 💙 Happy coding!

## Star History

<a href="https://star-history.com/#deadlyjack/Acode&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=deadlyjack/Acode&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=deadlyjack/Acode&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=deadlyjack/Acode&type=Date" />
 </picture>
</a>
