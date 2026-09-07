const projects = [
	{
		title: "Project Sekai Japanese Server Access Guide",
		preview: "Google Docs",
		descriptionBeforeLink: `
			A guide for users who are interested in accessing the Japanese servers of the rhythm game, Project Sekai.
			This document provides step-by-step instructions on how to install the game, as well as a guide on how to navigate 
			through the game's tutorial.
		`,
		descriptionAfterLink: `
		`,
		bulletPoints: [
	
		],
		link: "https://docs.google.com/document/d/10sPgINED1G_bFRxvk1scxBwr3P46bD6zrQc0xYm4BmM/edit?usp=sharing",
		previewUrl: "https://docs.google.com/document/d/10sPgINED1G_bFRxvk1scxBwr3P46bD6zrQc0xYm4BmM/preview"
	},
	{
		title: "Project in Progress",
		preview: "Project Preview",
		descriptionBeforeLink: "This project is currently being worked on. Come back later to see the final result!",
		link: null,
		previewUrl: null
	}
];

const carousel = document.querySelector("[data-portfolio-carousel]");
const count = carousel.querySelector("[data-portfolio-count]");
const title = carousel.querySelector("[data-portfolio-title]");
const preview = carousel.querySelector("[data-portfolio-preview]");
const description = carousel.querySelector("[data-portfolio-description]");
const previousButton = carousel.querySelector("[data-portfolio-prev]");
const nextButton = carousel.querySelector("[data-portfolio-next]");
let currentProject = 0;

function showProject(projectIndex, direction) {
	currentProject = (projectIndex + projects.length) % projects.length;
	const project = projects[currentProject];

	carousel.classList.remove("is-entering-left", "is-entering-right");
	void carousel.offsetWidth;
	carousel.classList.add(direction === "next" ? "is-entering-right" : "is-entering-left");

	count.textContent = `Project ${currentProject + 1} of ${projects.length}`;
	title.textContent = project.title;
	if (project.previewUrl) {
		preview.innerHTML = `<iframe src="${project.previewUrl}" title="${project.title} document preview" loading="lazy"></iframe>`;
	} else {
		preview.textContent = project.preview;
	}
	preview.setAttribute("aria-label", `${project.title} preview`);
	let descriptionMarkup = `<p>${project.descriptionBeforeLink}</p>`;

	if (project.link) {
		descriptionMarkup += `<a href="${project.link}" target="_blank" rel="noopener">Access the full document here.</a>`;
	}

	if (project.descriptionAfterLink) {
		descriptionMarkup += `<p>${project.descriptionAfterLink}</p>`;
	}

	if (project.bulletPoints) {
		descriptionMarkup += `<ul>${project.bulletPoints.map((point) => `<li>${point}</li>`).join("")}</ul>`;
	}

	description.innerHTML = descriptionMarkup;
}

previousButton.addEventListener("click", () => showProject(currentProject - 1, "previous"));
nextButton.addEventListener("click", () => showProject(currentProject + 1, "next"));

showProject(0, "next");
