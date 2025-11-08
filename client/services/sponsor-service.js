import { Sponsor } from '../models/sponsor.js';
import { BASE_URL } from './api-service.js'

export async function renderSponsor(locale = 'en') {
  const Sponsor = await fetchSponsor(locale);

  if (Sponsor) {
    document.getElementById('sponsor_title').textContent = Sponsor.heading;
    document.getElementById('sponsor-text').textContent = Sponsor.description;


    const logoPartnersContainer = document.querySelector('.partners_grid');
    logoPartnersContainer.innerHTML = "";

    for (const logo of Sponsor.logos) {
      const logoHtml = `
          <div class="partners_grid_item">
            <a href="">
              <img id="img-sponsor" src="${logo}" alt="Partner logo" class="partner_logo">
            </a>
          </div>
          `

      logoPartnersContainer.innerHTML += logoHtml;

    }




  }
}

async function fetchSponsor(locale = 'en') {
  const endpoint = `${BASE_URL}/api/sponsor?populate=*&locale=${locale}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const result = await response.json();

    return new Sponsor({

      heading: result.data.Heading,
      description: result.data.Description,
      logos:
        result.data.Logos.map(l => `${BASE_URL}${l.url}`)
    });
  } catch (error) {
    console.error('Failed to fetch Sponsor:', error);
    return null;
  }
}
