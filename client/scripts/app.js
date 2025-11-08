import { renderMissionVision } from '../services/missionVision-service.js';
import { renderEmpoweringCommunities } from '../services/empoweringCommunities-services.js';
import { renderWhyChooseUs } from '../services/whyChooseUs-service.js';
import { renderjoinUs } from '../services/joinUs-service.js';
import { renderAboutUs } from '../services/aboutUs-service.js';
import { renderOurTeam } from '../services/ourTeam-service.js';
import { renderImpact } from '../services/impact-service.js';
import { renderFAQ } from '../services/faq-service.js';
import { renderhomeHero } from '../services/homeHero-service.js';
import { renderSponsor } from '../services/sponsor-service.js';



// Events

document.addEventListener('DOMContentLoaded', async () => {
  const currentLanguage = localStorage.getItem("currentLanguage") || "en";
  await renderPageSections(currentLanguage);
});

document.querySelectorAll("#language-buttons").forEach(el => el.addEventListener("click", handleLanguageChange));

// Functions

async function renderPageSections(language = "en") {
  // Mission & Vision Section
  await renderMissionVision(language);
  // Empowering Communities
  await renderEmpoweringCommunities(language);
  // Why Choose Us Section
  await renderWhyChooseUs(language);

  await renderjoinUs(language);

  await renderAboutUs(language);

  await renderOurTeam(language);

  await renderImpact(language);

  await renderFAQ(language);

  await renderSponsor(language);

  // etc...
  await renderhomeHero(language);

}

async function handleLanguageChange(event) {
  const currentLanguage = event.target.dataset?.language || "en";
  localStorage.setItem("currentLanguage", currentLanguage);

  await renderPageSections(currentLanguage);

  initTestimonialsSlider();
  renderProjects()
  renderCalls();
}
