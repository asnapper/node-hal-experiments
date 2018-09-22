export type Entity = any

export interface ResourceLink {
    href: string
    templated?: boolean
    type?: string
    name?: string
    deprecation?: string
    profile?: string
    title?: string
    hreflang?: string
}

export interface ResourceLinks {
    [rel: string]: ResourceLink | ResourceLink[]
}

export interface Resource extends Entity {
    _links?: ResourceLinks
    _embedded?: {
        [type: string]: Resource[]
    }
}
