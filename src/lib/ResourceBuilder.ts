import { Entity, Resource, ResourceLink } from './'

export class ResourceBuilder {
    constructor(private resource: Resource = {}) {}

    setEntity(entity: Entity): ResourceBuilder {
        this.resource = { ...this.resource, ...entity }
        return this
    }

    setLink(rel: string, link: ResourceLink | ResourceLink[]): ResourceBuilder {
        this.resource = { ...this.resource,
            _links: { ...this.resource._links, [rel]: link }
        }
        return this
    }

    embedResource(rel: string, resource: Resource | Resource[]): ResourceBuilder {
        this.resource = Array.isArray(resource) ? { ...this.resource, _embedded: { ...(this.resource._embedded || {}),
            [rel]: [ ...((this.resource._embedded || {})[rel] || []), ...resource ] }
        } : { ...this.resource, _embedded: { ...(this.resource._embedded || {}),
            [rel]: [ ...((this.resource._embedded || {})[rel] || []), resource ] }
        }
        return this
    }

    toResource(): Resource {
        return this.resource
    }
}
