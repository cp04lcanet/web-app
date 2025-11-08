import { WhyChooseUs } from '../models/whyChooseUs.js';
import { BASE_URL } from './api-service.js'

export async function renderWhyChooseUs(locale = 'en') {
  const WhyChooseUs = await fetchWhyChooseUs(locale);
  if (WhyChooseUs) {
    document.getElementById('why_choose_us_title').textContent = WhyChooseUs.heading;
    document.getElementById('why_choose_us_text').textContent = WhyChooseUs.description;
    document.getElementById('why_choose_us_title2').textContent = WhyChooseUs.heading2;
    document.getElementById('why_choose_us_text2').textContent = WhyChooseUs.description2;
    document.getElementById('why_choose_us_title3').textContent = WhyChooseUs.heading3;
    document.getElementById('why_choose_us_text3').textContent = WhyChooseUs.description3;



    const imgEl = document.getElementById('why_choose_us_picture');
    if (WhyChooseUs.picture) {
      imgEl.src = WhyChooseUs.picture;
    }
  }
}

async function fetchWhyChooseUs(locale = 'en') {
  //debugger
  const endpoint = `${BASE_URL}/api/choose-us?populate=*&locale=${locale}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const result = await response.json();

    return new WhyChooseUs({
      heading: result.data.Heading,
      description: result.data.Description,
      picture: result.data.Picture?.url
        ? `${BASE_URL}${result.data.Picture?.url}`
        : null,
      heading2: result.data.Heading2,
      description2: result.data.Description2,
      heading3: result.data.Heading3,
      description3: result.data.Description3,

    });
  } catch (error) {
    console.error('Failed to fetch Why Choose Us:', error);
    return null;
  }
}
