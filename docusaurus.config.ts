import { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

import { themes as prismThemes } from "prism-react-renderer";

const config: Config = {
	title: "pkeffect & Monolith @ Internode",
	tagline: "Ramblings and other knowledge",
	favicon: "img/favicon.png",

	// Set the production url of your site here
	url: "https://pkeffect.github.io",
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: "/",

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: "pkeffect @ internode.info", // Usually your GitHub org/user name.
	projectName: "docs", // Usually your repo name.

	onBrokenLinks: "throw",
	onBrokenMarkdownLinks: "warn",

	// Even if you don't use internationalization, you can use this field to set
	// useful metadata like html lang. For example, if your site is Chinese, you
	// may want to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: "en",
		locales: ["en"],
	},

	// Enable Mermaid for diagrams
	markdown: {
		mermaid: true,
	},
	themes: ["@docusaurus/theme-mermaid"],

	presets: [
		[
			"classic",
			{
				docs: {
					sidebarPath: "./sidebars.ts",
					routeBasePath: "/",
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					editUrl: "https://github.com/pkeffect/pkeffect.github.io/tree/main",
					exclude: ["**/tab-**/**"],
				},
				// blog: false,
				blog: {
					showReadingTime: true,
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					// editUrl:
					// "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
				},
				theme: {
					customCss: "./src/css/custom.css",
				},
			} satisfies Preset.Options,
		],
	],

	themeConfig: {
		// Replace with your project's social card
		// image: "images/docusaurus-social-card.jpg",
		navbar: {
			title: "Internode",
            logo: {
              alt: 'Monolith Logo',
              src: 'img/favicon.ico',
                   },
			items: [
				// {
				// 	type: "docSidebar",
				// 	position: "left",
				// 	sidebarId: "pipelines",
				// 	label: "Pipelines",
				// },

				// {
				//   type: "docSidebar",
				//   sidebarId: "blog",
				//   position: "left",
				//   label: "Blog",
				// },

				// {
				//   href: "/blog",
				//   label: "Blog",
				//   position: "left",
				// },
				{
					href: "https://github.com/pkeffect",
					position: "right",
					className: "header-github-link",
					"aria-label": "GitHub repository",
				},
				{
					href: "https://discord.gg/MNwuzeJNGr",
					position: "right",
					className: "header-discord-link",
					"aria-label": "Discord server",
				},
			],
		},
		footer: {
//			logo: {
//				src: "images/logo-dark.png",
//				height: 100,
//			},
			style: "light",
			links: [
				{
					title: "Documents",
					items: [
						{
							label: "Introduction",
							to: "https://pkeffect.github.io",
						},
						{
							label: "OpenWebUI",
							to: "https://docs.openwebui.com/",
						},
					],
				},
				{
					title: "Community",
					items: [
						{
							label: "GitHub",
							href: "https://github.com/pkeffect",
						},
						{
							label: "Discord",
							href: "https://discord.gg/MNwuzeJNGr",
						},
						{
							label: "Internode.info",
							href: "https://internode.info",
						},
					],
				},
				{
					title: "Other",
					items: [
						{
							label: "Something",
							to: "https://#",
						},
						{
							label: "Somewhere",
							to: "https://#",
						},
					],
				},
			],
			// copyright: `Copyright © ${new Date().getFullYear()} Internode.info`,
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},
	} satisfies Preset.ThemeConfig,
	plugins: [require.resolve("docusaurus-lunr-search")],
};

export default config;
