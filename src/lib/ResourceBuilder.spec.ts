import { ResourceLink } from './Resource'
import { ResourceBuilder } from './ResourceBuilder'
import { mockUsers, mockGroups } from './__mocks__'

const userResources = mockUsers.map(
    u => new ResourceBuilder()
        .setEntity(u)
        .setLink('self', { href: '/users/' + u.id })
        .setLink('member-of', mockGroups.filter(g => ~g.members.indexOf(u.id))
            .map(g => ({ href: '/groups/' + g.id })))
        .toResource())

const groupResources = mockGroups.map(
    g => new ResourceBuilder()
        .setEntity(g)
        .setLink('self', { href: '/groups/' + g.id })
        .setLink('members', g.members.map(u => ({ href: '/users/' + u })))
        .toResource())



describe('should be able to crate HAL resources', () => {
    it('should be able to set a simple link for a relation', () => {
        const r = new ResourceBuilder()
            .setLink('self', { href: '/me' })
            .toResource()

        // TODO: smells like bad design
        const selfLink = <ResourceLink>r._links['self']

        expect(selfLink.href).toBe('/me')
    })

    it('should be able to set a array of links for a relation', () => {
        const r = new ResourceBuilder()
            .setLink('members', [ { href: '/me' }, { href: '/myself' }, { href: '/i' } ])
            .toResource()

        // TODO: smells like bad design
        const memberLinks = <ResourceLink[]>r._links['members']

        expect(memberLinks[0].href).toBe('/me')
        expect(memberLinks[1].href).toBe('/myself')
        expect(memberLinks[2].href).toBe('/i')
    })

    it('should be able to assign an entity to the resource', () => {
        const r = new ResourceBuilder()
            .setEntity({ test: 'me' })
            .toResource()

        expect(r).toEqual({ test: 'me' })
    })

    it('should be able to embed resource arrays', () => {
        const userCollectionRessource = new ResourceBuilder()
            .setEntity({ count: userResources.length, total: userResources.length })
            .setLink('self', { href: '/users' })
            .embedResource('user', userResources)
            .embedResource('group', groupResources)
            .toResource()

        expect(userCollectionRessource._embedded['user'].length).toBe(5)
        expect(userCollectionRessource._embedded['group'].length).toBe(5)
    })

    it('should be able to embed single resources', () => {
        const userCollectionRessource = new ResourceBuilder()
            .setEntity({ count: userResources.length, total: userResources.length })
            .setLink('self', { href: '/users' })
            .embedResource('user', userResources[0])
            .embedResource('group', groupResources[0])
            .toResource()

        expect(userCollectionRessource._embedded['user'].length).toBe(1)
        expect(userCollectionRessource._embedded['group'].length).toBe(1)
    })
})
