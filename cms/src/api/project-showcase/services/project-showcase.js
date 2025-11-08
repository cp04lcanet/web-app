'use strict';

/**
 * project-showcase service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::project-showcase.project-showcase');
