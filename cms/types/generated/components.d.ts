import type { Schema, Struct } from '@strapi/strapi';

export interface AccordionAccordion extends Struct.ComponentSchema {
  collectionName: 'components_accordion_accordions';
  info: {
    displayName: 'Accordion';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Heading: Schema.Attribute.Text;
  };
}

export interface ProjectsProjects extends Struct.ComponentSchema {
  collectionName: 'components_projects_projects';
  info: {
    displayName: 'Projects';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Heading: Schema.Attribute.Text;
    Picture: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'accordion.accordion': AccordionAccordion;
      'projects.projects': ProjectsProjects;
    }
  }
}
