import { EmpoweringCommunities } from '../models/empoweringCommunities.js';
import { BASE_URL } from './api-service.js'

export async function renderEmpoweringCommunities(locale = 'en') {
  const empoweringCommunities = await fetchEmpoweringCommunities(locale);
  if (empoweringCommunities?.length) {
    const container = document.querySelector(".empowering_communities_container");
    container.innerHTML = "";
    for (let item of empoweringCommunities) {
      const mapedItem = new EmpoweringCommunities({
        heading: item.Heading,
        description: item.Description,
        picture: item.Picture?.url
          ? `${BASE_URL}${item.Picture?.url}`
          : null,
      }); //debugger
      const card = `  <div class="empowering_communities_card">
              <img id="empowering_communities" src="${mapedItem.picture}"
                alt="empowering communities image 1" class="default-image-shadow">
              <h3 id="empowering_communities_title">${mapedItem.heading}</h3>
              <p id="empowering_communities_text"> ${mapedItem.description} </p>
                          </div>`
      container.innerHTML += card;

    }



  }
}

async function fetchEmpoweringCommunities(locale = 'en') {
  const endpoint = `${BASE_URL}/api/empowerings?populate[Component1][populate][0]=Picture&locale=${locale}`;
  ///api/your-content-type?populate[Component1][populate][0]=picture
  //debugger
  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const result = await response.json();

    return result?.data[0].Component1



  } catch (error) {
    console.error('Failed to fetch Empowering Communities:', error);
    return null;
  }
}
